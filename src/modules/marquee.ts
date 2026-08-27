export function initMarquee() {
  const tracks = document.querySelectorAll<HTMLElement>('.marquee-track');
  tracks.forEach((track) => {
    // Duplicate content for seamless loop
    track.innerHTML += track.innerHTML;
  });
}
