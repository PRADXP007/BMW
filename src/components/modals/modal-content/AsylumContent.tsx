import React from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';

export const AsylumContent: React.FC = () => {
  const { setIsCommissionOpen, setActiveModal } = useExperienceStore();

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative">
      {/* Left Column: Carbon-fiber bucket seat in Alcantara (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest">
        <img
          alt="Carbon-fiber bucket seat in Alcantara apex mount"
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjdoindOv2da_lEGZCsjiVekymF9M6ze6CDl58wz_lH3H3AreEOwqp0tq0ZrNBBdNvEGoTtYQLIPqFwZUX-a3rDwUVGkb5k8PTw-AfTbMH_etrmGjB0dv_idQOtWQHjw0q3xLwduTMD3Feajg8dJ0LTm4Ey99esA6YlnBWi10R8Clrn6aVrLEX1mJNF4SVmB86O1BvCPedb9xiI1FAdhVHStVdu3zda73x0E3W0Dqzr1kzrON29uQ"
        />
        <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest font-bold">
          SCREEN 10 // CARBON-FIBER BUCKET SEAT IN ALCANTARA
        </div>
      </div>

      {/* Right Column: CNC-machined titanium open-gate shifter & manifesto (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
        <div>
          <div className="mb-6">
            <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
              SCREEN 10 // INTERIOR ERGONOMICS OVERLAY
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
              ASYLUM
            </h1>
          </div>

          <div className="w-full relative mb-6 border border-black/20 p-2 bg-surface-container-low group">
            <div className="absolute top-3 left-3 z-10 font-mono text-[10px] text-white bg-[#0D0D0D] px-2 py-0.5 uppercase font-bold">
              SPECIMEN: CNC 6AL-4V TITANIUM OPEN-GATE SHIFTER
            </div>
            <img
              alt="CNC-machined titanium open-gate sequential shifter macro"
              className="w-full h-auto max-h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZz4q-AA1CdVcwLVZkJbC49EuSlaOnPEVPjV8_Qo_5SJkPIH4CR7Klu41MuhLVM_3Pi3i90o2S9hy5IiblR9jvBitTLObYUKaYwD6hdjEV1G3ndjlUthV1Yn8_DNDcnmc5dtxqPhNeFBddXIdR3dBTDXhDCm2DKBJ1j1uUDOGpCEFGD15GsxPZbR8WHO_r2uK-8t9JcqMLpN-X5PAGT1kvHj24zZRk49-mcaFDlyT_MprmkhL5K3s"
            />
            <div className="mt-2 flex justify-between items-center text-[10px] text-[#0D0D0D]/60 uppercase font-mono px-1 font-bold">
              <span>CNC MILLED 6AL-4V TITANIUM</span>
              <span>TOLERANCE: ±0.01MM</span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs md:text-sm leading-relaxed">
            <p className="font-bold">
              The "Asylum" interior philosophy represents a radical departure from conventional luxury. It is an exercise in extreme ergonomic reductionism. Every surface, switch, and material choice has been scrutinized and stripped of decorative intent.
            </p>
            <p className="text-[#0D0D0D]/75">
              Primary controls are clustered in a central nexus milled from a single billet of aircraft-grade aluminum. The open-gated titanium gear selector requires deliberate, mechanical actuation, providing auditory and tactile confirmation of every shift.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-black/15 flex justify-between items-center">
          <span className="text-[10px] text-[#0D0D0D]/60 uppercase">
            SEAT RAILS: DELETED // DIRECT BOLT APEX MOUNT
          </span>
          <button
            onClick={() => {
              setActiveModal(null);
              setIsCommissionOpen(true);
            }}
            className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
          >
            CUSTOMIZE CABIN &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};
