-- ============================================
-- Migration: User Resolution Functions
-- ============================================

-- 1) Ensure external_identity column exists (nullable)
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS external_identity text;

-- 2) Ensure email is nullable (required if you want users created only with external_identity)
ALTER TABLE public.users
ALTER COLUMN email DROP NOT NULL;

-- 3) Unique constraint for external_identity (nullable is OK in Postgres)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE c.conname = 'users_external_identity_unique'
      AND n.nspname = 'public'
      AND t.relname = 'users'
  ) THEN
    ALTER TABLE public.users
    ADD CONSTRAINT users_external_identity_unique UNIQUE (external_identity);
  END IF;
END;
$$;

-- 4) Index (optional; UNIQUE already creates an index, but keeping IF you want explicit naming)
CREATE INDEX IF NOT EXISTS users_external_identity_idx
ON public.users (external_identity);

-- 5) Ensure enum exists (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'transaction_type'
      AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.transaction_type AS ENUM ('entrada', 'saida');
  END IF;
END $$;

-- ============================================
-- 5.5) Function: Normalize Brazilian phone numbers
-- Converts 8-digit mobile to 9-digit format
-- Input: 558496843647@s.whatsapp.net → Output: 5584996843647@s.whatsapp.net
-- ============================================
CREATE OR REPLACE FUNCTION public.normalize_phone(p_phone text)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  v_clean text;
  v_ddd text;
  v_number text;
BEGIN
  -- Remove @s.whatsapp.net suffix if present
  v_clean := regexp_replace(p_phone, '@s\.whatsapp\.net$', '');
  
  -- Remove all non-numeric characters
  v_clean := regexp_replace(v_clean, '[^0-9]', '', 'g');
  
  -- If it's 12 digits (55 + 2 DDD + 8 number), normalize to 13 (add 9)
  IF length(v_clean) = 12 AND v_clean LIKE '55%' THEN
    v_ddd := substring(v_clean from 3 for 2);
    v_number := substring(v_clean from 5);
    -- If number starts with 6,7,8,9 it's a mobile - add 9 prefix
    IF v_number ~ '^[6-9]' THEN
      v_clean := '55' || v_ddd || '9' || v_number;
    END IF;
  END IF;
  
  RETURN v_clean || '@s.whatsapp.net';
END;
$$;

-- ============================================
-- 6) Function: Resolve or create user by external identity
-- Now normalizes phone numbers and checks for existing users
-- to return the correct user UUID instead of creating duplicates
-- ============================================
CREATE OR REPLACE FUNCTION public.get_or_create_user(p_external_identity text)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id uuid;
  v_normalized text;
BEGIN
  IF p_external_identity IS NULL OR length(trim(p_external_identity)) = 0 THEN
    RAISE EXCEPTION 'external_identity is required';
  END IF;

  -- Normalize the phone number to consistent format
  v_normalized := public.normalize_phone(p_external_identity);

  -- First, check if a user with this normalized external_identity already exists
  -- (could be linked via OTP verification from the dashboard)
  SELECT id INTO v_user_id
  FROM public.users
  WHERE external_identity = v_normalized
  LIMIT 1;

  -- If found, return the existing user's ID
  IF v_user_id IS NOT NULL THEN
    RETURN v_user_id;
  END IF;

  -- Otherwise, create a new user with the normalized external_identity
  INSERT INTO public.users (external_identity, email)
  VALUES (v_normalized, NULL)
  ON CONFLICT (external_identity)
  DO UPDATE SET external_identity = EXCLUDED.external_identity
  RETURNING id INTO v_user_id;

  RETURN v_user_id;
END;
$$;

-- ============================================
-- 7a) insert_transaction with ENUM (keeps strict typing)
-- ============================================
CREATE OR REPLACE FUNCTION public.insert_transaction(
  p_external_identity text,
  p_type public.transaction_type,
  p_description text,
  p_amount numeric
)
RETURNS public.transactions
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id uuid;
  v_transaction public.transactions;
BEGIN
  v_user_id := public.get_or_create_user(p_external_identity);

  INSERT INTO public.transactions (user_id, type, description, amount)
  VALUES (v_user_id, p_type, p_description, p_amount)
  RETURNING * INTO v_transaction;

  RETURN v_transaction;
END;
$$;

-- ============================================
-- 7b) insert_transaction overload with TEXT (best for n8n)
-- avoids enum casts/search_path issues in clients
-- ============================================
CREATE OR REPLACE FUNCTION public.insert_transaction(
  p_external_identity text,
  p_type text,
  p_description text,
  p_amount numeric
)
RETURNS public.transactions
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id uuid;
  v_transaction public.transactions;
  v_type public.transaction_type;
BEGIN
  p_type := lower(trim(p_type));

  IF p_type NOT IN ('entrada', 'saida') THEN
    RAISE EXCEPTION 'Invalid type: %. Must be entrada or saida', p_type;
  END IF;

  v_type := p_type::public.transaction_type;

  v_user_id := public.get_or_create_user(p_external_identity);

  INSERT INTO public.transactions (user_id, type, description, amount)
  VALUES (v_user_id, v_type, p_description, p_amount)
  RETURNING * INTO v_transaction;

  RETURN v_transaction;
END;
$$;
