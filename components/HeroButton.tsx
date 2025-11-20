import Link from 'next/link';

interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function HeroButton({ href, children }: HeroButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-100 relative"
      style={{
        boxShadow: '0 0 0 2px rgba(168, 85, 247, 0.3), 0 4px 12px rgba(168, 85, 247, 0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.4), 0 6px 16px rgba(168, 85, 247, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(168, 85, 247, 0.3), 0 4px 12px rgba(168, 85, 247, 0.2)';
      }}
    >
      {children}
    </Link>
  );
}

