-- Script SQL pour ajouter les colonnes de disponibilités
-- ⚠️ IMPORTANT: Ce script peut être exécuté dans l'ÉDITEUR SQL ou via l'interface graphique

-- Étape 1: Supprimer les colonnes incorrectes si elles existent
ALTER TABLE algo_access_requests
DROP COLUMN IF EXISTS preferred_day;

ALTER TABLE algo_access_requests
DROP COLUMN IF EXISTS time_slots;

-- Étape 2: Ajouter les colonnes correctes avec le type TEXT (chaîne de caractères)
-- Colonne pour les jours préférés (texte: "Lundi, Mardi, Mercredi")
ALTER TABLE algo_access_requests
ADD COLUMN IF NOT EXISTS preferred_days TEXT;

-- Colonne pour les plages horaires (texte: "Matin, Après-midi")
ALTER TABLE algo_access_requests
ADD COLUMN IF NOT EXISTS time_slots TEXT;

-- Note: contact_preference est déjà correcte, pas besoin de la modifier

-- Vérification: Afficher toutes les colonnes pour confirmer
SELECT 
    column_name, 
    data_type,
    column_default
FROM information_schema.columns
WHERE table_name = 'algo_access_requests'
    AND column_name IN ('preferred_days', 'time_slots', 'contact_preference')
ORDER BY column_name;

