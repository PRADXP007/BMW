import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { Volume2, VolumeX, Radio } from 'lucide-react';

interface NavbarProps {
  theme?: 'dark' | 'light' | 'transparent';
}

export const Navbar: React.FC<NavbarProps> = ({ theme = 'dark' }) => {
  const { setIsCommissionOpen, isMuted, toggleMute } = useAppStore();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' CET'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAudioToggle = () => {
    const muted = soundEngine.toggleMute();
    if (!muted) {
      soundEngine.playClick(1000);
    }
    toggleMute();
  };

  const handleNavClick = (anchor: string) => {
    soundEngine.playClick(900);
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLight = theme === 'light';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 px-6 md:px-margin-edge py-4 md:py-6 flex justify-between items-center transition-all duration-300 ${
        isLight
          ? 'bg-[#EBEBEB]/90 text-[#0D0D0D] border-b border-black/10 backdrop-blur-md'
          : 'bg-[#131313]/90 text-white border-b border-white/10 backdrop-blur-md'
      }`}
    >
      {/* Brand Emblem & Model Designation: "BMW MOTORSPORT" */}
      <div className="flex items-center gap-4">
        <a
          href="#chassis-view"
          onClick={() => handleNavClick('#chassis-view')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-5 h-5 flex flex-col justify-between py-[2px]">
            <div className="w-full h-[3px] bg-[#0066B1]"></div>
            <div className="w-full h-[3px] bg-[#002B49]"></div>
            <div className="w-full h-[3px] bg-[#E4492E]"></div>
          </div>
          <span className="font-display text-xl md:text-2xl tracking-tighter uppercase font-bold group-hover:text-[#E4492E] transition-colors">
            BMW MOTORSPORT
          </span>
        </a>

        {/* Telemetry Clock */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-on-surface-variant pl-4 border-l border-white/20">
          <Radio className="w-3 h-3 text-[#E4492E] animate-pulse" />
          <span>MUNICH: {time}</span>
        </div>
      </div>

      {/* Navigation Links: GALLERY, CAR TOUR, ABOUT */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-12">
        <button
          onClick={() => handleNavClick('#chassis-view')}
          className={`font-mono text-xs uppercase tracking-widest transition-colors font-bold ${
            isLight
              ? 'text-[#0D0D0D] hover:text-[#E4492E]'
              : 'text-white hover:text-[#E4492E]'
          }`}
        >
          GALLERY
        </button>
        <button
          onClick={() => handleNavClick('#showroom')}
          className="font-mono text-xs uppercase tracking-widest text-on-surface-variant hover:text-[#E4492E] transition-colors font-bold"
        >
          CAR TOUR
        </button>
        <button
          onClick={() => handleNavClick('#manifesto-view')}
          className="font-mono text-xs uppercase tracking-widest text-on-surface-variant hover:text-[#E4492E] transition-colors font-bold"
        >
          ABOUT
        </button>
      </nav>

      {/* Action Controls & COMMISSION >> Pill Button */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Sound FX Toggle */}
        <button
          onClick={handleAudioToggle}
          title={isMuted ? 'Unmute Spatial Audio' : 'Mute Audio'}
          className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${
            isLight
              ? 'border-black/20 text-[#0D0D0D] hover:bg-black hover:text-white'
              : 'border-white/20 text-white hover:bg-white hover:text-black'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#E4492E]" />}
        </button>

        {/* COMMISSION >> Pill Button */}
        <button
          onClick={() => {
            soundEngine.playPneumatic();
            setIsCommissionOpen(true);
          }}
          className={`font-mono text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-widest transition-all duration-150 flex items-center gap-2 shadow-lg ${
            isLight
              ? 'bg-[#0D0D0D] text-white hover:bg-[#E4492E]'
              : 'bg-white text-[#0D0D0D] hover:bg-[#E4492E] hover:text-white'
          }`}
        >
          <span>COMMISSION</span>
          <span className="text-sm font-bold">&gt;&gt;</span>
        </button>
      </div>
    </header>
  );
};
