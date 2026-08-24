import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useStore } from './store/useStore';
import Loader from './components/ui/Loader';
import Navigation from './components/ui/Navigation';
import CartPanel from './components/ui/CartPanel';
import './App.css';

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Individual section data ───────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'showroom',
    tag: '01 — Monolith Showroom',
    heading: ['The', 'Ultimate', 'Machine.'],
    accentIdx: 1,
    body: 'Experience the 2025 BMW M8 Competition Gran Coupé. Born from motorsport. Refined for the road. Every surface sculpted by aerodynamic precision.',
    side: 'left',
    cta: { label: 'Explore Lineup', href: '#configurator' },
    extra: 'specs',
    specs: [
      { l: '0–100', v: '3.2s' },
      { l: 'Peak Power', v: '625 bhp' },
      { l: 'Top Speed', v: '305 km/h' },
      { l: 'Torque', v: '750 Nm' },
    ],
  },
  {
    id: 'configurator',
    tag: '02 — M-Performance Configurator',
    heading: ['Build', 'Your', 'Dream M8.'],
    accentIdx: 2,
    body: 'Choose your colour, wheels, and M performance accessories. Every detail, every surface — made exactly to your specification.',
    side: 'right',
    extra: 'configurator',
  },
  {
    id: 'electric',
    tag: '03 — Electric Horizon',
    heading: ['Pure', 'Electric', 'Power.'],
    accentIdx: 1,
    body: 'The BMW i7 xDrive60. Dual-motor AWD, 536 bhp, 765 Nm of instant torque. Charge to 80% in 34 minutes on a 200 kW DC fast charger.',
    side: 'left',
    extra: 'specs',
    specs: [
      { l: '0–100',  v: '4.7s'    },
      { l: 'Range',  v: '625 km'  },
      { l: 'Charge', v: '200 kW'  },
      { l: 'Drive',  v: 'AWD'     },
    ],
  },
  {
    id: 'cockpit',
    tag: '04 — Cockpit & BMW OS 9',
    heading: ['Inside', 'the', 'Machine.'],
    accentIdx: 2,
    body: 'A curved panoramic 31" BMW Interaction Bar fuses driver display and infotainment into a single seamless arc. BMW OS 9 — intuitive, intelligent, alive.',
    side: 'right',
    extra: 'features',
    features: ['31" Curved Interaction Bar', 'BMW OS 9 Intelligence', 'Harman Kardon 3D Sound', 'Head-Up Display', 'Panoramic Sky Lounge', 'Merino Leather Upholstery'],
  },
  {
    id: 'aero',
    tag: '05 — Aerodynamics Lab',
    heading: ['Science', 'of', 'Speed.'],
    accentIdx: 2,
    body: 'Every surface of the BMW M Hybrid V8 endurance racer is shaped by computational fluid dynamics. Active aero, rear wing, and underbody diffuser work in perfect harmony.',
    side: 'left',
    extra: 'specs',
    specs: [
      { l: 'Cd',        v: '0.265'   },
      { l: 'Downforce', v: '820 N'   },
      { l: 'Engine',    v: 'V8 Turbo'},
      { l: 'Output',    v: '640 bhp' },
    ],
  },
  {
    id: 'vault',
    tag: '06 — Executive Vault',
    heading: ['Your', 'BMW', 'Awaits.'],
    accentIdx: 1,
    body: 'Step into your private delivery bay. Every bespoke build receives a dedicated BMW handover specialist, a personalised VIN, and a lifetime concierge membership.',
    side: 'right',
    extra: 'order',
  },
];

// ── Configurator mini-panel ───────────────────────────────────────────────────
function ConfiguratorPanel() {
  const { selectedColor, setSelectedColor, colors, selectedModel, setSelectedModel, addToCart } = useStore();

  const MODELS = [
    { id: 'sedan',  label: 'M8 Gran Coupé', price: 148100 },
    { id: 'msport', label: 'M3 Competition', price: 74900  },
    { id: 'ev',     label: 'i7 xDrive60',   price: 109995 },
  ];

  const ACCESSORIES = [
    { id: 'splitter', name: 'M Carbon Splitter', price: 3200 },
    { id: 'rims',     name: '21" Star-Spoke Rims', price: 4500 },
    { id: 'caliper',  name: 'M Carbon Caliper',    price: 1800 },
  ];

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="config-panel">
      {/* Model */}
      <div className="config-panel__group">
        <div className="config-panel__label">Model</div>
        <div className="config-panel__options">
          {MODELS.map(m => (
            <button key={m.id}
              className={`config-panel__opt ${selectedModel === m.id ? 'active' : ''}`}
              onClick={() => setSelectedModel(m.id)}>
              <span>{m.label}</span>
              <span className="config-panel__price">{fmt(m.price)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="config-panel__group">
        <div className="config-panel__label">
          Colour — <span style={{ color: '#fff' }}>{colors[selectedColor]?.label}</span>
        </div>
        <div className="config-panel__swatches">
          {Object.entries(colors).map(([key, val]) => (
            <button key={key}
              className={`config-panel__swatch ${selectedColor === key ? 'active' : ''}`}
              style={{ background: val.hex }}
              title={val.label}
              onClick={() => setSelectedColor(key)} />
          ))}
        </div>
      </div>

      {/* Accessories */}
      <div className="config-panel__group">
        <div className="config-panel__label">M Performance Accessories</div>
        <div className="config-panel__accessories">
          {ACCESSORIES.map(a => (
            <button key={a.id} className="config-panel__accessory"
              onClick={() => addToCart(a)}>
              <span>{a.name}</span>
              <span className="config-panel__acc-price">{fmt(a.price)} <span className="config-panel__add">+ Add</span></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Order panel ───────────────────────────────────────────────────────────────
function OrderPanel() {
  const { cartItems, selectedColor, colors, selectedModel, setCartOpen } = useStore();
  const modelLabel = { sedan: 'BMW M8 Gran Coupé', msport: 'BMW M3 Competition', ev: 'BMW i7 xDrive60' };
  const basePrice  = { sedan: 148100, msport: 74900, ev: 109995 };
  const total = (basePrice[selectedModel] || 148100) + cartItems.reduce((s, i) => s + i.price, 0);
  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  const paint = colors[selectedColor] || colors.frozen_grey;

  return (
    <div className="order-panel">
      <div className="order-panel__row">
        <span>Model</span><span>{modelLabel[selectedModel]}</span>
      </div>
      <div className="order-panel__row">
        <span>Colour</span>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ width:10, height:10, borderRadius:'50%', background: paint.hex, display:'inline-block' }} />
          <span>{paint.label}</span>
        </div>
      </div>
      {cartItems.map(i => (
        <div key={i.id} className="order-panel__row">
          <span>{i.name}</span><span>{fmt(i.price)}</span>
        </div>
      ))}
      <div className="order-panel__divider" />
      <div className="order-panel__total">
        <span>Total</span><span>{fmt(total)}</span>
      </div>
      <button className="order-panel__cta" onClick={() => setCartOpen(true)}>
        View Full Summary
        <svg viewBox="0 0 24 24" width="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
}

// ── Section renderer ──────────────────────────────────────────────────────────
function Section({ s, index }) {
  const dir = s.side === 'left' ? 'reveal--left' : 'reveal--right';

  return (
    <div className="bmw-section" id={s.id}>
      <div className={`bmw-section__content reveal ${dir}`}>
        <div className="bmw-section__tag">{s.tag}</div>

        <h2 className="bmw-section__heading">
          {s.heading.map((word, i) => (
            <span key={i} className={i === s.accentIdx ? 'accent' : ''}>{word}<br /></span>
          ))}
        </h2>

        <p className="bmw-section__body">{s.body}</p>

        {/* Specs grid */}
        {s.extra === 'specs' && (
          <div className="bmw-section__specs">
            {s.specs.map(sp => (
              <div key={sp.l} className="bmw-section__spec">
                <div className="bmw-section__spec-val">{sp.v}</div>
                <div className="bmw-section__spec-label">{sp.l}</div>
              </div>
            ))}
          </div>
        )}

        {/* Feature list */}
        {s.extra === 'features' && (
          <ul className="bmw-section__features">
            {s.features.map(f => <li key={f}>{f}</li>)}
          </ul>
        )}

        {/* Configurator */}
        {s.extra === 'configurator' && <ConfiguratorPanel />}

        {/* Order */}
        {s.extra === 'order' && <OrderPanel />}

        {/* CTA */}
        {s.cta && (
          <a href={s.cta.href} className="bmw-section__cta">
            {s.cta.label}
            <svg viewBox="0 0 24 24" width="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div className="hero">
      <div className="hero__content reveal reveal--left">
        <div className="hero__eyebrow">2025 BMW M SERIES</div>
        <h1 className="hero__heading">
          The<br />
          <span className="accent">Ultimate</span><br />
          Driving<br />
          Machine.
        </h1>
        <p className="hero__sub">Scroll to explore</p>
        <div className="hero__scroll-hint">
          <span />
        </div>
      </div>
      {/* M-strip */}
      <div className="hero__m-strip">
        <div className="m-b" /><div className="m-r" /><div className="m-b" />
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const { isLoading, setLoading, setLoadingProgress } = useStore();
  const lenisRef = useRef(null);
  useScrollReveal();

  // Loader simulation
  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        setLoadingProgress(100);
        clearInterval(t);
        setTimeout(() => setLoading(false), 500);
      } else {
        setLoadingProgress(p);
      }
    }, 100);
    return () => clearInterval(t);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    lenisRef.current = lenis;
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    const id = requestAnimationFrame(raf);
    return () => { lenis.destroy(); cancelAnimationFrame(id); };
  }, [isLoading]);

  return (
    <div className="app">
      <Loader />

      {!isLoading && (
        <>
          <Navigation />
          <CartPanel />

          {/* Single fixed background */}
          <div className="bg-fixed" />

          <main className="main">
            <Hero />
            {SECTIONS.map((s, i) => <Section key={s.id} s={s} index={i} />)}
          </main>
        </>
      )}
    </div>
  );
}
