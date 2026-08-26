import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { frameSequencer, TOTAL_360_FRAMES } from '../utils/frameSequencer';
import { DeepDivePillar } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StudioView360: React.FC = () => {
  const { setActiveDeepDive, setIsSpecSheetOpen } = useAppStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);
  const frameOffsetRef = useRef<number>(0);

  const pillars: { id: DeepDivePillar; label: string; subtitle: string }[] = [
    { id: 'POWER', label: 'POWER', subtitle: '1,050 HP HYBRID CALIBRATION' },
    { id: 'ORIGIN', label: 'ORIGIN', subtitle: '3.0 CSL BATMOBILE HERITAGE' },
    { id: 'BEAUTY', label: 'BEAUTY', subtitle: 'DOWNFORCE & AERO FLUIDICS' },
    { id: 'ASYLUM', label: 'ASYLUM', subtitle: 'REDUCED COCKPIT ERGONOMICS' },
    { id: 'OBSESSION', label: 'OBSESSION', subtitle: '7075-T6 BILLET INSTRUMENTATION' },
    { id: 'STRENGTH', label: 'STRENGTH', subtitle: 'AUTOCLAVE CARBON MONOCOQUE' },
  ];

  // Render to canvas via requestAnimationFrame
  const render = useCallback(() => {
    if (!canvasRef.current) return;
    frameSequencer.renderFrameToCanvas(canvasRef.current, currentFrame, 'studio-high-key');
  }, [currentFrame]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      render();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [render]);

  // Screen 04: HTML5 Canvas 360-degree rotation tied to horizontal drag and scroll velocity
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const frame = Math.floor(self.progress * (TOTAL_360_FRAMES - 1));
          setCurrentFrame(frame + frameOffsetRef.current);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Horizontal Drag Interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > 4) {
      const step = delta > 0 ? 1 : -1;
      frameOffsetRef.current += step;
      setCurrentFrame((prev) => prev + step);
      startXRef.current = e.clientX;

      const pan = (e.clientX / window.innerWidth) * 2 - 1;
      soundEngine.playClick(1400, pan);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePillarClick = (pillar: DeepDivePillar) => {
    soundEngine.playClick(1100);
    setActiveDeepDive(pillar);
  };

  return (
    <section
      ref={sectionRef}
      id="configurator-view"
      className="relative w-full h-screen min-h-[750px] bg-[#EBEBEB] text-[#0D0D0D] font-mono flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 2D Preloaded Canvas Sequencer on Neutral Cyclorama Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top Header Label */}
      <div className="relative z-20 pt-24 px-6 md:px-margin-edge flex justify-between items-center">
        <div className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/60 font-bold">
          SCREEN 04 // STUDIO 360 CONFIGURATOR
        </div>
        <div className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/60 hidden sm:block">
          DRAG OR SCROLL TO SCRUB 360° TURNTABLE
        </div>
      </div>

      {/* Main Area: Sticky Vertical Navigation Menu (Sidebar) */}
      <div className="relative z-20 flex-grow flex justify-between items-center px-6 md:px-margin-edge pointer-events-none">
        {/* Left Sticky Sidebar: POWER, ORIGIN, BEAUTY, ASYLUM, OBSESSION, STRENGTH */}
        <aside className="w-full max-w-md z-20 pointer-events-auto bg-white/70 backdrop-blur-md p-6 border border-black/10 shadow-2xl">
          <span className="font-mono text-[10px] text-[#E4492E] uppercase font-bold tracking-widest block mb-3 border-b border-[#E4492E]/20 pb-1">
            ARCHITECTURAL PILLARS // OVERLAY LAUNCHPAD
          </span>
          <ul className="flex flex-col gap-2.5">
            {pillars.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => handlePillarClick(p.id)}
                  className="group flex flex-col text-left transition-all duration-150 cursor-pointer border-none bg-transparent p-0 w-full"
                >
                  <span className="font-display text-3xl md:text-4xl text-[#0D0D0D] uppercase font-bold tracking-tight group-hover:text-[#E4492E] group-hover:translate-x-2 transition-all duration-150">
                    {p.label}
                  </span>
                  <span className="font-mono text-[10px] text-[#0D0D0D]/60 uppercase tracking-widest group-hover:text-[#0D0D0D]">
                    // {p.subtitle}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Telemetry Readout */}
        <div className="hidden lg:flex flex-col gap-4 text-right bg-white/70 backdrop-blur-md p-6 border border-black/10 shadow-xl pointer-events-auto">
          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#0D0D0D]/60 uppercase font-bold">
              01 // 360° FRAME
            </span>
            <span className="font-mono text-lg text-[#0D0D0D] font-bold mt-0.5">
              {((currentFrame % TOTAL_360_FRAMES) + TOTAL_360_FRAMES) % TOTAL_360_FRAMES} / {TOTAL_360_FRAMES}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#0D0D0D]/60 uppercase font-bold">
              02 // STATUS
            </span>
            <span className="font-mono text-lg text-[#0D0D0D] font-bold mt-0.5 flex items-center justify-end gap-2">
              <span className="w-2.5 h-2.5 bg-[#E4492E] rounded-full animate-pulse"></span>
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Bottom-Left CTA: Pill Outline Button DOWNLOAD SPECS > */}
      <div className="relative z-20 px-6 md:px-margin-edge pb-8 flex justify-between items-end">
        <button
          onClick={() => {
            soundEngine.playClick(900);
            setIsSpecSheetOpen(true);
          }}
          className="bg-transparent border-2 border-[#0D0D0D] text-[#0D0D0D] font-mono text-xs px-8 py-3.5 rounded-full uppercase hover:bg-[#E4492E] hover:border-[#E4492E] hover:text-white transition-all duration-150 flex items-center gap-2 cursor-pointer font-bold tracking-widest shadow-lg"
        >
          <span>DOWNLOAD SPECS &gt;</span>
        </button>

        <div className="font-mono text-[10px] text-[#0D0D0D]/60 uppercase tracking-widest hidden sm:block">
          CLICK ANY SIDEBAR PILLAR TO OPEN DEEP-DIVE SLIDE-IN MODAL
        </div>
      </div>
    </section>
  );
};
