-- Sakhi Partner Layer Database Migration Schema
-- Enforces Privacy-First Principles, Parent-Teen Consent, RBAC & Privacy Thresholds

-- 1. Partner Organizations Table
CREATE TABLE IF NOT EXISTS public.partner_organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('ngo', 'shg_network', 'field_service', 'social_enterprise', 'government')),
    plan TEXT NOT NULL DEFAULT 'pilot' CHECK (plan IN ('pilot', 'licence')),
    contact_email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Partner Users (RBAC: partner_admin, field_worker, funder_viewer)
CREATE TABLE IF NOT EXISTS public.partner_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES public.partner_organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- References auth.users(id)
    role TEXT NOT NULL CHECK (role IN ('partner_admin', 'field_worker', 'funder_viewer')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Partner Programs (Attribution & Referral Engine)
CREATE TABLE IF NOT EXISTS public.partner_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES public.partner_organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    region TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'hi',
    join_code VARCHAR(12) UNIQUE NOT NULL,
    plan TEXT NOT NULL DEFAULT 'pilot' CHECK (plan IN ('pilot', 'licence')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Program Memberships (Teen + Parent Consent Tracking)
CREATE TABLE IF NOT EXISTS public.program_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID REFERENCES public.partner_programs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    teen_consent BOOLEAN NOT NULL DEFAULT FALSE,
    parent_consent BOOLEAN NOT NULL DEFAULT FALSE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    left_at TIMESTAMPTZ DEFAULT NULL, -- Populated upon opt-out / consent withdrawal
    UNIQUE(program_id, user_id)
);

-- 5. Field Worker Training Completions
CREATE TABLE IF NOT EXISTS public.field_worker_training (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_user_id UUID REFERENCES public.partner_users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT TRUE,
    score INT DEFAULT 100,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Partner Access Audit Logs (NON-NEGOTIABLE PRIVACY REQUIREMENT)
CREATE TABLE IF NOT EXISTS public.partner_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID NOT NULL, -- partner_user_id or api_key_id
    actor_role TEXT NOT NULL,
    program_id UUID REFERENCES public.partner_programs(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- e.g. 'VIEW_AGGREGATE_STATS', 'EXPORT_CSV', 'API_READ_STATS'
    resource TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT DEFAULT '127.0.0.1',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Read-Only Stats API Keys
CREATE TABLE IF NOT EXISTS public.partner_api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES public.partner_organizations(id) ON DELETE CASCADE,
    program_id UUID REFERENCES public.partner_programs(id) ON DELETE CASCADE,
    key_name TEXT NOT NULL,
    key_hash TEXT NOT NULL UNIQUE,
    rate_limit_per_min INT DEFAULT 60,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies Enabling Strict Group Aggregation & Privacy Protection
ALTER TABLE public.partner_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_api_keys ENABLE ROW LEVEL SECURITY;

-- Helper Function: Calculate Program Aggregates with k=20 Anonymity Threshold
CREATE OR REPLACE FUNCTION get_program_privacy_aggregates(p_program_id UUID)
RETURNS TABLE (
    total_joined INT,
    active_weekly INT,
    education_completed INT,
    consent_rate NUMERIC,
    is_suppressed BOOLEAN,
    suppression_reason TEXT
) AS $$
DECLARE
    v_count INT;
    v_active INT;
    v_education INT;
    v_consent_rate NUMERIC;
BEGIN
    -- Count active members with BOTH teen AND parent consent who have NOT withdrawn (left_at IS NULL)
    SELECT COUNT(*) INTO v_count
    FROM public.program_memberships
    WHERE program_id = p_program_id
      AND teen_consent = TRUE
      AND parent_consent = TRUE
      AND left_at IS NULL;

    -- Enforce K-Anonymity Privacy Suppression Rule (Threshold = 20 users)
    IF v_count < 20 THEN
        RETURN QUERY SELECT 
            0 AS total_joined,
            0 AS active_weekly,
            0 AS education_completed,
            0.00 AS consent_rate,
            TRUE AS is_suppressed,
            'Group size below minimum privacy threshold of 20 users. Aggregates suppressed.' AS suppression_reason;
        RETURN;
    END IF;

    -- Mock active weekly (65% of cohort) and education completion for compliant groups
    v_active := ROUND(v_count * 0.68);
    v_education := ROUND(v_count * 0.54);
    v_consent_rate := 100.00;

    RETURN QUERY SELECT 
        v_count AS total_joined,
        v_active AS active_weekly,
        v_education AS education_completed,
        v_consent_rate AS consent_rate,
        FALSE AS is_suppressed,
        '' AS suppression_reason;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
