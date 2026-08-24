import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment as DreiEnv } from '@react-three/drei';
import * as THREE from 'three';
import { wetFloorVertexShader, wetFloorFragmentShader } from '../../shaders/wetFloor';

// ── Procedural HDR environment ────────────────────────────────────────────────
export function StudioEnvironment({ skyMode = 'dark' }) {
  const envPresets = {
    dark:   'city',
    day:    'dawn',
    sunset: 'sunset',
    night:  'night',
  };

  return (
    <>
      <DreiEnv preset={envPresets[skyMode] || 'city'} />
      <RectAreaLights skyMode={skyMode} />
    </>
  );
}

function RectAreaLights({ skyMode }) {
  const intensity = skyMode === 'dark' ? 8 : skyMode === 'day' ? 12 : 6;
  const color = skyMode === 'sunset' ? '#ff7043' : skyMode === 'night' ? '#90caf9' : '#e8f4ff';

  return (
    <>
      {/* Key light — overhead softbox */}
      <rectAreaLight
        position={[0, 6, 1]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={6} height={3}
        intensity={intensity}
        color={color}
      />
      {/* Fill lights — sides */}
      <rectAreaLight
        position={[5, 3, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={3} height={3}
        intensity={intensity * 0.4}
        color={color}
      />
      <rectAreaLight
        position={[-5, 3, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={3} height={3}
        intensity={intensity * 0.4}
        color={color}
      />
      {/* Rim light — rear */}
      <rectAreaLight
        position={[0, 3, -6]}
        rotation={[0, Math.PI, 0]}
        width={4} height={2}
        intensity={intensity * 0.5}
        color="#6699ff"
      />
      <ambientLight intensity={0.3} color="#112233" />
    </>
  );
}

// ── Wet asphalt floor ─────────────────────────────────────────────────────────
export function WetFloor() {
  const matRef = useRef();

  const uniforms = useMemo(() => ({
    uTime:         { value: 0 },
    uReflectColor: { value: new THREE.Color('#0066b1') },
    uCameraPos:    { value: new THREE.Vector3() },
  }), []);

  useFrame(({ clock, camera }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
      matRef.current.uniforms.uCameraPos.value.copy(camera.position);
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]} receiveShadow>
      <planeGeometry args={[40, 40, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={wetFloorVertexShader}
        fragmentShader={wetFloorFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// ── Tunnel/ambient volumetric fog approximation ───────────────────────────────
export function VolumeFog({ color = '#050508', near = 8, far = 30 }) {
  return <fog attach="fog" args={[color, near, far]} />;
}
