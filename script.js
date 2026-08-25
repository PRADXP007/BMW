document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Motion Preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Lenis Smooth Scrolling Setup
  let lenis = null;
  if (!prefersReduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // 3. Ambient Cursor Glow Tracking
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && !prefersReduced) {
    window.addEventListener('pointermove', (e) => {
      gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }

  // 4. GSAP & ScrollTrigger Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const sceneLayers = document.querySelectorAll('.scene-layer');
    const sections = document.querySelectorAll('.story-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressSteps = document.querySelectorAll('.progress-step');

    // Function to switch active scene layer & navigation
    function activateSection(index) {
      sceneLayers.forEach((layer, i) => {
        if (i === index) {
          layer.classList.add('active');
          gsap.fromTo(layer.querySelector('.scene-img'), { scale: 1.06 }, { scale: 1.0, duration: 1.2, ease: 'power2.out' });
        } else if (index < sceneLayers.length) {
          layer.classList.remove('active');
        }
      });

      navLinks.forEach((link, i) => {
        if (i === index) link.classList.add('active');
        else link.classList.remove('active');
      });

      progressSteps.forEach((step, i) => {
        if (i === index) step.classList.add('active');
        else step.classList.remove('active');
      });
    }

    // Story Section 1: Hero
    ScrollTrigger.create({
      trigger: '#section-hero',
      start: 'top 60%',
      end: 'bottom 60%',
      onEnter: () => activateSection(0),
      onEnterBack: () => activateSection(0),
    });

    gsap.fromTo(
      '.hero-card-left',
      { x: -120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#section-hero',
          start: 'top 70%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    gsap.fromTo(
      '.hero-card-right',
      { x: 120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: '#section-hero',
          start: 'top 70%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    // Story Section 2: Profile (Side View)
    ScrollTrigger.create({
      trigger: '#section-profile',
      start: 'top 60%',
      end: 'bottom 60%',
      onEnter: () => activateSection(1),
      onEnterBack: () => activateSection(1),
    });

    gsap.fromTo(
      '.profile-card-left',
      { x: -140, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '#section-profile',
          start: 'top 65%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    gsap.fromTo(
      '.profile-card-right',
      { x: 140, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.2)',
        delay: 0.2,
        scrollTrigger: {
          trigger: '#section-profile',
          start: 'top 65%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    // Story Section 3: Rear Dynamics (Rear View)
    ScrollTrigger.create({
      trigger: '#section-rear',
      start: 'top 60%',
      end: 'bottom 60%',
      onEnter: () => activateSection(2),
      onEnterBack: () => activateSection(2),
    });

    gsap.fromTo(
      '.rear-card-left',
      { x: -140, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#section-rear',
          start: 'top 65%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    gsap.fromTo(
      '.rear-card-right',
      { x: 140, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '#section-rear',
          start: 'top 65%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    // Story Section 4: Technical Matrix
    ScrollTrigger.create({
      trigger: '#section-specs',
      start: 'top 60%',
      end: 'bottom 60%',
      onEnter: () => activateSection(3),
      onEnterBack: () => activateSection(3),
    });

    gsap.fromTo(
      '.spec-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.specs-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Smooth Navigation Links Click
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          if (lenis) {
            lenis.scrollTo(targetElem, { duration: 1.4 });
          } else {
            targetElem.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Progress Tracker Steps Click
    progressSteps.forEach((step, idx) => {
      step.addEventListener('click', () => {
        if (sections[idx]) {
          if (lenis) {
            lenis.scrollTo(sections[idx], { duration: 1.4 });
          } else {
            sections[idx].scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // 5. Interactive Web Audio Engine Rev Simulator
  let audioCtx = null;
  let isRevving = false;
  let rpmInterval = null;
  const rpmCounter = document.getElementById('rpmCounter');
  const revBtn = document.getElementById('revEngineBtn');
  const soundToggle = document.getElementById('soundToggle');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playS58EngineTone(targetRpm) {
    initAudio();
    if (!audioCtx) return;

    const baseFreq = 50 + (targetRpm / 7200) * 180; // S58 I6 frequency curve
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const subOsc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, audioCtx.currentTime + 0.5);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.01, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.51, audioCtx.currentTime + 0.5);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(baseFreq * 0.5, audioCtx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800 + (targetRpm / 7200) * 2400, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);

    osc1.connect(filter);
    osc2.connect(filter);
    subOsc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    subOsc.start();

    osc1.stop(audioCtx.currentTime + 0.75);
    osc2.stop(audioCtx.currentTime + 0.75);
    subOsc.stop(audioCtx.currentTime + 0.75);
  }

  function startRev() {
    if (isRevving) return;
    isRevving = true;
    let curRpm = 900;
    const targetRpm = 6800 + Math.floor(Math.random() * 400);

    playS58EngineTone(targetRpm);

    clearInterval(rpmInterval);
    rpmInterval = setInterval(() => {
      if (curRpm < targetRpm) {
        curRpm += 380;
        if (rpmCounter) rpmCounter.textContent = Math.min(curRpm, targetRpm);
      } else {
        clearInterval(rpmInterval);
        setTimeout(() => {
          const dropInterval = setInterval(() => {
            if (curRpm > 900) {
              curRpm -= 240;
              if (rpmCounter) rpmCounter.textContent = Math.max(curRpm, 900);
            } else {
              clearInterval(dropInterval);
              isRevving = false;
            }
          }, 30);
        }, 300);
      }
    }, 20);
  }

  if (revBtn) {
    revBtn.addEventListener('click', (e) => {
      e.preventDefault();
      startRev();
    });
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', (e) => {
      e.preventDefault();
      startRev();
    });
  }

  // Spacebar rev engine listener
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      startRev();
    }
  });

  // Mode tag interactivity
  const modeTags = document.querySelectorAll('.mode-tag');
  modeTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      modeTags.forEach((t) => t.classList.remove('active'));
      tag.classList.add('active');
    });
  });
});
