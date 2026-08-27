# BMW M4 — UNBROKEN
### An Experimental Cinematic Editorial

> **Live Site →** [https://PRADXP007.github.io/BMW/](https://PRADXP007.github.io/BMW/)
> **Repository →** [https://github.com/PRADXP007/BMW](https://github.com/PRADXP007/BMW)

---

A production-grade, brutalist automotive editorial website for the **BMW M4 G82 Competition xDrive**, styled after the editorial logic of OilStainLab / hf-11-super-car.webflow.io — same typographic system, same interaction patterns, reskinned for the M4. This is a personal editorial project, not a dealership or ad landing page.

---

## ◆ Live Preview

| URL | Status |
|-----|--------|
| **[https://PRADXP007.github.io/BMW/](https://PRADXP007.github.io/BMW/)** | ✅ Live via GitHub Pages |

> Allow ~60 seconds after a new deploy for GitHub Pages CDN to propagate.

---

## ◆ Sections

| # | Section | Key Interaction |
|---|---------|-----------------|
| 01 | **Preloader Gate** | 4 staggered hero words (PRECISION / CHAOS / PURITY / MANIAC), progress bar, curtain wipe exit |
| 02 | **Chassis Hero** | ScrollTrigger pin, scrubbing telemetry counter (8 specs), suspension cables, car parallax float |
| 03 | **Engine Deep Dive** | S58 stat grid, real engine bay photography, telemetry reticle overlay |
| 03b | **Door-Open Reveal** | Full 100vh cinematic, ken-burns zoom-out, interior HUD callout panels, parallax drift |
| 04 | **360° Studio** | HTML5 canvas, drag/scroll/wheel frame scrub, 72-frame RAF interpolation |
| 05 | **Configurator** | 8 colour swatches, 4 model packages with live price update, spec cards with hover reveal |
| 06 | **Materials** | Carbon fibre / Merino leather / Forged aluminium — hover zoom real macro photography |
| 07 | **Manifesto** | 50/50 split — sticky left kinetic typography + naturally scrolling right editorial paragraphs |
| 08 | **Performance Gallery** | Full-bleed 3-angle image grid (drift / suspended studio / front ¾) |
| 09 | **Commission CTA** | Full M-orange screen, parallax mouse background, commission form slide-up drawer |
| — | **Footer** | Navigation, disclaimer, coordinates |

---

## ◆ Technology Stack

```
Vite 6          — build tool & dev server
TypeScript      — strict vanilla TS, no framework
GSAP 3 + ScrollTrigger — all animation & scroll-driven interactions
Lenis           — smooth momentum scroll, bound to GSAP ticker
SplitType       — character & line splitting for kinetic typography
Tailwind CSS    — utility design system tokens
Web Audio API   — procedural engine sound synthesis (no audio files)
```

---

## ◆ Interaction Engine

### Smooth Scroll — Lenis
```typescript
// Lenis bound directly to GSAP ticker for ScrollTrigger sync
gsap.ticker.add((time) => lenis.raf(time * 1000));
lenis.on('scroll', ScrollTrigger.update);
```

### ScrollTrigger Pinning
- **§02 Chassis** — section pinned for `8 × 100vh`, spec counter scrubs through 8 telemetry values
- **§04 Studio** — sticky inner container, canvas frame index mapped to `ScrollTrigger.progress × 72`
- **§07 Manifesto** — CSS `position: sticky; height: 100vh` on left column

### Canvas 360° Scrubber
- 72 synthetic frames rendered via `drawImage()` with perspective mirror transform
- RAF loop with velocity interpolation: `currentFrame += (target - current) * 0.12`
- Drag, wheel, and scroll all write to `targetFrame`

### Procedural Audio Engine
```typescript
// Sawtooth oscillator + sub-bass + bandpass filter + WaveShaper distortion
// No audio files. Pure Web Audio API synthesis.
engineOsc.type = 'sawtooth';  // fundamental ~80Hz → 160Hz ramp
subOsc.type = 'sine';         // sub at 40Hz
// Stereo panner oscillates ±0.3 every 3s for spatial immersion
```

### Custom Cursor
- `cursor-dot` (8px) follows mouse exactly
- `cursor-ring` (36px) follows with `12%` lerp lag per frame
- Scales to 56px on hover of `a`, `button` elements

---

## ◆ Asset Map

```
public/assets/images/
├── hero-suspended.jpg       ← §02 chassis hero centerpiece + §08 gallery angle 2
├── door-open-reveal.jpg     ← §03b full-bleed interior reveal scene
├── engine-bay.jpg           ← §03 engine deep-dive photograph
├── m4-drift-2k.jpg          ← §08 gallery — main large panel
├── m4-front.jpg             ← §08 gallery — front ¾ angle
├── m4-rear.jpg              ← available
├── m4-grille.jpg            ← available
├── m4-door-open.jpg         ← source copy of door-open-reveal
├── interior-wheel.jpg       ← §06 materials — Merino leather card
├── interior-wheel-2.jpg     ← available
├── damper-macro.jpg         ← §06 materials — carbon fibre card
├── chassis-axle.jpg         ← §06 materials — forged aluminium card
├── m3-m4-race.jpg           ← available
├── m4-pit.jpg               ← available
└── m4-trackside.jpg         ← available

public/assets/video/
└── m4-drift.mp4             ← available for future hero bg (git-ignored, local only)
```

---

## ◆ Module Architecture

```
src/
├── main.ts                  ← Boot sequence (preloader → lenis → all modules)
├── index.css                ← Design system: tokens, cursors, scanlines, marquee, animations
└── modules/
    ├── cursor.ts            ← Magnetic dot + lagged ring cursor
    ├── lenis.ts             ← Lenis + GSAP ticker sync
    ├── preloader.ts         ← Staggered words, progress bar, curtain wipe, Promise resolve
    ├── navbar.ts            ← Glassmorphism on scroll
    ├── chassis.ts           ← ScrollTrigger pin, spec scrub, cable tension, parallax
    ├── doorReveal.ts        ← Ken-burns, HUD cascade, parallax drift
    ├── studio360.ts         ← Canvas 360 scrubber (drag / wheel / scroll)
    ├── configurator.ts      ← Colour swatches, package selector, price update
    ├── materials.ts         ← Hover zoom entrance
    ├── manifesto.ts         ← Sticky left kinetics, paragraph scroll reveal
    ├── commission.ts        ← Form drawer, parallax mousemove background
    ├── sound.ts             ← Procedural Web Audio engine synthesis
    ├── sound.init.ts        ← Sound button wiring + global click feedback
    ├── bottomDrawer.ts      ← Timed slide-in commission nudge
    └── marquee.ts           ← Infinite ticker content duplication
```

---

## ◆ Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--m-orange` | `#E4492E` | CTAs, accents, section numbers |
| `--carbon` | `#0D0D0D` | Dark backgrounds |
| `--cyclorama` | `#EBEBEB` | Light section backgrounds |
| `--off-white` | `#F0EDE8` | Manifesto right column |
| `--text-primary` | `#E8E8E6` | Body text on dark |
| `--text-dim` | `#8A8A88` | Secondary text |
| `Anton` | Display font | All headlines, telemetry values |
| `Courier Prime` | Mono font | Labels, captions, navigation |

---

## ◆ Development

```bash
# Clone
git clone https://github.com/PRADXP007/BMW.git
cd BMW

# Install
npm install

# Dev server → http://localhost:3000
npm run dev

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## ◆ Deploy Pipeline

```
npm run deploy
  └── predeploy: vite build    → dist/ with base: '/BMW/'
  └── deploy: gh-pages -d dist → pushes dist/ to gh-pages branch
                                  → GitHub serves at PRADXP007.github.io/BMW/
```

---

## ◆ Specification Reference

| Spec | M4 Competition xDrive |
|------|----------------------|
| Engine | BMW S58 B30T0 — 3.0L Twin-Turbo I6 |
| Power | 503 HP @ 6,250 RPM |
| Torque | 479 LB-FT @ 2,750 RPM |
| 0–60 MPH | 3.4 seconds |
| Top Speed (M Driver) | 180 MPH |
| Transmission | 8-speed M Steptronic Sport |
| Drive | xDrive AWD |
| Weight | 3,748 LBS (1,700 KG) |
| Wheelbase | 110.7 in (2,812 mm) |
| Nürburgring | 7:38.92 |

---

*An independent editorial project. Not affiliated with or endorsed by Bayerische Motoren Werke AG.*
*All specification data from official BMW M GmbH publications.*

---

**Built with** GSAP · Lenis · Vite · TypeScript · Tailwind CSS · Web Audio API
