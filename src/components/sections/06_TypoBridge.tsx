import React, { useRef, useEffect } from 'react';
import { Crosshair } from '../ui/Crosshair';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TypoBridge: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const carMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !carMaskRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      tl.fromTo(
        carMaskRef.current,
        { y: 80, opacity: 0.7 },
        { y: -40, opacity: 1, ease: 'power1.out' }
      );

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { y: 40 },
          { y: -30, ease: 'none' },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parallax-bridge"
      className="relative min-h-screen w-full bg-[#E5E5E5] text-[#0D0D0D] flex flex-col items-center justify-center pt-20 pb-28 px-6 md:px-margin-edge overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-grid-pattern-light opacity-35 pointer-events-none"></div>

      <main
        ref={textRef}
        className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center font-display z-20 relative mix-blend-difference text-surface-dim"
      >
        <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-[#0D0D0D] uppercase font-bold">
          DESCEND INTO
        </h1>
        <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-[#0D0D0D] uppercase font-bold">
          MADNESS
        </h1>

        {/* Center Animated Red Vector Crosshair Indicator ✛ */}
        <div className="flex items-center justify-center gap-3 md:gap-6 m-0 p-0">
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-[#0D0D0D] uppercase font-bold">
            WITH
          </h1>

          <Crosshair size="lg" />

          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-[#0D0D0D] uppercase font-bold">
            YOUR
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4 m-0 p-0">
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-[#0D0D0D] uppercase font-bold">
            BMW
          </h1>
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.82] tracking-tighter m-0 p-0 text-[#E4492E] uppercase font-bold">
            01
          </h1>
        </div>
      </main>

      {/* Supercar Roofline Slides Upward into View as User Scrolls */}
      <div
        ref={carMaskRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[88vw] max-w-5xl h-[34vh] z-10 pointer-events-none bg-contain bg-no-repeat bg-top"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida/AEtjO1WNw2wzi59fFbtUf0dRNO1EENsMPZPi_Jl2UB5F9aVTV6getQTEfuaSm61tFeaqdFQKtaolclBNclP2oMuTWZo-5STrK_r91pb6ajOKxJ5vW_OnIOk82IBp5vQC15KookF4HW5XssuHkLYgrfl7tYiab8iAXJdWLBf2QZW7TkAbdipSv6LMRkuXXuQpU_hnmU00rbP--4teD0gJJYg2zEHq-PJf4W9PmhBYcW-4bzNHdOaJVQBHI3tL')`,
          maskImage: 'linear-gradient(to top, black 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 55%, transparent 100%)',
        }}
      ></div>
    </section>
  );
};
