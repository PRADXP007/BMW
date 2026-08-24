import { useStore } from '../../store/useStore';
import './Page3_Electric.css';

export default function Page3_Electric() {
  const { chargeLevel, setChargeLevel, driveMode, setDriveMode, temperature, setTemperature } = useStore();

  const MODES = ['eco', 'comfort', 'sport', 'sport+'];

  const rangeEst = Math.round(
    chargeLevel * (driveMode === 'eco' ? 6.5 : driveMode === 'comfort' ? 5.8 : driveMode === 'sport' ? 5.0 : 4.3)
    * (1 - Math.abs(temperature - 22) * 0.008)
  );

  return (
    <section className="page3" id="page-electric">
      {/* ── Background image ── */}
      <div className="page-bg" style={{ backgroundImage: 'url(/images/page3.webp)' }} />

      <div className="page3__ui">
        {/* Left info */}
        <div className="page3__info">
          <div className="page3__tag">03 — Electric Horizon</div>
          <h2 className="page3__heading">
            Pure<br /><span>Electric</span><br />Power.
          </h2>
          <p className="page3__body">
            Dual-motor all-wheel drive architecture with 536 bhp
            and 765 Nm of instant torque. 0–100 km/h in 4.7s.
          </p>

          {/* Range display */}
          <div className="page3__range-card">
            <div className="page3__range-val">{rangeEst} <span>km</span></div>
            <div className="page3__range-label">Estimated Range</div>
            <div className="page3__range-bar">
              <div className="page3__range-fill" style={{ width: `${chargeLevel}%` }} />
            </div>
            <div className="page3__range-pct">{chargeLevel}% charge</div>
          </div>

          <div className="page3__slider-group">
            <label>Battery Level <span>{chargeLevel}%</span></label>
            <input type="range" min="10" max="100" value={chargeLevel}
              onChange={e => setChargeLevel(+e.target.value)} className="page3__slider" />
          </div>
          <div className="page3__slider-group">
            <label>Temperature <span>{temperature}°C</span></label>
            <input type="range" min="-20" max="40" value={temperature}
              onChange={e => setTemperature(+e.target.value)} className="page3__slider" />
          </div>
        </div>

        {/* Right controls */}
        <div className="page3__controls">
          <div className="page3__mode-label">Drive Mode</div>
          <div className="page3__modes">
            {MODES.map(m => (
              <button key={m} className={`page3__mode-btn ${driveMode === m ? 'active' : ''}`}
                onClick={() => setDriveMode(m)}>
                {m.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="page3__specs">
            {[
              { l: 'Peak Power',  v: '536 bhp'  },
              { l: 'Peak Torque', v: '765 Nm'   },
              { l: 'Drive',       v: 'AWD'       },
              { l: 'Charge',      v: '200 kW DC' },
            ].map(s => (
              <div key={s.l} className="page3__spec">
                <div className="page3__spec-label">{s.l}</div>
                <div className="page3__spec-val">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
