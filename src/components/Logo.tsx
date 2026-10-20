import React from 'react';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'white' | 'monochrome';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showWordmark = true,
  size = 'md',
  variant = 'primary',
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-16 h-16',
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  const subTextSize = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.35em]',
    xl: 'text-sm tracking-[0.4em]',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Athletic BF Monogram Shield */}
      <div className={`relative ${iconDimensions} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(190,242,100,0.3)]"
          aria-label="Be Fit Fitness Club Logo Emblem"
        >
          <defs>
            <linearGradient id="limeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9F99D" />
              <stop offset="50%" stopColor="#BEF264" />
              <stop offset="100%" stopColor="#84CC16" />
            </linearGradient>
            <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>

          {/* Outer Athletic Hexagon Frame */}
          <polygon
            points="50,4 92,25 92,75 50,96 8,75 8,25"
            fill="#0F1115"
            stroke="url(#limeGradient)"
            strokeWidth="4"
          />

          {/* Inner Geometric "B" & "F" Angular Strokes */}
          {/* Stem of B and F */}
          <path
            d="M32 24 H48 C58 24 64 28 64 36 C64 42 59 46 51 47 C61 48 67 53 67 62 C67 72 58 76 46 76 H32 Z"
            fill="none"
            stroke="url(#metalGradient)"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Electric Lime Central Athletic Accent Bar */}
          <path
            d="M44 48 L76 48"
            stroke="url(#limeGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Top F horizontal bar */}
          <path
            d="M48 24 L78 24"
            stroke="url(#limeGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Clean Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-athletic font-extrabold uppercase text-white whitespace-nowrap ${textSize}`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            BE FIT
          </span>
          <span
            className={`font-semibold uppercase text-[#BEF264] font-mono whitespace-nowrap ${subTextSize}`}
          >
            FITNESS CLUB
          </span>
        </div>
      )}
    </div>
  );
};
