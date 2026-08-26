import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { frameSequencer } from '../utils/frameSequencer';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export const Preloader: React.FC = () => {
  const { hasEntered, setHasEntered } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const textStackRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isCacheReady, setIsCacheReady] = useState<boolean>(false);

  useEffect(() => {
    // 1. Preload 360 frames into memory
    frameSequencer
      .preloadFrames((pct) => {
        setLoadProgress(pct);
      })
      .then(() => {
        setIsCacheReady(true);
      });

    // 2. Kinetic Typography Masking with SplitType + GSAP
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

      // Animate chars with the requested curve
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
    if (!isCacheReady) return;

    soundEngine.playSubDrop();
    soundEngine.playClick(1200, 0);

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
      className="fixed inset-0 z-50 bg-background text-on-surface flex flex-col justify-between p-6 md:p-margin-edge overflow-hidden h-screen w-screen selection:bg-secondary-container selection:text-white"
    >
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          alt="BMW M Concept background"
          className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfMZkPYX5MxjUChBXCMBQ-lYpGvtK_3MWt0OIthaD5lHHU6s1ADDKwI4CTMsovDxPzwMcdZwTwc2AZ20N1f9jq8mxzWFqpDwPo2yyE3p-B1vmAyS5_zZJsfclIZKWGwjJfdn_aqaJdJwiqck3lKn2q6XRgttQz2wplppAJISHbQXJL1QyR5EingPJUc8lGY8dLILGr3UohcSGs_3mFw1dyvYIA4uJApMvmAPRAQx05NYeMlBO02TE"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      {/* Top Status Header */}
      <div className="relative z-10 w-full flex justify-between items-start pt-4">
        <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-base fill-icon text-m-orange animate-pulse">
            speed
          </span>
          <span className="text-white font-bold">INITIATING SEQUENCE // 01</span>
        </div>

        <div className="font-mono text-xs uppercase text-on-surface-variant tracking-wider flex items-center gap-4">
          <span>
            360° CACHE: <strong className="text-white">{loadProgress}%</strong>
          </span>
          <span className="hidden sm:inline">
            STATUS: <span className="text-emerald-400 font-bold">{isCacheReady ? 'LOCKED_READY' : 'BUFFERING'}</span>
          </span>
        </div>
      </div>

      {/* Massive Kinetic Typography with SplitType masking */}
      <div ref={textStackRef} className="relative z-10 flex flex-col gap-1 w-full md:w-3/4 my-auto">
        <h1 className="split-text font-display text-6xl md:text-[140px] lg:text-[170px] leading-[0.9] text-white uppercase m-0 p-0 transform -translate-x-2 mix-blend-overlay tracking-tight-hero overflow-hidden">
          PRECISION
        </h1>
        <h1 className="split-text font-display text-6xl md:text-[140px] lg:text-[170px] leading-[0.9] text-white uppercase m-0 p-0 transform translate-x-12 opacity-80 mix-blend-overlay tracking-tight-hero overflow-hidden">
          CHAOS
        </h1>
        <h1 className="split-text font-display text-6xl md:text-[140px] lg:text-[170px] leading-[0.9] text-white uppercase m-0 p-0 transform translate-x-4 opacity-90 mix-blend-overlay tracking-tight-hero overflow-hidden">
          PURITY
        </h1>
        <h1 className="split-text font-display text-6xl md:text-[140px] lg:text-[170px] leading-[0.9] text-m-orange uppercase m-0 p-0 transform translate-x-24 shadow-sm mix-blend-screen tracking-tight-hero font-bold overflow-hidden">
          MANIAC
        </h1>
      </div>

      {/* Memory Cache Progress Bar */}
      <div className="relative z-10 w-full mb-2">
        <div className="w-full h-1 bg-surface-container-high relative overflow-hidden">
          <div
            className="h-full bg-m-orange transition-all duration-150"
            style={{ width: `${loadProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Bottom Row: Metadata & CTA */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end w-full border-t border-surface-variant pt-stack-md gap-4">
        {/* Metadata */}
        <div className="font-mono text-xs text-on-surface-variant uppercase flex flex-col gap-1">
          <span className="text-white font-bold">MUNICH, GERMANY / 48.1764° N</span>
          <span className="opacity-60">
            {isCacheReady
              ? 'SYSTEM_READY: TRUE // MEMORY STREAM ACTIVE'
              : `PRELOADING 72 360° FRAME BUFFERS (${loadProgress}%)...`}
          </span>
        </div>

        {/* Enter CTA (Unlocked upon 100% cache load) */}
        <button
          onClick={handleEnter}
          disabled={!isCacheReady}
          className={`font-mono text-xs uppercase px-10 py-5 flex items-center gap-3 transition-all duration-200 group border-none cursor-pointer tracking-widest font-bold btn-brutalist ${
            isCacheReady
              ? 'bg-m-orange text-white hover:bg-white hover:text-black shadow-[0_0_30px_rgba(228,73,46,0.6)] cursor-pointer'
              : 'bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed'
          }`}
        >
          <span>{isCacheReady ? 'ENTER EXPERIENCE' : `LOADING ${loadProgress}%`}</span>
          <span className="material-symbols-outlined text-sm transform group-hover:translate-x-2 transition-transform">
            double_arrow
          </span>
        </button>
      </div>

      {/* Scanning Laser Line */}
      <div className="scanline"></div>
    </div>
  );
};
