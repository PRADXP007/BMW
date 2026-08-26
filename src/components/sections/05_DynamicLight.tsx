import React, { useState, useRef } from 'react';
import { useExperienceStore, CameraAngleType } from '../../store/useExperienceStore';
import { useSoundEngine } from '../../hooks/useSoundEngine';
import { LightingStage } from '../canvas/LightingStage';

export const DynamicLight: React.FC = () => {
  const { cameraAngle, setCameraAngle } = useExperienceStore();
  const { playClick } = useSoundEngine();
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);

  const angles: { id: CameraAngleType; label: string; img: string }[] = [
    {
      id: '01 PROFILE',
      label: '01 PROFILE',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbC1q_cXA2ckKqSN2fpqanSuVjXW4o2j6Lyx5kIi2qoXXJZlKfp6Jmzf9KPCs_5QdQNEHTrMPE-hMR2kEJQUs1vwcYaJY6J-ufn6T65Pf5fQ7nXCHaL5L0DX-bS-2C850mWndeQ_0jXsKdFR-hLDPWJgc_YiU7ckNeC89kfCALOFutTv0JmRlZUvnf0Sc-zaVcYZ3dpjg5KEvQ2PfS4_UH_g3jOtoS6mfbaKMJRadx7Zo897VjXqU',
    },
    {
      id: '02 TOP',
      label: '02 TOP-DOWN',
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
    setRotation((prev) => prev + delta * 0.35);
    startXRef.current = e.clientX;

    const pan = (e.clientX / window.innerWidth) * 2 - 1;
    playClick(1500, pan);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAngleSelect = (angle: CameraAngleType) => {
    playClick(1200);
    setCameraAngle(angle);
  };

  return (
    <section
      id="studio-lighting"
      className="relative w-full h-screen min-h-[750px] bg-[#0D0D0D] text-white font-mono flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Lighting Stage Canvas/Layer */}
      <LightingStage cameraAngle={cameraAngle} rotation={rotation} />

      {/* Top Header */}
      <div className="relative z-20 pt-28 px-6 md:px-margin-edge flex justify-between items-start">
        <div>
          <div className="font-mono text-xs text-[#FFA040] uppercase tracking-widest font-bold">
            SCREEN 05 // DYNAMIC LIGHT & DRAG STAGE
          </div>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-white tracking-tight mt-1">
            DUAL-TONE AMBER (#FFA040) & ICE-CYAN (#40DFFF)
          </h2>
        </div>

        <div className="glass-panel px-4 py-2 text-xs font-mono text-white/80">
          <span>YAW DAMPING: </span>
          <strong className="text-white">{Math.round(rotation)}°</strong>
        </div>
      </div>

      {/* Floating < DRAG > Badge */}
      <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="bg-[#E4492E] px-8 py-3 rounded-full border border-white/30 shadow-[0_0_35px_rgba(228,73,46,0.8)] animate-pulse flex items-center gap-2">
          <span className="text-white font-mono text-xs uppercase tracking-widest font-bold">
            &lt; DRAG &gt;
          </span>
        </div>
      </div>

      {/* Bottom Thumbnail Dock */}
      <div className="relative z-30 px-6 md:px-margin-edge pb-8 flex flex-col sm:flex-row justify-between items-end gap-4">
        <div className="glass-panel px-4 py-2 font-mono text-xs text-white/70">
          SPOTLIGHT: <span className="text-[#FFA040] font-bold">AMBER #FFA040</span> // RIM: <span className="text-[#40DFFF] font-bold">ICE-CYAN #40DFFF</span>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="font-mono text-[10px] text-white/60 uppercase tracking-widest bg-[#131313] px-2 py-1">
            // THUMBNAIL_DOCK
          </div>

          <div className="glass-panel p-2 flex gap-3">
            {angles.map((a) => (
              <button
                key={a.id}
                onClick={() => handleAngleSelect(a.id)}
                className={`relative w-28 md:w-36 h-16 md:h-20 overflow-hidden border transition-all duration-200 cursor-pointer ${
                  cameraAngle === a.id
                    ? 'border-[#E4492E] scale-105 shadow-[0_0_20px_rgba(228,73,46,0.7)]'
                    : 'border-white/20 opacity-70 hover:opacity-100 hover:border-white'
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
                      ? 'bg-[#E4492E] text-white'
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
