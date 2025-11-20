import Image from 'next/image';

export default function WaspLogo({ className = 'w-[160px] h-[160px] md:w-48 md:h-48' }: { className?: string }) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <Image
        src="/waspalgo-logo.svg"
        alt="WASPALGO Logo"
        width={192}
        height={192}
        className="drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}
