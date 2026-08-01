import React from 'react';

interface ZilaTechLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'full';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ZilaTechLogo: React.FC<ZilaTechLogoProps> = ({
  className = '',
  variant = 'full',
  showTagline = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-base', tagline: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', tagline: 'text-[11px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', tagline: 'text-xs' }
  }[size];

  const textColor = variant === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Folding Z/T Polygon Mark matching official Zila Tech branding */}
      <div className={`relative ${sizeClasses.icon} shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Polygon Facet 1: Top Left Electric Cyan */}
          <path d="M10 15 L60 15 L40 45 L10 45 Z" fill="#38BDF8" />
          {/* Polygon Facet 2: Top Right Cobalt Blue */}
          <path d="M60 15 L95 15 L75 45 L40 45 Z" fill="#2563EB" />
          {/* Polygon Facet 3: Lower Vertical Diagonal Indigo */}
          <path d="M40 45 L75 45 L50 90 L25 90 Z" fill="#4F46E5" />
          {/* Polygon Facet 4: Accent Cyan Highlight */}
          <path d="M50 90 L80 65 L60 65 Z" fill="#60A5FA" opacity="0.9" />
        </svg>
      </div>

      {/* Wordmark with stylized 'Λ' and 'E' */}
      <div>
        <div className={`font-black tracking-wider uppercase font-sans leading-none flex items-center gap-1 ${sizeClasses.text} ${textColor}`}>
          <span>ZIL</span>
          <span className="text-[#2563EB] font-serif">Λ</span>
          <span className="ml-1.5">T</span>
          <span className="text-[#2563EB] font-mono">E</span>
          <span>CH</span>
        </div>
        {showTagline && (
          <div className={`font-black text-[#2563EB] tracking-wide font-sans mt-0.5 ${sizeClasses.tagline}`}>
            Your Tech Ally
          </div>
        )}
      </div>
    </div>
  );
};
