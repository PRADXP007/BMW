import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { useAppStore } from '../store/useAppStore';
import { Volume2, Sparkles, Flame, Plus } from 'lucide-react';

export const ShowroomSection: React.FC = () => {
  const { setIsCommissionOpen, currentRpm, setCurrentRpm } = useAppStore();
  const [isRevving, setIsRevving] = useState(false);
  const [showFlame, setShowFlame] = useState(false);

  const handleEngineSound = () => {
    setIsRevving(true);
    setShowFlame(true);
    soundEngine.playEngineRev((rpm) => {
      setCurrentRpm(rpm);
    }, -0.2); // Spatial pan towards rear left exhaust

    setTimeout(() => {
      setShowFlame(false);
      setIsRevving(false);
    }, 2400);
  };

  return (
    <section
      id="showroom"
      className="relative w-full h-screen min-h-[750px] bg-[#0D0D0D] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Image: Rear 3/4 angle with dihedral doors raised on circular turntable stage */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          alt="BMW M Concept Car staged at rear three-quarter angle with dihedral doors raised on circular turntable stage"
          className={`w-full h-full object-cover object-center transition-transform duration-700 ${
            isRevving ? 'scale-105 filter brightness-110 contrast-125' : 'scale-100'
          }`}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIkN3bxppwKViYZnZBfHETHwo1pU2qTvYrg2as0QEjZlACNiLhYCnNLaEvghloSsOPQ79l0nU5OajseJ51ybviLPB1o_PDZi4eR0PFhIVwbjFPHnQy1hhn7TqlYakA5u5WkmvoW6oZ43ub8jG8PCew1_5xLsoezf_JPGxadX0guF-K2Xvhhdc3emJEgBrqYEkSswo2N6BclJsOzVKNQfebfIkVvYnD8EjOnmcX8pzSn97Uf3VbWHE"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]/40"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>
      </div>

      {/* Top Right Content Block */}
      <div className="relative z-10 pt-28 px-6 md:px-margin-edge flex justify-between items-start">
        {/* Left Telemetry Box */}
        <div className="glass-panel p-4 max-w-xs border-l-2 border-l-m-orange">
          <div className="font-mono text-[10px] text-m-orange uppercase tracking-widest flex items-center gap-1.5 font-bold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>DIHEDRAL STAGE // REAR 3/4 ANGLE</span>
          </div>
          <div className="font-mono text-xs text-on-surface-variant">
            CIRCULAR TURNTABLE // EXHAUST PLUMBING SPEC
          </div>
        </div>

        {/* Right Headline */}
        <div className="max-w-sm text-right mix-blend-difference text-white">
          <h1 className="font-display text-2xl md:text-3xl uppercase mb-1 tracking-tight font-bold">
            BMW ///M DIVISION
          </h1>
          <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
            WHERE THE PAST OVERTAKES THE FUTURE.
          </p>
        </div>
      </div>

      {/* Interactive Floating Trigger: ENGINE SOUND 🔊 anchored near rear exhaust area */}
      <div className="relative z-20 mx-auto my-auto flex flex-col items-center gap-4">
        {/* Live Tachometer HUD */}
        <div className="glass-panel px-6 py-3 flex items-center gap-6 border-b-2 border-b-[#E4492E]">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
              TELEMETRY RPM
            </span>
            <span className="font-display text-3xl md:text-4xl text-white">
              {currentRpm.toLocaleString()}
            </span>
          </div>

          {/* RPM Bar Graph */}
          <div className="w-32 md:w-48 h-3 bg-surface-container-high relative overflow-hidden flex">
            <div
              className={`h-full transition-all duration-75 ${
                currentRpm > 9500 ? 'bg-red-600 animate-pulse' : 'bg-[#E4492E]'
              }`}
              style={{ width: `${Math.min(100, (currentRpm / 12000) * 100)}%` }}
            ></div>
          </div>

          {/* Redline Indicator */}
          <div className="flex items-center gap-1">
            {showFlame && <Flame className="w-5 h-5 text-orange-500 animate-bounce" />}
            <span
              className={`font-mono text-[10px] font-bold uppercase ${
                currentRpm > 9500 ? 'text-red-500 animate-pulse' : 'text-on-surface-variant'
              }`}
            >
              {currentRpm > 9500 ? 'REDLINE!' : 'IDLE'}
            </span>
          </div>
        </div>

        {/* Floating Pill Tag: ENGINE SOUND 🔊 */}
        <button
          onClick={handleEngineSound}
          disabled={isRevving}
          className={`font-mono text-xs uppercase px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-200 cursor-pointer shadow-2xl ${
            isRevving
              ? 'bg-[#E4492E] text-white scale-110 shadow-[0_0_45px_rgba(228,73,46,0.9)]'
              : 'bg-[#131313]/90 text-white hover:bg-[#E4492E] hover:text-white border border-white/25 shadow-xl'
          }`}
        >
          <span className="font-bold tracking-widest">
            {isRevving ? 'THROTTLE ENGAGED...' : 'ENGINE SOUND 🔊'}
          </span>
          <Volume2 className={`w-4 h-4 ${isRevving ? 'animate-spin' : 'text-[#E4492E]'}`} />
        </button>
      </div>

      {/* Sticky Bottom Bar (background: #E4492E; color: #FFFFFF) labeled COMMISSION YOUR M-VISION */}
      <footer className="w-full relative z-30 bg-[#E4492E] text-white h-20 md:h-24 flex items-center px-6 md:px-margin-edge justify-between shadow-[0_-4px_30px_rgba(0,0,0,0.8)] border-t border-white/20">
        <div>
          <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide font-bold">
            COMMISSION YOUR M-VISION
          </h2>
          <span className="font-mono text-[10px] text-white/90 uppercase tracking-widest hidden sm:inline">
            CUSTOM BESPOKE SKUNKWORKS DIVISION CHASSIS ALLOCATION
          </span>
        </div>

        {/* Circular expand + toggle */}
        <button
          onClick={() => {
            soundEngine.playPneumatic();
            setIsCommissionOpen(true);
          }}
          className="w-12 h-12 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors group cursor-pointer shadow-xl border border-white/20"
          title="Commission Your M-Vision"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </footer>
    </section>
  );
};
