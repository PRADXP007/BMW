import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCommissionSection() {
  const section = document.getElementById('commission-view');
  if (!section) return;

  const headline = section.querySelector<HTMLElement>('.commission-headline');
  const btn = section.querySelector<HTMLElement>('.commission-cta');
  const form = document.getElementById('commission-form');
  const closeBtn = document.getElementById('close-commission');

  // Entrance
  ScrollTrigger.create({
    trigger: section,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      if (headline) {
        gsap.fromTo(headline,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
        );
      }
      if (btn) {
        gsap.fromTo(btn,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
        );
      }
    },
  });

  // Open commission form
  if (btn && form) {
    btn.addEventListener('click', () => {
      gsap.fromTo(form,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power4.out', display: 'flex' }
      );
      form.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close form
  if (closeBtn && form) {
    closeBtn.addEventListener('click', () => {
      gsap.to(form, {
        yPercent: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          form.style.display = 'none';
          form.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        },
      });
    });
  }

  // Organic background distortion
  const bg = section.querySelector<HTMLElement>('.commission-bg');
  if (bg) {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
      gsap.to(bg, { x, y, duration: 1.5, ease: 'power2.out' });
    });
  }
}
