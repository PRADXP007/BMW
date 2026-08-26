import React from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { useSoundEngine } from '../../hooks/useSoundEngine';
import { Plus } from 'lucide-react';

export const BottomDrawer: React.FC = () => {
  const { setIsCommissionOpen } = useExperienceStore();
  const { playPneumatic } = useSoundEngine();

  const handleOpenCommission = () => {
    playPneumatic();
    setIsCommissionOpen(true);
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#E4492E] h-16 md:h-20 flex items-center justify-between px-6 md:px-margin-edge z-40 shadow-2xl border-t border-white/20">
      <div>
        <span className="font-display text-lg md:text-2xl text-white uppercase tracking-wider font-bold block leading-none">
          COMMISSION YOUR M-PROJECT // 01
        </span>
        <span className="font-mono text-[9px] md:text-[10px] text-white/80 uppercase tracking-widest hidden sm:inline">
          BESPOKE SKUNKWORKS DIVISION CHASSIS ALLOCATION PROTOCOL
        </span>
      </div>

      <button
        onClick={handleOpenCommission}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer border border-white/30 shadow-lg group"
        title="Open Commission Studio"
      >
        <Plus className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </footer>
  );
};
