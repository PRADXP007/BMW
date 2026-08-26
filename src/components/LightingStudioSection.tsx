import React, { useState, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { CameraAngle } from '../types';
import { SunMedium, Moon, Sparkles } from 'lucide-react';

export const LightingStudioSection: React.FC = () => {
  const { lightingMode, setLightingMode, cameraAngle, setCameraAngle } = useAppStore();
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);

  const angles: { id: CameraAngle; label: string; img: string }[] = [
    {
      id: '01 PROFILE',
      label: '01 PROFILE',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbC1q_cXA2ckKqSN2fpqanSuVjXW4o2j6Lyx5kIi2qoXXJZlKfp6Jmzf9KPCs_5QdQNEHTrMPE-hMR2kEJQUs1vwcYaJY6J-ufn6T65Pf5fQ7nXCHaL5L0DX-bS-2C850mWndeQ_0jXsKdFR-hLDPWJgc_YiU7ckNeC89kfCALOFutTv0JmRlZUvnf0Sc-zaVcYZ3dpjg5KEvQ2PfS4_UH_g3jOtoS6mfbaKMJRadx7Zo897VjXqU',
    },
    {
      id: '02 TOP',
      label: '02 TOP',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy1kL9MOi_H-6PY62Bzc6G2CvgwMLuEOYuWGl77URTkOefTK4-SKE9DuNwnHCjYTxm71WZaFnYanl-lK5Q74i53V6HVVXgyq9PvRvwqHHSRAm32rL6vG08bM7mGNLVpvGHodW1Wk15hL_SLP-xpanMeF2XEI3iCiy1KrhPx1IC9amJFh38CR2wsaOsl3qJmYnuy2qXdp8xxV3P0sn-6461p1pIPPRFbZRKvl4yR91v-zVOwQiM1h0',
    },
    {
      id: '03 FRONT',
      label: '03 FRONT',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFgTDx5CwV7CuEe1jS4IDq1fRESZkRjIo7Jfy_EBEqG6Hp67sLJn3lb2l8fmvsGfcO5_coWuJMiaEbmg2aOoDmFpMN2cMAlaCbbPbrMuwiM4qe5H3FG5ABEGYfZL1JQM-40oe5Qwuz6QYGjBOX8EXHB3lZtWSyNh57YEewD9mnZAw7BiSvZdSoQkt-cT_wqRWbMUmhLKEq6Pg0IRO1PMOv0XzZLfrxOYS_IJ1MrpOKuSJV4pN4oHY',
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    setRotation((prev) => prev + delta * 0.4);
    startXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAngleSelect = (angle: CameraAngle) => {
    soundEngine.playClick(1200);
    setCameraAngle(angle);
  };

  // Get active hero image based on camera angle & lighting mode
  const getActiveImage = () => {
    if (cameraAngle === '02 TOP') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy1kL9MOi_H-6PY62Bzc6G2CvgwMLuEOYuWGl77URTkOefTK4-SKE9DuNwnHCjYTxm71WZaFnYanl-lK5Q74i53V6HVVXgyq9PvRvwqHHSRAm32rL6vG08bM7mGNLVpvGHodW1Wk15hL_SLP-xpanMeF2XEI3iCiy1KrhPx1IC9amJFh38CR2wsaOsl3qJmYnuy2qXdp8xxV3P0sn-6461p1pIPPRFbZRKvl4yR91v-zVOwQiM1h0';
    }
    if (cameraAngle === '03 FRONT') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFgTDx5CwV7CuEe1jS4IDq1fRESZkRjIo7Jfy_EBEqG6Hp67sLJn3lb2l8fmvsGfcO5_coWuJMiaEbmg2aOoDmFpMN2cMAlaCbbPbrMuwiM4qe5H3FG5ABEGYfZL1JQM-40oe5Qwuz6QYGjBOX8EXHB3lZtWSyNh57YEewD9mnZAw7BiSvZdSoQkt-cT_wqRWbMUmhLKEq6Pg0IRO1PMOv0XzZLfrxOYS_IJ1MrpOKuSJV4pN4oHY';
    }
    if (lightingMode === 'amber-cyan') {
      return 'https://lh3.googleusercontent.com/aida/AEtjO1UEqPcLwy4UB0E_o1P7qYqnc3Eg63xUkjUQMvOTTzMUW1GLX6QmksJ7NQuQqMEXyOZ1KR3d5zs79vhqGIkHBnYGB_VW749LY6O3PGWxm29EBGZ5JvEkhXj_ucVUhkR5D755LJKMBWR6vyTlC_we-pQxqwFJGRihiVJ4GLIG9M47MVKCtpkaoyXnOVpn5hK2Gyz7Nq072_BPp5XE3cNMlS2-qn3h8OLr5yjT-LBp3D_lpE7_IkSWDU2NMA';
    }
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeS39kiYI-1K_UXXnzcZsILBWIyzFpCm2sUqSDvddBSsTiGZC7DDxv7A7fbr_Di07pjUA2uTO2gDrfU79z3vh0x4ozfrzjBe6EBCPjuCnsJMHl3ZE8EF4UL0rApLOgmK2ZkNlbTbKdaAL4_S4O8K4CN1OSYy4rNh9LOkVcWY12i-SUcCxHIZV-9SGcAXq2hg3gza5fsm3LxIocxpzsZEr_yXOtp3AV6Ph8dWlcrqt2-tPHGG_2Mf8';
  };

  return (
    <section
      id="studio"
      className="relative w-full h-screen min-h-[750px] bg-carbon-black text-on-surface font-mono flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Dynamic Background Image Render with Drag Tilt */}
      <div
        className="absolute inset-0 w-full h-full -z-10 transition-transform duration-100 ease-out"
        style={{ transform: `scale(1.02) rotate(${rotation * 0.05}deg)` }}
      >
        <img
          alt="BMW M Concept Studio Lighting View"
          className="w-full h-full object-cover object-center filter contrast-125"
          src={getActiveImage()}
        />
        {/* Dynamic Studio Lighting Tint Overlay */}
        {lightingMode === 'amber-cyan' && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/15 via-transparent to-cyan-500/15 mix-blend-color pointer-events-none"></div>
        )}
        {lightingMode === 'thermal-infra' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-red-600/30 to-yellow-400/20 mix-blend-color pointer-events-none"></div>
        )}
      </div>

      {/* Top Header & Lighting Mode Switcher */}
      <div className="relative z-20 pt-28 px-6 md:px-margin-edge flex justify-between items-start">
        <div>
          <div className="font-mono text-xs text-m-orange uppercase tracking-widest font-bold">
            STUDIO VIEWER // PHOTOMETRIC STAGE
          </div>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-white tracking-tight mt-1">
            LIGHTING RIG & ANGLES
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

      {/* Drag Interaction Indicator Tag */}
      <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="bg-secondary-container/90 px-6 py-2.5 rounded-full border border-secondary shadow-[0_0_20px_rgba(192,2,7,0.6)] animate-pulse flex items-center gap-2 backdrop-blur-md">
          <span className="text-white font-mono text-xs uppercase tracking-widest font-bold">
            &lt; DRAG TO ROTATE VIEWPORT &gt;
          </span>
        </div>
      </div>

      {/* Bottom Gallery Dock (Screen 8ffa0f514f0c47b1a7060ab9dade2136) */}
      <div className="relative z-30 px-6 md:px-margin-edge pb-8 flex flex-col sm:flex-row justify-between items-end gap-4">
        {/* Rotation telemetry readout */}
        <div className="glass-panel px-4 py-2 font-mono text-xs text-on-surface-variant">
          YAW: <span className="text-white font-bold">{Math.round(rotation)}°</span> // PITCH: <span className="text-white font-bold">12°</span>
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
                onClick={() => handleAngleSelect(a.id)}
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

      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-between px-margin-edge z-0">
        <div className="w-px h-full bg-white"></div>
        <div className="w-px h-full bg-white hidden md:block"></div>
        <div className="w-px h-full bg-white hidden md:block"></div>
        <div className="w-px h-full bg-white hidden md:block"></div>
        <div className="w-px h-full bg-white"></div>
      </div>
    </section>
  );
};
