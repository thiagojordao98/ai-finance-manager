-- ============================================
-- Migration: OTP Verifications Table
-- For WhatsApp phone verification via Evolution API
-- ============================================

-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for efficient lookups
CREATE INDEX IF NOT EXISTS otp_verifications_user_id_idx 
ON public.otp_verifications (user_id);

CREATE INDEX IF NOT EXISTS otp_verifications_phone_number_idx 
ON public.otp_verifications (phone_number);

-- Cleanup old unverified OTPs (optional - run periodically)
-- DELETE FROM public.otp_verifications 
-- WHERE verified = FALSE AND created_at < NOW() - INTERVAL '24 hours';
