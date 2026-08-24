import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural BMW car silhouette geometry
// Built from parametric shapes to approximate a Gran Coupé profile
export function CarBody({ color = '#3a3d42', metalness = 0.95, roughness = 0.12, scale = 1 }) {
  const groupRef = useRef();

  const bodyColor = useMemo(() => new THREE.Color(color), [color]);

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: bodyColor,
    metalness,
    roughness,
    envMapIntensity: 2.5,
  }), [bodyColor, metalness, roughness]);

  return (
    <group ref={groupRef} scale={scale}>
      {/* ── Main body hull ── */}
      <mesh material={mat} castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[4.0, 0.55, 1.75]} />
      </mesh>

      {/* ── Roof / cabin ── */}
      <mesh material={mat} castShadow position={[0, 0.9, 0]}>
        <boxGeometry args={[2.6, 0.45, 1.65]} />
      </mesh>

      {/* ── Front hood slope ── */}
      <mesh material={mat} castShadow position={[1.45, 0.55, 0]} rotation={[0, 0, -0.28]}>
        <boxGeometry args={[1.1, 0.08, 1.7]} />
      </mesh>

      {/* ── Rear trunk slope ── */}
      <mesh material={mat} castShadow position={[-1.35, 0.62, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.9, 0.08, 1.65]} />
      </mesh>

      {/* ── Front bumper ── */}
      <mesh material={mat} castShadow position={[2.0, 0.15, 0]}>
        <boxGeometry args={[0.12, 0.45, 1.7]} />
      </mesh>

      {/* ── Rear bumper ── */}
      <mesh material={mat} castShadow position={[-2.0, 0.15, 0]}>
        <boxGeometry args={[0.12, 0.45, 1.65]} />
      </mesh>

      {/* ── Kidney grille (signature BMW) ── */}
      <KidneyGrille />

      {/* ── Headlights ── */}
      <Headlights />

      {/* ── Taillights ── */}
      <Taillights />

      {/* ── Wheels (x4) ── */}
      <Wheel position={[ 1.25, -0.3,  0.95]} />
      <Wheel position={[ 1.25, -0.3, -0.95]} />
      <Wheel position={[-1.25, -0.3,  0.95]} />
      <Wheel position={[-1.25, -0.3, -0.95]} />

      {/* ── Side sills ── */}
      <mesh material={mat} castShadow position={[0, -0.05, 0.9]}>
        <boxGeometry args={[3.6, 0.12, 0.08]} />
      </mesh>
      <mesh material={mat} castShadow position={[0, -0.05, -0.9]}>
        <boxGeometry args={[3.6, 0.12, 0.08]} />
      </mesh>
    </group>
  );
}

function KidneyGrille() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111', metalness: 0.8, roughness: 0.3 }), []);
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a1a', metalness: 0.95, roughness: 0.05 }), []);

  return (
    <group position={[2.01, 0.3, 0]}>
      {/* Left kidney */}
      <mesh material={frameMat} position={[0, 0, 0.3]}>
        <boxGeometry args={[0.05, 0.28, 0.38]} />
      </mesh>
      <mesh material={mat} position={[0, 0, 0.3]}>
        <boxGeometry args={[0.04, 0.24, 0.34]} />
      </mesh>
      {/* Right kidney */}
      <mesh material={frameMat} position={[0, 0, -0.3]}>
        <boxGeometry args={[0.05, 0.28, 0.38]} />
      </mesh>
      <mesh material={mat} position={[0, 0, -0.3]}>
        <boxGeometry args={[0.04, 0.24, 0.34]} />
      </mesh>
    </group>
  );
}

function Headlights() {
  const lensRef = useRef();
  const glowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#a8d8ff',
    emissive: '#4499ff',
    emissiveIntensity: 3,
    transparent: true,
    opacity: 0.9,
  }), []);

  return (
    <group position={[1.98, 0.48, 0]}>
      {/* Left headlight cluster */}
      <mesh material={glowMat} position={[0, 0, 0.62]}>
        <boxGeometry args={[0.06, 0.14, 0.36]} />
      </mesh>
      {/* Right headlight cluster */}
      <mesh material={glowMat} position={[0, 0, -0.62]}>
        <boxGeometry args={[0.06, 0.14, 0.36]} />
      </mesh>
    </group>
  );
}

function Taillights() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ff2200',
    emissive: '#ff2200',
    emissiveIntensity: 2,
    transparent: true,
    opacity: 0.9,
  }), []);

  return (
    <group position={[-1.98, 0.45, 0]}>
      <mesh material={mat} position={[0, 0, 0.55]}>
        <boxGeometry args={[0.05, 0.1, 0.5]} />
      </mesh>
      <mesh material={mat} position={[0, 0, -0.55]}>
        <boxGeometry args={[0.05, 0.1, 0.5]} />
      </mesh>
      {/* Connecting strip */}
      <mesh material={mat} position={[0, 0, 0]}>
        <boxGeometry args={[0.04, 0.04, 1.0]} />
      </mesh>
    </group>
  );
}

function Wheel({ position }) {
  const rimMat  = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b0b5ba', metalness: 0.98, roughness: 0.05 }), []);
  const tireMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111', roughness: 0.9, metalness: 0.0 }), []);
  const brakeCaliper = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1565c0', emissive: '#0d47a1', emissiveIntensity: 0.3 }), []);
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 1.5;
  });

  return (
    <group position={position}>
      <group ref={ref}>
        {/* Tire */}
        <mesh material={tireMat} castShadow>
          <torusGeometry args={[0.32, 0.1, 16, 32]} />
        </mesh>
        {/* Rim face */}
        <mesh material={rimMat} castShadow position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.04, 32]} />
        </mesh>
        {/* Spokes */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} material={rimMat} castShadow
            position={[Math.cos((i / 5) * Math.PI * 2) * 0.14, Math.sin((i / 5) * Math.PI * 2) * 0.14, 0.01]}
            rotation={[(i / 5) * Math.PI * 2, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.025, 0.025, 0.28, 8]} />
          </mesh>
        ))}
      </group>
      {/* Brake caliper */}
      <mesh material={brakeCaliper} position={[0, 0.12, 0.05]}>
        <boxGeometry args={[0.08, 0.12, 0.06]} />
      </mesh>
    </group>
  );
}

export default CarBody;
