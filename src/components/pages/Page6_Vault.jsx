import { useRef, useState, useEffect, useCallback } from 'react';
import { useStore } from '../../store/useStore';
import './Page6_Vault.css';

// ── VIN Generator ─────────────────────────────────────────────────────────────
function useVINGenerator() {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  return useCallback(() => {
    return 'WBS' + Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }, []);
}

export default function Page6_Vault() {
  const { vaultUnlocked, setVaultUnlocked, orderPlaced, setOrderPlaced, vinCode, setVinCode,
          selectedColor, colors, selectedModel, cartItems } = useStore();
  const generateVIN = useVINGenerator();

  const [vinAnim, setVinAnim] = useState('');
  const animRef = useRef(null);

  const handleUnlock = () => setVaultUnlocked(true);

  const handleOrder = () => {
    const vin = generateVIN();
    let i = 0;
    animRef.current = setInterval(() => {
      setVinAnim(vin.slice(0, i + 1) + Array.from({ length: vin.length - i - 1 }, () => '█').join(''));
      i++;
      if (i >= vin.length) {
        clearInterval(animRef.current);
        setVinCode(vin);
        setVinAnim(vin);
        setOrderPlaced(true);
      }
    }, 80);
  };

  useEffect(() => () => clearInterval(animRef.current), []);

  const paint      = colors[selectedColor] || colors.frozen_grey;
  const basePrice  = selectedModel === 'sedan' ? 148100 : selectedModel === 'msport' ? 74900 : 109995;
  const extrasTotal = cartItems.reduce((s, i) => s + i.price, 0);
  const total      = basePrice + extrasTotal;
  const CURRENCY   = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <section className="page6" id="page-vault">
      {/* ── Background image ── */}
      <div className="page-bg" style={{ backgroundImage: 'url(/images/page6.webp)' }} />

      <div className="page6__ui">
        <div className="page6__left">
          <div className="page6__tag">06 — Executive Vault</div>
          <h2 className="page6__heading">
            Your<br /><span>BMW</span><br />Awaits.
          </h2>

          {!vaultUnlocked ? (
            <div className="page6__unlock">
              <p className="page6__unlock-text">
                Enter your private delivery bay and unlock your bespoke BMW.
              </p>
              <button className="page6__unlock-btn" onClick={handleUnlock}>
                ⬡ Unlock Vault
              </button>
            </div>
          ) : (
            <div className="page6__unlocked-badge">
              <span>✓</span> Vault Unlocked
            </div>
          )}
        </div>

        {/* Order Panel */}
        {vaultUnlocked && (
          <div className="page6__order-panel">
            <div className="page6__panel-title">Bespoke Build Summary</div>

            <div className="page6__summary">
              <div className="page6__summary-row">
                <span>Base Model</span>
                <span>
                  {selectedModel === 'sedan' ? 'BMW M8 Gran Coupé'
                    : selectedModel === 'msport' ? 'BMW M3 Competition'
                    : 'BMW i7 xDrive60'}
                </span>
              </div>
              <div className="page6__summary-row">
                <span>Color</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: paint.hex, display: 'inline-block' }} />
                  <span>{paint.label}</span>
                </div>
              </div>
              {cartItems.map(item => (
                <div key={item.id} className="page6__summary-row">
                  <span>{item.name}</span>
                  <span>{CURRENCY.format(item.price)}</span>
                </div>
              ))}
              <div className="page6__summary-divider" />
              <div className="page6__summary-row page6__summary-row--total">
                <span>Total</span>
                <span>{CURRENCY.format(total)}</span>
              </div>
            </div>

            {(vinAnim || vinCode) && (
              <div className="page6__vin">
                <div className="page6__vin-label">Vehicle Identification Number</div>
                <div className="page6__vin-code">{vinAnim || vinCode}</div>
              </div>
            )}

            {!orderPlaced ? (
              <button className="page6__order-btn" onClick={handleOrder}>
                Place Bespoke Order
                <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ) : (
              <div className="page6__success">
                <div className="page6__success-icon">✓</div>
                <div className="page6__success-title">Order Confirmed</div>
                <div className="page6__success-sub">Your BMW is being prepared. A specialist will contact you within 24 hours.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
