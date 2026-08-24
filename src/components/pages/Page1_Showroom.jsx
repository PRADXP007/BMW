import { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, SMAA, DepthOfField, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { CarBody } from '../canvas/CarModel';
import { StudioEnvironment, WetFloor, VolumeFog } from '../canvas/Environment';
import { ParticleField, BurstParticles } from '../canvas/ParticleField';
import './Page1_Showroom.css';

// ── Inner 3D Scene ────────────────────────────────────────────────────────────
function ShowroomScene({ ignited, selectedModel }) {
  const groupRef   = useRef();
  const cameraRef  = useThree((s) => s.camera);
  const mouseRef   = useRef({ x: 0, y: 0 });
  const targetRot  = useRef({ x: 0, y: 0 });
  const turntable  = useRef(0);

  const { colors, selectedColor } = useStore();
  const paint = colors[selectedColor] || colors.frozen_grey;

  // Mouse parallax
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Turntable auto-rotation
    turntable.current += delta * 0.15;

    // Parallax target
    targetRot.current.x += (mouseRef.current.y * 0.08 - targetRot.current.x) * 0.05;
    targetRot.current.y += (mouseRef.current.x * 0.25 + turntable.current - targetRot.current.y) * 0.04;

    groupRef.current.rotation.y = targetRot.current.y;
    groupRef.current.rotation.x = targetRot.current.x;

    // Camera gentle sway
    cameraRef.position.x += (mouseRef.current.x * 0.5 - cameraRef.position.x) * 0.03;
    cameraRef.position.y += (-mouseRef.current.y * 0.3 + 2.5 - cameraRef.position.y) * 0.03;
  });

  return (
    <>
      <StudioEnvironment skyMode="dark" />
      <WetFloor />
      <VolumeFog />
      <ParticleField count={1500} color="#0066b1" size={0.015} speed={0.3} bounds={10} />

      {/* Car */}
      <group ref={groupRef} position={[0, 0.3, 0]}>
        <CarBody
          color={paint.hex}
          metalness={paint.metalness}
          roughness={paint.roughness}
          scale={1}
        />
        {/* Ground shadow plane */}
        <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.64,0]} receiveShadow>
          <planeGeometry args={[8, 4]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      </group>

      {/* Ignition burst */}
      <BurstParticles active={ignited} origin={[2.0, 0.5, 0]} count={400} color="#ffaa00" />
      <BurstParticles active={ignited} origin={[-2.0, 0.45, 0]} count={200} color="#ff4400" />

      {/* Ground spotlights */}
      <spotLight position={[3, 6, 0]}  angle={0.3} penumbra={0.8} intensity={ignited ? 20 : 8}  color="#ffffff" castShadow />
      <spotLight position={[-3, 5, 0]} angle={0.4} penumbra={0.9} intensity={4} color="#0066b1" />
      <spotLight position={[0, 5, 3]}  angle={0.5} penumbra={1.0} intensity={3} color="#003366" />

      {/* Post Processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} intensity={ignited ? 3.5 : 1.5} radius={0.8} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0012, 0.0008]} />
        <DepthOfField focusDistance={0.005} focalLength={0.03} bokehScale={4} />
        <Vignette darkness={0.6} offset={0.3} />
        <SMAA />
      </EffectComposer>
    </>
  );
}

// ── Page 1 Component ──────────────────────────────────────────────────────────
export default function Page1_Showroom({ sceneRef }) {
  const [ignited, setIgnited] = useState(false);
  const { selectedModel, setSelectedModel, selectedColor, setSelectedColor, colors } = useStore();

  const handleIgnite = useCallback(() => {
    setIgnited(true);
    setTimeout(() => setIgnited(false), 3000);
  }, []);

  const MODELS = [
    { id: 'sedan',  label: 'M8 Gran Coupé',     price: '$148,100' },
    { id: 'msport', label: 'M3 Competition',      price: '$74,900'  },
    { id: 'ev',     label: 'i7 xDrive60',         price: '$109,995' },
  ];

  return (
    <section className="page1">
      {/* 3D Canvas Scene (mounted via parent) */}

      {/* ── UI Overlay ── */}
      <div className="page1__overlay">
        {/* Hero Text */}
        <div className="page1__hero">
          <div className="page1__eyebrow">2025 BMW M SERIES</div>
          <h1 className="page1__headline">
            The<br />
            <span className="page1__headline--accent">Ultimate</span><br />
            Machine.
          </h1>
          <p className="page1__sub">
            Engineered at the intersection of<br />
            performance, luxury and pure emotion.
          </p>

          <div className="page1__cta-row">
            <button className="btn-ignite" onClick={handleIgnite}>
              <span className="btn-ignite__icon">⚡</span>
              Ignite
            </button>
            <button className="btn-outline" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
              Configure
              <svg viewBox="0 0 24 24" width="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Model Switcher */}
        <div className="page1__model-switcher">
          <div className="page1__switcher-label">Select Model</div>
          {MODELS.map((m) => (
            <button
              key={m.id}
              className={`page1__model-btn ${selectedModel === m.id ? 'active' : ''}`}
              onClick={() => setSelectedModel(m.id)}
            >
              <span className="page1__model-name">{m.label}</span>
              <span className="page1__model-price">{m.price}</span>
            </button>
          ))}
        </div>

        {/* Color picker */}
        <div className="page1__color-picker">
          {Object.entries(colors).map(([key, val]) => (
            <button
              key={key}
              className={`page1__swatch ${selectedColor === key ? 'active' : ''}`}
              style={{ background: val.hex }}
              title={val.label}
              onClick={() => setSelectedColor(key)}
            />
          ))}
        </div>

        {/* Bottom M-strip */}
        <div className="page1__m-strip">
          <div className="page1__m-stripe page1__m-stripe--b" />
          <div className="page1__m-stripe page1__m-stripe--r" />
          <div className="page1__m-stripe page1__m-stripe--b2" />
        </div>
      </div>

      {/* Ignition overlay flash */}
      {ignited && <div className="page1__ignition-flash" />}
    </section>
  );
}

export { ShowroomScene };
