import React from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';

export const OriginContent: React.FC = () => {
  const { setIsCommissionOpen, setActiveModal } = useExperienceStore();

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative">
      {/* Left Column: Vintage 1970s BMW 3.0 CSL racing collage (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center filter contrast-125 grayscale"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAc2x1OLSH-GhRKGKmGmLtAtxDRnrznXX0KXEoKgs96y40GOwsIkFrhUPep19xmXaFUmEhZ5Jq45LfMJcd2fXomjydeZk7wslMPZzAb8kvntJ32oFWB0jgAvwsbRbSo9Lyng7QZnrouLzQDO4EhWCK5STPrFEhgPWUe6E1ibX5ORUSfGBNy7R7VHB9K4W20d090cHKaHXdN-hNPQisIQDmgbsBIXHDj2q5MPTYcu6LyettRj4jj8xE')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
        <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest font-bold">
          SCREEN 08 // VINTAGE 1970S 3.0 CSL BATMOBILE COLLAGE
        </div>
      </div>

      {/* Right Column: Le Mans archive photos, brutalist heritage copy (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
        <div>
          <div className="mb-6">
            <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
              SCREEN 08 // HERITAGE OVERLAY
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
              ORIGIN
            </h1>
          </div>

          <div className="w-full aspect-video relative overflow-hidden bg-black mb-6 border border-black/20">
            <img
              alt="Vintage BMW 3.0 CSL Le Mans archive photo"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNa42TgyI6e-WnuGekxO2aYpvHBJw89wGR8M-09HkO8LkD1JPIQncq3Zv-M6NYGTFkWD1IcsFjTtFkaX41VoDD7l566VhhBtF_t3dFETlltBcDoPz-XhpiRqJOjwvWvkPUGbpyiug9u7owscYtIDdAk27JlqiSSY0y9UQBapQvG-lE-80xbYc3ZvqjSe1-GEbxZRzxgETsKQFvsNDMJyccnoGb8V86RYLpg_xps8w8w-QEknP2lYw"
            />
            <div className="absolute bottom-2 left-2 bg-white text-black text-[10px] px-2 py-0.5 font-bold uppercase">
              FIG 01 // 1976 24 HOURS OF LE MANS ARCHIVE
            </div>
          </div>

          <article className="flex flex-col gap-3 max-w-2xl">
            <div className="font-mono text-xs text-[#E4492E] uppercase tracking-widest border-b-2 border-[#0D0D0D] pb-1 mb-1 font-bold">
              01 // HERITAGE_DATA_LOG
            </div>
            <p className="font-mono text-xs md:text-sm leading-relaxed font-bold text-[#0D0D0D]">
              UNFILTERED NOSTALGIA. RAW TELEMETRY. THE ESSENCE OF MOTORSPORT DNA DISTILLED INTO ALUMINUM AND OIL. BEFORE THE ERA OF ASSISTANCE SYSTEMS, THERE WAS ONLY THE DRIVER, THE MACHINE, AND THE APEX. THIS IS THE BLUEPRINT OF PERFORMANCE.
            </p>
            <p className="font-mono text-xs text-[#0D0D0D]/75 leading-relaxed">
              ANALYZE THE HISTORICAL DATA STREAMS. EVERY SCAR ON THE CHASSIS IS A RECORD OF VELOCITY. WE DO NOT RESTORE; WE PRESERVE THE VIOLENCE OF COMPETITION.
            </p>
          </article>
        </div>

        <div className="mt-8 pt-4 border-t border-black/15 flex justify-between items-center">
          <span className="text-[10px] text-[#0D0D0D]/60 uppercase">
            CLASSIFICATION: SECRET // BMW M SKUNKWORKS
          </span>
          <button
            onClick={() => {
              setActiveModal(null);
              setIsCommissionOpen(true);
            }}
            className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
          >
            COMMISSION SPEC &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};
