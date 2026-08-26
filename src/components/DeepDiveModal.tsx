import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { DeepDivePillar } from '../types';
import { ArrowLeft, Plus } from 'lucide-react';

export const DeepDiveModal: React.FC = () => {
  const { activeDeepDive, setActiveDeepDive, setIsCommissionOpen } = useAppStore();

  if (!activeDeepDive) return null;

  const cycleSequence: DeepDivePillar[] = ['ORIGIN', 'BEAUTY', 'ASYLUM', 'OBSESSION', 'STRENGTH'];

  const handleNextCyclic = () => {
    soundEngine.playClick(1300, 0.4);
    const currentIndex = cycleSequence.indexOf(activeDeepDive);
    const nextIndex = (currentIndex + 1) % cycleSequence.length;
    setActiveDeepDive(cycleSequence[nextIndex]);
  };

  const handleClose = () => {
    soundEngine.playClick(600, 0);
    setActiveDeepDive(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl flex justify-center items-center overflow-hidden font-mono animate-fadeIn">
      {/* 50/50 Split-Screen Modal Overlay Container */}
      <div className="w-full h-full flex flex-col md:flex-row relative">
        {/* ======================= SCREEN 08: ORIGIN (HERITAGE) ======================= */}
        {activeDeepDive === 'ORIGIN' && (
          <>
            {/* Left Side: Vintage 1970s BMW 3.0 CSL racing collage (50%) */}
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

            {/* Right Side: Le Mans archive photos, brutalist heritage copy, and orange BACK button (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
                      SCREEN 08 // HERITAGE OVERLAY
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
                      ORIGIN
                    </h1>
                  </div>

                  {/* Orange BACK button exits to base viewport */}
                  <button
                    onClick={handleClose}
                    className="bg-[#E4492E] text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2 shadow-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* Media Grid: Le Mans archive photos */}
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

                {/* Brutalist Heritage Copy */}
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

              {/* Bottom Meta */}
              <div className="mt-8 pt-4 border-t border-black/15 flex justify-between items-center">
                <span className="text-[10px] text-[#0D0D0D]/60 uppercase">
                  CLASSIFICATION: SECRET // BMW M SKUNKWORKS
                </span>
                <button
                  onClick={() => {
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
                >
                  COMMISSION SPEC &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======================= SCREEN 09: BEAUTY (AERODYNAMICS) ======================= */}
        {activeDeepDive === 'BEAUTY' && (
          <>
            {/* Left Side: Front fascia laser headlight macro crop (50%) */}
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

            {/* Right Side: Rear ground-effect diffuser details and aerodynamic airflow editorial copy (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
                      SCREEN 09 // AERODYNAMICS OVERLAY
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
                      BEAUTY
                    </h1>
                  </div>

                  {/* Orange BACK button */}
                  <button
                    onClick={handleClose}
                    className="bg-[#E4492E] text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2 shadow-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* Framed Rear Ground-Effect Diffuser Details */}
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

                {/* Aerodynamic Airflow Editorial Copy */}
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
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
                >
                  SELECT AERO &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======================= SCREEN 10: ASYLUM (INTERIOR) ======================= */}
        {activeDeepDive === 'ASYLUM' && (
          <>
            {/* Left Side: Carbon-fiber bucket seat in Alcantara (50%) */}
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

            {/* Right Side: CNC-machined titanium open-gate sequential shifter and driver ergonomic manifesto (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
                      SCREEN 10 // INTERIOR ERGONOMICS OVERLAY
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
                      ASYLUM
                    </h1>
                  </div>

                  {/* Orange BACK button */}
                  <button
                    onClick={handleClose}
                    className="bg-[#E4492E] text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2 shadow-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* CNC-machined Titanium Open-Gate Sequential Shifter */}
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

                {/* Driver Ergonomic Manifesto */}
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
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
                >
                  CUSTOMIZE CABIN &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======================= SCREEN 11: OBSESSION (INSTRUMENTATION) ======================= */}
        {activeDeepDive === 'OBSESSION' && (
          <>
            {/* Left Side: 3-pod analog gauge cluster binnacle (50%) */}
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

            {/* Right Side: CNC billet triple pedal box assembly and tactile engineering specs (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
                      SCREEN 11 // INSTRUMENTATION OVERLAY
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
                      OBSESSION
                    </h1>
                  </div>

                  {/* Orange BACK button */}
                  <button
                    onClick={handleClose}
                    className="bg-[#E4492E] text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2 shadow-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* CNC Billet Triple Pedal Box Assembly Frame */}
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

                {/* Tactile Engineering Specs Copy */}
                <div className="space-y-3 font-mono text-xs md:text-sm leading-relaxed">
                  <p className="font-bold">
                    The raw connection between pilot and machine demands the elimination of latency. The billet aluminum pedal assembly represents absolute mechanical singularity. Every structural millimeter exists to transmit force with zero flex.
                  </p>
                  <p className="text-[#0D0D0D]/75">
                    Tolerances are held to aerospace standards. The pivot points utilize sealed spherical bearings, rejecting the ambiguity of traditional bushings. This is high-fidelity telemetry transferred through the sole of the boot.
                  </p>
                </div>

                {/* Data block specs */}
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
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
                >
                  CALIBRATE COCKPIT &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======================= SCREEN 12: STRENGTH / POWER (AUTOCLAVE ENGINEERING) ======================= */}
        {(activeDeepDive === 'STRENGTH' || activeDeepDive === 'POWER') && (
          <>
            {/* Left Side: Pre-preg autoclave carbon monocoque rear subframe (50%) */}
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

            {/* Right Side: Top-down pushrod suspension and titanium header exhaust system (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F5F5F7] text-[#0D0D0D] relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block">
                      SCREEN 12 // STRUCTURAL ENGINEERING OVERLAY
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-[#0D0D0D] font-bold">
                      STRENGTH
                    </h1>
                  </div>

                  {/* Orange BACK button */}
                  <button
                    onClick={handleClose}
                    className="bg-[#E4492E] text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2 shadow-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* Top-down pushrod suspension & subframe visual */}
                <div className="w-full flex justify-center mb-6 border border-black/20 p-2 bg-white shadow-md">
                  <img
                    alt="Top-down pushrod suspension and titanium header exhaust system"
                    className="max-h-[260px] object-contain mix-blend-multiply"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdu4cKlEhMpAk8EsASD4yxCQOao6DAG6vyhqQdlX2VzAPrsR36kPPLadvHT2Qi6cLtBC1Z4RbtY8qXPX2P7A0E_wBL4ErssE4Mfvwc_rAoWMMcO9COqmXtqYRtDFRp79nAhWZ-up5Ij5uk1wJvL_SOUnHQui332UZFo73Hl28_UD4xIgGGnmhpDMt-bSZcfZi8ymG_F0P2CMDVFfQL8B6-ZEy8KxurmbFzLJNerJRmcU6m57uoMEU"
                  />
                </div>

                {/* Engineering Copy */}
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
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-[#0D0D0D] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#E4492E] transition-colors"
                >
                  CONFIGURE POWERTRAIN &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* Modal Controls: Right-Side Persistent Orange + Button (Navigates Cyclically: 08 -> 09 -> 10 -> 11 -> 12 -> 08) */}
        <button
          onClick={handleNextCyclic}
          className="fixed right-6 md:right-margin-edge top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#E4492E] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_35px_rgba(228,73,46,0.9)] z-50 cursor-pointer group border-2 border-white/40"
          title="Next Deep Dive Specification (08 -> 09 -> 10 -> 11 -> 12 -> 08)"
        >
          <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300 text-white" />
        </button>
      </div>
    </div>
  );
};
