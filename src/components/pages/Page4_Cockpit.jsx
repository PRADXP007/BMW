import { useStore } from '../../store/useStore';
import './Page4_Cockpit.css';

export default function Page4_Cockpit() {
  const { skyMode, setSkyMode, accentColor, setAccentColor } = useStore();

  const SKY_MODES  = ['day', 'sunset', 'night'];
  const LED_COLORS = ['#00d4ff', '#ff4081', '#00ff88', '#ffaa00', '#ffffff'];

  return (
    <section className="page4" id="page-cockpit">
      {/* ── Background image ── */}
      <div className="page-bg" style={{ backgroundImage: 'url(/images/page4.webp)' }} />

      <div className="page4__ui">
        <div className="page4__left">
          <div className="page4__tag">04 — Cockpit & BMW OS 9</div>
          <h2 className="page4__heading">
            Inside<br />the <span>Machine</span>.
          </h2>
          <p className="page4__body">
            Curved panoramic 31" BMW Interaction Bar.
            BMW OS 9 with intelligent personal assistant,
            3D navigation and immersive audio.
          </p>

          <div className="page4__sky-control">
            <div className="page4__control-label">Panoramic Sky Mode</div>
            <div className="page4__sky-btns">
              {SKY_MODES.map(m => (
                <button key={m} className={`page4__sky-btn ${skyMode === m ? 'active' : ''}`}
                  onClick={() => setSkyMode(m)}>
                  {m === 'day' ? '☀' : m === 'sunset' ? '🌅' : '🌙'} {m}
                </button>
              ))}
            </div>
          </div>

          <div className="page4__led-control">
            <div className="page4__control-label">Ambient LED Color</div>
            <div className="page4__leds">
              {LED_COLORS.map(c => (
                <button key={c}
                  className={`page4__led-swatch ${accentColor === c ? 'active' : ''}`}
                  style={{ background: c, boxShadow: accentColor === c ? `0 0 12px ${c}` : 'none' }}
                  onClick={() => setAccentColor(c)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
