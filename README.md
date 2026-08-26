# BMW M-PROJECT // 01 — EXPERIMENTAL EDITORIAL WEB EXPERIENCE

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)]()
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)]()
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02.svg)]()
[![Lenis](https://img.shields.io/badge/Lenis-1.0-orange.svg)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)]()

> A production-grade, brutalist automotive editorial website engineered for **BMW M-PROJECT // 01** with **100% design fidelity** ingested via Google Stitch MCP (**Skunkworks M-Series / BMW M Brutalist Preloader**, Project ID: `144916983387264715`).

---

## 🏎️ Live Experience & Architecture Overview

The experience combines a flat brutalist technical aesthetic with high-precision motion physics (Lenis + GSAP), an in-memory 72-frame HTML5 `<canvas>` 360° turntable scrubber, procedural Web Audio API twin-turbo V8 throttle rev synthesizers, and cyclic split-screen deep-dive documentation.

```
                                  +-----------------------+
                                  |    SCREEN 01: GATE    |
                                  | Preloader + 360 Cache |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |   SCREEN 02: HERO     |
                                  | Pinned Monocoque Sync |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |  SCREEN 03: SHOWROOM  |
                                  | V8 Spatial Audio Rev  |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  | SCREEN 04: STUDIO 360 |
                                  | Canvas Frame Scrub    |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  | SCREEN 05: LIGHT STAGE|
                                  | Amber/Cyan Dual-Tone  |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |  SCREEN 06: MANIFESTO |
                                  | Split-Screen Editorial|
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |  SCREENS 08-12: MODALS|
                                  | Cyclic Deep-Dive Spec |
                                  +-----------------------+
```

---

## 📐 Screen-by-Screen Implementation Specifications

### 1. Screen 01: Preloader Gate & Hero Splash ([`01_PreloaderGate.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/sections/01_PreloaderGate.tsx))
- **Visual Staging**: Fullscreen 100vh canvas on dark wet-asphalt backdrop (`#0D0D0D`) with CRT laser scanline.
- **Kinetic Typography**: 4 staggered headline lines (`PRECISION`, `CHAOS`, `PURITY`, `MANIAC`) split into masked characters (`font-size: clamp(3.5rem, 8vw, 10rem); line-height: 0.88; letter-spacing: -0.04em`).
- **Memory Frame Buffer**: Actively buffers 72 photogrammetric turntable frames into RAM (`0% -> 100%`) before enabling entry.
- **Curtain Exit**: Clicking `#E4492E` `ENTER >>` button triggers an acoustic sub-bass drop and lifts the preloader curtain (`yPercent: -100, ease: "power4.inOut"`).

### 2. Screen 02: Suspended Chassis & Telemetry ([`02_HeroChassis.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/sections/02_HeroChassis.tsx))
- **Visual Staging**: Studio cyclorama off-white (`#EBEBEB`) with a bare carbon-fiber monocoque chassis suspended by 1px vertical steel SVG cables.
- **ScrollTrigger Pinning**: Section pins during scroll; flanking display headers `BMW` (left) and `01` (right) diverge horizontally (`x: ±140px`) while monocoque scales and rotates with parallax depth.
- **Telemetry Matrix**: 4-column metric grid (`1,840 LBS`, `2.4 SEC 0-60`, `12,000 RPM`, `1,050 HP`) with italic display metrics.

### 3. Screen 03: Turntable Showcase & Sound Stage ([`03_TurntableSound.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/sections/03_TurntableSound.tsx))
- **Visual Staging**: Rear 3/4 dihedral door perspective on an elevated circular turntable.
- **Spatial Engine Sound Trigger**: Floating `ENGINE SOUND 🔊` pill triggers procedural Web Audio + Howler.js twin-turbo V8 throttle rev loop (1,150 -> 12,000 RPM redline scream) with live tachometer telemetry and exhaust flame animation.
- **Commission Drawer**: Persistent `#E4492E` bottom bar with circular `+` expand toggle.

### 4. Screen 04: Studio 360 Configurator & Section Sidebar ([`04_StudioExplorer.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/sections/04_StudioExplorer.tsx))
- **Visual Staging**: Neutral cyclorama studio stage with HTML5 `<canvas>` rendering 72 in-memory cached frames at 60–120 FPS.
- **Kinetic Scrubbing**: Frame rotation smoothly scrubs based on horizontal mouse drag and GSAP scroll velocity.
- **Architectural Sidebar**: Sticky pillar launcher for `POWER`, `ORIGIN`, `BEAUTY`, `ASYLUM`, `OBSESSION`, `STRENGTH`.
- **Engineering CTA**: Pill outline button `DOWNLOAD SPECS >` opening the complete specification matrix.

### 5. Screen 05: Dynamic Light & Drag Stage ([`05_DynamicLight.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/sections/05_DynamicLight.tsx))
- **Photometric Lighting Rigs**: Warm amber (`#FFA040`) left spotlight and ice-cyan (`#40DFFF`) right rim light.
- **Interactive Drag Physics**: Floating `< DRAG >` badge following cursor drag vector with inertial damping and spatial stereo pan ticks.
- **Thumbnail Snap Dock**: Bottom-right floating dock with 3 instant camera snaps (`01 PROFILE`, `02 TOP-DOWN`, `03 FRONT`).

### 6. Screen 06: Parallax Typographic Scroll Bridge ([`06_TypoBridge.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/sections/06_TypoBridge.tsx))
- **Monumental Typography**: `DESCEND INTO MADNESS WITH ✛ YOUR BMW 01`.
- **Vector Crosshair Indicator**: Animated pulsing red crosshair (`✛`).
- **Sliding Silhouette**: Supercar roofline slides upward into view as user scrolls.

### 7. Screen 07: 50/50 Brand Manifesto ([`07_ManifestoSplit.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/sections/07_ManifestoSplit.tsx))
- **Sticky Left Column**: `w-1/2, h-screen, sticky top-0` with full-bleed cockpit driver photography and vertical category navigation (`ABOUT`, `MANIACS`, `MISSION`, `MACHINE`).
- **Scrollable Right Column**: Naturally scrolling `#FFFFFF` canvas containing wind-tunnel aerodynamics, heritage logs, and SplitType kinetic reveals.

### 8. Screens 08–12: Deep-Dive Slide-In Modals ([`DeepDiveModal.tsx`](file:///Users/pradeeph/Documents/BMW/src/components/modals/DeepDiveModal.tsx))
- **Cyclic Stepping**: Persistent right-hand orange `+` button cycles: `ORIGIN (08) -> BEAUTY (09) -> ASYLUM (10) -> OBSESSION (11) -> STRENGTH (12) -> ORIGIN (08)`.
- **Screen 08 (ORIGIN)**: 1976 24 Hours of Le Mans 3.0 CSL Batmobile racing collage & historical engineering log.
- **Screen 09 (BEAUTY)**: Front fascia laser headlight macro crop & rear ground-effect diffuser details.
- **Screen 10 (ASYLUM)**: Carbon-fiber bucket seat in Alcantara & CNC-machined titanium open-gate sequential shifter.
- **Screen 11 (OBSESSION)**: 3-pod analog gauge cluster binnacle & 7075-T6 billet triple pedal box assembly.
- **Screen 12 (STRENGTH)**: Pre-preg autoclave carbon monocoque rear subframe & titanium equal-length exhaust manifold.
- **Exit Control**: Orange `BACK` button exits directly to the base viewport.

---

## 📂 Project Architecture & Component Tree

```
src/
├── app/
│   ├── layout.tsx                # Root layout, Lenis provider, global font declarations
│   └── page.tsx                  # Master page assembling sequential interactive sections
├── components/
│   ├── canvas/
│   │   ├── CarScrubber.tsx       # HTML5 2D Canvas 360-degree image sequence engine
│   │   └── LightingStage.tsx     # Dual-tone interactive lighting stage
│   ├── layout/
│   │   ├── Navigation.tsx        # Sticky top header and pill commission CTA
│   │   ├── SmoothScroll.tsx      # Lenis + GSAP ticker synchronization wrapper
│   │   └── BottomDrawer.tsx      # Persistent burnt-orange expand drawer
│   ├── sections/
│   │   ├── 01_PreloaderGate.tsx  # Hero preloader with SplitType kinetic text
│   │   ├── 02_HeroChassis.tsx    # Suspended chassis and 4-column telemetry grid
│   │   ├── 03_TurntableSound.tsx # Showroom turntable with Howler.js spatial engine audio
│   │   ├── 04_StudioExplorer.tsx # 360 studio viewer with vertical feature menu
│   │   ├── 05_DynamicLight.tsx   # Dual-tone light studio and thumbnail dock
│   │   ├── 06_TypoBridge.tsx     # Giant parallax kinetic scroll typography
│   │   └── 07_ManifestoSplit.tsx # 50/50 sticky split-screen story section
│   ├── modals/
│   │   ├── DeepDiveModal.tsx     # Reusable split-panel drawer for Screens 08-12
│   │   └── modal-content/        # Content components (Origin, Beauty, Asylum, Obsession, Strength)
│   │       ├── OriginContent.tsx
│   │       ├── BeautyContent.tsx
│   │       ├── AsylumContent.tsx
│   │       ├── ObsessionContent.tsx
│   │       └── StrengthContent.tsx
│   ├── CommissionModal.tsx       # Bespoke Skunkworks configurator studio & certificate generator
│   ├── SpecSheetModal.tsx        # Full technical engineering specification matrix
│   └── ui/
│       ├── Crosshair.tsx         # Precision graphic crosshair indicator (✛)
│       ├── SoundTrigger.tsx      # Pulsing engine audio trigger pill
│       └── TelemetryItem.tsx     # Italic number + monospace label component
├── hooks/
│   ├── useCanvasFrames.ts        # Image sequence preloader and memory cache hook
│   └── useSoundEngine.ts         # Howler.js audio manager & spatial stereo panner
├── store/
│   └── useExperienceStore.ts     # Global Zustand store (activeModal, cameraAngle, rpm, etc.)
└── utils/
    ├── frameSequencer.ts         # 72-frame turntable memory preloader & canvas renderer
    └── soundEngine.ts            # Web Audio API procedural twin-turbo V8 synthesizer
```

---

## 🎨 Design Tokens & Style Guide

| Token Name | Hex / CSS Value | Application |
| :--- | :--- | :--- |
| `--color-m-orange` | `#E4492E` / `#FF3E30` | Primary Accent, CTA triggers, badge highlights, redline warning |
| `--color-carbon-black` | `#0D0D0D` | Display headers, OLED deep dark canvas |
| `--color-surface-dim` | `#131313` | Technical dark base surface |
| `--color-cyclorama-gray` | `#EBEBEB` | Studio cyclorama off-white surface |
| `--color-panel-white` | `#F5F5F7` | Deep-dive modal right column & high-contrast panels |
| `--color-border-subtle` | `#D4D4D8` | 1px technical borders & divider rules |
| `--color-amber-spot` | `#FFA040` | Screen 05 left studio spotlight |
| `--color-cyan-rim` | `#40DFFF` | Screen 05 right studio rim light |
| `--font-display` | `"Anton", sans-serif` | Monumental display headlines, model watermarks |
| `--font-mono` | `"Courier Prime", monospace` | Telemetry readouts, specs, logs |

---

## 🚀 Getting Started & Local Development

### Prerequisites
- Node.js `18.0.0` or higher
- npm `9.0.0` or higher

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/PRADXP007/BMW.git
cd BMW

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Verification

```bash
# Compile TypeScript and build production bundle with Vite
npm run build

# Preview the production build locally
npm run preview
```

---

## 🛠️ Performance & Motion Physics Guarantees

1. **Lenis Ticker Synchronization**: Momentum scrolling is tied directly to the GSAP Ticker cycle (`lenis.raf(time * 1000)`), eliminating frame drops during heavy scrub operations.
2. **GPU Canvas Rasterization**: 360-degree image sequence utilizes hardware-accelerated 2D canvas drawing with automatic DPR retina scaling (`window.devicePixelRatio`).
3. **Audio Safety**: Web Audio API contexts are auto-initialized on first user touch/gesture to prevent browser autoplay blocking.

---

## 📜 Attribution & License
Designed and engineered for BMW M Skunkworks conceptual exploration.  
Design tokens and visual assets ingested via Google Stitch MCP.
