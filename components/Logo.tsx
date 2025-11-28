import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center aspect-square h-full">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-current filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Outer Hexagon C Shape */}
          <path d="M 75 18 L 25 18 L 5 50 L 25 82 L 75 82" />
          
          {/* The Key Shape */}
          <circle cx="45" cy="50" r="12" strokeWidth="5" />
          <path d="M 57 50 L 95 50" strokeWidth="5" />
          <path d="M 75 50 L 75 62" strokeWidth="5" />
          <path d="M 85 50 L 85 58" strokeWidth="5" />
        </svg>
      </div>
      {showText && (
        <span className="font-mono text-xl font-bold tracking-[0.2em] text-current">CIPHER<span className="text-xs align-top ml-1 opacity-50">®</span></span>
      )}
    </div>
  );
};