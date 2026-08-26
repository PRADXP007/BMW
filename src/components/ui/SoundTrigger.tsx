import React from 'react';
import { Volume2 } from 'lucide-react';

interface SoundTriggerProps {
  isPlaying?: boolean;
  onClick: () => void;
  className?: string;
}

export const SoundTrigger: React.FC<SoundTriggerProps> = ({
  isPlaying = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isPlaying}
      className={`font-mono text-xs uppercase px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-200 cursor-pointer shadow-2xl ${
        isPlaying
          ? 'bg-[#E4492E] text-white scale-110 shadow-[0_0_45px_rgba(228,73,46,0.9)] animate-pulse'
          : 'bg-[#131313]/90 text-white hover:bg-[#E4492E] hover:text-white border border-white/25 shadow-xl'
      } ${className}`}
    >
      <span className="font-bold tracking-widest">
        {isPlaying ? 'THROTTLE ENGAGED...' : 'ENGINE SOUND 🔊'}
      </span>
      <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-spin text-white' : 'text-[#E4492E]'}`} />
    </button>
  );
};
