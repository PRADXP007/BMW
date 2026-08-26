import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { ArrowLeft, Plus } from 'lucide-react';

export const DeepDiveModal: React.FC = () => {
  const { activeDeepDive, setActiveDeepDive, setIsCommissionOpen } = useAppStore();

  if (!activeDeepDive) return null;

  const handleClose = () => {
    soundEngine.playClick(600);
    setActiveDeepDive(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-carbon-black/90 backdrop-blur-xl flex justify-center items-center overflow-hidden font-mono animate-fadeIn">
      {/* 50/50 Split Brutalist Layout */}
      <div className="w-full h-full flex flex-col md:flex-row relative">
        {/* ======================= 1. ORIGIN / HERITAGE ======================= */}
        {activeDeepDive === 'ORIGIN' && (
          <>
            {/* Left Side: Weathered Collage (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center filter contrast-125 grayscale"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAc2x1OLSH-GhRKGKmGmLtAtxDRnrznXX0KXEoKgs96y40GOwsIkFrhUPep19xmXaFUmEhZ5Jq45LfMJcd2fXomjydeZk7wslMPZzAb8kvntJ32oFWB0jgAvwsbRbSo9Lyng7QZnrouLzQDO4EhWCK5STPrFEhgPWUe6E1ibX5ORUSfGBNy7R7VHB9K4W20d090cHKaHXdN-hNPQisIQDmgbsBIXHDj2q5MPTYcu6LyettRj4jj8xE')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-carbon-black/30 mix-blend-multiply"></div>
              <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest">
                LOG REF: LE MANS 1976 // 3.0 CSL
              </div>
            </div>

            {/* Right Side: Content Area (50% Pure White for Brutalist Shift) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-panel-white text-carbon-black relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                {/* Header & Back Button */}
                <div className="flex justify-between items-start mb-6">
                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-carbon-black">
                    ORIGIN
                  </h1>
                  <button
                    onClick={handleClose}
                    className="bg-m-orange text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-carbon-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* Media Grid */}
                <div className="w-full aspect-video relative overflow-hidden bg-carbon-black mb-6 border border-carbon-black/20">
                  <img
                    alt="Vintage BMW 3.0 CSL racing in pits"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNa42TgyI6e-WnuGekxO2aYpvHBJw89wGR8M-09HkO8LkD1JPIQncq3Zv-M6NYGTFkWD1IcsFjTtFkaX41VoDD7l566VhhBtF_t3dFETlltBcDoPz-XhpiRqJOjwvWvkPUGbpyiug9u7owscYtIDdAk27JlqiSSY0y9UQBapQvG-lE-80xbYc3ZvqjSe1-GEbxZRzxgETsKQFvsNDMJyccnoGb8V86RYLpg_xps8w8w-QEknP2lYw"
                  />
                  <div className="absolute bottom-2 left-2 bg-white text-carbon-black text-[10px] px-2 py-0.5 font-bold uppercase">
                    FIG 01 // 1976 24 HOURS OF LE MANS
                  </div>
                </div>

                {/* Body Copy */}
                <article className="flex flex-col gap-3 max-w-2xl">
                  <div className="font-mono text-xs text-m-orange uppercase tracking-widest border-b-2 border-carbon-black pb-1 mb-1 font-bold">
                    01 // HERITAGE_DATA_LOG
                  </div>
                  <p className="font-mono text-xs md:text-sm leading-relaxed font-bold text-carbon-black">
                    UNFILTERED NOSTALGIA. RAW TELEMETRY. THE ESSENCE OF MOTORSPORT DNA DISTILLED INTO ALUMINUM AND OIL. BEFORE THE ERA OF ASSISTANCE SYSTEMS, THERE WAS ONLY THE DRIVER, THE MACHINE, AND THE APEX. THIS IS THE BLUEPRINT OF PERFORMANCE.
                  </p>
                  <p className="font-mono text-xs text-carbon-black/70 leading-relaxed">
                    ANALYZE THE HISTORICAL DATA STREAMS. EVERY SCAR ON THE CHASSIS IS A RECORD OF VELOCITY. WE DO NOT RESTORE; WE PRESERVE THE VIOLENCE OF COMPETITION.
                  </p>
                </article>
              </div>

              {/* Commission CTA button */}
              <div className="mt-8 pt-4 border-t border-carbon-black/20 flex justify-between items-center">
                <span className="text-[10px] text-carbon-black/60 uppercase">
                  CLASSIFICATION: SECRET // BMW M SKUNKWORKS
                </span>
                <button
                  onClick={() => {
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-carbon-black text-white px-4 py-2 text-xs uppercase font-bold hover:bg-m-orange transition-colors"
                >
                  COMMISSION SPEC &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======================= 2. BEAUTY / AERODYNAMICS ======================= */}
        {activeDeepDive === 'BEAUTY' && (
          <>
            {/* Left Side: Full Bleed Image (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest">
              <img
                alt="Close-up of white BMW front fascia with carbon splitter"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-opacity duration-700 hover:opacity-100 hover:grayscale-0 filter contrast-125"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAWUaPB1HVcE9ym34ampjiAxXxV6ohygj1GnThPKfSFfE56NWdbAVCaaoCkToWwZh1i3lBJ6R5xe-xwUcY413fsP06WbZzaCyP_1lfC0_iv2iYUvXTIDREja-wkUqozBxw-4fnKasG1GjWoY0-algzqwvv3zO0D65fY0gtmaVPQ4-BErHJ3TheX126eFeHuzT5kCDE3OtWoxG5X6MYXaly65ozNKZPu78zNXTMv-jIQ96RgrzS_cY"
              />
              <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest">
                AERO RIGIDITY: 890 KG DOWNFORCE @ 240 KM/H
              </div>
            </div>

            {/* Right Side: Content Canvas (50% Pure White) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-panel-white text-carbon-black relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-carbon-black">
                    BEAUTY
                  </h1>
                  <button
                    onClick={handleClose}
                    className="bg-m-orange text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-carbon-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* Framed Rear Aero Image */}
                <div className="w-full aspect-[16/9] bg-surface-container-low mb-6 border-2 border-carbon-black relative overflow-hidden group">
                  <img
                    alt="Rear aero ground-effects tunnel and quad exhaust"
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa8W2BqgKJlHkS5DEJk8waKO4hCNYg0pF1Ws2ilquLD8Iana7U_JqFSucaOCKeV7zcE2IC-MtMRAgbJRTTCjU-mXKakI1UH_yD8G5V-qIcXV96dAaXIBYn2Q1996YXjvOuUPwdn3J9YpjSuDBpKlz-VsLHQ5KFFrlIGmGgGmbx9hcUaRkaDLRbP4qs9YH4FeRZ-neI2Wbj0r4WK1OePB_fH8UDPdWjK4EK7FSJdNvb_ChoYyQ9vOk"
                  />
                  <div className="absolute bottom-2 left-2 bg-white text-carbon-black font-mono text-[10px] px-2 py-0.5 uppercase font-bold">
                    FIG 01 // REAR AERO DIFFUSER TUNNEL
                  </div>
                </div>

                {/* Body Copy */}
                <div className="font-mono text-xs md:text-sm text-carbon-black space-y-3 leading-relaxed">
                  <p className="font-bold">
                    01 // The sculpting of DOWNFORCE is not merely a technical requirement; it is the physical manifestation of aerodynamic truth. Every surface, every intake, and every trailing edge is mathematically defined to manipulate airflow, minimizing drag while maximizing vertical load.
                  </p>
                  <p className="text-carbon-black/70">
                    02 // VORTEX GENERATION is weaponized at the leading edges, channeling high-pressure air through the structural cavities to feed the active aerodynamic systems. Form does not follow function; form IS function.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-carbon-black/20 flex justify-between items-center">
                <span className="text-[10px] text-carbon-black/60 uppercase">
                  DRAG COEFFICIENT: CD 0.28 // ACTIVE DRS FLAPS
                </span>
                <button
                  onClick={() => {
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-carbon-black text-white px-4 py-2 text-xs uppercase font-bold hover:bg-m-orange transition-colors"
                >
                  SELECT AERO &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======================= 3. ASYLUM / INTERIOR ======================= */}
        {activeDeepDive === 'ASYLUM' && (
          <>
            {/* Left Side: Carbon Tub Macro (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest">
              <img
                alt="Carbon shell alcantara bucket seat mount"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjdoindOv2da_lEGZCsjiVekymF9M6ze6CDl58wz_lH3H3AreEOwqp0tq0ZrNBBdNvEGoTtYQLIPqFwZUX-a3rDwUVGkb5k8PTw-AfTbMH_etrmGjB0dv_idQOtWQHjw0q3xLwduTMD3Feajg8dJ0LTm4Ey99esA6YlnBWi10R8Clrn6aVrLEX1mJNF4SVmB86O1BvCPedb9xiI1FAdhVHStVdu3zda73x0E3W0Dqzr1kzrON29uQ"
              />
              <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest">
                INT_001.RAW // CARBON SHELL / ALCANTARA BUCKET SEAT
              </div>
            </div>

            {/* Right Side: Content Area (50% Pure White) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-panel-white text-carbon-black relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-carbon-black">
                    ASYLUM
                  </h1>
                  <button
                    onClick={handleClose}
                    className="bg-m-orange text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-carbon-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* Macro Specimen: Titanium Gear Selector */}
                <div className="w-full relative mb-6 border border-carbon-black/20 p-2 bg-surface-container-low group">
                  <div className="absolute top-3 left-3 z-10 font-mono text-[10px] text-white bg-carbon-black px-2 py-0.5 uppercase font-bold">
                    SPECIMEN: CNC 6AL-4V TITANIUM GATED SELECTOR
                  </div>
                  <img
                    alt="Titanium gear selector macro"
                    className="w-full h-auto max-h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZz4q-AA1CdVcwLVZkJbC49EuSlaOnPEVPjV8_Qo_5SJkPIH4CR7Klu41MuhLVM_3Pi3i90o2S9hy5IiblR9jvBitTLObYUKaYwD6hdjEV1G3ndjlUthV1Yn8_DNDcnmc5dtxqPhNeFBddXIdR3dBTDXhDCm2DKBJ1j1uUDOGpCEFGD15GsxPZbR8WHO_r2uK-8t9JcqMLpN-X5PAGT1kvHj24zZRk49-mcaFDlyT_MprmkhL5K3s"
                  />
                  <div className="mt-2 flex justify-between items-center text-[10px] text-carbon-black/60 uppercase font-mono px-1">
                    <span>CNC MILLED 6AL-4V</span>
                    <span>TOLERANCE: ±0.01MM</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3 font-mono text-xs md:text-sm leading-relaxed">
                  <p className="font-bold">
                    The "Asylum" interior philosophy represents a radical departure from conventional luxury. It is an exercise in extreme ergonomic reductionism. Every surface, switch, and material choice has been scrutinized and stripped of decorative intent.
                  </p>
                  <p className="text-carbon-black/70">
                    Primary controls are clustered in a central nexus milled from a single billet of aircraft-grade aluminum. The open-gated titanium gear selector requires deliberate, mechanical actuation, providing auditory and tactile confirmation of every shift.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-carbon-black/20 flex justify-between items-center">
                <span className="text-[10px] text-carbon-black/60 uppercase">
                  SEAT RAILS: DELETED // DIRECT BOLT APEX MOUNT
                </span>
                <button
                  onClick={() => {
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-carbon-black text-white px-4 py-2 text-xs uppercase font-bold hover:bg-m-orange transition-colors"
                >
                  CUSTOMIZE CABIN &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======================= 4. OBSESSION / INSTRUMENTATION ======================= */}
        {activeDeepDive === 'OBSESSION' && (
          <>
            {/* Left Side: 3-Pod Analog Telemetry (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest flex items-center justify-center p-6">
              <div className="relative w-full max-w-[500px] aspect-[0.75]">
                <img
                  alt="3-pod analog instrument cluster with orange needles"
                  className="w-full h-full object-cover filter contrast-125 shadow-2xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsBjVBQepBpsXRh3ZxzdHRvVo55x0oF7zpbxijiwICKFgLgO22Ud4YyHXr6EYBb60Icyzglp14qLC-MH22dOM1ILjmFj0R3qecGjGT-qfFsEvOw2NsoUDh7GVZL-vpyQ9SrFCx1Bc_4qh_6jNAFmfpFwUd2j16n09LZOe_EANIreCKskahfhe_zYanmFTONbv6jl_65dVUHd1t0qfJkF3ugtJtzuTQ5nizsHeaTAkOhp9kAT_l-s0"
                />
              </div>
              <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest">
                TELEMETRY POD // ANALOG NEEDLES + ORANGE PHOSPHOR
              </div>
            </div>

            {/* Right Side: Pedal Assembly & Precision Telemetry (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-panel-white text-carbon-black relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-carbon-black">
                    OBSESSION
                  </h1>
                  <button
                    onClick={handleClose}
                    className="bg-m-orange text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-carbon-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* Pedal Assembly Schematic Frame */}
                <div className="border-2 border-carbon-black p-3 relative mb-6 bg-white">
                  <div className="absolute top-2 left-2 bg-m-orange text-white px-2 py-0.5 font-mono text-[10px] uppercase font-bold">
                    FIG 02 // 7075-T6 BILLET PEDAL BOX
                  </div>
                  <img
                    alt="Floor-mounted CNC billet aluminum adjustable racing pedal assembly"
                    className="w-full h-auto max-h-[260px] object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_xXBrfxu8Jlmebg3n_qUyHQ8TNcdx5XxBQcUNaNs_0zrmKN0qvRoCSC7MkJZq-mkJGwAig0oR6vEWcvAn46RSnRcJBUE3lo4dJsdOtZldHG5Gv4wse30d1_XzG-3DADLDTLUEtUhaX82u-TAudkW_4d4J9Vb66iUtS_RKCG9p-y9MZ-8PuJG_gDY_YcS79EqUO3kgeZdsZZwDlOhSiinrUaaoPXehNC97jzpGCqvLZud4qA5v4gQ"
                  />
                </div>

                {/* Body copy */}
                <div className="space-y-3 font-mono text-xs md:text-sm leading-relaxed">
                  <p className="font-bold">
                    The raw connection between pilot and machine demands the elimination of latency. The billet aluminum pedal assembly represents absolute mechanical singularity. Every structural millimeter exists to transmit force with zero flex.
                  </p>
                  <p className="text-carbon-black/70">
                    Tolerances are held to aerospace standards. The pivot points utilize sealed spherical bearings, rejecting the ambiguity of traditional bushings. This is high-fidelity telemetry transferred through the sole of the boot.
                  </p>
                </div>

                {/* Data block specs */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-carbon-black/20">
                  <div>
                    <span className="text-[10px] text-carbon-black/60 uppercase block">MATERIAL</span>
                    <span className="font-display text-xl uppercase">7075-T6 BILLET ALUM</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-carbon-black/60 uppercase block">TRAVEL</span>
                    <span className="font-display text-xl uppercase">42MM CALIBRATED</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-carbon-black/20 flex justify-between items-center">
                <span className="text-[10px] text-carbon-black/60 uppercase">
                  CLEARANCE: OMEGA // 12,000 RPM REDLINE LIMIT
                </span>
                <button
                  onClick={() => {
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-carbon-black text-white px-4 py-2 text-xs uppercase font-bold hover:bg-m-orange transition-colors"
                >
                  CALIBRATE COCKPIT &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======================= 5. STRENGTH / POWER / ENGINEERING ======================= */}
        {(activeDeepDive === 'STRENGTH' || activeDeepDive === 'POWER') && (
          <>
            {/* Left Side: Titanium Headers & Pushrod Suspension (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-surface-container-lowest flex items-center justify-center p-6">
              <img
                alt="Titanium exhaust headers and pushrod coilover suspension"
                className="w-full h-full object-cover filter contrast-125"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyyMcfsMfK68xsrLFkOxTMj1ZVD1mHivP8E33A86kZMPnjVdMLr6z15h6C3zQKohZkjkvG3Lw7lzLyAmZDUJfzLh2hEF8O8mtejejp92G61Bt-4cbSFabt_p0p_LGMgYXkgQHwZPbCHIx_xyT4m7bsY8gtTs4jg_kCtXRE22jFE7ygFCvyEcFp2iwizudPRNsNvFSs2ipAsDdd61_rMbnISCW9g5tj4gzE-pWyCNZCJ1hI0mGOYNE"
              />
              <div className="absolute bottom-6 left-6 z-10 text-white text-xs bg-black/80 px-3 py-1 uppercase tracking-widest">
                HEAT-BLUED EQUAL-LENGTH TITANIUM HEADERS // INCONEL 625
              </div>
            </div>

            {/* Right Side: Structural Rigidity & Autoclave Monocoque (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-panel-white text-carbon-black relative flex flex-col justify-between overflow-y-auto p-6 md:p-margin-edge">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase m-0 leading-none tracking-tight text-carbon-black">
                    {activeDeepDive}
                  </h1>
                  <button
                    onClick={handleClose}
                    className="bg-m-orange text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-carbon-black transition-colors duration-200 cursor-pointer border-none font-bold btn-brutalist flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                </div>

                {/* Subframe schematic */}
                <div className="w-full flex justify-center mb-6 border border-carbon-black/20 p-2 bg-white">
                  <img
                    alt="Pre-preg autoclave carbon fiber monocoque subframe"
                    className="max-h-[260px] object-contain mix-blend-multiply"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdu4cKlEhMpAk8EsASD4yxCQOao6DAG6vyhqQdlX2VzAPrsR36kPPLadvHT2Qi6cLtBC1Z4RbtY8qXPX2P7A0E_wBL4ErssE4Mfvwc_rAoWMMcO9COqmXtqYRtDFRp79nAhWZ-up5Ij5uk1wJvL_SOUnHQui332UZFo73Hl28_UD4xIgGGnmhpDMt-bSZcfZi8ymG_F0P2CMDVFfQL8B6-ZEy8KxurmbFzLJNerJRmcU6m57uoMEU"
                  />
                </div>

                {/* Body Copy */}
                <div className="space-y-3 font-mono text-xs md:text-sm leading-relaxed border-l-4 border-m-orange pl-4">
                  <p className="font-bold">
                    The structural integrity of the chassis represents a paradigm shift in material science applied to high-performance telemetry. By utilizing aerospace-grade autoclave carbon-fiber for the rear subframe, rigidity is increased by 47% while unsprung mass is aggressively reduced.
                  </p>
                  <p className="text-carbon-black/70">
                    Coupled with titanium exhaust headers and motorsport-spec adjustable coilover suspension components, the assembly delivers raw, unfiltered kinetic feedback directly to the operator.
                  </p>

                  <ul className="mt-4 space-y-1.5 font-mono text-xs">
                    <li className="flex items-center gap-3">
                      <span className="text-m-orange font-bold">01</span>
                      <span className="font-bold">AUTOCLAVE CARBON-FIBER MONOCOQUE (45,000 NM/DEG)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-m-orange font-bold">02</span>
                      <span className="font-bold">TITANIUM EXHAUST MANIFOLD WITH DUAL SCROLL TURBOS</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-m-orange font-bold">03</span>
                      <span className="font-bold">PUSHROD MULTI-WAY MOTORSPORT DAMPERS</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-carbon-black/20 flex justify-between items-center">
                <span className="text-[10px] text-carbon-black/60 uppercase">
                  HORSEPOWER: 1,050 HP // WEIGHT: 1,840 LBS
                </span>
                <button
                  onClick={() => {
                    handleClose();
                    setIsCommissionOpen(true);
                  }}
                  className="bg-carbon-black text-white px-4 py-2 text-xs uppercase font-bold hover:bg-m-orange transition-colors"
                >
                  CONFIGURE POWERTRAIN &gt;&gt;
                </button>
              </div>
            </div>
          </>
        )}

        {/* Global Floating Action Button for modal interaction */}
        <button
          onClick={() => {
            soundEngine.playPneumatic();
            handleClose();
            setIsCommissionOpen(true);
          }}
          className="fixed right-6 md:right-margin-edge top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-m-orange text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(228,73,46,0.8)] z-50 cursor-pointer group"
          title="Commission This Spec"
        >
          <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
