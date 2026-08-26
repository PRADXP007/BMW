import React from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';

export const BeautyContent: React.FC = () => {
  const { setIsCommissionOpen, setActiveModal } = useExperienceStore();

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative">
      {/* Left Column: Front fascia laser headlight macro crop (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest">
        <img
          alt="Front fascia laser headlight macro crop with carbon splitter"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-opacity duration-700 hover:opacity-100 hover:grayscale-0 filter contrast-125"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAWUaPB1HVcE9ym34ampjiAxXxV6ohygj1GnThPKfSFfE56NWdbAVCaaoCkToWwZh1i3lBJ6R5xe-xwUcY413fsP06WbZzaCyP_1lfC0_iv2iYUvXTIDREja-wkUqozBxw-4fnKasG1GjWoY0-algzqwvv3zO0D65fY0gtmaVPQ4-BErHJ3TheX126eFeHuzT5kCDE3OtWoxG5X6MYXaly65ozNKZPu78zNXTMv-jIQ96RgrzS_cY"
        />
        <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest font-bold">
          SCREEN 09 // FRONT FASCIA LASER HEADLIGHT MACRO CROP
        </div>
      </div>

      {/* Right Column: Rear ground-effect diffuser & aerodynamic airflow copy (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
        <div>
          <div className="mb-6">
            <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
              SCREEN 09 // AERODYNAMICS OVERLAY
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
              BEAUTY
            </h1>
          </div>

          <div className="w-full aspect-[16/9] bg-surface-container-low mb-6 border-2 border-black relative overflow-hidden group">
            <img
              alt="Rear ground-effect diffuser and central quad exhaust pipes"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa8W2BqgKJlHkS5DEJk8waKO4hCNYg0pF1Ws2ilquLD8Iana7U_JqFSucaOCKeV7zcE2IC-MtMRAgbJRTTCjU-mXKakI1UH_yD8G5V-qIcXV96dAaXIBYn2Q1996YXjvOuUPwdn3J9YpjSuDBpKlz-VsLHQ5KFFrlIGmGgGmbx9hcUaRkaDLRbP4qs9YH4FeRZ-neI2Wbj0r4WK1OePB_fH8UDPdWjK4EK7FSJdNvb_ChoYyQ9vOk"
            />
            <div className="absolute bottom-2 left-2 bg-white text-black font-mono text-[10px] px-2 py-0.5 uppercase font-bold">
              FIG 01 // REAR GROUND-EFFECT DIFFUSER DETAILS
            </div>
          </div>

          <div className="font-mono text-xs md:text-sm text-[#0D0D0D] space-y-3 leading-relaxed">
            <p className="font-bold">
              01 // The sculpting of DOWNFORCE is not merely a technical requirement; it is the physical manifestation of aerodynamic truth. Every surface, every intake, and every trailing edge is mathematically defined to manipulate airflow, minimizing drag while maximizing vertical load.
            </p>
            <p className="text-[#0D0D0D]/75">
              02 // VORTEX GENERATION is weaponized at the leading edges, channeling high-pressure air through the structural cavities to feed the active aerodynamic systems. Form does not follow function; form IS function.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-black/15 flex justify-between items-center">
          <span className="text-[10px] text-[#0D0D0D]/60 uppercase">
            DRAG COEFFICIENT: CD 0.28 // ACTIVE DRS FLAPS
          </span>
          <button
            onClick={() => {
              setActiveModal(null);
              setIsCommissionOpen(true);
            }}
            className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
          >
            SELECT AERO &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};
