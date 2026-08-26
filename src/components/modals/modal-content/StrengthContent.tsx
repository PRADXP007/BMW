import React from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';

export const StrengthContent: React.FC = () => {
  const { setIsCommissionOpen, setActiveModal } = useExperienceStore();

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative">
      {/* Left Column: Pre-preg autoclave carbon monocoque rear subframe (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest flex items-center justify-center p-6">
        <img
          alt="Pre-preg autoclave carbon-fiber monocoque rear subframe"
          className="w-full h-full object-cover filter contrast-125"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyyMcfsMfK68xsrLFkOxTMj1ZVD1mHivP8E33A86kZMPnjVdMLr6z15h6C3zQKohZkjkvG3Lw7lzLyAmZDUJfzLh2hEF8O8mtejejp92G61Bt-4cbSFabt_p0p_LGMgYXkgQHwZPbCHIx_xyT4m7bsY8gtTs4jg_kCtXRE22jFE7ygFCvyEcFp2iwizudPRNsNvFSs2ipAsDdd61_rMbnISCW9g5tj4gzE-pWyCNZCJ1hI0mGOYNE"
        />
        <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest font-bold">
          SCREEN 12 // PRE-PREG AUTOCLAVE MONOCOQUE REAR SUBFRAME
        </div>
      </div>

      {/* Right Column: Top-down pushrod suspension and titanium header exhaust system (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
        <div>
          <div className="mb-6">
            <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
              SCREEN 12 // STRUCTURAL ENGINEERING OVERLAY
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
              STRENGTH
            </h1>
          </div>

          <div className="w-full flex justify-center mb-6 border border-black/20 p-2 bg-white shadow-md">
            <img
              alt="Top-down pushrod suspension and titanium header exhaust system"
              className="max-h-[260px] object-contain mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdu4cKlEhMpAk8EsASD4yxCQOao6DAG6vyhqQdlX2VzAPrsR36kPPLadvHT2Qi6cLtBC1Z4RbtY8qXPX2P7A0E_wBL4ErssE4Mfvwc_rAoWMMcO9COqmXtqYRtDFRp79nAhWZ-up5Ij5uk1wJvL_SOUnHQui332UZFo73Hl28_UD4xIgGGnmhpDMt-bSZcfZi8ymG_F0P2CMDVFfQL8B6-ZEy8KxurmbFzLJNerJRmcU6m57uoMEU"
            />
          </div>

          <div className="space-y-3 font-mono text-xs md:text-sm leading-relaxed border-l-4 border-[#E4492E] pl-4">
            <p className="font-bold">
              The structural integrity of the chassis represents a paradigm shift in material science applied to high-performance telemetry. By utilizing aerospace-grade autoclave carbon-fiber for the rear subframe, rigidity is increased by 47% while unsprung mass is aggressively reduced.
            </p>
            <p className="text-[#0D0D0D]/75">
              Coupled with titanium exhaust headers and motorsport-spec adjustable coilover suspension components, the assembly delivers raw, unfiltered kinetic feedback directly to the operator.
            </p>

            <ul className="mt-4 space-y-1.5 font-mono text-xs font-bold">
              <li className="flex items-center gap-3">
                <span className="text-[#E4492E]">01</span>
                <span>AUTOCLAVE CARBON-FIBER MONOCOQUE (45,000 NM/DEG)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E4492E]">02</span>
                <span>TITANIUM EXHAUST MANIFOLD WITH DUAL SCROLL TURBOS</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E4492E]">03</span>
                <span>PUSHROD MULTI-WAY MOTORSPORT DAMPERS</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-black/15 flex justify-between items-center">
          <span className="text-[10px] text-[#0D0D0D]/60 uppercase">
            HORSEPOWER: 1,050 HP // WEIGHT: 1,840 LBS
          </span>
          <button
            onClick={() => {
              setActiveModal(null);
              setIsCommissionOpen(true);
            }}
            className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
          >
            CONFIGURE POWERTRAIN &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};
