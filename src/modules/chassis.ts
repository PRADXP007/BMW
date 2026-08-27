import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ── Spec data rows that scroll in sync ────────────────────────────────
const SPECS = [
  { label: 'CURB WEIGHT', value: '3,748 LBS', unit: 'LBS' },
  { label: '0 — 60 MPH', value: '3.4 SEC', unit: 'SEC' },
  { label: 'MAX RPM', value: '7,200 RPM', unit: 'RPM' },
  { label: 'PEAK POWER', value: '503 HP', unit: 'HP' },
  { label: 'MAX TORQUE', value: '479 LB-FT', unit: 'LB-FT' },
  { label: 'COMPRESSION', value: '10.2 : 1', unit: '' },
  { label: 'BORE × STROKE', value: '84 × 89.6', unit: 'MM' },
  { label: 'TOP SPEED', value: '180 MPH', unit: 'MPH' },
];

export function initChassisSection(_lenis: Lenis) {
  const section = document.getElementById('chassis-view');
  if (!section) return;

  const carImg = section.querySelector<HTMLElement>('.chassis-car');
  const specValue = section.querySelector<HTMLElement>('.spec-value');
  const specLabel = section.querySelector<HTMLElement>('.spec-label');
  const specIndex = section.querySelector<HTMLElement>('.spec-index');
  const bmwLabel = section.querySelector<HTMLElement>('.pin-left');
  const numLabel = section.querySelector<HTMLElement>('.pin-right');
  const cables = section.querySelectorAll<HTMLElement>('.cable-line');

  let currentSpec = 0;

  function updateSpec(idx: number) {
    const spec = SPECS[idx % SPECS.length];
    if (specValue) specValue.textContent = spec.value;
    if (specLabel) specLabel.textContent = spec.label;
    if (specIndex) specIndex.textContent = `0${(idx % SPECS.length) + 1} / 0${SPECS.length}`;
  }

  updateSpec(0);

  // Pin section + drive spec counter
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: `+=${SPECS.length * 100}vh`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const idx = Math.floor(self.progress * SPECS.length);
      if (idx !== currentSpec) {
        currentSpec = idx;
        updateSpec(idx);

        // Animate spec change
        if (specValue) {
          gsap.fromTo(specValue,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
          );
        }
      }

      // Car parallax float on scroll
      if (carImg) {
        gsap.set(carImg, { y: self.progress * -40 });
      }

      // Cable tension: slightly stretch
      cables.forEach((cable) => {
        gsap.set(cable, { scaleY: 1 + self.progress * 0.08 });
      });

      // BMW / 01 labels drift apart
      if (bmwLabel) gsap.set(bmwLabel, { x: self.progress * -30 });
      if (numLabel) gsap.set(numLabel, { x: self.progress * 30 });
    },
  });

  // Entrance animation (triggered when this section first enters)
  ScrollTrigger.create({
    trigger: section,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      if (carImg) {
        gsap.fromTo(carImg,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
        );
      }
    },
  });
}
