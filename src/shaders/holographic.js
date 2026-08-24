export const holographicVertexShader = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const holographicFragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec3  uColor;
  uniform float uOpacity;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);

    // Fresnel edge glow
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.5);

    // Scanlines
    float scanline = sin(vWorldPos.y * 40.0 - uTime * 3.0) * 0.5 + 0.5;
    scanline = pow(scanline, 8.0) * 0.6;

    // Horizontal data sweep
    float sweep = smoothstep(0.0, 0.02, fract(vWorldPos.y * 0.3 - uTime * 0.4));
    sweep *= 0.35;

    // Chromatic dispersion (RGB shift)
    float r = fresnel * 1.2;
    float g = fresnel * 0.8;
    float b = fresnel * 1.6;
    vec3 chromatic = vec3(r, g, b) * uColor;

    // Grid wireframe
    vec2 grid = abs(fract(vUv * 20.0) - 0.5);
    float wire = 1.0 - smoothstep(0.0, 0.05, min(grid.x, grid.y));
    wire *= 0.3;

    vec3 col = chromatic + vec3(wire) * uColor;
    col += vec3(scanline) * uColor * 0.5;
    col += vec3(sweep) * uColor;

    float alpha = (fresnel * 0.8 + wire * 0.5 + scanline * 0.3 + sweep) * uOpacity;
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;
