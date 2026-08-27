// ── Custom magnetic cursor ─────────────────────────────────────────────
export function initCursor() {
  const dot = document.getElementById('cursor-dot')!;
  const ring = document.getElementById('cursor-ring')!;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  // Ring follows with lag
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover states
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, [data-cursor]')) {
      dot.style.width = '4px';
      dot.style.height = '4px';
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = '#E4492E';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, [data-cursor]')) {
      dot.style.width = '8px';
      dot.style.height = '8px';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(228,73,46,0.5)';
    }
  });

  document.addEventListener('mousedown', () => {
    dot.style.transform += ' scale(0.6)';
    ring.style.transform += ' scale(0.8)';
  });
  document.addEventListener('mouseup', () => {
    // Let the next rAF restore
  });
}
