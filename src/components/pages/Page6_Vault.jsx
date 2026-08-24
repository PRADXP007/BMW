import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { EffectComposer, Bloom, SMAA, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { holographicVertexShader, holographicFragmentShader } from '../../shaders/holographic';
import { ParticleField } from '../canvas/ParticleField';
import './Page6_Vault.css';

// ── Smart Key 3D ──────────────────────────────────────────────────────────────
function SmartKey({ unlocked }) {
  const groupRef = useRef();
  const matRef   = useRef();
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const rotY = useRef(0);
  const targetY = useRef(0);

  const keyMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#111111',
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  }), []);
  const logoMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0066b1',
    emissive: '#003399',
    emissiveIntensity: unlocked ? 3 : 0.5,
  }), [unlocked]);
  const glowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00d4ff',
    emissive: '#00d4ff',
    emissiveIntensity: unlocked ? 5 : 0,
    transparent: true,
    opacity: unlocked ? 0.9 : 0,
  }), [unlocked]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    rotY.current += (targetY.current - rotY.current) * delta * 4;
    groupRef.current.rotation.y = rotY.current + state.clock.elapsedTime * 0.3;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0]} scale={1.5}>
      {/* Main key body */}
      <mesh material={keyMat} castShadow>
        <boxGeometry args={[0.5, 1.2, 0.08]} />
      </mesh>
      {/* Rounded top */}
      <mesh material={keyMat} castShadow position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 16]} />
      </mesh>
      {/* BMW logo disc */}
      <mesh material={logoMat} castShadow position={[0, 0.62, 0.05]}>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 24]} />
      </mesh>
      {/* Buttons */}
      {[[-0.12, 0.15, 0.05], [0.12, 0.15, 0.05], [0, -0.1, 0.05], [0, -0.35, 0.05]].map((p, i) => (
        <mesh key={i} material={i === 0 && unlocked ? glowMat : keyMat} castShadow position={p}>
          <boxGeometry args={[0.1, 0.06, 0.02]} />
        </mesh>
      ))}
      {/* Glow halo when unlocked */}
      {unlocked && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 1.5, 0.001]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} transparent opacity={0.08} />
        </mesh>
      )}
    </group>
  );
}

// ── Holographic Build Summary ─────────────────────────────────────────────────
function HoloBuildSummary({ visible }) {
  const matRef = useRef();
  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uColor:   { value: new THREE.Color('#00d4ff') },
    uOpacity: { value: 0.7 },
  }), []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  if (!visible) return null;

  return (
    <group position={[2.2, 0, 0]}>
      {/* Car outline hologram */}
      <mesh>
        <boxGeometry args={[2.8, 0.4, 1.2]} />
        <shaderMaterial ref={matRef} vertexShader={holographicVertexShader} fragmentShader={holographicFragmentShader}
          uniforms={uniforms} transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.8, 0.32, 1.1]} />
        <shaderMaterial vertexShader={holographicVertexShader} fragmentShader={holographicFragmentShader}
          uniforms={{ ...uniforms }} transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function VaultScene({ unlocked }) {
  return (
    <>
      <color attach="background" args={['#03050a']} />
      <ambientLight intensity={0.15} color="#091520" />

      {/* Vault spotlights — cinematic */}
      <spotLight position={[-2, 6, 2]} intensity={unlocked ? 30 : 8} color="#ffffff" angle={0.25} penumbra={0.6} castShadow />
      <spotLight position={[ 2, 5, 2]} intensity={unlocked ? 15 : 4} color="#0066b1" angle={0.3} penumbra={0.8} />
      <spotLight position={[ 0, 4,-2]} intensity={unlocked ? 10 : 3} color="#00d4ff" angle={0.4} penumbra={1.0} />

      {/* Floor */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20, 32, 32]} />
        <meshStandardMaterial color="#050810" metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Vault walls */}
      {[[-6,2,0,'y'], [6,2,0,'y'], [0,2,-6,'x']].map(([x,y,z,ax], i) => (
        <mesh key={i} position={[x,y,z]} rotation={[0, ax === 'y' ? Math.PI/2 : 0, 0]}>
          <planeGeometry args={[12, 8]} />
          <meshStandardMaterial color="#070b14" metalness={0.7} roughness={0.3} side={THREE.BackSide} />
        </mesh>
      ))}

      <SmartKey unlocked={unlocked} />
      <HoloBuildSummary visible={unlocked} />

      <ParticleField count={unlocked ? 600 : 150} color={unlocked ? '#00d4ff' : '#223344'} size={0.015} speed={0.2} bounds={5} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={unlocked ? 4 : 1.5} radius={0.9} />
        <Vignette darkness={0.85} offset={0.15} />
        <SMAA />
      </EffectComposer>
    </>
  );
}

// ── VIN Generator ─────────────────────────────────────────────────────────────
function useVINGenerator() {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  return useCallback(() => {
    return 'WBS' + Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }, []);
}

// ── Page 6 Component ──────────────────────────────────────────────────────────
export default function Page6_Vault() {
  const { vaultUnlocked, setVaultUnlocked, orderPlaced, setOrderPlaced, vinCode, setVinCode,
          selectedColor, colors, selectedModel, cartItems } = useStore();
  const generateVIN = useVINGenerator();

  const [vinAnim, setVinAnim] = useState('');
  const animRef = useRef(null);

  const handleUnlock = () => {
    setVaultUnlocked(true);
  };

  const handleOrder = () => {
    const vin = generateVIN();
    // Animate VIN
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

  const paint = colors[selectedColor] || colors.frozen_grey;
  const basePrice = selectedModel === 'sedan' ? 148100 : selectedModel === 'msport' ? 74900 : 109995;
  const extrasTotal = cartItems.reduce((s, i) => s + i.price, 0);
  const total = basePrice + extrasTotal;
  const CURRENCY = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <section className="page6" id="page-vault">
      <div className="page6__ui">
        <div className="page6__left">
          <div className="page6__tag">06 — Executive Vault</div>
          <h2 className="page6__heading">
            Your<br /><span>BMW</span><br />Awaits.
          </h2>

          {/* Key unlock CTA */}
          {!vaultUnlocked ? (
            <div className="page6__unlock">
              <p className="page6__unlock-text">
                Drag the smart key to unlock your private delivery bay.
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

            {/* Config summary */}
            <div className="page6__summary">
              <div className="page6__summary-row">
                <span>Base Model</span>
                <span>{selectedModel === 'sedan' ? 'BMW M8 Gran Coupé' : selectedModel === 'msport' ? 'BMW M3 Competition' : 'BMW i7 xDrive60'}</span>
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

            {/* VIN */}
            {(vinAnim || vinCode) && (
              <div className="page6__vin">
                <div className="page6__vin-label">Vehicle Identification Number</div>
                <div className="page6__vin-code">{vinAnim || vinCode}</div>
              </div>
            )}

            {/* Order button */}
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

export { VaultScene };
