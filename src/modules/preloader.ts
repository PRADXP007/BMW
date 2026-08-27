import { gsap } from 'gsap';

// ── Kinetic word stagger on preloader ──────────────────────────────────
export function initPreloader(): Promise<void> {
  return new Promise((resolve) => {
    const preloader = document.getElementById('preloader')!;
    const words = preloader.querySelectorAll<HTMLElement>('.hero-word span');
    const progressFill = preloader.querySelector<HTMLElement>('.progress-bar-fill')!;
    const enterBtn = document.getElementById('enter-btn')!;
    const metaLine = preloader.querySelector<HTMLElement>('.meta-line')!;
    const curtain = document.getElementById('preloader-curtain')!;

    // Entrance TL
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to(words, {
      y: 0,
      duration: 1.1,
      stagger: 0.09,
      delay: 0.3,
    });

    tl.to(metaLine, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

    // Simulated progress counter
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Show enter button
        gsap.to(enterBtn, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 });
      }
      progressFill.style.width = `${Math.min(progress, 100)}%`;
    }, 120);

    // Enter button click
    enterBtn.addEventListener('click', () => {
      // Curtain wipe upward
      gsap.to(curtain, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          preloader.style.display = 'none';
          resolve();
        },
      });
    }, { once: true });
  });
}
