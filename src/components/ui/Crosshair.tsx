import React from 'react';

interface CrosshairProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Crosshair: React.FC<CrosshairProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-6 h-6 text-2xl',
    md: 'w-12 h-12 md:w-20 md:h-20 text-5xl md:text-8xl',
    lg: 'w-16 h-16 md:w-28 md:h-28 text-6xl md:text-9xl',
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <span className="text-[#E4492E] font-bold select-none leading-none animate-pulse">
        ✛
      </span>
    </div>
  );
};
