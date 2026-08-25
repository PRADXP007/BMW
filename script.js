document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Motion Preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Lenis Smooth Scrolling Setup
  let lenis = null;
  if (!prefersReduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // 3. GSAP & ScrollTrigger Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered chapter entrances
    const chapters = document.querySelectorAll('.editorial-chapter');
    const navItems = document.querySelectorAll('.nav-item');

    chapters.forEach((chapter, index) => {
      const narrative = chapter.querySelector('.narrative-side');
      const visual = chapter.querySelector('.visual-side');
      const popCard = chapter.querySelector('.pop-card');
      const photoCard = chapter.querySelector('.photo-card');
      const rotatingRing = chapter.querySelector('.rotating-ring');

      // Update Nav Link Active State
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => updateNav(index),
        onEnterBack: () => updateNav(index),
      });

      if (!prefersReduced) {
        // Animate Narrative Text
        if (narrative) {
          const isLeft = narrative.classList.contains('side-left');
          gsap.fromTo(
            narrative,
            { x: isLeft ? -70 : 70, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Animate Visual Image Frame
        if (visual) {
          const isLeft = visual.classList.contains('side-left');
          gsap.fromTo(
            visual,
            { x: isLeft ? -70 : 70, opacity: 0, scale: 0.94 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.1,
              ease: 'power3.out',
              delay: 0.1,
              scrollTrigger: {
                trigger: chapter,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Pop card entrance
        if (popCard) {
          gsap.fromTo(
            popCard,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'back.out(1.2)',
              delay: 0.25,
              scrollTrigger: {
                trigger: chapter,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Parallax depth on image during scroll
        if (photoCard) {
          gsap.to(photoCard.querySelector('img'), {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: chapter,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
        }
      }
    });

    // Telemetry Grid Cards entrance
    const teleCards = document.querySelectorAll('.tele-card');
    if (teleCards.length && !prefersReduced) {
      gsap.fromTo(
        teleCards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.telemetry-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    function updateNav(index) {
      navItems.forEach((item, i) => {
        if (i === index) item.classList.add('active');
        else item.classList.remove('active');
      });
    }

    // Smooth link scrolling
    navItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          if (lenis) {
            lenis.scrollTo(targetElem, { duration: 1.3 });
          } else {
            targetElem.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // 4. Interactive Web Audio S58 Rev Simulator
  let audioCtx = null;
  let isRevving = false;
  let rpmInterval = null;
  const rpmVal = document.getElementById('rpmVal');
  const revBtn = document.getElementById('revBtn');
  const engineSoundBtn = document.getElementById('engineSoundBtn');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playEngineAcoustics(targetRpm) {
    initAudio();
    if (!audioCtx) return;

    const baseFreq = 54 + (targetRpm / 7200) * 170; // S58 I6 frequency profile
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const subOsc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, audioCtx.currentTime + 0.45);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.015, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.61, audioCtx.currentTime + 0.45);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(baseFreq * 0.5, audioCtx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900 + (targetRpm / 7200) * 2200, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.65);

    osc1.connect(filter);
    osc2.connect(filter);
    subOsc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    subOsc.start();

    osc1.stop(audioCtx.currentTime + 0.7);
    osc2.stop(audioCtx.currentTime + 0.7);
    subOsc.stop(audioCtx.currentTime + 0.7);
  }

  function revEngine() {
    if (isRevving) return;
    isRevving = true;
    let curRpm = 950;
    const targetRpm = 6900 + Math.floor(Math.random() * 300);

    playEngineAcoustics(targetRpm);

    clearInterval(rpmInterval);
    rpmInterval = setInterval(() => {
      if (curRpm < targetRpm) {
        curRpm += 390;
        if (rpmVal) rpmVal.textContent = Math.min(curRpm, targetRpm);
      } else {
        clearInterval(rpmInterval);
        setTimeout(() => {
          const drop = setInterval(() => {
            if (curRpm > 950) {
              curRpm -= 250;
              if (rpmVal) rpmVal.textContent = Math.max(curRpm, 950);
            } else {
              clearInterval(drop);
              isRevving = false;
            }
          }, 25);
        }, 260);
      }
    }, 18);
  }

  if (revBtn) {
    revBtn.addEventListener('click', (e) => {
      e.preventDefault();
      revEngine();
    });
  }

  if (engineSoundBtn) {
    engineSoundBtn.addEventListener('click', (e) => {
      e.preventDefault();
      revEngine();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      revEngine();
    }
  });

  // Mode Pill toggles
  const modePills = document.querySelectorAll('.mode-pill');
  modePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      modePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
});
