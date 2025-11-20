-- Script SQL pour vérifier les colonnes existantes dans la table algo_access_requests
-- Exécutez ce script dans l'éditeur SQL de Supabase pour voir toutes les colonnes

SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'algo_access_requests'
ORDER BY ordinal_position;

-- Si vous ne voyez pas preferred_day, preferred_days, time_slots ou contact_preference,
-- vous devez les créer avec ce script :

-- Option 1: Si vous voulez preferred_day (singulier)
-- ALTER TABLE algo_access_requests
-- ADD COLUMN IF NOT EXISTS preferred_day TEXT;

-- Option 2: Si vous voulez preferred_days (pluriel)
-- ALTER TABLE algo_access_requests
-- ADD COLUMN IF NOT EXISTS preferred_days TEXT;

-- Pour time_slots et contact_preference :
-- ALTER TABLE algo_access_requests
-- ADD COLUMN IF NOT EXISTS time_slots TEXT;
-- ALTER TABLE algo_access_requests
-- ADD COLUMN IF NOT EXISTS contact_preference TEXT;

