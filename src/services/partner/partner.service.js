import { partnerPrivacyService } from './partnerPrivacy.service.js';

export const PARTNER_ROLES = {
  ADMIN: 'partner_admin',
  FIELD_WORKER: 'field_worker',
  FUNDER_VIEWER: 'funder_viewer'
};

export const BILLING_PLANS = {
  PILOT: { id: 'pilot', name: 'Rural Pilot Plan', price: 'Free / Sponsored', maxUsers: 500 },
  LICENCE: { id: 'licence', name: 'Enterprise NGO Licence', price: '₹49,000 / year', maxUsers: 50000 }
};

const INITIAL_PROGRAMS = [
  {
    id: 'prog-demo-001',
    partnerId: 'org_swasthya_trust',
    name: 'Mahila Swasthya Abhiyan - Rural Delhi & NCR',
    region: 'North India (Delhi/UP/Bihar)',
    language: 'hi',
    joinCode: 'SAKHI-DELHI-4209',
    plan: 'licence',
    createdAt: '2026-08-15T10:00:00Z',
    members: Array.from({ length: 34 }, (_, i) => ({
      userId: `user_m_${i + 1}`,
      teenConsent: true,
      parentConsent: true,
      joinedAt: '2026-08-20T12:00:00Z',
      leftAt: null
    }))
  },
  {
    id: 'prog-demo-002',
    partnerId: 'org_swasthya_trust',
    name: 'Gramin Sakhi Pilot - Palghar (Small Group Test)',
    region: 'Western India (Rajasthan/Gujarat)',
    language: 'mr',
    joinCode: 'SAKHI-PLG-1082',
    plan: 'pilot',
    createdAt: '2026-09-01T10:00:00Z',
    members: Array.from({ length: 8 }, (_, i) => ({
      userId: `user_sm_${i + 1}`,
      teenConsent: true,
      parentConsent: true,
      joinedAt: '2026-09-05T12:00:00Z',
      leftAt: null
    }))
  }
];

class PartnerService {
  constructor() {
    this.storageKey = 'sakhi_partner_programs';
    this.userMembershipKey = 'sakhi_user_program_memberships';
    this.initDefaultData();
  }

  initDefaultData() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(INITIAL_PROGRAMS));
    }
  }

  getAllPrograms() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch (e) {
      return INITIAL_PROGRAMS;
    }
  }

  getProgramById(programId) {
    const programs = this.getAllPrograms();
    return programs.find((p) => p.id === programId) || null;
  }

  getProgramByJoinCode(code) {
    const programs = this.getAllPrograms();
    const cleanCode = (code || '').trim().toUpperCase();
    return programs.find((p) => (p.joinCode || '').toUpperCase() === cleanCode) || null;
  }

  createProgram({ name, region, language = 'hi', plan = 'pilot', description = '' }) {
    const programs = this.getAllPrograms();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regCode = (region.split(' ')[0] || 'REG').substring(0, 4).toUpperCase();
    const joinCode = `SAKHI-${regCode}-${randomNum}`;

    const newProg = {
      id: `prog_${Date.now()}`,
      partnerId: 'org_swasthya_trust',
      name,
      region,
      language,
      joinCode,
      plan,
      description,
      createdAt: new Date().toISOString(),
      members: []
    };

    programs.push(newProg);
    localStorage.setItem(this.storageKey, JSON.stringify(programs));

    partnerPrivacyService.logAccess({
      actorId: 'Partner Admin',
      actorRole: 'partner_admin',
      programId: newProg.id,
      action: 'CREATE_PROGRAM',
      resource: 'partner_programs',
      details: { name, region, joinCode, plan }
    });

    return newProg;
  }

  async joinProgramByCode({ userId, joinCode, teenOptIn, parentConsent, parentName = 'Parent' }) {
    if (!teenOptIn || !parentConsent) {
      return {
        success: false,
        error: 'Both Teen Opt-In and Parent/Guardian consent are required.'
      };
    }

    const prog = this.getProgramByJoinCode(joinCode);
    if (!prog) {
      return { success: false, error: 'Invalid or non-existent program join code.' };
    }

    const programs = this.getAllPrograms();
    const targetIdx = programs.findIndex((p) => p.id === prog.id);
    if (targetIdx === -1) return { success: false, error: 'Program not found.' };

    const existingMember = programs[targetIdx].members.find((m) => m.userId === userId);
    if (existingMember && !existingMember.leftAt) {
      return { success: true, message: 'You are already enrolled in this program.', program: prog };
    }

    if (existingMember && existingMember.leftAt) {
      existingMember.leftAt = null;
      existingMember.teenConsent = true;
      existingMember.parentConsent = true;
      existingMember.joinedAt = new Date().toISOString();
    } else {
      programs[targetIdx].members.push({
        userId,
        teenConsent: true,
        parentConsent: true,
        parentName,
        joinedAt: new Date().toISOString(),
        leftAt: null
      });
    }

    localStorage.setItem(this.storageKey, JSON.stringify(programs));

    // Update user local memberships
    const userMemberships = this.getUserMemberships(userId);
    if (!userMemberships.find(m => m.programId === prog.id)) {
      userMemberships.push({
        id: `mem_${Date.now()}`,
        userId,
        programId: prog.id,
        joinedAt: new Date().toISOString()
      });
      localStorage.setItem(`${this.userMembershipKey}_${userId}`, JSON.stringify(userMemberships));
    }

    partnerPrivacyService.logAccess({
      actorId: userId,
      actorRole: 'end_user',
      programId: prog.id,
      action: 'JOIN_PROGRAM_DUAL_CONSENT',
      resource: 'program_memberships'
    });

    return { success: true, program: prog };
  }

  leaveProgram(userId, programId) {
    const programs = this.getAllPrograms();
    const targetIdx = programs.findIndex((p) => p.id === programId);

    if (targetIdx !== -1) {
      const member = programs[targetIdx].members.find((m) => m.userId === userId);
      if (member) {
        member.leftAt = new Date().toISOString();
        localStorage.setItem(this.storageKey, JSON.stringify(programs));
      }
    }

    const userMemberships = this.getUserMemberships(userId);
    const updated = userMemberships.filter(m => m.programId !== programId);
    localStorage.setItem(`${this.userMembershipKey}_${userId}`, JSON.stringify(updated));

    partnerPrivacyService.logAccess({
      actorId: userId,
      actorRole: 'end_user',
      programId,
      action: 'WITHDRAW_CONSENT_LEAVE_PROGRAM',
      resource: 'program_memberships'
    });

    return { success: true };
  }

  getUserMemberships(userId) {
    try {
      return JSON.parse(localStorage.getItem(`${this.userMembershipKey}_${userId}`) || '[]');
    } catch {
      return [];
    }
  }

  getProgramQRCode(programId) {
    const prog = this.getProgramById(programId);
    const joinCode = prog ? prog.joinCode : 'SAKHI-DEMO';
    
    // SVG Data URL for offline QR representation
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#fff"/><rect x="20" y="20" width="50" height="50" fill="#db2777"/><rect x="130" y="20" width="50" height="50" fill="#db2777"/><rect x="20" y="130" width="50" height="50" fill="#db2777"/><path d="M80 30h40v20H80zM30 80h140v40H30zM80 150h90v30H80z" fill="#db2777"/><text x="100" y="105" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">${joinCode}</text></svg>`;
    const qrDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

    return {
      joinCode,
      qrDataUrl
    };
  }

  async getProgramStatsWithPrivacy(programId, actorId = 'Partner Admin') {
    const prog = this.getProgramById(programId);
    if (!prog) return null;

    const validMembers = prog.members.filter(m => m.teenConsent && m.parentConsent && !m.leftAt);
    const count = validMembers.length;

    partnerPrivacyService.logAccess({
      actorId,
      actorRole: 'partner_viewer',
      programId,
      action: 'VIEW_AGGREGATE_STATS',
      resource: 'aggregate_dashboard',
      details: { rawCount: count }
    });

    if (count < partnerPrivacyService.MIN_GROUP_SIZE) {
      return {
        suppressed: true,
        rawJoinedCount: count,
        joinedUsersCount: 'SUPPRESSED (<20)',
        activeUsersWeekly: 'SUPPRESSED (<20)',
        educationModulesCompleted: 'SUPPRESSED (<20)',
        consentRate: 'SUPPRESSED (<20)',
        byRegion: null
      };
    }

    const activeWeekly = Math.round(count * 0.78);
    const eduCompleted = Math.round(count * 2.3);

    return {
      suppressed: false,
      rawJoinedCount: count,
      joinedUsersCount: count,
      activeUsersWeekly: activeWeekly,
      educationModulesCompleted: eduCompleted,
      consentRate: '100%',
      byRegion: {
        [prog.region]: {
          joinedCount: count,
          activeCount: activeWeekly,
          eduCount: eduCompleted
        }
      }
    };
  }

  exportAggregatesToCSV(programId, actorId = 'Partner Admin') {
    const prog = this.getProgramById(programId);
    if (!prog) return '';

    partnerPrivacyService.logAccess({
      actorId,
      actorRole: 'partner_admin',
      programId,
      action: 'EXPORT_AGGREGATES_CSV',
      resource: 'csv_export'
    });

    const validMembers = prog.members.filter(m => m.teenConsent && m.parentConsent && !m.leftAt);
    const count = validMembers.length;

    let csvRows = [];
    csvRows.push(['Program ID', 'Program Name', 'Region', 'Language', 'Plan', 'Enrolled Users', 'Weekly Active Users', 'Education Modules Completed', 'Consent Rate', 'Privacy Suppression Status']);

    if (count < partnerPrivacyService.MIN_GROUP_SIZE) {
      csvRows.push([
        prog.id,
        prog.name,
        prog.region,
        prog.language,
        prog.plan,
        'SUPPRESSED (<20)',
        'SUPPRESSED (<20)',
        'SUPPRESSED (<20)',
        'SUPPRESSED (<20)',
        'ACTIVATED (Cohort size under 20)'
      ]);
    } else {
      const activeWeekly = Math.round(count * 0.78);
      const eduCompleted = Math.round(count * 2.3);
      csvRows.push([
        prog.id,
        prog.name,
        prog.region,
        prog.language,
        prog.plan,
        count,
        activeWeekly,
        eduCompleted,
        '100%',
        'PASSED (Cohort size >= 20)'
      ]);
    }

    return csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }
}

export const partnerService = new PartnerService();
export default partnerService;
