import React, { useState, useEffect, useRef } from 'react';
import { useSoundEngine } from '../../hooks/useSoundEngine';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ManifestoSplit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ABOUT' | 'MANIACS' | 'MISSION' | 'MACHINE'>('MISSION');
  const { playClick } = useSoundEngine();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const tabs: ('ABOUT' | 'MANIACS' | 'MISSION' | 'MACHINE')[] = [
    'ABOUT',
    'MANIACS',
    'MISSION',
    'MACHINE',
  ];

  const editorialContent = {
    MISSION: {
      title: 'MISSION',
      subtitle: 'WHEN WE FORGED THE M DIVISION, WE PROMISED NEVER TO BE SANE.',
      tag: 'TOO FAR GONE',
      figTitle: 'FIG. 01 // AERO DYNAMICS SCULPTURE',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAouaBP91RSXSQDVi9yjNfvMbpykxSZNfuVEZilx2TVbUsuTeoUlDgh5RRJ9AI8xCKgLyBwyZU69tpT0xb01jZGy2jySiaVai-SF7rEnQNZ00AD9ecJx8uM5-zW5YgoOi-gqECqo3TZet69210vFLv_W--54cU-jhdeVt7yZvje6lRatulsmxV0KsHhe4lLV5dgUwm_Q2yTHGTI_mZYwfITKy_zk2VB4xENeSwiYZ1_zAmXOnXRIi0',
      p1: 'The mandate was simple: construct a division unburdened by conventional logic. We do not build vehicles for transportation; we engineer kinetic anomalies. Every chassis, every combustion chamber, every strand of carbon fiber is subjected to an obsessive refinement process that borders on the pathological.',
      p2: 'We operate in the sterile, high-contrast zone between control and chaos. The telemetry does not lie. The physics are non-negotiable. This is Skunkworks philosophy applied to tarmac—a relentless pursuit of dynamic perfection that leaves no room for compromise.',
    },
    ABOUT: {
      title: 'ORIGIN // ABOUT',
      subtitle: 'ESTABLISHED 1972 IN GARCHING, MUNICH.',
      tag: 'GENESIS 01',
      figTitle: 'FIG. 02 // HISTORIC BATMOBILE TELEMETRY',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc2x1OLSH-GhRKGKmGmLtAtxDRnrznXX0KXEoKgs96y40GOwsIkFrhUPep19xmXaFUmEhZ5Jq45LfMJcd2fXomjydeZk7wslMPZzAb8kvntJ32oFWB0jgAvwsbRbSo9Lyng7QZnrouLzQDO4EhWCK5STPrFEhgPWUe6E1ibX5ORUSfGBNy7R7VHB9K4W20d090cHKaHXdN-hNPQisIQDmgbsBIXHDj2q5MPTYcu6LyettRj4jj8xE',
      p1: 'Conceived as a dedicated motorsport skunkworks by BMW Motorsport GmbH in 1972, the initial racing division broke every conventional production rule to dominate European touring championships and Le Mans 24 Hours.',
      p2: 'The 3.0 CSL Batmobile pioneered lightweight aluminum panels, plexiglass windows, and radical aerodynamic wings that set the benchmark for high-speed downforce engineering.',
    },
    MANIACS: {
      title: 'THE PILOTS',
      subtitle: 'THE MEN AND WOMEN WHO CALIBRATE AT THE LIMIT.',
      tag: 'HUMAN KINETICS',
      figTitle: 'FIG. 03 // VINTAGE 1976 LE MANS PITS',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNa42TgyI6e-WnuGekxO2aYpvHBJw89wGR8M-09HkO8LkD1JPIQncq3Zv-M6NYGTFkWD1IcsFjTtFkaX41VoDD7l566VhhBtF_t3dFETlltBcDoPz-XhpiRqJOjwvWvkPUGbpyiug9u7owscYtIDdAk27JlqiSSY0y9UQBapQvG-lE-80xbYc3ZvqjSe1-GEbxZRzxgETsKQFvsNDMJyccnoGb8V86RYLpg_xps8w8w-QEknP2lYw',
      p1: 'Behind the carbon tub and the telemetry streams sit the drivers who dare to hold the throttle wide open through Eau Rouge and the Nordschleife. Sensory deprivation meets high-G load factor.',
      p2: 'Every pedal movement, steering micro-correction, and heart-rate surge is logged into our neural telemetry database to refine vehicle dynamic response curves.',
    },
    MACHINE: {
      title: 'MACHINE',
      subtitle: 'TITANIUM, PRE-PREG AUTOCLAVE CARBON, PURE COMBUSTION.',
      tag: '1,050 HP HYBRID',
      figTitle: 'FIG. 04 // CNC TITANIUM GATED SHIFTER',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZz4q-AA1CdVcwLVZkJbC49EuSlaOnPEVPjV8_Qo_5SJkPIH4CR7Klu41MuhLVM_3Pi3i90o2S9hy5IiblR9jvBitTLObYUKaYwD6hdjEV1G3ndjlUthV1Yn8_DNDcnmc5dtxqPhNeFBddXIdR3dBTDXhDCm2DKBJ1j1uUDOGpCEFGD15GsxPZbR8WHO_r2uK-8t9JcqMLpN-X5PAGT1kvHj24zZRk49-mcaFDlyT_MprmkhL5K3s',
      p1: 'A twin-turbocharged 4.4L flat-plane crank V8 paired with an axial-flux electric motor delivering 1,050 horsepower through a 6AL-4V open-gated titanium manual transmission.',
      p2: 'Zero synthetic filter. Direct mechanical tactile coupling between engine flywheel, differential locking clutch, and pilot hands.',
    },
  };

  const current = editorialContent[activeTab];

  useEffect(() => {
    if (headlineRef.current) {
      const split = new SplitType(headlineRef.current, {
        types: 'chars',
        charClass: 'manifesto-char inline-block',
      });

      gsap.fromTo(
        split.chars,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 0.8,
          ease: 'power4.out',
        }
      );

      return () => split.revert();
    }
  }, [activeTab]);

  const handleTabChange = (tab: 'ABOUT' | 'MANIACS' | 'MISSION' | 'MACHINE') => {
    playClick(900);
    setActiveTab(tab);
  };

  return (
    <section
      ref={sectionRef}
      id="manifesto-view"
      className="relative min-h-screen w-full flex flex-col md:flex-row font-mono select-none"
    >
      {/* Left Column: w-1/2, h-screen, sticky top-0 */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0 relative flex flex-col justify-end p-6 md:p-margin-edge bg-surface-container-lowest overflow-hidden z-20">
        <div className="absolute inset-0 z-0">
          <img
            alt="Racing driver portrait in technical cockpit"
            className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity filter contrast-125 scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXuoS9pHU9IhKijZ8EBKgl7XgNaFat9vizNtQg77pkPLXeWfRwgd2MZmqPXV16ibljHHqTRLsN6LxHMEFHi4zPxO5Pn70hzcVNi1oaXnb_RDkcDb-T2EZ3D1mcxlnl1I6j4fetwZr8mObNVlAnKqWAxDkfTIAlBGD93n75ol5h2dWk_qCr0YMxAYo4Fhj1soUhzXvrH4C1PeVXLC76naUD-0WqK_m3AeIuZCNYcGS8olLszwwVn00"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-dim via-surface-dim/40 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col gap-3 md:gap-4 pb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`text-left font-display uppercase tracking-tight transition-all duration-150 cursor-pointer ${
                activeTab === tab
                  ? 'text-4xl md:text-6xl text-white pl-2 border-l-4 border-[#E4492E]'
                  : 'text-2xl md:text-4xl text-on-surface-variant/40 hover:text-white/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: w-1/2, scrollable container on #FFFFFF */}
      <div className="w-full md:w-1/2 min-h-screen bg-[#FFFFFF] text-[#0D0D0D] flex flex-col justify-between p-6 md:p-margin-edge pt-24 md:pt-28 z-10">
        <div>
          <div className="mb-6 overflow-hidden">
            <h1
              ref={headlineRef}
              className="font-display text-6xl md:text-8xl tracking-tight uppercase leading-none text-[#0D0D0D] mb-2 overflow-hidden"
            >
              {current.title}
            </h1>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/60 max-w-md font-bold">
              {current.subtitle}
            </h2>
          </div>

          <div className="w-full my-6 border-2 border-[#0D0D0D] p-2 relative bg-white shadow-xl">
            <div className="absolute -top-3 left-3 bg-[#0D0D0D] text-white px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-widest">
              {current.figTitle}
            </div>
            <img
              alt="Editorial feature illustration"
              className="w-full h-auto max-h-[340px] object-cover grayscale contrast-125 brightness-95"
              src={current.img}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 mt-6">
            <div>
              <span className="font-mono text-[11px] text-white bg-[#E4492E] px-2.5 py-1 inline-block uppercase tracking-widest font-bold">
                {current.tag}
              </span>
            </div>
            <div className="font-mono text-xs md:text-sm text-[#0D0D0D]/80 leading-relaxed space-y-4 font-normal">
              <p>{current.p1}</p>
              <p>{current.p2}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-black/15 flex justify-between items-center text-[10px] text-[#0D0D0D]/50 uppercase font-mono">
          <span>DOC REF // SKW-M-MISSION-V4</span>
          <span>ARCHIVED AT MUNICH GARCHING</span>
        </div>
      </div>
    </section>
  );
};
