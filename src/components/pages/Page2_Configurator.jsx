import { useRef, useState, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, SMAA, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { CarBody } from '../canvas/CarModel';
import { StudioEnvironment, WetFloor } from '../canvas/Environment';
import { carPaintVertexShader, carPaintFragmentShader } from '../../shaders/carPaint';
import './Page2_Configurator.css';

// ── Floating Price HUD Tag ───────────────────────────────────────────────────
function PriceTag({ position, label, price, id }) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useStore();

  return (
    <Html position={position} center distanceFactor={6} occlude>
      <div
        className={`price-tag ${hovered ? 'price-tag--hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="price-tag__label">{label}</div>
        <div className="price-tag__price">{price}</div>
        <button className="price-tag__add" onClick={() => addToCart({ id, name: label, price: parseFloat(price.replace(/[^0-9.]/g,'')) })}>
          + Add
        </button>
      </div>
    </Html>
  );
}

// ── Exploded Part ─────────────────────────────────────────────────────────────
function ExplodedPart({ children, offset, isExploded }) {
  const groupRef = useRef();
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const goal   = useMemo(() => new THREE.Vector3(...offset), [offset]);
  const zero   = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    target.current.lerp(isExploded ? goal : zero, delta * 2.5);
    groupRef.current.position.copy(target.current);
  });

  return <group ref={groupRef}>{children}</group>;
}

// ── Configurator 3D Scene ─────────────────────────────────────────────────────
function ConfiguratorScene({ isExploded }) {
  const { selectedColor, colors } = useStore();
  const paint = colors[selectedColor] || colors.frozen_grey;

  const bodyColor = useMemo(() => new THREE.Color(paint.hex), [paint.hex]);
  const uniforms = useMemo(() => ({
    uBaseColor:      { value: new THREE.Color(paint.hex) },
    uMetalness:      { value: paint.metalness },
    uRoughness:      { value: paint.roughness },
    uFlakeScale:     { value: 180 },
    uFlakeIntensity: { value: 0.4 },
    uClearcoat:      { value: 0.9 },
    uTime:           { value: 0 },
    uLightDir:       { value: new THREE.Vector3(1, 2, 1).normalize() },
    uEnvColor:       { value: new THREE.Color('#1a3a5c') },
  }), []);

  // Update uniforms reactively
  useMemo(() => {
    uniforms.uBaseColor.value.set(paint.hex);
    uniforms.uMetalness.value = paint.metalness;
    uniforms.uRoughness.value = paint.roughness;
  }, [paint]);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  const mat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: carPaintVertexShader,
    fragmentShader: carPaintFragmentShader,
    uniforms,
  }), []);

  // Update mat uniforms on color change
  useFrame(() => {
    mat.uniforms.uBaseColor.value.set(paint.hex);
    mat.uniforms.uMetalness.value = paint.metalness;
    mat.uniforms.uRoughness.value = paint.roughness;
  });

  return (
    <>
      <StudioEnvironment skyMode="dark" />
      <WetFloor />

      {/* Main car with exploded sections */}
      <group position={[0, 0, 0]}>
        {/* Body panel */}
        <ExplodedPart offset={[0, isExploded ? 1.5 : 0, 0]} isExploded={isExploded}>
          <mesh castShadow position={[0, 0.35, 0]} material={mat}>
            <boxGeometry args={[4.0, 0.55, 1.75]} />
          </mesh>
          <mesh castShadow position={[0, 0.9, 0]} material={mat}>
            <boxGeometry args={[2.6, 0.45, 1.65]} />
          </mesh>
        </ExplodedPart>

        {/* Engine bay */}
        <ExplodedPart offset={[isExploded ? 3 : 0, isExploded ? 0.5 : 0, 0]} isExploded={isExploded}>
          <mesh castShadow position={[1.3, 0.2, 0]}>
            <boxGeometry args={[1.2, 0.5, 1.4]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Turbo V8 block approximation */}
          <mesh castShadow position={[1.3, 0.3, 0]}>
            <boxGeometry args={[0.7, 0.35, 0.9]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.15} />
          </mesh>
        </ExplodedPart>

        {/* Suspension */}
        <ExplodedPart offset={[0, isExploded ? -1.2 : 0, isExploded ? 1.5 : 0]} isExploded={isExploded}>
          {[[ 1.25, -0.3,  0.95], [ 1.25, -0.3, -0.95], [-1.25, -0.3,  0.95], [-1.25, -0.3, -0.95]].map((p, i) => (
            <group key={i} position={p}>
              <mesh castShadow>
                <torusGeometry args={[0.32, 0.1, 16, 32]} />
                <meshStandardMaterial color="#111" roughness={0.9} />
              </mesh>
              <mesh castShadow>
                <cylinderGeometry args={[0.24, 0.24, 0.04, 32]} />
                <meshStandardMaterial color="#b0b5ba" metalness={0.98} roughness={0.05} />
              </mesh>
            </group>
          ))}
        </ExplodedPart>

        {/* Full car overlay when not exploded */}
        <CarBody color={paint.hex} metalness={paint.metalness} roughness={paint.roughness} />
      </group>

      {/* Price tags (shown when not exploded) */}
      {!isExploded && (
        <>
          <PriceTag position={[-0.5, 1.2, 1.2]} label="M Carbon Splitter" price="$3,200" id="splitter" />
          <PriceTag position={[ 1.8, 0.5, 0.9]} label={'Star-Spoke Rims 21"'} price="$4,500" id="rims" />
          <PriceTag position={[ 1.25,-0.2, 1.2]} label="M Carbon Caliper" price="$1,800" id="caliper" />
        </>
      )}

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={2} radius={0.7} />
        <Vignette darkness={0.55} offset={0.35} />
        <SMAA />
      </EffectComposer>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={!isExploded}
        autoRotateSpeed={0.8}
      />
    </>
  );
}

// ── Page 2 Component ──────────────────────────────────────────────────────────
export default function Page2_Configurator() {
  const {
    selectedColor, setSelectedColor, colors,
    selectedWheel, setSelectedWheel,
    selectedBrake, setSelectedBrake,
    isExploded, setIsExploded,
    showInterior, setShowInterior,
  } = useStore();

  const COLORS  = Object.entries(colors);
  const WHEELS  = [{ id: 'star_spoke_20', label: '20" Star-Spoke'  }, { id: 'star_spoke_21', label: '21" Star-Spoke' }, { id: 'cross_spoke', label: '22" Cross-Spoke' }];
  const BRAKES  = [{ id: 'gold', label: 'M Carbon Gold', color: '#c8a000' }, { id: 'red', label: 'M Sport Red', color: '#cc0000' }, { id: 'blue', label: 'M Blue', color: '#1565c0' }];

  return (
    <section className="page2" id="page-configurator">
      {/* UI overlay */}
      <div className="page2__ui">
        <div className="page2__panel page2__panel--left">
          <div className="page2__section-tag">02 — M-Performance Configurator</div>
          <h2 className="page2__heading">Build Your <span>M8</span></h2>

          {/* Color */}
          <div className="page2__group">
            <div className="page2__group-label">Exterior Color</div>
            <div className="page2__group-label-val">{colors[selectedColor]?.label}</div>
            <div className="page2__swatches">
              {COLORS.map(([key, val]) => (
                <button key={key} className={`page2__swatch ${selectedColor === key ? 'active' : ''}`}
                  style={{ background: val.hex }} title={val.label}
                  onClick={() => setSelectedColor(key)} />
              ))}
            </div>
          </div>

          {/* Wheels */}
          <div className="page2__group">
            <div className="page2__group-label">Alloy Wheels</div>
            <div className="page2__options">
              {WHEELS.map(w => (
                <button key={w.id} className={`page2__opt ${selectedWheel === w.id ? 'active' : ''}`}
                  onClick={() => setSelectedWheel(w.id)}>{w.label}</button>
              ))}
            </div>
          </div>

          {/* Brakes */}
          <div className="page2__group">
            <div className="page2__group-label">Brake Calipers</div>
            <div className="page2__options">
              {BRAKES.map(b => (
                <button key={b.id} className={`page2__opt ${selectedBrake === b.id ? 'active' : ''}`}
                  onClick={() => setSelectedBrake(b.id)}>
                  <span className="page2__brake-dot" style={{ background: b.color }} />
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="page2__panel page2__panel--right">
          <div className="page2__actions">
            <button className={`page2__action-btn ${isExploded ? 'active' : ''}`} onClick={() => setIsExploded(!isExploded)}>
              <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l4 4m8-8l4 4M4 20l4-4m8 8l4-4M12 4v16M4 12h16" />
              </svg>
              {isExploded ? 'Assemble' : 'Explode View'}
            </button>
            <button className={`page2__action-btn ${showInterior ? 'active' : ''}`} onClick={() => setShowInterior(!showInterior)}>
              <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4"/>
              </svg>
              {showInterior ? 'Exterior' : 'Interior'}
            </button>
          </div>

          <div className="page2__drag-hint">
            <span>⟳</span> Drag to rotate · Scroll to zoom
          </div>
        </div>
      </div>
    </section>
  );
}

export { ConfiguratorScene };
