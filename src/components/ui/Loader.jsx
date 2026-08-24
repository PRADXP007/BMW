import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store/useStore';
import './Loader.css';

export default function Loader() {
  const { isLoading, loadingProgress } = useStore();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setFadeOut(true), 400);
      setTimeout(() => setVisible(false), 1200);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className={`loader ${fadeOut ? 'loader--fade' : ''}`}>
      <div className="loader__inner">
        {/* BMW Logo */}
        <div className="loader__logo">
          <svg viewBox="0 0 200 200" className="bmw-logo-svg">
            <circle cx="100" cy="100" r="96" fill="none" stroke="#0066b1" strokeWidth="4"/>
            <circle cx="100" cy="100" r="76" fill="#0066b1"/>
            {/* BMW quadrants */}
            <path d="M100 24 A76 76 0 0 1 176 100 L100 100 Z" fill="white"/>
            <path d="M100 176 A76 76 0 0 1 24 100 L100 100 Z" fill="white"/>
            <path d="M24 100 A76 76 0 0 1 100 24 L100 100 Z" fill="#0066b1"/>
            <path d="M176 100 A76 76 0 0 1 100 176 L100 100 Z" fill="#0066b1"/>
            <circle cx="100" cy="100" r="76" fill="none" stroke="white" strokeWidth="3"/>
          </svg>
        </div>

        <div className="loader__brand">BMW</div>
        <div className="loader__tagline">The Ultimate Driving Machine</div>

        {/* M-Strip progress bar */}
        <div className="loader__track">
          <div className="loader__track-bg" />
          <div className="loader__m-strip">
            <div className="loader__stripe loader__stripe--blue" style={{ width: `${loadingProgress * 0.333}%` }} />
            <div className="loader__stripe loader__stripe--red"  style={{ width: `${loadingProgress * 0.333}%` }} />
            <div className="loader__stripe loader__stripe--blue2"style={{ width: `${loadingProgress * 0.333}%` }} />
          </div>
          <div className="loader__bar" style={{ width: `${loadingProgress}%` }} />
        </div>

        <div className="loader__pct">{Math.round(loadingProgress)}%</div>

        <div className="loader__dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
