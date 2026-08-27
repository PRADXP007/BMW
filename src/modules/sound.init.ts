import { soundEngine } from './sound';

export function initSoundEngine() {
  const btn = document.getElementById('sound-btn');
  if (!btn) return;

  let active = false;

  btn.addEventListener('click', () => {
    active = soundEngine.toggle();
    btn.classList.toggle('active', active);

    const label = btn.querySelector('.sound-label');
    if (label) label.textContent = active ? 'ENGINE: ON' : 'ENGINE: OFF';

    soundEngine.click();
  });

  // Subtle sounds on interactive elements
  document.querySelectorAll('button, a, [data-click-sound]').forEach((el) => {
    el.addEventListener('click', () => soundEngine.click());
  });
}
