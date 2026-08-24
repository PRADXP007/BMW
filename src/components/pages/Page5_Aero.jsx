import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, SMAA, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { cfdVertexShader, cfdFragmentShader } from '../../shaders/cfd';
import { ParticleField } from '../canvas/ParticleField';
import './Page5_Aero.css';

// ── Racer geometry ────────────────────────────────────────────────────────────
function RacerBody({ wingAngle, flapsOpen }) {
  const cfdRef = useRef();

  const uniforms = useMemo(() => ({
    uTime:      { value: 0 },
    uPressure:  { value: 0.5 },
    uWingAngle: { value: wingAngle },
  }), []);

  useFrame(({ clock }) => {
    if (cfdRef.current) {
      cfdRef.current.uniforms.uTime.value = clock.elapsedTime;
      cfdRef.current.uniforms.uWingAngle.value = wingAngle;
    }
  });

  const cfdMat = (
    <shaderMaterial
      ref={cfdRef}
      vertexShader={cfdVertexShader}
      fragmentShader={cfdFragmentShader}
      uniforms={uniforms}
      transparent
    />
  );

  return (
    <group position={[0, 0, 0]}>
      {/* Main car low-profile */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[4.2, 0.35, 1.9]} />
        {cfdMat}
      </mesh>
      {/* Low cockpit/nose */}
      <mesh castShadow position={[0.5, 0.4, 0]}>
        <boxGeometry args={[2.5, 0.25, 1.7]} />
        {cfdMat}
      </mesh>
      {/* Front splitter */}
      <mesh castShadow position={[2.1, 0.05, 0]}>
        <boxGeometry args={[0.25, 0.04, 2.0]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Rear diffuser */}
      <mesh castShadow position={[-2.1, 0.1, 0]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.35, 0.06, 1.8]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Rear wing */}
      <group position={[-1.8, 0.75, 0]} rotation={[wingAngle * Math.PI / 180, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 0.05, 1.8]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Wing endplates */}
        {[-0.93, 0.93].map((z, i) => (
          <mesh key={i} position={[0, 0.1, z]}>
            <boxGeometry args={[0.6, 0.28, 0.04]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
      {/* Active air flaps */}
      {[-0.5, 0.0, 0.5].map((x, i) => (
        <mesh key={i} castShadow position={[1.5 + x * 0.3, 0.28, 0]}
          rotation={[0, 0, flapsOpen ? -Math.PI / 4 : 0]}>
          <boxGeometry args={[0.15, 0.02, 0.4]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Wheels */}
      {[[ 1.5, -0.22, 0.97], [ 1.5, -0.22, -0.97], [-1.5, -0.22, 0.97], [-1.5, -0.22, -0.97]].map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <torusGeometry args={[0.24, 0.08, 12, 24]} />
            <meshStandardMaterial color="#111" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── Wind tunnel smoke streamlines ─────────────────────────────────────────────
function CFDStreamlines({ count = 40 }) {
  const mesh = useRef();

  const geo = useMemo(() => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const z = ((i / count) - 0.5) * 3.8;
      const y = (Math.random() - 0.5) * 2.5 + 1.0;
      for (let t = 0; t <= 1; t += 0.02) {
        const x = (t - 0.5) * 10;
        const deflection = y < 0.6
          ? Math.sin(t * Math.PI) * 0.4  // floor deflection
          : y > 1.5
          ? -Math.sin(t * Math.PI) * 0.2 // top
          : 0;
        points.push(x, y + deflection, z);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3));
    return g;
  }, [count]);

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color('#88ccff'),
    size: 0.018,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  const offset = useRef(0);
  useFrame((_, delta) => {
    offset.current += delta * 1.5;
    if (mesh.current) {
      mesh.current.position.x = ((offset.current * 0.3) % 10) - 5;
    }
  });

  return <points ref={mesh} geometry={geo} material={mat} />;
}

function AeroScene({ wingAngle, flapsOpen }) {
  return (
    <>
      {/* Wind tunnel dark chamber */}
      <color attach="background" args={['#040608']} />
      <ambientLight intensity={0.2} color="#112233" />
      <spotLight position={[0, 6, 3]} intensity={15} color="#ffffff" angle={0.4} penumbra={0.8} castShadow />
      <spotLight position={[0, 4, -5]} intensity={5}  color="#4499ff" angle={0.5} penumbra={1} />
      <spotLight position={[5, 2, 0]} intensity={3}   color="#ff4400" angle={0.6} penumbra={1} />

      {/* Tunnel walls */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 10, 40, 20]} />
        <meshStandardMaterial color="#060a10" metalness={0.1} roughness={0.8} />
      </mesh>

      <RacerBody wingAngle={wingAngle} flapsOpen={flapsOpen} />
      <CFDStreamlines count={50} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.4} intensity={2.5} radius={0.8} />
        <Vignette darkness={0.75} offset={0.2} />
        <SMAA />
      </EffectComposer>
    </>
  );
}

// ── Page 5 Component ──────────────────────────────────────────────────────────
export default function Page5_Aero() {
  const { wingAngle, setWingAngle, flapsOpen, setFlapsOpen, diffuserActive, setDiffuserActive } = useStore();

  // Derived physics estimates
  const Cd   = (0.28 - (wingAngle / 45) * 0.04 + (flapsOpen ? 0.02 : 0)).toFixed(3);
  const downN = Math.round(wingAngle * 28 + (diffuserActive ? 340 : 180) + (flapsOpen ? 120 : 0));

  return (
    <section className="page5" id="page-aero">
      <div className="page5__ui">
        {/* Left heading */}
        <div className="page5__left">
          <div className="page5__tag">05 — Aerodynamics Lab</div>
          <h2 className="page5__heading">
            Wind<br /><span>Tunnel</span><br />Science.
          </h2>
          <p className="page5__body">
            Computational Fluid Dynamics testing of the
            BMW M Hybrid V8 Le Mans endurance racer.
            Real-time aerodynamic optimization.
          </p>

          {/* Live readouts */}
          <div className="page5__readouts">
            <div className="page5__readout">
              <div className="page5__readout-val">{Cd}</div>
              <div className="page5__readout-label">Drag Coefficient C<sub>d</sub></div>
            </div>
            <div className="page5__readout">
              <div className="page5__readout-val">{downN}<span>N</span></div>
              <div className="page5__readout-label">Downforce</div>
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="page5__right">
          <div className="page5__control">
            <label>Rear Wing Angle <span>{wingAngle}°</span></label>
            <input type="range" min="0" max="45" value={wingAngle}
              onChange={e => setWingAngle(+e.target.value)} className="page5__slider" />
          </div>

          <div className="page5__toggles">
            <button className={`page5__toggle ${flapsOpen ? 'active' : ''}`}
              onClick={() => setFlapsOpen(!flapsOpen)}>
              <span>Active Air Flaps</span>
              <span className="page5__toggle-state">{flapsOpen ? 'OPEN' : 'CLOSED'}</span>
            </button>
            <button className={`page5__toggle ${diffuserActive ? 'active' : ''}`}
              onClick={() => setDiffuserActive(!diffuserActive)}>
              <span>Diffuser</span>
              <span className="page5__toggle-state">{diffuserActive ? 'ACTIVE' : 'OFF'}</span>
            </button>
          </div>

          {/* Heatmap legend */}
          <div className="page5__legend">
            <div className="page5__legend-title">Pressure Heatmap</div>
            <div className="page5__legend-bar" />
            <div className="page5__legend-labels">
              <span>Low (Drag)</span>
              <span>High (Downforce)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { AeroScene };
