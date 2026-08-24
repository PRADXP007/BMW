import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, SMAA } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { EnergyFlowParticles, ParticleField } from '../canvas/ParticleField';
import { holographicVertexShader, holographicFragmentShader } from '../../shaders/holographic';
import './Page3_Electric.css';

// ── Glass i-Series Chassis ────────────────────────────────────────────────────
function GlassChassis() {
  const matRef = useRef();

  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uColor:   { value: new THREE.Color('#00d4ff') },
    uOpacity: { value: 0.85 },
  }), []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  const holo = (
    <shaderMaterial
      ref={matRef}
      vertexShader={holographicVertexShader}
      fragmentShader={holographicFragmentShader}
      uniforms={uniforms}
      transparent
      depthWrite={false}
      side={THREE.DoubleSide}
      blending={THREE.AdditiveBlending}
    />
  );

  return (
    <group position={[0, 0, 0]}>
      {/* Main body hull */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[4.2, 0.55, 1.8]} />
        {holo}
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[2.7, 0.45, 1.7]} />
        {holo}
      </mesh>
      {/* Battery pack floor */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.5, 0.2, 1.6]} />
        <shaderMaterial
          vertexShader={holographicVertexShader}
          fragmentShader={holographicFragmentShader}
          uniforms={{ uTime: uniforms.uTime, uColor: { value: new THREE.Color('#00ff88') }, uOpacity: { value: 1.0 } }}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Battery cells */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[((i - 2.5) * 0.55), -0.05, 0]}>
          <boxGeometry args={[0.45, 0.15, 1.5]} />
          <shaderMaterial
            vertexShader={holographicVertexShader}
            fragmentShader={holographicFragmentShader}
            uniforms={{ uTime: uniforms.uTime, uColor: { value: new THREE.Color('#00ff88') }, uOpacity: { value: 0.7 } }}
            transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
      {/* Electric motors (front + rear) */}
      {[[ 1.4, 0.1, 0], [-1.4, 0.1, 0]].map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.22, 0.22, 0.5, 16]} />
          <shaderMaterial
            vertexShader={holographicVertexShader}
            fragmentShader={holographicFragmentShader}
            uniforms={{ uTime: uniforms.uTime, uColor: { value: new THREE.Color('#ffaa00') }, uOpacity: { value: 1.0 } }}
            transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Energy flow paths (battery → motors → wheels) ─────────────────────────────
const FLOW_PATHS = {
  forward:  [[-1.4, 0.1, 0], [-0.8, -0.05, 0], [0, -0.05, 0], [0.8, -0.05, 0], [1.4, 0.1, 0], [1.25, -0.3, 0.95]],
  left:     [[-1.4, 0.1, 0], [-1.25, -0.1, 0], [-1.25, -0.3, 0.95]],
  right:    [[ 1.4, 0.1, 0], [ 1.25, -0.1, 0], [ 1.25, -0.3, -0.95]],
  battery:  [[-1.5, -0.05, 0.7], [-0.5, -0.05, 0.7], [0, -0.05, 0], [0.5, -0.05, -0.7], [1.5, -0.05, -0.7]],
};

function ElectricScene({ scrollSpeed = 1 }) {
  const { chargeLevel, driveMode } = useStore();
  const energyColor = driveMode === 'eco' ? '#00ff88' : driveMode === 'sport' ? '#ff4400' : '#00d4ff';

  return (
    <>
      {/* Deep space environment */}
      <color attach="background" args={['#020408']} />
      <ambientLight intensity={0.2} color="#0a1a2a" />
      <pointLight position={[0, 3, 0]} intensity={5} color="#00d4ff" distance={10} />
      <pointLight position={[2, 1, 0]} intensity={3} color="#00ff88" distance={8} />
      <pointLight position={[-2, 1, 0]} intensity={3} color="#ffaa00" distance={8} />

      <GlassChassis />

      {/* Energy particles */}
      <EnergyFlowParticles path={FLOW_PATHS.forward}  color={energyColor} count={300} scrollSpeed={scrollSpeed} />
      <EnergyFlowParticles path={FLOW_PATHS.battery}  color="#00ff88"     count={200} scrollSpeed={scrollSpeed * 0.8} />
      <EnergyFlowParticles path={FLOW_PATHS.left}     color={energyColor} count={150} scrollSpeed={scrollSpeed * 1.2} />
      <EnergyFlowParticles path={FLOW_PATHS.right}    color={energyColor} count={150} scrollSpeed={scrollSpeed * 1.2} />

      {/* Ambient particles */}
      <ParticleField count={800} color="#00d4ff" size={0.012} speed={0.2} bounds={6} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.0} intensity={4} radius={0.9} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.001]} />
        <SMAA />
      </EffectComposer>
    </>
  );
}

// ── Page 3 Component ──────────────────────────────────────────────────────────
export default function Page3_Electric() {
  const { chargeLevel, setChargeLevel, driveMode, setDriveMode, temperature, setTemperature } = useStore();

  const MODES = ['eco', 'comfort', 'sport', 'sport+'];

  const rangeEst = Math.round(
    chargeLevel * (driveMode === 'eco' ? 6.5 : driveMode === 'comfort' ? 5.8 : driveMode === 'sport' ? 5.0 : 4.3)
    * (1 - Math.abs(temperature - 22) * 0.008)
  );

  return (
    <section className="page3" id="page-electric">
      <div className="page3__ui">
        {/* Left info */}
        <div className="page3__info">
          <div className="page3__tag">03 — Electric Horizon</div>
          <h2 className="page3__heading">
            Pure<br /><span>Electric</span><br />Power.
          </h2>
          <p className="page3__body">
            Dual-motor all-wheel drive architecture with 536 bhp
            and 765 Nm of instant torque. 0–100 km/h in 4.7s.
          </p>

          {/* Range display */}
          <div className="page3__range-card">
            <div className="page3__range-val">{rangeEst} <span>km</span></div>
            <div className="page3__range-label">Estimated Range</div>
            <div className="page3__range-bar">
              <div className="page3__range-fill" style={{ width: `${chargeLevel}%`, background: `linear-gradient(90deg, #00ff88, #00d4ff)` }} />
            </div>
            <div className="page3__range-pct">{chargeLevel}% charge</div>
          </div>

          {/* Range simulator */}
          <div className="page3__slider-group">
            <label>Battery Level <span>{chargeLevel}%</span></label>
            <input type="range" min="10" max="100" value={chargeLevel}
              onChange={e => setChargeLevel(+e.target.value)} className="page3__slider" />
          </div>
          <div className="page3__slider-group">
            <label>Temperature <span>{temperature}°C</span></label>
            <input type="range" min="-20" max="40" value={temperature}
              onChange={e => setTemperature(+e.target.value)} className="page3__slider" />
          </div>
        </div>

        {/* Right controls */}
        <div className="page3__controls">
          <div className="page3__mode-label">Drive Mode</div>
          <div className="page3__modes">
            {MODES.map(m => (
              <button key={m} className={`page3__mode-btn ${driveMode === m ? 'active' : ''}`}
                onClick={() => setDriveMode(m)}>
                {m.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Specs */}
          <div className="page3__specs">
            {[
              { l: 'Peak Power',  v: '536 bhp' },
              { l: 'Peak Torque', v: '765 Nm'  },
              { l: 'Drive',       v: 'AWD'      },
              { l: 'Charge',      v: '200 kW DC'},
            ].map(s => (
              <div key={s.l} className="page3__spec">
                <div className="page3__spec-label">{s.l}</div>
                <div className="page3__spec-val">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { ElectricScene };
