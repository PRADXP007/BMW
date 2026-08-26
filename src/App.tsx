import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { ChassisHero } from './components/ChassisHero';
import { ShowroomSection } from './components/ShowroomSection';
import { ConfiguratorSection } from './components/ConfiguratorSection';
import { StudioView360 } from './components/StudioView360';
import { EditorialSection } from './components/EditorialSection';
import { TypographicTransition } from './components/TypographicTransition';
import { DeepDiveModal } from './components/DeepDiveModal';
import { CommissionModal } from './components/CommissionModal';
import { SpecSheetModal } from './components/SpecSheetModal';
import { useAppStore } from './store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const { hasEntered } = useAppStore();
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    // 1. Smooth Momentum Physics (Lenis) with GSAP Ticker Cycle Integration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Root instance bound to GSAP ticker cycle (lenis.raf(time * 1000))
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Dynamic navbar theme switcher based on scroll position
    const handleScroll = () => {
      const hero = document.getElementById('chassis-view');
      const configurator = document.getElementById('configurator');
      const scrollY = window.scrollY;

      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      const configTop = configurator ? configurator.offsetTop : 0;
      const configBottom = configurator ? configurator.offsetTop + configurator.offsetHeight : 0;

      if (scrollY < heroBottom - 80 || (scrollY >= configTop - 80 && scrollY < configBottom - 80)) {
        setNavTheme('light');
      } else {
        setNavTheme('dark');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative bg-surface-dim text-white font-mono min-h-screen overflow-x-hidden">
      {/* 1. Preloader Screen (Screen 8e8bdd72f9bf4960b067595bfbf270f6) with 360 Cache Preloading */}
      <Preloader />

      {/* Main Experience (Visible after entry) */}
      {hasEntered && (
        <>
          {/* Top Navigation */}
          <Navbar theme={navTheme} />

          <main className="flex flex-col w-full">
            {/* Section 02 (#chassis-view): Pinned horizontal/vertical spec sync */}
            <ChassisHero />

            {/* Section 03 (#showroom): Studio Showroom & Procedural Engine Audio */}
            <ShowroomSection />

            {/* Section 04: Configurator & Architectural Pillars Launchpad */}
            <ConfiguratorSection />

            {/* Section 05 (#studio-view): 360-degree canvas frame scrub mapped to ScrollTrigger */}
            <StudioView360 />

            {/* Section 06 (#manifesto-view): 50/50 split screen with sticky left column & SplitType */}
            <EditorialSection />

            {/* Section 07: Typographic Manifesto & Bottom Car Reveal */}
            <TypographicTransition />
          </main>

          {/* Deep Dive Modals (ORIGIN, BEAUTY, ASYLUM, OBSESSION, STRENGTH) */}
          <DeepDiveModal />

          {/* Commission Build Studio Modal */}
          <CommissionModal />

          {/* Full Engineering Specification Matrix Modal */}
          <SpecSheetModal />
        </>
      )}
    </div>
  );
};

export default App;
