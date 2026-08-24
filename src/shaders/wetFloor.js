export const wetFloorVertexShader = /* glsl */`
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const wetFloorFragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec3  uReflectColor;
  uniform vec3  uCameraPos;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f*f*(3.-2.*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
  }
  float fbm(vec2 p) {
    float v=0.; float a=0.5;
    for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.1; a*=0.5; }
    return v;
  }

  void main() {
    vec2 uv = vWorldPos.xz * 0.15;

    // Asphalt base
    float asphalt = fbm(uv * 3.0 + 0.5);
    vec3 baseColor = mix(vec3(0.05,0.05,0.06), vec3(0.12,0.12,0.13), asphalt);

    // Puddle mask
    float puddle = smoothstep(0.55, 0.75, fbm(uv * 0.8 + uTime * 0.02));

    // Ripple animation in puddles
    float ripple = sin(length(uv * 2.0 - 3.0) * 20.0 - uTime * 4.0) * 0.5 + 0.5;
    ripple *= puddle;

    // Reflection
    vec3 V = normalize(uCameraPos - vWorldPos);
    float fresnel = pow(1.0 - max(dot(vNormal, V), 0.0), 3.0);
    vec3 reflection = uReflectColor * fresnel * (puddle * 0.85 + 0.15);

    // Wet sheen
    float wetness = puddle * 0.9 + 0.1;
    vec3 finalColor = mix(baseColor, baseColor * 0.3, wetness);
    finalColor += reflection;
    finalColor += ripple * puddle * 0.04 * uReflectColor;

    float alpha = 1.0;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;
