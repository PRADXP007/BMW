import { gsap } from 'gsap';

export function initBottomDrawer() {
  const drawer = document.getElementById('bottom-drawer');
  if (!drawer) return;

  // Show after 4 seconds
  setTimeout(() => {
    drawer.classList.add('visible');
    gsap.fromTo(drawer,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.7, ease: 'power4.out' }
    );
  }, 4000);

  const cta = drawer.querySelector<HTMLElement>('[data-commission-open]');
  if (cta) {
    cta.addEventListener('click', () => {
      // Proxy to commission CTA
      document.querySelector<HTMLElement>('.commission-cta')?.click();
    });
  }

  const dismiss = drawer.querySelector<HTMLElement>('[data-dismiss]');
  if (dismiss) {
    dismiss.addEventListener('click', () => {
      gsap.to(drawer, {
        yPercent: 100,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => drawer.remove(),
      });
    });
  }
}
