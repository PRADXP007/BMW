import React, { useEffect, useRef } from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { useSoundEngine } from '../../hooks/useSoundEngine';
import { useCanvasFrames } from '../../hooks/useCanvasFrames';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export const PreloaderGate: React.FC = () => {
  const { hasEntered, setHasEntered } = useExperienceStore();
  const { playSubDrop, playClick } = useSoundEngine();
  const { progress, isLoaded } = useCanvasFrames();
  const containerRef = useRef<HTMLDivElement>(null);
  const textStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textStackRef.current) {
      const titles = textStackRef.current.querySelectorAll('.split-text');
      const splits: SplitType[] = [];

      titles.forEach((el) => {
        const split = new SplitType(el as HTMLElement, {
          types: 'lines,words,chars',
          lineClass: 'split-line overflow-hidden',
          charClass: 'split-char inline-block',
        });
        splits.push(split);
      });

      const allChars = textStackRef.current.querySelectorAll('.split-char');
      gsap.fromTo(
        allChars,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 1.1,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      return () => {
        splits.forEach((s) => s.revert());
      };
    }
  }, []);

  const handleEnter = () => {
    if (!isLoaded) return;

    playSubDrop();
    playClick(1200, 0);

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          setHasEntered(true);
        },
      });
    } else {
      setHasEntered(true);
    }
  };

  if (hasEntered) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#0D0D0D] text-on-surface flex flex-col justify-between p-6 md:p-margin-edge overflow-hidden h-screen w-screen selection:bg-[#E4492E] selection:text-white"
    >
      {/* Dark wet-asphalt motion background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          alt="BMW M Concept background"
          className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfMZkPYX5MxjUChBXCMBQ-lYpGvtK_3MWt0OIthaD5lHHU6s1ADDKwI4CTMsovDxPzwMcdZwTwc2AZ20N1f9jq8mxzWFqpDwPo2yyE3p-B1vmAyS5_zZJsfclIZKWGwjJfdn_aqaJdJwiqck3lKn2q6XRgttQz2wplppAJISHbQXJL1QyR5EingPJUc8lGY8dLILGr3UohcSGs_3mFw1dyvYIA4uJApMvmAPRAQx05NYeMlBO02TE"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      {/* Top Status Header */}
      <div className="relative z-10 w-full flex justify-between items-start pt-2">
        <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-base fill-icon text-m-orange animate-pulse">
            speed
          </span>
          <span className="text-white font-bold">INITIATING SEQUENCE // SCREEN 01</span>
        </div>

        <div className="font-mono text-xs uppercase text-on-surface-variant tracking-wider flex items-center gap-4">
          <span>
            BUFFER: <strong className="text-white">{progress}%</strong>
          </span>
          <span className="hidden sm:inline">
            SYSTEM_READY: <span className="text-emerald-400 font-bold">{isLoaded ? 'TRUE' : 'FALSE'}</span>
          </span>
        </div>
      </div>

      {/* Staggered Lines */}
      <div
        ref={textStackRef}
        className="relative z-10 flex flex-col w-full md:w-3/4 my-auto"
        style={{ letterSpacing: '-0.04em' }}
      >
        <h1
          className="split-text font-display text-white uppercase m-0 p-0 transform -translate-x-2 mix-blend-overlay overflow-hidden font-bold"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)', lineHeight: 0.88 }}
        >
          PRECISION
        </h1>
        <h1
          className="split-text font-display text-white uppercase m-0 p-0 transform translate-x-8 md:translate-x-12 opacity-85 mix-blend-overlay overflow-hidden font-bold"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)', lineHeight: 0.88 }}
        >
          CHAOS
        </h1>
        <h1
          className="split-text font-display text-white uppercase m-0 p-0 transform translate-x-3 md:translate-x-4 opacity-90 mix-blend-overlay overflow-hidden font-bold"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)', lineHeight: 0.88 }}
        >
          PURITY
        </h1>
        <h1
          className="split-text font-display text-[#E4492E] uppercase m-0 p-0 transform translate-x-16 md:translate-x-24 shadow-sm mix-blend-screen overflow-hidden font-bold"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)', lineHeight: 0.88 }}
        >
          MANIAC
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 w-full mb-2">
        <div className="w-full h-1 bg-surface-container-high relative overflow-hidden">
          <div
            className="h-full bg-[#E4492E] transition-all duration-150"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end w-full border-t border-surface-variant pt-stack-md gap-4">
        <div className="font-mono text-xs text-on-surface-variant uppercase flex flex-col gap-1">
          <span className="text-white font-bold">MUNICH, GERMANY / 48.1764° N</span>
          <span className="opacity-60">SYSTEM_READY: TRUE // SKUNKWORKS EXPERIMENTAL PROTOCOL</span>
        </div>

        <button
          onClick={handleEnter}
          disabled={!isLoaded}
          className={`font-mono text-xs uppercase px-10 py-5 flex items-center gap-3 transition-all duration-200 border-none cursor-pointer tracking-widest font-bold btn-brutalist ${
            isLoaded
              ? 'bg-[#E4492E] text-white hover:bg-white hover:text-black shadow-[0_0_35px_rgba(228,73,46,0.7)]'
              : 'bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed'
          }`}
        >
          <span>ENTER &gt;&gt;</span>
          <span className="material-symbols-outlined text-sm">double_arrow</span>
        </button>
      </div>

      <div className="scanline"></div>
    </div>
  );
};
