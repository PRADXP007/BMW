import { useStore } from '../../store/useStore';
import './Page5_Aero.css';

export default function Page5_Aero() {
  const { wingAngle, setWingAngle, flapsOpen, setFlapsOpen, diffuserActive, setDiffuserActive } = useStore();

  const Cd    = (0.28 - (wingAngle / 45) * 0.04 + (flapsOpen ? 0.02 : 0)).toFixed(3);
  const downN = Math.round(wingAngle * 28 + (diffuserActive ? 340 : 180) + (flapsOpen ? 120 : 0));

  return (
    <section className="page5" id="page-aero">
      {/* ── Background image ── */}
      <div className="page-bg" style={{ backgroundImage: 'url(/images/page5.webp)' }} />

      <div className="page5__ui">
        {/* Left heading */}
        <div className="page5__left">
          <div className="page5__tag">05 — Aerodynamics Lab</div>
          <h2 className="page5__heading">
            Wind<br /><span>Tunnel</span><br />Science.
          </h2>
          <p className="page5__body">
            Computational Fluid Dynamics testing of the
            BMW M Hybrid V8 Le Mans endurance racer.
            Real-time aerodynamic optimization.
          </p>

          {/* Live readouts */}
          <div className="page5__readouts">
            <div className="page5__readout">
              <div className="page5__readout-val">{Cd}</div>
              <div className="page5__readout-label">Drag Coefficient C<sub>d</sub></div>
            </div>
            <div className="page5__readout">
              <div className="page5__readout-val">{downN}<span>N</span></div>
              <div className="page5__readout-label">Downforce</div>
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="page5__right">
          <div className="page5__control">
            <label>Rear Wing Angle <span>{wingAngle}°</span></label>
            <input type="range" min="0" max="45" value={wingAngle}
              onChange={e => setWingAngle(+e.target.value)} className="page5__slider" />
          </div>

          <div className="page5__toggles">
            <button className={`page5__toggle ${flapsOpen ? 'active' : ''}`}
              onClick={() => setFlapsOpen(!flapsOpen)}>
              <span>Active Air Flaps</span>
              <span className="page5__toggle-state">{flapsOpen ? 'OPEN' : 'CLOSED'}</span>
            </button>
            <button className={`page5__toggle ${diffuserActive ? 'active' : ''}`}
              onClick={() => setDiffuserActive(!diffuserActive)}>
              <span>Diffuser</span>
              <span className="page5__toggle-state">{diffuserActive ? 'ACTIVE' : 'OFF'}</span>
            </button>
          </div>

          {/* Heatmap legend */}
          <div className="page5__legend">
            <div className="page5__legend-title">Pressure Heatmap</div>
            <div className="page5__legend-bar" />
            <div className="page5__legend-labels">
              <span>Low (Drag)</span>
              <span>High (Downforce)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
