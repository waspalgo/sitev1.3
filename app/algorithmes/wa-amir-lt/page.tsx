import GlassCard from '@/components/GlassCard';

export default function WaAmirLtPage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          WA-AMIR LT V1 – Long Term
        </h1>
        <p className="text-lg text-text-secondary mb-12">
          WA-AMIR LT V1 est la variante long terme du moteur WA-AMIR. Cette version est
          actuellement en phase d&apos;optimisation interne et n&apos;est pas encore ouverte aux
          clients.
        </p>

        {/* Vision long terme */}
        <section className="mb-12">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Vision long terme</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              WA-AMIR LT V1 est conçu pour des horizons de trading plus longs : plusieurs semaines
              à plusieurs mois. Cette approche diffère de la version court terme par sa fréquence
              de signaux et sa méthode de filtrage.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              La version long terme génère moins de signaux que la version court terme, car elle
              attend des configurations de marché plus structurées et significatives. Les décisions
              sont plus filtrées et nécessitent des conditions plus strictes.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Cette approche est adaptée aux profils qui préfèrent moins d&apos;activité mais des
              positions plus structurées et alignées avec des tendances de marché plus longues.
            </p>
          </GlassCard>
        </section>

        {/* Statut actuel */}
        <section className="mb-12">
          <GlassCard className="p-8 opacity-75">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Statut actuel</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              WA-AMIR LT V1 est actuellement en phase de tests et d&apos;optimisation interne.
              Avant toute ouverture aux clients, nous testons différents scénarios de marché,
              conditions extrêmes et paramètres de risque.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Cette phase d&apos;optimisation permet de s&apos;assurer que la version long terme
              répond aux standards de qualité et de robustesse que nous exigeons pour tous nos
              algorithmes.
            </p>
          </GlassCard>
        </section>

        {/* Actions */}
        <section className="text-center">
          <button
            disabled
            className="px-8 py-4 bg-text-muted/20 text-text-muted rounded-2xl font-semibold cursor-not-allowed opacity-50"
          >
            Accéder à l&apos;algorithme (bientôt disponible)
          </button>
        </section>
      </div>
    </div>
  );
}

