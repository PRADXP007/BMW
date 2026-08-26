import React, { useState, useEffect } from 'react';
import { useExperienceStore } from '../store/useExperienceStore';
import { Navigation } from '../components/layout/Navigation';
import { BottomDrawer } from '../components/layout/BottomDrawer';
import { PreloaderGate } from '../components/sections/01_PreloaderGate';
import { HeroChassis } from '../components/sections/02_HeroChassis';
import { TurntableSound } from '../components/sections/03_TurntableSound';
import { StudioExplorer } from '../components/sections/04_StudioExplorer';
import { DynamicLight } from '../components/sections/05_DynamicLight';
import { TypoBridge } from '../components/sections/06_TypoBridge';
import { ManifestoSplit } from '../components/sections/07_ManifestoSplit';
import { DeepDiveModal } from '../components/modals/DeepDiveModal';
import { CommissionModal } from '../components/CommissionModal';
import { SpecSheetModal } from '../components/SpecSheetModal';

export const MasterPage: React.FC = () => {
  const { hasEntered } = useExperienceStore();
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('chassis-view');
      const config = document.getElementById('configurator-view');
      const scrollY = window.scrollY;

      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      const configTop = config ? config.offsetTop : 0;
      const configBottom = config ? config.offsetTop + config.offsetHeight : 0;

      if (scrollY < heroBottom - 80 || (scrollY >= configTop - 80 && scrollY < configBottom - 80)) {
        setNavTheme('light');
      } else {
        setNavTheme('dark');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* Screen 01: Preloader Gate */}
      <PreloaderGate />

      {/* Sequential Interactive Sections (Visible after entry) */}
      {hasEntered && (
        <>
          {/* Navigation */}
          <Navigation theme={navTheme} />

          <main className="flex flex-col w-full">
            {/* Screen 02: Suspended Chassis & Telemetry */}
            <HeroChassis />

            {/* Screen 03: Turntable Showcase & Sound Stage */}
            <TurntableSound />

            {/* Screen 04: Studio 360 Configurator & Section Sidebar */}
            <StudioExplorer />

            {/* Screen 05: Dynamic Light & Drag Stage */}
            <DynamicLight />

            {/* Screen 06: Parallax Typographic Scroll Bridge */}
            <TypoBridge />

            {/* Screen 07: 50/50 Brand Manifesto */}
            <ManifestoSplit />
          </main>

          {/* Persistent Bottom Drawer */}
          <BottomDrawer />

          {/* Screens 08-12: Deep-Dive Slide-In Modals */}
          <DeepDiveModal />

          {/* Skunkworks Commission Studio Modal */}
          <CommissionModal />

          {/* Full Engineering Specification Matrix Modal */}
          <SpecSheetModal />
        </>
      )}
    </div>
  );
};

export default MasterPage;
