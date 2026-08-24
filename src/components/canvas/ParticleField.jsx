import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Particle field component ──────────────────────────────────────────────────
// Instanced particles for energy flow, ignition bursts, and atmospheric effects
export function ParticleField({ count = 2000, color = '#00d4ff', size = 0.02, speed = 0.5, bounds = 8, type = 'float' }) {
  const mesh = useRef();

  const { positions, velocities } = useMemo(() => {
    const positions  = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * bounds * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds;
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds;
      velocities[i * 3]     = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions, velocities };
  }, [count, bounds]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  }), [color, size]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i * 3]     * speed;
      pos[i * 3 + 1] += velocities[i * 3 + 1] * speed;
      pos[i * 3 + 2] += velocities[i * 3 + 2] * speed;

      // Boundary wrap
      for (let j = 0; j < 3; j++) {
        if (pos[i * 3 + j] >  bounds) pos[i * 3 + j] = -bounds;
        if (pos[i * 3 + j] < -bounds) pos[i * 3 + j] =  bounds;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={mesh} geometry={geo} material={mat} />;
}

// ── Energy flow particles along a path ──────────────────────────────────────
export function EnergyFlowParticles({ path, color = '#00ff88', count = 500, scrollSpeed = 1 }) {
  const mesh = useRef();

  const offsets = useMemo(() => new Float32Array(count).map(() => Math.random()), [count]);

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: 0.03,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [color]);

  const spline = useMemo(() => {
    if (!path || path.length < 2) return null;
    return new THREE.CatmullRomCurve3(path.map(p => new THREE.Vector3(...p)));
  }, [path]);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!mesh.current || !spline) return;
    timeRef.current += delta * 0.12 * scrollSpeed;
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const t = (offsets[i] + timeRef.current) % 1;
      const pt = spline.getPoint(t);
      pos[i * 3]     = pt.x;
      pos[i * 3 + 1] = pt.y;
      pos[i * 3 + 2] = pt.z;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={mesh} geometry={geo} material={mat} />;
}

// ── Burst / ignition particle explosion ─────────────────────────────────────
export function BurstParticles({ active, origin = [0, 0, 0], count = 300, color = '#ff8c00' }) {
  const mesh = useRef();

  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions  = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const lifetimes  = new Float32Array(count).map(() => Math.random());
    return { positions, velocities, lifetimes };
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, []);

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: 0.06,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [color]);

  const triggered = useRef(false);
  useEffect(() => {
    if (active && !triggered.current) {
      triggered.current = true;
      const pos = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = origin[0];
        pos[i * 3 + 1] = origin[1];
        pos[i * 3 + 2] = origin[2];
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.random() * Math.PI;
        const v     = 0.05 + Math.random() * 0.15;
        velocities[i * 3]     = Math.sin(phi) * Math.cos(theta) * v;
        velocities[i * 3 + 1] = Math.cos(phi) * v;
        velocities[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * v;
        lifetimes[i] = 0;
      }
      geo.attributes.position.needsUpdate = true;
    }
    if (!active) triggered.current = false;
  }, [active]);

  useFrame((_, delta) => {
    if (!mesh.current || !active) return;
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      lifetimes[i] = Math.min(lifetimes[i] + delta * 0.5, 1);
      const fade = 1 - lifetimes[i];
      pos[i * 3]     += velocities[i * 3]     * fade;
      pos[i * 3 + 1] += velocities[i * 3 + 1] * fade - 0.001;
      pos[i * 3 + 2] += velocities[i * 3 + 2] * fade;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mat.opacity = Math.max(0, 1 - (lifetimes.reduce((a, b) => a + b, 0) / count));
  });

  return <points ref={mesh} geometry={geo} material={mat} />;
}
