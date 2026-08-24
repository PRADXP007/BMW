export const cfdVertexShader = /* glsl */`
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const cfdFragmentShader = /* glsl */`
  uniform float uTime;
  uniform float uPressure; // 0=low 1=high
  uniform float uWingAngle;

  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  vec3 heatmap(float t) {
    // Blue -> Cyan -> Green -> Yellow -> Red
    vec3 c = vec3(0.0);
    t = clamp(t, 0.0, 1.0);
    if (t < 0.25) c = mix(vec3(0.0,0.0,1.0), vec3(0.0,1.0,1.0), t/0.25);
    else if (t < 0.5) c = mix(vec3(0.0,1.0,1.0), vec3(0.0,1.0,0.0), (t-0.25)/0.25);
    else if (t < 0.75) c = mix(vec3(0.0,1.0,0.0), vec3(1.0,1.0,0.0), (t-0.5)/0.25);
    else c = mix(vec3(1.0,1.0,0.0), vec3(1.0,0.0,0.0), (t-0.75)/0.25);
    return c;
  }

  float noise(vec2 p) {
    return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
  }
  float fbm(vec2 p) {
    float v=0.;float a=0.5;
    for(int i=0;i<4;i++){v+=a*noise(p);p*=2.1;a*=0.5;}
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Pressure distribution based on surface
    float frontPressure = smoothstep(-0.5, 0.5, vWorldPos.z) * (1.0 - vUv.y * 0.5);
    float topDownforce = (1.0 - vWorldPos.y * 0.3) * uWingAngle / 45.0;
    float pressure = frontPressure * 0.5 + topDownforce * 0.5;
    pressure += fbm(uv * 4.0 + uTime * 0.1) * 0.2;
    pressure = clamp(pressure, 0.0, 1.0);

    vec3 col = heatmap(pressure);

    // Animated streamlines
    float stream = sin(uv.x * 30.0 - uTime * 5.0 + uv.y * 5.0) * 0.5 + 0.5;
    stream = pow(stream, 10.0) * 0.4;
    col += vec3(stream) * 0.6;

    gl_FragColor = vec4(col, 0.85);
  }
`;
