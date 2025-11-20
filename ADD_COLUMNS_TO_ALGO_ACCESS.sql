-- Script SQL pour ajouter les colonnes manquantes à la table algo_access_requests
-- Exécuter ce script dans l'éditeur SQL de Supabase

-- Ajouter la colonne pour les jours préférés (tableau de text)
ALTER TABLE algo_access_requests
ADD COLUMN IF NOT EXISTS revois la structpreferred_days TEXT[];

-- Ajouter la colonne pour les plages horaires (tableau de text)
ALTER TABLE algo_access_requests
ADD COLUMN IF NOT EXISTS time_slots TEXT[];

-- Ajouter la colonne pour le mode de contact préféré (text)
ALTER TABLE algo_access_requests
ADD COLUMN IF NOT EXISTS contact_preference TEXT DEFAULT 'call';

-- Vérifier que les colonnes ont été ajoutées correctement
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'algo_access_requests'
ORDER BY ordinal_position;

