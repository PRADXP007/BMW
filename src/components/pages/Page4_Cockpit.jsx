import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, SMAA, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { ParticleField } from '../canvas/ParticleField';
import './Page4_Cockpit.css';

// ── OS 9 Canvas Texture ───────────────────────────────────────────────────────
function useOS9Texture(accentColor) {
  const canvasRef = useRef(document.createElement('canvas'));
  const textureRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1024;
    canvas.height = 256;
    textureRef.current = new THREE.CanvasTexture(canvas);
  }, []);

  const draw = (t) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#080c14';
    ctx.fillRect(0, 0, 1024, 256);

    // ── Header ──
    ctx.fillStyle = accentColor || '#00d4ff';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('BMW OS 9', 20, 30);
    ctx.font = '12px monospace';
    ctx.fillStyle = '#ffffff66';
    ctx.fillText(new Date().toLocaleTimeString(), 900, 30);

    // ── Speed gauge ──
    const speed = Math.round(Math.abs(Math.sin(t * 0.5)) * 220 + Math.sin(t * 2.1) * 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px monospace';
    ctx.fillText(speed, 40, 120);
    ctx.fillStyle = '#ffffff66';
    ctx.font = '14px monospace';
    ctx.fillText('km/h', 40, 140);

    // ── Tachometer arc ──
    const cx = 220, cy = 100, r = 70;
    const rpm = Math.abs(Math.sin(t * 0.7)) * 7500;
    const rpmAngle = (rpm / 8000) * Math.PI * 1.5 - Math.PI * 0.75;
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI * 0.75, -Math.PI * 0.75 + Math.PI * 1.5);
    ctx.strokeStyle = '#ffffff1a';
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI * 0.75, rpmAngle);
    ctx.strokeStyle = rpm > 6500 ? '#ff4400' : accentColor || '#00d4ff';
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(rpm / 100) / 10 + 'k', cx, cy + 8);
    ctx.textAlign = 'left';
    ctx.font = '10px monospace';
    ctx.fillStyle = '#ffffff66';
    ctx.fillText('RPM', cx - 12, cy + 22);

    // ── Nav map (simplified) ──
    const mapX = 340;
    ctx.fillStyle = '#0a1520';
    ctx.fillRect(mapX, 20, 220, 140);
    ctx.strokeStyle = '#ffffff1a';
    ctx.lineWidth = 1;
    ctx.strokeRect(mapX, 20, 220, 140);
    // Road lines
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(mapX + 20 + i * 50, 20);
      ctx.lineTo(mapX + 30 + i * 55, 160);
      ctx.strokeStyle = '#ffffff22';
      ctx.lineWidth = 8;
      ctx.stroke();
    }
    // Position dot
    const dotX = mapX + 110 + Math.sin(t * 0.3) * 30;
    const dotY = 80 + Math.sin(t * 0.5) * 20;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
    ctx.fillStyle = accentColor || '#00d4ff';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.fillText('Navigation Active', mapX + 8, 175);

    // ── Audio visualizer ──
    const visX = 580;
    ctx.fillStyle = '#0a1520';
    ctx.fillRect(visX, 20, 200, 140);
    ctx.font = '10px monospace';
    ctx.fillStyle = '#ffffff66';
    ctx.fillText('BMW Harman Kardon', visX + 8, 38);
    for (let i = 0; i < 20; i++) {
      const h = (Math.sin(t * 3 + i * 0.5) * 0.5 + 0.5) * 80 + 10;
      const c = `hsl(${190 + i * 8}, 100%, 60%)`;
      ctx.fillStyle = c;
      ctx.fillRect(visX + 10 + i * 9, 155 - h, 6, h);
    }

    // ── Battery/charge status ──
    ctx.fillStyle = '#00ff88';
    ctx.font = '14px monospace';
    ctx.fillText('⚡ 82%', 800, 80);
    ctx.fillStyle = '#ffffff66';
    ctx.font = '11px monospace';
    ctx.fillText('Range: 520 km', 800, 100);

    // Temp
    ctx.fillStyle = accentColor || '#00d4ff';
    ctx.font = '14px monospace';
    ctx.fillText('22°C', 800, 130);

    if (textureRef.current) textureRef.current.needsUpdate = true;
  };

  useFrame(({ clock }) => {
    timeRef.current = clock.elapsedTime;
    draw(timeRef.current);
  });

  return textureRef;
}

// ── Cockpit Interior ──────────────────────────────────────────────────────────
function CockpitScene({ skyMode, accentColor }) {
  const groupRef = useRef();
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  const os9Texture = useOS9Texture(accentColor);

  const leatherMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a0f08',
    roughness: 0.85,
    metalness: 0.0,
  }), []);
  const trimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.2,
    metalness: 0.9,
  }), []);
  const glassRefract = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#88ccff',
    transmission: 0.9,
    roughness: 0.05,
    metalness: 0.0,
    ior: 1.5,
    thickness: 0.2,
    transparent: true,
    opacity: 0.3,
  }), []);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5);
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * delta * 3;
    camera.position.y += (-mouseRef.current.y * 0.3 + 1.1 - camera.position.y) * delta * 3;
    camera.lookAt(0, 0.8, -2);
  });

  const skyColors = {
    day:    '#87ceeb',
    sunset: '#ff6b35',
    night:  '#0a0a1a',
  };

  const ambientIntensity = skyMode === 'night' ? 0.1 : skyMode === 'sunset' ? 0.5 : 0.8;

  const ledColor = accentColor || '#00d4ff';

  return (
    <>
      <color attach="background" args={[skyColors[skyMode] || '#87ceeb']} />
      <ambientLight intensity={ambientIntensity} color={skyMode === 'sunset' ? '#ff7043' : '#ddeeff'} />
      <spotLight position={[0, 3, -1]} intensity={4} color={ledColor} angle={0.6} penumbra={1} />
      <pointLight position={[0, 0.5, 0]} intensity={2} color={ledColor} distance={3} />

      {/* ── Dashboard ── */}
      <mesh material={leatherMat} castShadow position={[0, 0.5, -1.5]}>
        <boxGeometry args={[3.5, 0.7, 0.3]} />
      </mesh>

      {/* ── Curved display ── */}
      <mesh position={[0, 0.8, -1.38]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[2.8, 0.35, 0.02]} />
        <meshBasicMaterial map={os9Texture.current} />
      </mesh>

      {/* ── Display glass overlay ── */}
      <mesh position={[0, 0.8, -1.37]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[2.8, 0.35, 0.01]} />
        <primitive object={glassRefract} />
      </mesh>

      {/* ── Steering wheel ── */}
      <group position={[0.45, 0.5, -0.8]} rotation={[-0.3, 0, 0]}>
        <mesh material={leatherMat}>
          <torusGeometry args={[0.22, 0.035, 16, 32]} />
        </mesh>
        {/* Spokes */}
        {[[-Math.PI/2, 0, 0], [Math.PI/6, 0, 0], [Math.PI * 5/6, 0, 0]].map((r, i) => (
          <mesh key={i} material={trimMat} rotation={r}>
            <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
          </mesh>
        ))}
      </group>

      {/* ── iDrive controller ── */}
      <mesh position={[0.3, 0.25, -0.9]} material={trimMat}>
        <cylinderGeometry args={[0.06, 0.05, 0.08, 12]} />
      </mesh>
      <mesh position={[0.3, 0.26, -0.9]} material={glassRefract}>
        <sphereGeometry args={[0.065, 12, 12]} />
      </mesh>

      {/* ── Seats (driver silhouette) ── */}
      <mesh material={leatherMat} castShadow position={[0.45, -0.2, 0.5]}>
        <boxGeometry args={[0.7, 0.6, 1.0]} />
      </mesh>
      <mesh material={leatherMat} castShadow position={[0.45, 0.55, 0.05]}>
        <boxGeometry args={[0.68, 1.1, 0.2]} />
      </mesh>

      {/* ── Ambient LED strip ── */}
      {[-1.7, 1.7].map((x, i) => (
        <mesh key={i} position={[x, 0.7, -0.5]}>
          <boxGeometry args={[0.05, 0.02, 2.0]} />
          <meshStandardMaterial color={ledColor} emissive={ledColor} emissiveIntensity={3} />
        </mesh>
      ))}

      {/* ── Skyline/roof (panoramic) ── */}
      <mesh position={[0, 1.5, -0.5]}>
        <boxGeometry args={[3.0, 0.05, 2.5]} />
        <meshPhysicalMaterial color={skyColors[skyMode]} transmission={0.8} roughness={0.1} transparent opacity={0.3} />
      </mesh>

      <ParticleField count={300} color={ledColor} size={0.01} speed={0.1} bounds={2} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={2.5} radius={0.8} />
        <Vignette darkness={0.8} offset={0.2} />
        <SMAA />
      </EffectComposer>
    </>
  );
}

// ── Page 4 Component ──────────────────────────────────────────────────────────
export default function Page4_Cockpit() {
  const { skyMode, setSkyMode, accentColor, setAccentColor } = useStore();

  const SKY_MODES = ['day', 'sunset', 'night'];
  const LED_COLORS = ['#00d4ff', '#ff4081', '#00ff88', '#ffaa00', '#ffffff'];

  return (
    <section className="page4" id="page-cockpit">
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
                <button key={c} className={`page4__led-swatch ${accentColor === c ? 'active' : ''}`}
                  style={{ background: c, boxShadow: accentColor === c ? `0 0 12px ${c}` : 'none' }}
                  onClick={() => setAccentColor(c)} />
              ))}
            </div>
          </div>
        </div>

        <div className="page4__hint">
          Move mouse to pan cockpit view
        </div>
      </div>
    </section>
  );
}

export { CockpitScene };
