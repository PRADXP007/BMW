import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COLORS = [
  { name: 'Frozen Portimao Blue', hex: '#2B4A6B', class: 'frozen-blue' },
  { name: 'M Carbon Black', hex: '#111111', class: 'carbon-black' },
  { name: 'Isle of Man Green', hex: '#2D5A3D', class: 'isle-green' },
  { name: 'Sao Paulo Yellow', hex: '#D4A017', class: 'sao-yellow' },
  { name: 'Brooklyn Grey', hex: '#7A7A7A', class: 'brooklyn-grey' },
  { name: 'M Competition Red', hex: '#B01B2E', class: 'comp-red' },
  { name: 'Alpine White', hex: '#F2F0EC', class: 'alpine-white' },
  { name: 'Skyscraper Grey', hex: '#4A5568', class: 'sky-grey' },
];

const PACKAGES = [
  { id: 'base', label: 'M4 Coupé', price: '$97,995' },
  { id: 'comp', label: 'M4 Competition', price: '$108,995' },
  { id: 'xdrive', label: 'M4 Competition xDrive', price: '$116,995' },
  { id: 'cs', label: 'M4 CS', price: '$149,995' },
];

export function initConfigurator() {
  const section = document.getElementById('configurator-view');
  if (!section) return;

  // Color swatch selection
  const swatches = section.querySelectorAll<HTMLElement>('.color-swatch');
  const colorName = section.querySelector<HTMLElement>('.selected-color-name');
  const carColorOverlay = section.querySelector<HTMLElement>('.car-color-overlay');
  const priceDisplay = section.querySelector<HTMLElement>('.price-display');

  let activeColor = COLORS[0];
  let activePackage = PACKAGES[1]; // Competition default

  function selectColor(idx: number) {
    activeColor = COLORS[idx];
    swatches.forEach((s, i) => s.classList.toggle('active', i === idx));
    if (colorName) {
      gsap.fromTo(colorName,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      colorName.textContent = activeColor.name;
    }
    if (carColorOverlay) {
      carColorOverlay.style.background = activeColor.hex;
      gsap.fromTo(carColorOverlay, { opacity: 0 }, { opacity: 0.15, duration: 0.4 });
    }
  }

  swatches.forEach((swatch, idx) => {
    const color = COLORS[idx];
    if (color) {
      swatch.style.background = color.hex;
      swatch.title = color.name;
      swatch.addEventListener('click', () => selectColor(idx));
    }
  });

  // Initialize first swatch
  if (swatches.length) selectColor(0);

  // Package selection
  const pkgBtns = section.querySelectorAll<HTMLElement>('[data-package]');
  pkgBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pkgId = btn.dataset.package!;
      const pkg = PACKAGES.find(p => p.id === pkgId);
      if (!pkg) return;
      activePackage = pkg;
      pkgBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (priceDisplay) {
        gsap.fromTo(priceDisplay,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
        );
        priceDisplay.textContent = pkg.price;
      }
    });
  });

  // Scroll entrance animations
  const cards = section.querySelectorAll<HTMLElement>('.spec-card');
  if (cards.length) {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
      },
    });
  }
}
