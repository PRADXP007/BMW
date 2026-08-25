document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Motion Preference Check
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isReduced = reduceMotion.matches;

  // 2. Lenis Setup & Sync
  let lenis = null;
  if (!isReduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);
  }

  // Register ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // DOM Elements
    const heroTitle = document.querySelector('.hero-title');
    const introCopy = document.querySelector('.intro-copy');
    const heroCarImg = document.querySelector('.hero-car-img');
    const splitLeft = document.querySelector('.splitframe-left');
    const splitRight = document.querySelector('.splitframe-right');
    const frameTwoImg = document.querySelector('.frame-two-img');
    const skyImg = document.querySelector('.sky-img');
    const backGarage = document.querySelector('.back-garage');
    const backStack = document.querySelector('.back-stack');
    const shade = document.querySelector('.shade');
    const panelPower = document.querySelector('.story-panel-power');
    const panelCockpit = document.querySelector('.story-panel-cockpit');
    const sightsSlider = document.querySelector('.sights-slider');
    const sightsControls = document.querySelector('.sights-controls');

    // Master Timeline pinned over 3700px
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: '#cinema',
        start: 'top top',
        end: '+=3700',
        scrub: isReduced ? true : 0.3,
        pin: '.stage',
        anticipatePin: 1,
        onUpdate: (self) => {
          if (sightsControls) {
            if (self.progress >= 0.96) {
              sightsControls.classList.add('is-ready');
            } else {
              sightsControls.classList.remove('is-ready');
            }
          }
        },
      },
    });

    // Custom power-eased curve approximations (matching power^1.5 & power^1.55 curves)
    // 1 unit on timeline = 1 pixel of scroll (0 to 3700)

    // BEAT 1: 0 → 650 (Title & Intro Exit)
    master.to(
      heroTitle,
      {
        y: -210,
        scale: 0.92,
        opacity: 0,
        ease: 'power2.out',
        duration: 650,
      },
      0
    );

    master.to(
      introCopy,
      {
        y: 90,
        opacity: 0,
        ease: 'power2.out',
        duration: 520,
      },
      0
    );

    // BEAT 2: 560 → 1620 (Engine-Reveal Act)
    // Hero car expands and lifts
    master.fromTo(
      heroCarImg,
      { width: '67.2vw', bottom: '5vh', y: 0, scale: 1.02, opacity: 1 },
      {
        width: '105vw',
        bottom: '-8vh',
        y: -760,
        scale: 1.48,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 1060, // 560 to 1620
      },
      560
    );

    // Splitframes part symmetrically
    master.fromTo(
      splitLeft,
      { x: '-50%', y: 0, scale: 1, opacity: 1 },
      {
        x: '-96vw',
        y: -180,
        scale: 1.74,
        opacity: 0,
        ease: 'power2.out',
        duration: 940, // 600 to 1540
      },
      600
    );

    master.fromTo(
      splitRight,
      { x: '-50%', y: 0, scale: 1, opacity: 1 },
      {
        x: '46vw',
        y: -180,
        scale: 1.74,
        opacity: 0,
        ease: 'power2.out',
        duration: 940, // 600 to 1540
      },
      600
    );

    // Frame Two (Cockpit) reveal
    master.fromTo(
      frameTwoImg,
      { opacity: 0, scale: 1.06 },
      {
        opacity: 1,
        scale: 1.0,
        ease: 'power2.out',
        duration: 550, // 1300 to 1850
      },
      1300
    );

    // Back layer filters & shade gradient tint
    const shadeProxy = { top: 0, mid: 0, bottom: 0, blur: 0, bright: 1 };
    master.to(
      shadeProxy,
      {
        top: 0.465,
        mid: 0.42,
        bottom: 0.51,
        blur: 14,
        bright: 0.745,
        duration: 640, // 600 to 1240
        ease: 'power2.out',
        onUpdate: () => {
          document.documentElement.style.setProperty('--shade-top', shadeProxy.top.toFixed(3));
          document.documentElement.style.setProperty('--shade-mid', shadeProxy.mid.toFixed(3));
          document.documentElement.style.setProperty('--shade-bottom', shadeProxy.bottom.toFixed(3));
          if (skyImg) skyImg.style.filter = `blur(${shadeProxy.blur}px) brightness(${shadeProxy.bright})`;
          if (backGarage) backGarage.style.filter = `blur(${shadeProxy.blur * 0.4}px) brightness(${shadeProxy.bright})`;
        },
      },
      600
    );

    // Power panel enter (680 → 960) and exit (1280 → 1620)
    master.fromTo(
      panelPower,
      { opacity: 0, y: 'calc(-50% + 58px)' },
      {
        opacity: 1,
        y: 'calc(-50% + 0px)',
        duration: 280,
        ease: 'power2.out',
      },
      680
    );

    master.to(
      panelPower,
      {
        opacity: 0,
        y: 'calc(-50% - 86px)',
        duration: 340,
        ease: 'power2.in',
      },
      1280
    );

    // BEAT 3: 1760 → 2700 (Cockpit Act)
    // Garage saturation boost
    const garageProxy = { sat: 1 };
    master.to(
      garageProxy,
      {
        sat: 1.18,
        duration: 640,
        ease: 'power2.out',
        onUpdate: () => {
          if (backGarage) {
            backGarage.style.filter = `saturate(${garageProxy.sat.toFixed(2)})`;
          }
        },
      },
      1760
    );

    // Cockpit panel enter (1760 → 2140) and exit (2500 → 2700)
    master.fromTo(
      panelCockpit,
      { opacity: 0, y: 'calc(-50% + 58px)' },
      {
        opacity: 1,
        y: 'calc(-50% + 0px)',
        duration: 380,
        ease: 'power2.out',
      },
      1760
    );

    master.to(
      panelCockpit,
      {
        opacity: 0,
        y: 'calc(-50% - 86px)',
        duration: 200,
        ease: 'power2.in',
      },
      2500
    );

    // Frame Two (Cockpit) exit
    master.to(
      frameTwoImg,
      {
        opacity: 0,
        scale: 0.94,
        duration: 300,
        ease: 'power2.in',
      },
      2500
    );

    // BEAT 4: 2760 → 3560 (Spec Cards Entrance) & Back zoom
    master.to(
      backStack,
      {
        scale: 1.15,
        duration: 1200, // 2400 to 3600
        ease: 'power1.inOut',
      },
      2400
    );

    master.set(
      sightsSlider,
      {
        visibility: 'visible',
      },
      2740
    );

    master.fromTo(
      sightsSlider,
      {
        x: '420vw',
        opacity: 0,
        scale: 1.25,
      },
      {
        x: '0vw',
        opacity: 1,
        scale: 1.0,
        duration: 800, // 2760 to 3560
        ease: 'power3.out',
      },
      2760
    );

    // BEAT 5: 3360 → 3660 (Controls Fade)
    master.fromTo(
      sightsControls,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 300, // 3360 to 3660
        ease: 'power2.out',
      },
      3360
    );

    // 4. Pointer Parallax (gsap.quickTo)
    if (!isReduced) {
      const setBackX = gsap.quickTo(backStack, 'x', { duration: 0.8, ease: 'power3.out' });
      const setBackY = gsap.quickTo(backStack, 'y', { duration: 0.8, ease: 'power3.out' });
      const setHeroX = gsap.quickTo(heroCarImg, 'x', { duration: 0.6, ease: 'power2.out' });
      const setHeroY = gsap.quickTo(heroCarImg, 'y', { duration: 0.6, ease: 'power2.out' });

      window.addEventListener(
        'pointermove',
        (e) => {
          const normX = (e.clientX / window.innerWidth - 0.5) * 2;
          const normY = (e.clientY / window.innerHeight - 0.5) * 2;
          setBackX(normX * 18);
          setBackY(normY * 14);
          setHeroX(normX * -12);
          setHeroY(normY * -8);
        },
        { passive: true }
      );
    }
  }

  // 5. Infinite Spec-Card Slider Logic
  const track = document.querySelector('.sights-track');
  const cards = document.querySelectorAll('.sight-card');
  const prevBtn = document.querySelector('.sight-prev');
  const nextBtn = document.querySelector('.sight-next');

  let activeSight = 5; // Middle set start
  let isSliderAnimating = false;

  function getStepWidth() {
    if (!cards.length || !track) return 400;
    const cardRect = cards[0].getBoundingClientRect();
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 20;
    return cardRect.width + gap;
  }

  function updateSlider(animate = true) {
    if (!track) return;
    const step = getStepWidth();
    const targetX = -(activeSight * step);

    if (!animate) {
      gsap.set(track, { x: targetX });
      return;
    }

    isSliderAnimating = true;
    gsap.to(track, {
      x: targetX,
      duration: 0.64,
      ease: 'power3.out',
      onComplete: () => {
        isSliderAnimating = false;
        // Instant normalization jump
        if (activeSight >= 10) {
          activeSight -= 5;
          gsap.set(track, { x: -(activeSight * getStepWidth()) });
        } else if (activeSight < 5) {
          activeSight += 5;
          gsap.set(track, { x: -(activeSight * getStepWidth()) });
        }
      },
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isSliderAnimating) return;
      activeSight++;
      updateSlider(true);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isSliderAnimating) return;
      activeSight--;
      updateSlider(true);
    });
  }

  // Card clicks & keyboard support
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      activeSight = idx;
      updateSlider(true);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activeSight = idx;
        updateSlider(true);
      }
    });
  });

  // Note button interaction
  const noteBtn = document.querySelector('.note-button');
  if (noteBtn) {
    noteBtn.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(3700, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 3700, behavior: 'smooth' });
      }
    });
  }

  // Resize handler
  window.addEventListener('resize', () => {
    updateSlider(false);
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });

  // Initialize slider position
  updateSlider(false);
});
