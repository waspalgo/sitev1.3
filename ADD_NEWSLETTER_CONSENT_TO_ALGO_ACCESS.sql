-- Ajouter la colonne newsletter_consent à la table algo_access_requests
-- Cette colonne stocke le consentement de l'utilisateur pour recevoir la newsletter
-- Valeurs possibles : 'YES' ou 'NO' (par défaut 'NO')

ALTER TABLE algo_access_requests
ADD COLUMN IF NOT EXISTS newsletter_consent TEXT DEFAULT 'NO';

-- Commentaire sur la colonne pour documentation
COMMENT ON COLUMN algo_access_requests.newsletter_consent IS 'Consentement pour recevoir la newsletter et les informations de WASPALGO (YES/NO)';

