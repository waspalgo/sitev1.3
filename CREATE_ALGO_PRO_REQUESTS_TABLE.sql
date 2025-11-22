-- ============================================
-- SCHÉMA DE LA TABLE Supabase pour WA-AMIR ST V1 PRO
-- ============================================
-- 
-- Cette table stocke les demandes d'accès à la version pro de l'algorithme
-- WA-AMIR ST V1 PRO.
-- Structure identique à algo_access_requests
--
-- Instructions :
-- 1. Ouvrez le SQL Editor dans Supabase
-- 2. Copiez-collez ce script complet
-- 3. Exécutez le script pour créer la table
--
-- ============================================

-- Créer la table (structure identique à algo_access_requests)
CREATE TABLE IF NOT EXISTS algo_pro_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  algorithm TEXT NOT NULL DEFAULT 'WA-AMIR ST V1 PRO',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT,
  country TEXT,
  capital_range TEXT,
  experience_level TEXT,
  expectations TEXT,
  risk_acknowledged BOOLEAN,
  info_confirmed BOOLEAN,
  preferred_days TEXT,
  time_slots TEXT,
  contact_preference TEXT DEFAULT 'call',
  newsletter_consent TEXT DEFAULT 'NO',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Créer les index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_algo_pro_requests_created_at ON algo_pro_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_algo_pro_requests_email ON algo_pro_requests(email);
CREATE INDEX IF NOT EXISTS idx_algo_pro_requests_algorithm ON algo_pro_requests(algorithm);

-- Commentaires sur les colonnes
COMMENT ON TABLE algo_pro_requests IS 'Stocke les demandes d''accès à WA-AMIR ST V1 PRO (structure identique à algo_access_requests)';
COMMENT ON COLUMN algo_pro_requests.id IS 'Identifiant unique de la demande';
COMMENT ON COLUMN algo_pro_requests.algorithm IS 'Nom de l''algorithme (par défaut: WA-AMIR ST V1 PRO)';
COMMENT ON COLUMN algo_pro_requests.first_name IS 'Prénom du demandeur';
COMMENT ON COLUMN algo_pro_requests.last_name IS 'Nom du demandeur';
COMMENT ON COLUMN algo_pro_requests.email IS 'Adresse e-mail du demandeur';
COMMENT ON COLUMN algo_pro_requests.whatsapp_number IS 'Numéro WhatsApp du demandeur';
COMMENT ON COLUMN algo_pro_requests.country IS 'Pays de résidence';
COMMENT ON COLUMN algo_pro_requests.capital_range IS 'Fourchette de capital envisagé';
COMMENT ON COLUMN algo_pro_requests.experience_level IS 'Niveau d''expérience (beginner, intermediate, advanced)';
COMMENT ON COLUMN algo_pro_requests.expectations IS 'Attentes du demandeur (texte libre)';
COMMENT ON COLUMN algo_pro_requests.risk_acknowledged IS 'Acceptation du risque (true/false)';
COMMENT ON COLUMN algo_pro_requests.info_confirmed IS 'Confirmation de l''exactitude des informations (true/false)';
COMMENT ON COLUMN algo_pro_requests.preferred_days IS 'Jours préférés (format: "lundi, mardi")';
COMMENT ON COLUMN algo_pro_requests.time_slots IS 'Plages horaires préférées (format: "matin, après-midi")';
COMMENT ON COLUMN algo_pro_requests.contact_preference IS 'Préférence de contact (call ou documentation)';
COMMENT ON COLUMN algo_pro_requests.newsletter_consent IS 'Consentement newsletter (YES ou NO)';
COMMENT ON COLUMN algo_pro_requests.created_at IS 'Date et heure de création de la demande';

-- ============================================
-- FIN DU SCRIPT
-- ============================================
