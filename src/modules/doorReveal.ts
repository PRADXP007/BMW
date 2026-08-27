import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initDoorReveal() {
  const section = document.getElementById('door-reveal');
  if (!section) return;

  const img = document.getElementById('door-reveal-img') as HTMLImageElement;
  const leftCopy = section.querySelector<HTMLElement>('[style*="left:60px;bottom"]');
  const rightHud = section.querySelector<HTMLElement>('[style*="right:60px;bottom"]');
  const pills = section.querySelectorAll<HTMLElement>('[style*="background:rgba(228"],.text-mono-xs');

  // Ken-Burns: zoom out from 1.05 to 1.0 as section enters
  ScrollTrigger.create({
    trigger: section,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      if (img) {
        gsap.to(img, {
          scale: 1,
          duration: 1.8,
          ease: 'power2.out',
        });
      }

      // Headline slides up
      if (leftCopy) {
        gsap.fromTo(leftCopy,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.2 }
        );
      }

      // HUD panels cascade in from right
      const hudPanels = rightHud?.querySelectorAll<HTMLElement>('div');
      if (hudPanels) {
        gsap.fromTo(hudPanels,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
        );
      }
    },
  });

  // Subtle parallax on image: slightly shift upward as user scrolls through
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      if (img) {
        gsap.set(img, { y: self.progress * -60 });
      }
    },
  });
}
