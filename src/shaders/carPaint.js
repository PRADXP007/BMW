export const carPaintVertexShader = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const carPaintFragmentShader = /* glsl */`
  uniform vec3  uBaseColor;
  uniform float uMetalness;
  uniform float uRoughness;
  uniform float uFlakeScale;
  uniform float uFlakeIntensity;
  uniform float uClearcoat;
  uniform float uTime;
  uniform vec3  uLightDir;
  uniform vec3  uEnvColor;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  // ── Hash / noise ─────────────────────────────────────
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  // ── Metallic flake noise ──────────────────────────────
  float flakes(vec2 uv, float scale) {
    vec2 scaled = uv * scale;
    float n = noise(scaled);
    n += 0.5 * noise(scaled * 2.1 + 3.7);
    n += 0.25 * noise(scaled * 4.3 + 1.3);
    return pow(n, 4.0);
  }

  // ── Fresnel ───────────────────────────────────────────
  float fresnel(vec3 n, vec3 v, float power) {
    return pow(1.0 - max(dot(n, v), 0.0), power);
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    vec3 L = normalize(uLightDir);
    vec3 H = normalize(L + V);

    // Flake micro-normals
    float f = flakes(vUv, uFlakeScale);
    vec3 flakeN = normalize(N + vec3(f - 0.5, f - 0.5, 1.0) * uFlakeIntensity);

    // Diffuse
    float NdotL = max(dot(N, L), 0.0);
    vec3 diffuse = uBaseColor * NdotL * 0.6;

    // Specular (GGX-ish)
    float NdotH = max(dot(flakeN, H), 0.0);
    float alpha = uRoughness * uRoughness;
    float D = alpha / (3.14159 * pow(NdotH * NdotH * (alpha - 1.0) + 1.0, 2.0));
    vec3 specular = vec3(1.0) * D * uMetalness * 0.5;

    // Clearcoat fresnel reflection
    float cc = fresnel(N, V, 3.5) * uClearcoat;
    vec3 envRef = uEnvColor * cc;

    // Base-coat fresnel tint
    float rim = fresnel(N, V, 2.0) * 0.4;
    vec3 rimColor = uBaseColor * 1.6 * rim;

    // Flake sparkle
    float sparkle = f * uMetalness * fresnel(flakeN, V, 2.0) * 3.0;
    vec3 flakeColor = mix(uBaseColor * 1.5, vec3(1.0), 0.7) * sparkle;

    // Ambient
    vec3 ambient = uBaseColor * 0.12;

    vec3 col = ambient + diffuse + specular + rimColor + envRef + flakeColor;
    col = pow(col, vec3(0.4545)); // gamma correct

    gl_FragColor = vec4(col, 1.0);
  }
`;
