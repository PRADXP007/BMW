import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMaterialsSection() {
  const section = document.getElementById('materials-view');
  if (!section) return;

  const items = section.querySelectorAll<HTMLElement>('.material-item');

  // Stagger entrance
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.fromTo(items,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
      );
    },
  });

  // Hover: expand selected material
  items.forEach((item) => {
    const img = item.querySelector<HTMLElement>('.material-img');

    item.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
      gsap.to(item, { borderColor: '#E4492E', duration: 0.3 });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
      gsap.to(item, { borderColor: 'rgba(255,255,255,0.08)', duration: 0.3 });
    });
  });
}
