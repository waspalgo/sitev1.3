import { ReactNode } from 'react';

interface FeatureRowProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureRow({ icon, title, description }: FeatureRowProps) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-primary/20 border border-purple-accent/30 flex items-center justify-center text-purple-accent group-hover:bg-purple-primary/30 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}








