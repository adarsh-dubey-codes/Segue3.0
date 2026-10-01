# Sakhi Privacy-First Partner Layer Documentation

## Overview
The **Sakhi Partner Layer** extends Sakhi (a privacy-first cycle-tracking application for adolescent girls) to support partner organizations in rural India—including NGOs, SHG networks, field-service firms, and social enterprises—without compromising user privacy.

---

## Non-Negotiable Privacy Rules
1. **Zero Individual Cycle Data Access**: Partners never see individual cycle dates, flow severity, symptoms, names, or personal identifiers.
2. **20+ User Group Suppression**: Aggregate metrics are displayed **ONLY** for groups of $\ge 20$ consenting users. Groups with $<20$ members are suppressed (`SUPPRESSED (<20)`).
3. **Dual Consent & Voluntary Exit**: Program enrollment requires both **Teen Opt-In** AND **Parent/Guardian Consent**. Users can leave at any time, immediately excluding their data from all future reports.
4. **No Commercial Cycle Data Sharing**: Cycle data is never transmitted to product or commerce partners.
5. **Immutable Access Logging**: Every access attempt (Who, What, When, IP, Role) is recorded in an audit ledger.

---

## Deliverables & Modules Implemented

| Module | Location | Description |
|---|---|---|
| **A. Accounts & RBAC** | `src/pages/Partner/PartnerPortalPage.jsx` | Roles: `partner_admin`, `field_worker`, `funder_viewer`. Role-based UI guards. |
| **B. Program & QR Engine** | `src/components/partner/ProgramManager.jsx` | Program creation, region/language selection, referral join codes & SVG QR code generator. |
| **C. Aggregate Dashboard** | `src/components/partner/AggregateDashboard.jsx` | Anonymized impact dashboard with $k \ge 20$ group size suppression banner & CSV export. |
| **D. Field Worker Training** | `src/pages/Partner/FieldWorkerTrainingPage.jsx` | Offline-first interactive lessons on menstrual health, dual consent, privacy rules & certificate generator. |
| **E. Embeddable Widget** | `src/pages/Partner/EmbedWidgetPage.jsx` | Standalone zero-tracking iframe widget (`/partner/embed`) for NGO websites. |
| **F. Read-Only Stats API** | `src/services/partner/partnerApi.service.js` | REST endpoint simulator (`GET /v1/programs/{id}/stats`) with API keys & rate limits. |
| **G. Rural-Ready UX** | `src/pages/Partner/FieldWorkerTrainingPage.jsx` | Multilingual support (Hindi, English), voice/audio prompts, high contrast & low-bandwidth icons. |
| **H. Billing Placeholder** | `src/components/partner/ProgramManager.jsx` | Plan fields per program (`pilot`, `licence`) with no active payment processing. |

---

## Database Schema & Migrations

The migration SQL is located at `supabase/migrations/20261001_partner_layer.sql`.

### Core Tables Created:
- **`partner_organizations`**: Stores NGO/SHG network metadata.
- **`partner_users`**: Partner user accounts and RBAC roles (`partner_admin`, `field_worker`, `funder_viewer`).
- **`partner_programs`**: Programs created by partners with referral join codes, target region, language, and billing plan (`pilot` or `licence`).
- **`program_memberships`**: Links users to programs with `teen_consent`, `parent_consent`, and `left_at` timestamp.
- **`partner_access_logs`**: Audit log recording every query, CSV export, and API request.
- **`partner_api_keys`**: API keys with rate limits and active flags.

---

## Setup & Environment Variables

### 1. Environment Setup (`.env`):
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_PARTNER_API_RATE_LIMIT=30
VITE_PRIVACY_MIN_GROUP_SIZE=20
```

### 2. Local Setup & Execution:
```bash
# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Run Privacy Unit Tests
npm test

# Build for production
npm run build
```

---

## Security & Privacy Compliance Checklist

- [x] **Small-Group Suppression Verified**: Verified aggregate stats return `SUPPRESSED (<20)` if active consenting cohort size is $< 20$.
- [x] **PII & Cycle Data Stripped**: Verified 0 period dates, symptoms, or user names are included in API JSON or CSV exports.
- [x] **Dual Consent Enforcement**: Verified enrollment fails if either `teenOptIn` or `parentConsent` is missing.
- [x] **Instant Consent Revocation**: Verified `leaveProgram` sets `leftAt` timestamp and excludes user data from future metrics.
- [x] **Audit Trail Verification**: Verified every API call, dashboard view, and CSV export generates a structured log entry in `partner_access_logs`.
- [x] **Offline Resilience**: Verified Field Worker Training module functions without network connectivity.
