import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initNavbar() {
  const navbar = document.getElementById('navbar')!;

  ScrollTrigger.create({
    start: 'top+=80',
    onToggle: ({ isActive }) => {
      navbar.classList.toggle('scrolled', isActive);
    },
  });

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }
}
