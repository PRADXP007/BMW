# BMW M-PROJECT // 01 — EXPERIMENTAL EDITORIAL WEB EXPERIENCE

A brutalist, high-performance automotive editorial web experience for the **BMW M-PROJECT // 01**, engineered with **100% design fidelity** based on Google Stitch design tokens and screen specifications.

---

## ⚡ Tech Stack & Architecture

- **Core Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables + Zero-Radii Brutalist Design System
- **Smooth Momentum Physics**: `@studio-freight/lenis` bound directly to the GSAP Ticker cycle (`lenis.raf(time * 1000)`)
- **ScrollTrigger & Pinning Engine**: `gsap` + `gsap/ScrollTrigger`
- **Kinetic Typography Masking**: `split-type` + `gsap.fromTo`
- **360° Photometric Turntable Sequencer**: HTML5 `<canvas>` rendering 72 in-memory cached frames via `requestAnimationFrame`
- **Spatial Audio Engine**: Procedural Web Audio API + `howler` with spatial stereo panning and twin-turbo V8 throttle rev synthesis
- **State Store**: `zustand`

---

## 🏎️ Screen & Feature Matrix

1. **Preloader Screen**: SplitType kinetic typography (`PRECISION`, `CHAOS`, `PURITY`, `MANIAC`), live 360° memory frame cache buffer tracker (`0% -> 100%`), CRT laser scanline, and sub-bass acoustical drop on enter.
2. **Chassis Hero (`#chassis-view`)**: Pinned ScrollTrigger spec synchronization with suspended carbon-fiber monocoque, monumental flanking `BMW 01` split watermarks, and real-time telemetry counter highlights.
3. **Showroom (`#showroom`)**: Dihedral raised-door studio view with interactive `IGNITE ENGINE SOUND 🔊` button, twin-turbo V8 throttle rev loop (1,150 -> 12,000 RPM redline scream), spatial panning, and live RPM tachometer bar.
4. **Architectural Pillars & Deep-Dive Modals (`#configurator`)**:
   - **`POWER` / `STRENGTH`**: Autoclave carbon monocoque rear subframe & heat-blued titanium equal-length headers.
   - **`ORIGIN`**: 1976 24 Hours of Le Mans 3.0 CSL Batmobile heritage collage & log.
   - **`BEAUTY`**: Front fascia macro and rear aerodynamic ground-effects tunnel.
   - **`ASYLUM`**: Direct-bolt Alcantara bucket seat apex mount & open-gated 6AL-4V titanium shifter.
   - **`OBSESSION`**: Analog 3-pod cluster & 7075-T6 billet aluminum pedal box.
5. **360° Canvas Frame Scrubber (`#studio-view`)**: ScrollTrigger-driven turntable scrub mapped from `0.0 -> 1.0`, interactive manual drag with velocity damping, and photometric lighting switcher (`AMBER/CYAN`, `HIGH-KEY`, `VOID`).
6. **Mission Editorial (`#manifesto-view`)**: 50/50 split screen with **sticky 100vh left cockpit column** and naturally scrolling right editorial canvas with SplitType reveals.
7. **Typographic Manifesto**: `DESCEND INTO MADNESS WITH YOUR BMW 01` with target reticle and rising bottom car mask.
8. **Skunkworks Commission Studio**: Custom chassis allocation protocol (`MN-SKW-01-XXXX`), aerodynamic finish picker, downforce package tier, powertrain calibration, pilot designation, and printable build certificate export.

---

## 🛠️ Development & Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📄 License & Attribution
Designed for BMW M Skunkworks conceptual exploration. Ingested via Google Stitch MCP.
