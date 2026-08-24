import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useStore } from './store/useStore';
import Loader from './components/ui/Loader';
import Navigation from './components/ui/Navigation';
import CartPanel from './components/ui/CartPanel';

import Page1_Showroom    from './components/pages/Page1_Showroom';
import Page2_Configurator from './components/pages/Page2_Configurator';
import Page3_Electric    from './components/pages/Page3_Electric';
import Page4_Cockpit     from './components/pages/Page4_Cockpit';
import Page5_Aero        from './components/pages/Page5_Aero';
import Page6_Vault       from './components/pages/Page6_Vault';

gsap.registerPlugin(ScrollTrigger);

// ── Page progress indicator ───────────────────────────────────────────────────
function PageIndicator({ total, current }) {
  return (
    <div className="page-indicator">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`page-indicator__dot ${i === current ? 'active' : ''}`} />
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const { isLoading, setLoading, setLoadingProgress, currentPage, setCurrentPage } = useStore();
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);

  // ── Simulate asset loading ────────────────────────────────────────────────
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 100) {
        p = 100;
        setLoadingProgress(100);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 600);
      } else {
        setLoadingProgress(p);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // ── Lenis smooth scroll ───────────────────────────────────────────────────
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenisRef.current = lenis;

    lenis.on('scroll', ({ scroll }) => {
      const vh = window.innerHeight;
      const page = Math.round(scroll / vh);
      setCurrentPage(Math.max(0, Math.min(5, page)));
      ScrollTrigger.update();
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [isLoading]);

  const scrollTo = (pageIdx) => {
    const vh = window.innerHeight;
    lenisRef.current?.scrollTo(pageIdx * vh, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  };

  return (
    <div className="app">
      <Loader />

      {!isLoading && (
        <>
          <Navigation scrollTo={scrollTo} />
          <CartPanel />
          <PageIndicator total={6} current={currentPage} />

          {/* Scrollable pages — each has its own background image */}
          <div className="scroll-container" ref={scrollContainerRef}>
            <Page1_Showroom />
            <Page2_Configurator />
            <Page3_Electric />
            <Page4_Cockpit />
            <Page5_Aero />
            <Page6_Vault />
          </div>
        </>
      )}
    </div>
  );
}
