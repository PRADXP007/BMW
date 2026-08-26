import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { DeepDivePillar } from '../types';

export const ConfiguratorSection: React.FC = () => {
  const { setActiveDeepDive, setIsSpecSheetOpen } = useAppStore();

  const pillars: { id: DeepDivePillar; label: string; subtitle: string }[] = [
    { id: 'POWER', label: 'POWER', subtitle: '1,050 HP HYBRID CALIBRATION' },
    { id: 'ORIGIN', label: 'ORIGIN', subtitle: '3.0 CSL BATMOBILE HERITAGE' },
    { id: 'BEAUTY', label: 'BEAUTY', subtitle: 'DOWNFORCE & AERO FLUIDICS' },
    { id: 'ASYLUM', label: 'ASYLUM', subtitle: 'REDUCED COCKPIT ERGONOMICS' },
    { id: 'OBSESSION', label: 'OBSESSION', subtitle: '7075-T6 BILLET INSTRUMENTATION' },
    { id: 'STRENGTH', label: 'STRENGTH', subtitle: 'AUTOCLAVE CARBON MONOCOQUE' },
  ];

  const handlePillarSelect = (pillar: DeepDivePillar) => {
    soundEngine.playClick(1000);
    setActiveDeepDive(pillar);
  };

  return (
    <section
      id="configurator"
      className="relative w-full h-screen min-h-[750px] bg-[#f0f0f0] text-carbon-black font-mono flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Image of BMW Concept Car */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none">
        <img
          alt="BMW M Concept Car"
          className="w-full h-full object-cover opacity-90 scale-105 filter contrast-110"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeiGxTUpMraXQEX5pP0T76QQQQvFHAyWxteqXh6tJGf721rR1Hs76kCXJTal3UcowEdFpMJ2rtSVon4gSc0R4iUCr0FjIP1McA9II75EPcZDZg4S0Gba1cfst0JUVLQdZGDwL0Hk_9j-PUbn3RIXJSqOxwJHpXyIPo69Up89xA8D-gpzjgFWqLPr8afSJILXdn7pvbjBg5VCeTskN7GfmlMFnCRi3BrdQ1TC3g8KejK_Vzwbz_QbY"
        />
      </div>

      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 border-l border-r border-carbon-black/10 w-[calc(100%-96px)] mx-auto h-full mix-blend-multiply"></div>
      <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-margin-edge w-full">
        <div className="w-full h-px bg-carbon-black/10 mix-blend-multiply"></div>
        <div className="w-full h-px bg-carbon-black/10 mix-blend-multiply"></div>
      </div>

      {/* Top Header Label */}
      <div className="relative z-10 pt-28 px-6 md:px-margin-edge flex justify-between items-center">
        <div className="font-mono text-xs uppercase tracking-widest text-carbon-black/60 font-bold">
          SECTION 03 // ARCHITECTURAL PILLARS
        </div>
        <div className="font-mono text-xs uppercase tracking-widest text-carbon-black/60 hidden sm:block">
          INTERACTIVE TELEMETRY MATRIX
        </div>
      </div>

      {/* Main Content Split: Left Navigation Panel & Right HUD */}
      <div className="relative z-10 flex-grow flex justify-between items-center px-6 md:px-margin-edge">
        {/* Left Navigation Panel */}
        <aside className="w-full max-w-md z-10">
          <ul className="flex flex-col gap-3 md:gap-4">
            {pillars.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => handlePillarSelect(p.id)}
                  className="group flex flex-col text-left transition-all duration-150 cursor-pointer border-none bg-transparent p-0"
                >
                  <span className="font-display text-4xl md:text-5xl lg:text-6xl text-carbon-black uppercase font-bold tracking-tight group-hover:text-m-orange group-hover:translate-x-3 transition-all duration-150">
                    {p.label}
                  </span>
                  <span className="font-mono text-[10px] md:text-xs text-carbon-black/50 uppercase tracking-widest group-hover:text-carbon-black transition-colors pl-1">
                    // {p.subtitle}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Technical Overlays (Right Side) */}
        <div className="hidden lg:flex flex-col gap-8 z-10 text-right opacity-90 pointer-events-none bg-white/60 p-6 backdrop-blur-sm border border-black/10">
          <div className="flex flex-col">
            <span className="font-mono text-xs text-carbon-black/60 uppercase">
              01 // TELEMETRY
            </span>
            <span className="font-mono text-lg text-carbon-black font-bold mt-1">
              AWAITING SYS
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-xs text-carbon-black/60 uppercase">
              02 // AERO FLOW
            </span>
            <span className="font-mono text-lg text-carbon-black font-bold mt-1">
              CONFIG LOCKED
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-xs text-carbon-black/60 uppercase">
              03 // STATUS
            </span>
            <span className="font-mono text-lg text-carbon-black font-bold mt-1 flex items-center justify-end gap-2">
              <span className="w-2.5 h-2.5 bg-m-orange rounded-full animate-pulse"></span>
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-20 px-6 md:px-margin-edge pb-8 flex justify-between items-end">
        <button
          onClick={() => {
            soundEngine.playClick(900);
            setIsSpecSheetOpen(true);
          }}
          className="bg-transparent border-2 border-carbon-black text-carbon-black font-mono text-xs px-6 py-3 uppercase hover:bg-m-orange hover:border-m-orange hover:text-white transition-all duration-150 flex items-center gap-2 cursor-pointer btn-brutalist font-bold tracking-widest"
        >
          <span>DOWNLOAD SPECS</span>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </button>

        <div className="font-mono text-[10px] text-carbon-black/60 uppercase tracking-widest hidden sm:block">
          CLICK ANY PILLAR TO LAUNCH FULL TELEMETRY DEEP-DIVE
        </div>
      </div>
    </section>
  );
};
