import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_PARAGRAPHS = [
  { num: '01', text: 'The M4 does not ask permission. It simply arrives — violently, precisely, without apology. A machine engineered at the outer limit of what the laws of physics allow on public asphalt.' },
  { num: '02', text: 'Born on the Nordschleife, validated at Laguna Seca, humbled at Spa. Every corner of the chassis was shaped by data that draws blood. Not marketing blood. Real blood.' },
  { num: '03', text: 'The S58 engine displaces 3.0 litres. Twin turbines spin past 150,000 RPM. At 7,200 the intake note crosses from mechanical to mythological. You will hear it in your sleep.' },
  { num: '04', text: 'Carbon fibre roof, forged aluminium subframes, active M differential calibrated in 10ms intervals. Redundancy is for aeroplanes. Efficiency is for machines with ambitions.' },
  { num: '05', text: 'This is not a car for everyone. It is a car for people who understand that joy and discomfort occupy the same frequency.' },
];

export function initManifestoSection() {
  const section = document.getElementById('manifesto-view');
  if (!section) return;

  const right = document.getElementById('manifesto-right');
  if (!right) return;

  // Populate paragraphs
  const container = right.querySelector('.manifesto-paragraphs');
  if (container) {
    MANIFESTO_PARAGRAPHS.forEach(({ num, text }) => {
      const para = document.createElement('div');
      para.className = 'manifesto-para';
      para.innerHTML = `
        <span class="para-num text-mono-xs text-m-orange mb-4 block">${num}</span>
        <p class="para-body">${text}</p>
      `;
      container.appendChild(para);
    });
  }

  // Left column headline kinetics
  const leftLines = section.querySelectorAll<HTMLElement>('#manifesto-left .split-line span');
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(leftLines, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power4.out',
      });
    },
  });

  // Right: each paragraph fades in as it enters the viewport
  const paras = section.querySelectorAll<HTMLElement>('.manifesto-para');
  paras.forEach((para) => {
    gsap.fromTo(para,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: para,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });
}
