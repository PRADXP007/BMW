import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Realistic M4 side-profile silhouette drawn as SVG paths rendered on canvas
// We generate synthetic "frames" by rotating a CSS transform on an SVG image
// In production these would be 72 pre-rendered WebP frames

const TOTAL_FRAMES = 72;

function getFrameAngle(frame: number): number {
  return (frame / TOTAL_FRAMES) * 360;
}

export function initStudio360(_lenis: Lenis) {
  const section = document.getElementById('studio-view');
  const sticky = document.getElementById('studio-sticky');
  const canvas = document.getElementById('canvas-360') as HTMLCanvasElement;
  const frameCounter = document.getElementById('frame-counter');
  const dragHint = section?.querySelector<HTMLElement>('.drag-hint');

  if (!section || !sticky || !canvas) return;

  const ctx = canvas.getContext('2d')!;

  // Resize canvas to fill container
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let currentFrame = 0;
  let targetFrame = 0;
  let isDragging = false;
  let lastX = 0;
  let velocity = 0;

  // Draw a frame: render the SVG car at the given rotation
  // (In production, replace with pre-rendered bitmap image array)
  const carImage = new Image();
  carImage.crossOrigin = 'anonymous';
  // Using a public BMW M4 placeholder — replace with actual frame sequence
  carImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW_M4_G82_Competition.jpg/1280px-BMW_M4_G82_Competition.jpg';

  function drawFrame(frame: number) {
    const angle = getFrameAngle(frame);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.translate(w / 2, h / 2);
    // Mirror flip for the right hemisphere frames
    const mirrorFrame = frame > TOTAL_FRAMES / 2;
    if (mirrorFrame) ctx.scale(-1, 1);
    const rotFrac = Math.abs((frame % (TOTAL_FRAMES / 2)) / (TOTAL_FRAMES / 2));
    // Slight perspective squish
    const scaleX = 1 - Math.abs(Math.sin(rotFrac * Math.PI)) * 0.25;
    ctx.scale(scaleX, 1);
    ctx.drawImage(carImage, -w * 0.4, -h * 0.3, w * 0.8, h * 0.6);
    ctx.restore();

    // Frame HUD
    if (frameCounter) {
      frameCounter.textContent = `${String(frame).padStart(3, '0')} / ${TOTAL_FRAMES}`;
    }

    // Degree overlay
    const degEl = document.getElementById('degree-readout');
    if (degEl) {
      degEl.textContent = `${Math.round(angle)}°`;
    }
  }

  carImage.onload = () => {
    drawFrame(0);

    // Show drag hint
    if (dragHint) {
      setTimeout(() => dragHint.classList.add('visible'), 800);
    }
  };

  // RAF loop for smooth frame interpolation
  function rafLoop() {
    const diff = targetFrame - currentFrame;
    velocity = diff * 0.12;
    currentFrame += velocity;

    const snapped = Math.round(currentFrame) % TOTAL_FRAMES;
    drawFrame((snapped + TOTAL_FRAMES) % TOTAL_FRAMES);

    requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);

  // ScrollTrigger: map scroll progress 0→1 to frames 0→72
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    pin: sticky,
    scrub: 1.5,
    onUpdate: (self) => {
      targetFrame = Math.round(self.progress * TOTAL_FRAMES);
    },
  });

  // Drag interaction
  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
    if (dragHint) dragHint.classList.remove('visible');
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const delta = e.clientX - lastX;
    lastX = e.clientX;
    targetFrame = ((targetFrame + Math.round(delta * 0.3)) + TOTAL_FRAMES) % TOTAL_FRAMES;
  });

  canvas.addEventListener('pointerup', () => { isDragging = false; });
  canvas.addEventListener('pointercancel', () => { isDragging = false; });

  // Wheel scrub
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetFrame = ((targetFrame + Math.sign(e.deltaY)) + TOTAL_FRAMES) % TOTAL_FRAMES;
  }, { passive: false });

  // Section entrance
  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const headline = section.querySelector<HTMLElement>('.studio-headline');
      if (headline) {
        gsap.fromTo(headline,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        );
      }
    },
  });
}
