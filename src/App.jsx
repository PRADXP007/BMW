import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

import { useStore } from './store/useStore';
import Loader from './components/ui/Loader';
import Navigation from './components/ui/Navigation';
import CartPanel from './components/ui/CartPanel';

import Page1_Showroom,   { ShowroomScene }   from './components/pages/Page1_Showroom';
import Page2_Configurator, { ConfiguratorScene } from './components/pages/Page2_Configurator';
import Page3_Electric,   { ElectricScene }   from './components/pages/Page3_Electric';
import Page4_Cockpit,    { CockpitScene }    from './components/pages/Page4_Cockpit';
import Page5_Aero,       { AeroScene }       from './components/pages/Page5_Aero';
import Page6_Vault,      { VaultScene }      from './components/pages/Page6_Vault';

gsap.registerPlugin(ScrollTrigger);

// ── Camera Rig (animates with scroll/page) ────────────────────────────────────
const PAGE_CAMERAS = [
  { position: [0, 2.5, 7],   lookAt: [0, 0, 0]   },  // Page 1 — showroom
  { position: [4, 2, 6],     lookAt: [0, 0.3, 0]  },  // Page 2 — configurator
  { position: [0, 1, 5],     lookAt: [0, 0, 0]    },  // Page 3 — electric
  { position: [0, 1.1, 2.5], lookAt: [0, 0.8, -2] },  // Page 4 — cockpit
  { position: [0, 1.5, 7],   lookAt: [0, 0.2, 0]  },  // Page 5 — aero
  { position: [0, 1, 5],     lookAt: [0, 0.3, 0]  },  // Page 6 — vault
];

function CameraController({ pageIndex }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...PAGE_CAMERAS[0].position));
  const targetLook = useRef(new THREE.Vector3(...PAGE_CAMERAS[0].lookAt));

  useEffect(() => {
    const cam = PAGE_CAMERAS[pageIndex] || PAGE_CAMERAS[0];
    targetPos.current.set(...cam.position);
    targetLook.current.set(...cam.lookAt);
  }, [pageIndex]);

  useFrame((_, delta) => {
    camera.position.lerp(targetPos.current, delta * 2);
    const look = new THREE.Vector3();
    look.lerpVectors(camera.getWorldDirection(new THREE.Vector3()), targetLook.current, delta * 2);
    camera.lookAt(targetLook.current);
  });

  return null;
}

// ── Master 3D Scene Switcher ──────────────────────────────────────────────────
function MasterScene({ pageIndex, scrollSpeed }) {
  const { isExploded, skyMode, accentColor, wingAngle, flapsOpen, vaultUnlocked } = useStore();

  return (
    <>
      <CameraController pageIndex={pageIndex} />
      {pageIndex === 0 && <ShowroomScene />}
      {pageIndex === 1 && <ConfiguratorScene isExploded={isExploded} />}
      {pageIndex === 2 && <ElectricScene scrollSpeed={scrollSpeed} />}
      {pageIndex === 3 && <CockpitScene skyMode={skyMode} accentColor={accentColor} />}
      {pageIndex === 4 && <AeroScene wingAngle={wingAngle} flapsOpen={flapsOpen} />}
      {pageIndex === 5 && <VaultScene unlocked={vaultUnlocked} />}
    </>
  );
}

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
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const lastScrollY = useRef(0);
  const scrollSpeedRef = useRef(1);

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

    lenis.on('scroll', ({ scroll, velocity }) => {
      const vh = window.innerHeight;
      const page = Math.round(scroll / vh);
      setCurrentPage(Math.max(0, Math.min(5, page)));
      scrollSpeedRef.current = Math.abs(velocity) + 1;
      setScrollSpeed(scrollSpeedRef.current);
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

          {/* Fixed Canvas — persists across all pages */}
          <div className="canvas-fixed">
            <Canvas
              gl={{
                antialias: false,
                powerPreference: 'high-performance',
                alpha: false,
                stencil: false,
              }}
              dpr={Math.min(window.devicePixelRatio, 2)}
              camera={{ fov: 50, near: 0.1, far: 100 }}
              shadows
            >
              <Suspense fallback={null}>
                <MasterScene pageIndex={currentPage} scrollSpeed={scrollSpeed} />
              </Suspense>
            </Canvas>
          </div>

          {/* Scrollable HTML pages (transparent, on top of canvas) */}
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
