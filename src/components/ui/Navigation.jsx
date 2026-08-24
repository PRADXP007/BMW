import { useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import './Navigation.css';

const PAGES = [
  { id: 0, label: 'Showroom',     icon: '◆' },
  { id: 1, label: 'Configurator', icon: '⬡' },
  { id: 2, label: 'Electric',     icon: '⚡' },
  { id: 3, label: 'Cockpit',      icon: '◎' },
  { id: 4, label: 'Aerodynamics', icon: '≋' },
  { id: 5, label: 'Vault',        icon: '⬡' },
];

export default function Navigation({ scrollTo }) {
  const { currentPage, cartItems, setCartOpen } = useStore();

  return (
    <nav className="nav">
      {/* BMW Wordmark */}
      <div className="nav__brand">
        <svg viewBox="0 0 200 200" className="nav__logo">
          <circle cx="100" cy="100" r="96" fill="none" stroke="#0066b1" strokeWidth="5"/>
          <circle cx="100" cy="100" r="76" fill="#0066b1"/>
          <path d="M100 24 A76 76 0 0 1 176 100 L100 100 Z" fill="white"/>
          <path d="M100 176 A76 76 0 0 1 24 100 L100 100 Z" fill="white"/>
          <path d="M24 100 A76 76 0 0 1 100 24 L100 100 Z" fill="#0066b1"/>
          <path d="M176 100 A76 76 0 0 1 100 176 L100 100 Z" fill="#0066b1"/>
          <circle cx="100" cy="100" r="76" fill="none" stroke="white" strokeWidth="4"/>
        </svg>
        <span className="nav__wordmark">BMW</span>
      </div>

      {/* Page links */}
      <ul className="nav__links">
        {PAGES.map((p) => (
          <li key={p.id} className={`nav__item ${currentPage === p.id ? 'nav__item--active' : ''}`}>
            <button
              className="nav__btn"
              onClick={() => scrollTo(p.id)}
            >
              <span className="nav__icon">{p.icon}</span>
              <span className="nav__label">{p.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Cart */}
      <button className="nav__cart" onClick={() => setCartOpen(true)}>
        <svg viewBox="0 0 24 24" className="nav__cart-icon">
          <path fill="none" stroke="currentColor" strokeWidth="1.5"
            d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
        </svg>
        {cartItems.length > 0 && (
          <span className="nav__cart-badge">{cartItems.length}</span>
        )}
      </button>
    </nav>
  );
}
