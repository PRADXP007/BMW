import { useState, useCallback } from 'react';
import { useStore } from '../../store/useStore';
import './Page1_Showroom.css';

export default function Page1_Showroom() {
  const [ignited, setIgnited] = useState(false);
  const { selectedModel, setSelectedModel, selectedColor, setSelectedColor, colors } = useStore();

  const handleIgnite = useCallback(() => {
    setIgnited(true);
    setTimeout(() => setIgnited(false), 3000);
  }, []);

  const MODELS = [
    { id: 'sedan',  label: 'M8 Gran Coupé',  price: '$148,100' },
    { id: 'msport', label: 'M3 Competition',  price: '$74,900'  },
    { id: 'ev',     label: 'i7 xDrive60',     price: '$109,995' },
  ];

  return (
    <section className="page1">
      {/* ── Background image ── */}
      <div className="page-bg" style={{ backgroundImage: 'url(/images/page1.webp)' }} />

      {/* ── UI Overlay ── */}
      <div className="page1__overlay">
        {/* Hero Text */}
        <div className="page1__hero">
          <div className="page1__eyebrow">2025 BMW M SERIES</div>
          <h1 className="page1__headline">
            The<br />
            <span className="page1__headline--accent">Ultimate</span><br />
            Machine.
          </h1>
          <p className="page1__sub">
            Engineered at the intersection of<br />
            performance, luxury and pure emotion.
          </p>

          <div className="page1__cta-row">
            <button className="btn-ignite" onClick={handleIgnite}>
              <span className="btn-ignite__icon">⚡</span>
              Ignite
            </button>
            <button className="btn-outline" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
              Configure
              <svg viewBox="0 0 24 24" width="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Model Switcher */}
        <div className="page1__model-switcher">
          <div className="page1__switcher-label">Select Model</div>
          {MODELS.map((m) => (
            <button
              key={m.id}
              className={`page1__model-btn ${selectedModel === m.id ? 'active' : ''}`}
              onClick={() => setSelectedModel(m.id)}
            >
              <span className="page1__model-name">{m.label}</span>
              <span className="page1__model-price">{m.price}</span>
            </button>
          ))}
        </div>

        {/* Color picker */}
        <div className="page1__color-picker">
          {Object.entries(colors).map(([key, val]) => (
            <button
              key={key}
              className={`page1__swatch ${selectedColor === key ? 'active' : ''}`}
              style={{ background: val.hex }}
              title={val.label}
              onClick={() => setSelectedColor(key)}
            />
          ))}
        </div>

        {/* Bottom M-strip */}
        <div className="page1__m-strip">
          <div className="page1__m-stripe page1__m-stripe--b" />
          <div className="page1__m-stripe page1__m-stripe--r" />
          <div className="page1__m-stripe page1__m-stripe--b2" />
        </div>
      </div>

      {ignited && <div className="page1__ignition-flash" />}
    </section>
  );
}
