import { useStore } from '../../store/useStore';
import './Page2_Configurator.css';

// ── Page 2 Component ──────────────────────────────────────────────────────────
export default function Page2_Configurator() {
  const {
    selectedColor, setSelectedColor, colors,
    selectedWheel, setSelectedWheel,
    selectedBrake, setSelectedBrake,
    isExploded, setIsExploded,
    showInterior, setShowInterior,
  } = useStore();

  const COLORS  = Object.entries(colors);
  const WHEELS  = [
    { id: 'star_spoke_20', label: '20" Star-Spoke'  },
    { id: 'star_spoke_21', label: '21" Star-Spoke'  },
    { id: 'cross_spoke',   label: '22" Cross-Spoke' },
  ];
  const BRAKES  = [
    { id: 'gold', label: 'M Carbon Gold', color: '#c8a000' },
    { id: 'red',  label: 'M Sport Red',   color: '#cc0000' },
    { id: 'blue', label: 'M Blue',         color: '#1565c0' },
  ];

  return (
    <section className="page2" id="page-configurator">
      {/* ── Background image ── */}
      <div className="page-bg" style={{ backgroundImage: 'url(/images/page2.webp)' }} />

      {/* UI overlay */}
      <div className="page2__ui">
        <div className="page2__panel page2__panel--left">
          <div className="page2__section-tag">02 — M-Performance Configurator</div>
          <h2 className="page2__heading">Build Your <span>M8</span></h2>

          {/* Color */}
          <div className="page2__group">
            <div className="page2__group-label">Exterior Color</div>
            <div className="page2__group-label-val">{colors[selectedColor]?.label}</div>
            <div className="page2__swatches">
              {COLORS.map(([key, val]) => (
                <button key={key} className={`page2__swatch ${selectedColor === key ? 'active' : ''}`}
                  style={{ background: val.hex }} title={val.label}
                  onClick={() => setSelectedColor(key)} />
              ))}
            </div>
          </div>

          {/* Wheels */}
          <div className="page2__group">
            <div className="page2__group-label">Alloy Wheels</div>
            <div className="page2__options">
              {WHEELS.map(w => (
                <button key={w.id} className={`page2__opt ${selectedWheel === w.id ? 'active' : ''}`}
                  onClick={() => setSelectedWheel(w.id)}>{w.label}</button>
              ))}
            </div>
          </div>

          {/* Brakes */}
          <div className="page2__group">
            <div className="page2__group-label">Brake Calipers</div>
            <div className="page2__options">
              {BRAKES.map(b => (
                <button key={b.id} className={`page2__opt ${selectedBrake === b.id ? 'active' : ''}`}
                  onClick={() => setSelectedBrake(b.id)}>
                  <span className="page2__brake-dot" style={{ background: b.color }} />
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="page2__panel page2__panel--right">
          <div className="page2__actions">
            <button className={`page2__action-btn ${isExploded ? 'active' : ''}`}
              onClick={() => setIsExploded(!isExploded)}>
              <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l4 4m8-8l4 4M4 20l4-4m8 8l4-4M12 4v16M4 12h16" />
              </svg>
              {isExploded ? 'Assemble' : 'Explode View'}
            </button>
            <button className={`page2__action-btn ${showInterior ? 'active' : ''}`}
              onClick={() => setShowInterior(!showInterior)}>
              <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4"/>
              </svg>
              {showInterior ? 'Exterior' : 'Interior'}
            </button>
          </div>

          <div className="page2__drag-hint">
            ⟳ Drag to rotate · Scroll to zoom
          </div>
        </div>
      </div>
    </section>
  );
}
