import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { frameSequencer, TOTAL_360_FRAMES } from '../utils/frameSequencer';
import { CameraAngle } from '../types';
import { SunMedium, Moon, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StudioView360: React.FC = () => {
  const { lightingMode, setLightingMode, cameraAngle, setCameraAngle } = useAppStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);
  const frameOffsetRef = useRef<number>(0);

  const angles: { id: CameraAngle; label: string; frameIndex: number; img: string }[] = [
    {
      id: '01 PROFILE',
      label: '01 PROFILE',
      frameIndex: 0,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbC1q_cXA2ckKqSN2fpqanSuVjXW4o2j6Lyx5kIi2qoXXJZlKfp6Jmzf9KPCs_5QdQNEHTrMPE-hMR2kEJQUs1vwcYaJY6J-ufn6T65Pf5fQ7nXCHaL5L0DX-bS-2C850mWndeQ_0jXsKdFR-hLDPWJgc_YiU7ckNeC89kfCALOFutTv0JmRlZUvnf0Sc-zaVcYZ3dpjg5KEvQ2PfS4_UH_g3jOtoS6mfbaKMJRadx7Zo897VjXqU',
    },
    {
      id: '02 TOP',
      label: '02 TOP',
      frameIndex: 18,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy1kL9MOi_H-6PY62Bzc6G2CvgwMLuEOYuWGl77URTkOefTK4-SKE9DuNwnHCjYTxm71WZaFnYanl-lK5Q74i53V6HVVXgyq9PvRvwqHHSRAm32rL6vG08bM7mGNLVpvGHodW1Wk15hL_SLP-xpanMeF2XEI3iCiy1KrhPx1IC9amJFh38CR2wsaOsl3qJmYnuy2qXdp8xxV3P0sn-6461p1pIPPRFbZRKvl4yR91v-zVOwQiM1h0',
    },
    {
      id: '03 FRONT',
      label: '03 FRONT',
      frameIndex: 36,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFgTDx5CwV7CuEe1jS4IDq1fRESZkRjIo7Jfy_EBEqG6Hp67sLJn3lb2l8fmvsGfcO5_coWuJMiaEbmg2aOoDmFpMN2cMAlaCbbPbrMuwiM4qe5H3FG5ABEGYfZL1JQM-40oe5Qwuz6QYGjBOX8EXHB3lZtWSyNh57YEewD9mnZAw7BiSvZdSoQkt-cT_wqRWbMUmhLKEq6Pg0IRO1PMOv0XzZLfrxOYS_IJ1MrpOKuSJV4pN4oHY',
    },
  ];

  // Render to canvas via requestAnimationFrame
  const render = useCallback(() => {
    if (!canvasRef.current) return;
    frameSequencer.renderFrameToCanvas(canvasRef.current, currentFrame, lightingMode);
  }, [currentFrame, lightingMode]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      render();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [render]);

  // Section 04 (#studio-view): 360-degree canvas frame scrub mapped to ScrollTrigger progress 0.0 -> 1.0
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%',
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

  // Manual Drag Scrubber
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > 5) {
      const step = delta > 0 ? 1 : -1;
      frameOffsetRef.current += step;
      setCurrentFrame((prev) => prev + step);
      startXRef.current = e.clientX;

      // Spatial panning audio tick
      const pan = (e.clientX / window.innerWidth) * 2 - 1;
      soundEngine.playClick(1400, pan);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAngleSelect = (angle: CameraAngle, frameIndex: number) => {
    soundEngine.playClick(1200);
    setCameraAngle(angle);
    frameOffsetRef.current = frameIndex;
    setCurrentFrame(frameIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="studio-view"
      className="relative w-full h-screen min-h-[750px] bg-carbon-black text-on-surface font-mono flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 2D Preloaded Canvas Sequencer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top Header & Lighting Rig Controls */}
      <div className="relative z-20 pt-24 px-6 md:px-margin-edge flex justify-between items-start">
        <div>
          <div className="font-mono text-xs text-m-orange uppercase tracking-widest font-bold">
            SECTION 04 // 360° SEQUENCER ENGINE
          </div>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-white tracking-tight mt-1">
            CANVAS FRAME SCRUB [{(currentFrame % TOTAL_360_FRAMES) + 1} / {TOTAL_360_FRAMES}]
          </h2>
        </div>

        {/* Lighting Mode Selector */}
        <div className="glass-panel p-1.5 flex items-center gap-1">
          <button
            onClick={() => {
              soundEngine.playClick(1000);
              setLightingMode('amber-cyan');
            }}
            className={`px-3 py-1.5 font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 transition-colors ${
              lightingMode === 'amber-cyan'
                ? 'bg-m-orange text-white'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>AMBER/CYAN</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playClick(1000);
              setLightingMode('studio-high-key');
            }}
            className={`px-3 py-1.5 font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 transition-colors ${
              lightingMode === 'studio-high-key'
                ? 'bg-white text-black'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <SunMedium className="w-3 h-3" />
            <span>HIGH-KEY</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playClick(1000);
              setLightingMode('carbon-void');
            }}
            className={`px-3 py-1.5 font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 transition-colors ${
              lightingMode === 'carbon-void'
                ? 'bg-zinc-800 text-white'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <Moon className="w-3 h-3" />
            <span>VOID</span>
          </button>
        </div>
      </div>

      {/* Center Drag & Scroll Indicator Tag */}
      <div className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="bg-secondary-container/90 px-6 py-2.5 rounded-full border border-secondary shadow-[0_0_25px_rgba(192,2,7,0.7)] animate-pulse flex items-center gap-2 backdrop-blur-md">
          <span className="text-white font-mono text-xs uppercase tracking-widest font-bold">
            &lt; SCROLL OR DRAG TO SCRUB 360° &gt;
          </span>
        </div>
      </div>

      {/* Bottom Gallery Dock (Screen 8ffa0f514f0c47b1a7060ab9dade2136) */}
      <div className="relative z-30 px-6 md:px-margin-edge pb-8 flex flex-col sm:flex-row justify-between items-end gap-4">
        {/* Frame index readout */}
        <div className="glass-panel px-4 py-2 font-mono text-xs text-on-surface-variant">
          FRAME: <span className="text-white font-bold">{((currentFrame % TOTAL_360_FRAMES) + TOTAL_360_FRAMES) % TOTAL_360_FRAMES}</span> // SCRUB: <span className="text-white font-bold">{Math.round((((currentFrame % TOTAL_360_FRAMES) + TOTAL_360_FRAMES) % TOTAL_360_FRAMES) / (TOTAL_360_FRAMES - 1) * 100)}%</span>
        </div>

        {/* Camera Angle Switcher Dock */}
        <div className="flex flex-col items-end gap-2">
          <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest bg-surface-container-low px-2 py-1">
            // CAMERA_ANGLES
          </div>

          <div className="glass-panel p-2 flex gap-3">
            {angles.map((a) => (
              <button
                key={a.id}
                onClick={() => handleAngleSelect(a.id, a.frameIndex)}
                className={`relative w-28 md:w-36 h-16 md:h-20 overflow-hidden border transition-all duration-200 cursor-pointer ${
                  cameraAngle === a.id
                    ? 'border-m-orange scale-105 shadow-[0_0_15px_rgba(228,73,46,0.6)]'
                    : 'border-surface-container-high opacity-70 hover:opacity-100 hover:border-white'
                }`}
              >
                <img
                  src={a.img}
                  alt={a.label}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute bottom-0 left-0 w-full py-1 text-[10px] uppercase font-mono text-center font-bold ${
                    cameraAngle === a.id
                      ? 'bg-m-orange text-white'
                      : 'bg-black/80 text-white'
                  }`}
                >
                  {a.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
