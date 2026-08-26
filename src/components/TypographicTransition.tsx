import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { Target } from 'lucide-react';

export const TypographicTransition: React.FC = () => {
  const { setIsCommissionOpen } = useAppStore();

  return (
    <section className="relative min-h-screen w-full bg-[#E5E5E5] text-carbon-black flex flex-col items-center justify-center pt-20 pb-28 px-6 md:px-margin-edge overflow-hidden select-none">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-30 pointer-events-none"></div>

      {/* Typographic Hero Canvas */}
      <main className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center font-display z-20 relative mix-blend-difference text-surface-dim">
        <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-carbon-black uppercase">
          DESCEND INTO
        </h1>
        <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-carbon-black uppercase">
          MADNESS
        </h1>

        <div className="flex items-center justify-center gap-3 md:gap-6 m-0 p-0">
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-carbon-black uppercase">
            WITH
          </h1>
          <Target className="w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 text-m-orange stroke-[2.5] animate-spin-slow" />
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-carbon-black uppercase">
            YOUR
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4 m-0 p-0">
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-carbon-black uppercase">
            BMW
          </h1>
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-m-orange uppercase">
            01
          </h1>
        </div>
      </main>

      {/* Car Reveal Rising from Bottom */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[85vw] max-w-5xl h-[32vh] z-10 pointer-events-none bg-contain bg-no-repeat bg-top"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida/AEtjO1WNw2wzi59fFbtUf0dRNO1EENsMPZPi_Jl2UB5F9aVTV6getQTEfuaSm61tFeaqdFQKtaolclBNclP2oMuTWZo-5STrK_r91pb6ajOKxJ5vW_OnIOk82IBp5vQC15KookF4HW5XssuHkLYgrfl7tYiab8iAXJdWLBf2QZW7TkAbdipSv6LMRkuXXuQpU_hnmU00rbP--4teD0gJJYg2zEHq-PJf4W9PmhBYcW-4bzNHdOaJVQBHI3tL')`,
          maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
        }}
      ></div>

      {/* Fixed Bottom Commission Drawer Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-m-orange h-16 md:h-20 flex items-center justify-between px-6 md:px-margin-edge z-40 shadow-2xl border-t border-white/20">
        <span className="font-mono text-xs md:text-sm text-white uppercase tracking-widest font-bold">
          COMMISSION YOUR M-PROJECT // 01
        </span>
        <button
          onClick={() => {
            soundEngine.playPneumatic();
            setIsCommissionOpen(true);
          }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-carbon-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer border-none shadow-lg group"
        >
          <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">
            add
          </span>
        </button>
      </div>
    </section>
  );
};
