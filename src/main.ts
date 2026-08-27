import './index.css';
import { initCursor } from './modules/cursor';
import { initLenis } from './modules/lenis';
import { initPreloader } from './modules/preloader';
import { initNavbar } from './modules/navbar';
import { initChassisSection } from './modules/chassis';
import { initStudio360 } from './modules/studio360';
import { initConfigurator } from './modules/configurator';
import { initMaterialsSection } from './modules/materials';
import { initManifestoSection } from './modules/manifesto';
import { initCommissionSection } from './modules/commission';
import { initDoorReveal } from './modules/doorReveal';
import { initSoundEngine } from './modules/sound.init';
import { initBottomDrawer } from './modules/bottomDrawer';
import { initMarquee } from './modules/marquee';

// ── Boot sequence ──────────────────────────────────────────────────────
async function boot() {
  initCursor();
  initSoundEngine();
  initNavbar();
  initMarquee();
  initBottomDrawer();

  // Preloader runs first — blocks until user clicks ENTER
  await initPreloader();

  // After preloader exits, wire all interactive modules
  const lenis = initLenis();

  initChassisSection(lenis);
  initDoorReveal();
  initStudio360(lenis);
  initConfigurator();
  initMaterialsSection();
  initManifestoSection();
  initCommissionSection();
}

boot();
