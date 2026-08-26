import React, { useRef, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { useAppStore } from '../store/useAppStore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ChassisHero: React.FC = () => {
  const { setActiveDeepDive } = useAppStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const monocoqueRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLHeadingElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !monocoqueRef.current) return;

    // Continuous floating kinetics
    const floatAnim = gsap.to(monocoqueRef.current, {
      y: -15,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Pinned ScrollTrigger with Spec Sync
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.8,
        },
      });

      // Split flanking typography outwards
      tl.to(
        textLeftRef.current,
        {
          x: -140,
          opacity: 0.25,
          ease: 'power1.out',
        },
        0
      );

      tl.to(
        textRightRef.current,
        {
          x: 140,
          opacity: 0.25,
          ease: 'power1.out',
        },
        0
      );

      // Monocoque rotation and zoom sync
      tl.to(
        monocoqueRef.current,
        {
          scale: 1.15,
          y: -25,
          rotationZ: -2,
          ease: 'power2.out',
        },
        0
      );

      // Telemetry metrics highlight scrub
      if (telemetryRef.current) {
        const metrics = telemetryRef.current.querySelectorAll('.telemetry-metric');
        tl.fromTo(
          metrics,
          { opacity: 0.9, y: 0 },
          { opacity: 1, y: -6, stagger: 0.1, color: '#E4492E', ease: 'power1.out' },
          0.2
        );
      }
    }, sectionRef);

    return () => {
      floatAnim.kill();
      ctx.revert();
    };
  }, []);

  const handleScrollDown = () => {
    soundEngine.playClick(600);
    const showroom = document.querySelector('#showroom');
    if (showroom) {
      showroom.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="chassis-view"
      className="relative w-full h-screen min-h-[750px] bg-[#EBEBEB] text-[#0D0D0D] font-mono flex flex-col justify-between overflow-hidden pt-20 select-none"
    >
      {/* Background Studio Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-60 pointer-events-none"></div>

      {/* SVG Steel Hanging Cables (1px vertical steel cables) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
        {/* Cable Left Suspension Point */}
        <line x1="38%" y1="0" x2="42%" y2="46%" stroke="#131313" strokeWidth="1" strokeDasharray="3,1" />
        {/* Cable Right Suspension Point */}
        <line x1="62%" y1="0" x2="58%" y2="46%" stroke="#131313" strokeWidth="1" strokeDasharray="3,1" />
        {/* Rear Tension Cable */}
        <line x1="50%" y1="0" x2="50%" y2="38%" stroke="#E4492E" strokeWidth="1" />
      </svg>

      {/* Flanking Monumental Typography: Left "BMW" pinned left with opacity: 0.9 */}
      <div className="absolute left-4 md:left-margin-edge top-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <h2
          ref={textLeftRef}
          className="font-display text-[120px] md:text-[200px] lg:text-[240px] leading-none text-[#0D0D0D] opacity-90 m-0 p-0 tracking-tighter select-none"
        >
          BMW
        </h2>
      </div>

      {/* Flanking Monumental Typography: Right "01" pinned right with opacity: 0.9 */}
      <div className="absolute right-4 md:right-margin-edge top-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <h2
          ref={textRightRef}
          className="font-display text-[120px] md:text-[200px] lg:text-[240px] leading-none text-[#0D0D0D] opacity-90 m-0 p-0 tracking-tighter select-none"
        >
          01
        </h2>
      </div>

      {/* Central Suspended Bare Carbon-Fiber Monocoque Chassis */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-grow flex justify-center items-center px-4">
        <div
          ref={monocoqueRef}
          className="relative group cursor-pointer"
          onClick={() => {
            soundEngine.playClick(1000, 0);
            setActiveDeepDive('STRENGTH');
          }}
        >
          <img
            alt="Suspended bare carbon-fiber monocoque chassis structure"
            className="w-full max-h-[55vh] md:max-h-[62vh] object-contain filter contrast-125 drop-shadow-[0_30px_45px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvASlu7BWm0tDb2STi5EWk26qJAO93r5rLWAhWc4UaDXKbYwaCeUhlKi3So0AbtCOYVINGd88OEJfxTVpN_owCTWmKHg3LBwNA4EzSLYa4l9iIb2NwXyed-H8oD7mokRQYuKhsrHX2K6FrnRTmU4WOmQeZoG3tceftNfb_QBUzq_YU3iuW1rG-Ok2L02-452nc8xa_Iy-Bvper2HwYCMf5dLweVp-oyiqV5NjoNcrMtB6w6FKXypQ"
          />
          {/* Interactive Inspection Tag */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#0D0D0D] text-white font-mono text-[10px] uppercase px-3 py-1 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            [ CLICK TO INSPECT CARBON MONOCOQUE ]
          </div>
        </div>
      </div>

      {/* Center-Right Spec Callout Block */}
      <div className="absolute right-6 lg:right-[12%] top-[28%] max-w-xs z-20 hidden md:flex flex-col items-start bg-white/85 backdrop-blur-md p-5 border border-black/10 shadow-xl">
        <span className="font-mono text-[11px] text-[#E4492E] uppercase mb-2 tracking-widest border-b border-[#E4492E]/30 pb-1 font-bold">
          Spec. // MN-CQ-001
        </span>
        <h1 className="font-display text-3xl lg:text-4xl text-[#0D0D0D] uppercase leading-[0.95] mb-3 font-bold">
          LESS IS MORE,<br />MORE IS LESS.
        </h1>
        <button
          onClick={() => {
            soundEngine.playClick(1100, 0.2);
            setActiveDeepDive('ORIGIN');
          }}
          className="font-mono text-xs text-[#0D0D0D] border-b-2 border-[#0D0D0D] pb-0.5 hover:text-[#E4492E] hover:border-[#E4492E] transition-colors duration-150 inline-flex items-center gap-1 group font-bold cursor-pointer"
        >
          <span>EXPLORE HERITAGE</span>
          <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </button>
      </div>

      {/* Telemetry Table: 2-Column / 4-Column Grid with Italic Display Metrics */}
      <div ref={telemetryRef} className="relative z-20 w-full px-6 md:px-margin-edge pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t-2 border-[#0D0D0D] pt-4 max-w-3xl">
          {/* Metric 1 */}
          <div className="telemetry-metric flex flex-col">
            <span className="font-display italic text-4xl md:text-5xl text-[#0D0D0D] leading-none tracking-tight font-bold">
              1,840
            </span>
            <span className="font-mono text-[10px] md:text-xs text-[#656464] uppercase mt-1 tracking-wider font-bold">
              WEIGHT (LBS)
            </span>
          </div>

          {/* Metric 2 */}
          <div className="telemetry-metric flex flex-col">
            <span className="font-display italic text-4xl md:text-5xl text-[#E4492E] leading-none tracking-tight font-bold">
              2.4
            </span>
            <span className="font-mono text-[10px] md:text-xs text-[#656464] uppercase mt-1 tracking-wider font-bold">
              SECONDS (0-60)
            </span>
          </div>

          {/* Metric 3 */}
          <div className="telemetry-metric flex flex-col">
            <span className="font-display italic text-4xl md:text-5xl text-[#0D0D0D] leading-none tracking-tight font-bold">
              12,000
            </span>
            <span className="font-mono text-[10px] md:text-xs text-[#656464] uppercase mt-1 tracking-wider font-bold">
              RPM LIMIT
            </span>
          </div>

          {/* Metric 4 */}
          <div className="telemetry-metric flex flex-col">
            <span className="font-display italic text-4xl md:text-5xl text-[#0D0D0D] leading-none tracking-tight font-bold">
              1,050
            </span>
            <span className="font-mono text-[10px] md:text-xs text-[#656464] uppercase mt-1 tracking-wider font-bold">
              HORSEPOWER
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Indicator Pill */}
      <div className="absolute bottom-6 right-6 md:right-margin-edge z-20">
        <button
          onClick={handleScrollDown}
          className="bg-[#0D0D0D] text-white font-mono text-xs px-6 py-3 uppercase flex items-center gap-2 cursor-pointer hover:bg-[#E4492E] transition-colors shadow-lg btn-brutalist font-bold tracking-widest border border-white/20"
        >
          <span>SCROLL</span>
          <span className="material-symbols-outlined text-[16px] animate-bounce">
            arrow_downward
          </span>
        </button>
      </div>
    </section>
  );
};
