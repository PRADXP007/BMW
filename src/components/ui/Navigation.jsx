import { useStore } from '../../store/useStore';
import './Navigation.css';

const NAV_LINKS = [
  { label: 'Showroom',     href: '#showroom'     },
  { label: 'Configurator', href: '#configurator'  },
  { label: 'Electric',     href: '#electric'      },
  { label: 'Cockpit',      href: '#cockpit'       },
  { label: 'Aerodynamics', href: '#aero'          },
  { label: 'Vault',        href: '#vault'         },
];

export default function Navigation() {
  const { cartItems, setCartOpen } = useStore();

  return (
    <nav className="nav">
      {/* BMW Logo */}
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

      {/* Links */}
      <ul className="nav__links">
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="nav__link">{l.label}</a>
          </li>
        ))}
      </ul>

      {/* Cart */}
      <button className="nav__cart" onClick={() => setCartOpen(true)}>
        <svg viewBox="0 0 24 24" className="nav__cart-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
        </svg>
        {cartItems.length > 0 && (
          <span className="nav__cart-badge">{cartItems.length}</span>
        )}
      </button>
    </nav>
  );
}
