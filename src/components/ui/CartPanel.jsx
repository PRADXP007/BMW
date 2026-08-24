import { useStore } from '../../store/useStore';
import './CartPanel.css';

const CURRENCY = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function CartPanel() {
  const { cartOpen, setCartOpen, cartItems, removeFromCart, cartTotal, selectedColor, colors, selectedModel } = useStore();

  const total = cartItems.reduce((s, i) => s + i.price, 0);

  return (
    <>
      <div className={`cart-overlay ${cartOpen ? 'cart-overlay--open' : ''}`} onClick={() => setCartOpen(false)} />

      <aside className={`cart ${cartOpen ? 'cart--open' : ''}`}>
        <div className="cart__header">
          <h2 className="cart__title">Your Configuration</h2>
          <button className="cart__close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {/* Selected Config Summary */}
        <div className="cart__config">
          <div className="cart__config-label">Current Build</div>
          <div className="cart__config-row">
            <span>Model</span>
            <span>{selectedModel === 'sedan' ? 'BMW M8 Gran Coupé' : selectedModel === 'msport' ? 'BMW M3 Competition' : 'BMW i7 xDrive60'}</span>
          </div>
          <div className="cart__config-row">
            <span>Color</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="cart__color-dot" style={{ background: colors[selectedColor]?.hex || '#3a3d42' }} />
              <span>{colors[selectedColor]?.label}</span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="cart__items">
          {cartItems.length === 0 ? (
            <div className="cart__empty">
              <p>No accessories added yet.</p>
              <p>Visit the Configurator to add M Performance parts.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart__item">
                <div className="cart__item-info">
                  <div className="cart__item-name">{item.name}</div>
                  <div className="cart__item-price">{CURRENCY.format(item.price)}</div>
                </div>
                <button className="cart__item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        {cartItems.length > 0 && (
          <div className="cart__footer">
            <div className="cart__total">
              <span>Total Accessories</span>
              <span>{CURRENCY.format(total)}</span>
            </div>
            <button className="cart__checkout" onClick={() => { setCartOpen(false); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }}>
              Proceed to Vault
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
