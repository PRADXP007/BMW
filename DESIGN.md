# BMW M-PROJECT // 01 — DESIGN SYSTEM & MOTION ARCHITECTURE
**Project Name:** Skunkworks M-Series / BMW M Brutalist Preloader  
**Project ID:** 144916983387264715  
**Origin:** Google Stitch MCP Ingestion  
**Design Theme:** Technical Brutalist / Flat Brutalist Editorial  

---

## 1. COLOR TOKENS & PALETTE ARCHITECTURE

```css
:root {
  /* Brand Core Colors */
  --color-m-orange: #E4492E;            /* Electric M-Orange / Accent / CTA Trigger */
  --color-m-orange-glow: rgba(228, 73, 46, 0.4);
  --color-carbon-black: #0D0D0D;        /* OLED Deep Black Canvas */
  --color-surface-dim: #131313;         /* Technical Surface */
  --color-surface-container: #1f1f1f;   /* Elevated Carbon Panels */
  --color-surface-high: #2a2a2a;        /* High Contrast Containers */
  --color-cyclorama-gray: #EBEBEB;      /* High-Key Studio Cyclorama */
  --color-panel-white: #F5F5F7;         /* Deep Dive Modal Background */
  --color-pure-white: #FFFFFF;          /* Display Typography & High Contrast Elements */
  --color-border-subtle: #D4D4D8;       /* 1px Technical Border Rules */
  --color-border-dark: #353535;         /* Dark Grid & Framing Dividers */
  --color-text-muted: #8E9192;          /* Metadata / Secondary Spec Labels */
  --color-text-light-muted: #656464;    /* Light Panel Secondary Text */
}
```

---

## 2. MOTION & INTERACTION ENGINE ARCHITECTURE

### 2.1 Smooth Momentum Physics (Lenis)
- **Root Instance Ticker Binding**: `lenis.on('scroll', ScrollTrigger.update)` bound to the GSAP ticker cycle:
  ```typescript
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  ```
- **Physics Config**: `duration: 1.2`, `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `smoothWheel: true`.

### 2.2 ScrollTrigger & Pinning Engine (GSAP)
- **Section 02 (`#chassis-view`)**: Pinned horizontal/vertical spec synchronization:
  - Flanking monumental watermarks `BMW` and `01` splitting apart symmetrically (`x: -120` / `x: +120`, `opacity: 0.05`).
  - Suspended carbon monocoque dynamic zoom and rotation (`scale: 1.15`, `rotationZ: -2`, `y: -30`).
  - Live synchronized telemetry highlights (`1,840 LBS`, `2.4s`, `12,000 RPM`, `1,050 HP`).
- **Section 04 (`#studio-view`)**: 360-degree canvas frame scrub mapped to ScrollTrigger progress `0.0 -> 1.0` scrubbing 72 memory-cached photogrammetric frames.
- **Section 06 (`#manifesto-view`)**: 50/50 split screen with **sticky left column** (`position: sticky; top: 0; height: 100vh`) and naturally scrolling right editorial canvas.

### 2.3 Kinetic Typography Masking (SplitType + GSAP)
- Display headlines split into `.line` and `.char` wrappers with `overflow: hidden`.
- Text reveal timeline:
  ```typescript
  gsap.fromTo(
    chars,
    { yPercent: 120, opacity: 0 },
    { yPercent: 0, opacity: 1, stagger: 0.025, duration: 1.1, ease: "power4.out" }
  );
  ```

### 2.4 Preloaded 2D Canvas Image Sequencer (360 Scrub)
- 72 high-resolution compressed turntable frames rendered directly onto an HTML5 `<canvas>` element via `requestAnimationFrame` with sub-pixel device pixel ratio support.
- Preloader progress screen (Screen 01) blocks interaction until all frames are loaded into memory cache with real-time progress counter (0% -> 100%).

### 2.5 Spatial Audio Engine (Howler.js + Web Audio API)
- Interactive engine sound rev loops triggered via floating `ENGINE SOUND 🔊` button.
- Positional stereo panning (`StereoPannerNode` / `PannerNode`) mapped to mouse coordinates and UI actions.
- Micro-sound feedback on UI clicks, pneumatic valvetrain hisses, and bass sub-drop acoustical hits.

---

## 3. CORE DESIGN SCREENS & COMPONENT HIERARCHY

1. **Preloader Screen (`8e8bdd72f9bf4960b067595bfbf270f6`)**:
   - Location: [`src/components/Preloader.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/Preloader.tsx)
   - SplitType kinetic typography, memory frame cache counter (0% -> 100%), and CRT laser scanline.

2. **Chassis Hero Screen (`df0488752eed459199fefac50dbb9757`)**:
   - Location: [`src/components/ChassisHero.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/ChassisHero.tsx)
   - Pinned ScrollTrigger spec sync with suspended carbon monocoque.

3. **Showroom Screen (`efd2b421ca9e40d7bf1ca07a03141f96`)**:
   - Location: [`src/components/ShowroomSection.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/ShowroomSection.tsx)
   - Spatial V8 throttle rev engine with live RPM tachometer bar and exhaust pulse.

4. **Studio 360 Viewport (`8ffa0f514f0c47b1a7060ab9dade2136`)**:
   - Location: [`src/components/StudioView360.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/StudioView360.tsx)
   - Preloaded HTML5 `<canvas>` turntable scrubber with multi-angle lighting presets.

5. **Configurator & Deep-Dive Hub (`7c2cd2efc37545cb9583786fa3a4971d`)**:
   - Location: [`src/components/ConfiguratorSection.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/ConfiguratorSection.tsx)
   - Pillar triggers: `POWER`, `ORIGIN`, `BEAUTY`, `ASYLUM`, `OBSESSION`, `STRENGTH`.

6. **Deep-Dive Modular Modal System**:
   - Location: [`src/components/DeepDiveModal.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/DeepDiveModal.tsx)
   - Full 50/50 split modal views for Heritage, Aerodynamics, Cockpit Ergonomics, Instrumentation, and Autoclave Engineering.

7. **Mission Editorial (`33232570c9b54ac3becfbceeb45fec5a`)**:
   - Location: [`src/components/EditorialSection.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/EditorialSection.tsx)
   - Sticky left 100vh column + SplitType typography reveal.

8. **Typographic Manifesto (`d7750be0fc144ee3b1b5f68f08b95087`)**:
   - Location: [`src/components/TypographicTransition.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/TypographicTransition.tsx)
   - High-impact brutalist typography with car reveal mask.

9. **Skunkworks Commission Studio & Spec Sheet Exporter**:
   - Location: [`src/components/CommissionModal.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/CommissionModal.tsx) & [`src/components/SpecSheetModal.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/SpecSheetModal.tsx)
   - Complete bespoke builder with printable specification export.
