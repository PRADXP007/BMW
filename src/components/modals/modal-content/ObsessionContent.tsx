import React from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';

export const ObsessionContent: React.FC = () => {
  const { setIsCommissionOpen, setActiveModal } = useExperienceStore();

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative">
      {/* Left Column: 3-pod analog gauge cluster binnacle (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest flex items-center justify-center p-6">
        <div className="relative w-full max-w-[500px] aspect-[0.75]">
          <img
            alt="3-pod analog gauge cluster binnacle with orange illuminated needles"
            className="w-full h-full object-cover filter contrast-125 shadow-2xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsBjVBQepBpsXRh3ZxzdHRvVo55x0oF7zpbxijiwICKFgLgO22Ud4YyHXr6EYBb60Icyzglp14qLC-MH22dOM1ILjmFj0R3qecGjGT-qfFsEvOw2NsoUDh7GVZL-vpyQ9SrFCx1Bc_4qh_6jNAFmfpFwUd2j16n09LZOe_EANIreCKskahfhe_zYanmFTONbv6jl_65dVUHd1t0qfJkF3ugtJtzuTQ5nizsHeaTAkOhp9kAT_l-s0"
          />
        </div>
        <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest font-bold">
          SCREEN 11 // 3-POD ANALOG GAUGE CLUSTER BINNACLE
        </div>
      </div>

      {/* Right Column: CNC billet triple pedal box assembly & specs (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
        <div>
          <div className="mb-6">
            <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
              SCREEN 11 // INSTRUMENTATION OVERLAY
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
              OBSESSION
            </h1>
          </div>

          <div className="border-2 border-black p-3 relative mb-6 bg-white shadow-md">
            <div className="absolute top-2 left-2 bg-[#E4492E] text-white px-2 py-0.5 font-mono text-[10px] uppercase font-bold">
              FIG 02 // CNC BILLET TRIPLE PEDAL BOX ASSEMBLY
            </div>
            <img
              alt="Floor-mounted CNC billet aluminum adjustable racing pedal assembly"
              className="w-full h-auto max-h-[260px] object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_xXBrfxu8Jlmebg3n_qUyHQ8TNcdx5XxBQcUNaNs_0zrmKN0qvRoCSC7MkJZq-mkJGwAig0oR6vEWcvAn46RSnRcJBUE3lo4dJsdOtZldHG5Gv4wse30d1_XzG-3DADLDTLUEtUhaX82u-TAudkW_4d4J9Vb66iUtS_RKCG9p-y9MZ-8PuJG_gDY_YcS79EqUO3kgeZdsZZwDlOhSiinrUaaoPXehNC97jzpGCqvLZud4qA5v4gQ"
            />
          </div>

          <div className="space-y-3 font-mono text-xs md:text-sm leading-relaxed">
            <p className="font-bold">
              The raw connection between pilot and machine demands the elimination of latency. The billet aluminum pedal assembly represents absolute mechanical singularity. Every structural millimeter exists to transmit force with zero flex.
            </p>
            <p className="text-[#0D0D0D]/75">
              Tolerances are held to aerospace standards. The pivot points utilize sealed spherical bearings, rejecting the ambiguity of traditional bushings. This is high-fidelity telemetry transferred through the sole of the boot.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-black/20">
            <div>
              <span className="text-[10px] text-[#0D0D0D]/60 uppercase block font-bold">MATERIAL</span>
              <span className="font-display text-xl uppercase font-bold">7075-T6 BILLET ALUM</span>
            </div>
            <div>
              <span className="text-[10px] text-[#0D0D0D]/60 uppercase block font-bold">TRAVEL</span>
              <span className="font-display text-xl uppercase font-bold">42MM CALIBRATED</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-black/15 flex justify-between items-center">
          <span className="text-[10px] text-[#0D0D0D]/60 uppercase">
            CLEARANCE: OMEGA // 12,000 RPM REDLINE LIMIT
          </span>
          <button
            onClick={() => {
              setActiveModal(null);
              setIsCommissionOpen(true);
            }}
            className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
          >
            CALIBRATE COCKPIT &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};
