// Spatial Audio Engine — Web Audio API procedural synthesis
// No external audio files needed; synthesizes engine hum procedurally

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted = false;
  private masterGain: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private isRunning = false;
  private panner: StereoPannerNode | null = null;
  private panDir = 1;
  private panInterval: ReturnType<typeof setInterval> | null = null;

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.18;
      this.masterGain.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  startEngine() {
    if (this.isRunning || this.isMuted) return;
    const ctx = this.getCtx();
    if (ctx.state === 'suspended') ctx.resume();

    // Fundamental engine hum ~80Hz
    this.engineOsc = ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.setValueAtTime(80, ctx.currentTime);
    this.engineOsc.frequency.linearRampToValueAtTime(160, ctx.currentTime + 2);

    // Sub bass layer
    this.subOsc = ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(40, ctx.currentTime);

    // Engine gain shaping
    this.engineGain = ctx.createGain();
    this.engineGain.gain.value = 0;
    this.engineGain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.8);

    // Stereo panner for spatial immersion
    this.panner = ctx.createStereoPanner();
    this.panner.pan.value = 0;

    // Filter to shape timbre
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 2;

    // Distortion for grit
    const distortion = ctx.createWaveShaper();
    distortion.curve = makeDistortionCurve(50);
    distortion.oversample = '4x';

    // Connect graph
    this.engineOsc.connect(distortion);
    this.subOsc.connect(this.engineGain);
    distortion.connect(filter);
    filter.connect(this.engineGain);
    this.engineGain.connect(this.panner!);
    this.panner!.connect(this.masterGain!);

    this.engineOsc.start();
    this.subOsc.start();

    // Slow stereo pan oscillation
    this.panInterval = setInterval(() => {
      if (!this.panner || !this.ctx) return;
      this.panDir *= -1;
      this.panner.pan.linearRampToValueAtTime(this.panDir * 0.3, this.ctx.currentTime + 2);
    }, 3000);

    this.isRunning = true;
  }

  stopEngine() {
    if (!this.isRunning || !this.ctx) return;
    const t = this.ctx.currentTime;
    this.engineGain?.gain.linearRampToValueAtTime(0, t + 0.4);
    setTimeout(() => {
      this.engineOsc?.stop();
      this.subOsc?.stop();
      this.engineOsc = null;
      this.subOsc = null;
    }, 500);
    if (this.panInterval) clearInterval(this.panInterval);
    this.isRunning = false;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopEngine();
    }
    return this.isMuted;
  }

  toggle() {
    if (this.isRunning) {
      this.stopEngine();
    } else {
      this.startEngine();
    }
    return this.isRunning;
  }

  // Short click UI tick
  click() {
    const ctx = this.getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1200;
    g.gain.setValueAtTime(0.06, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

  rev(rpm: number) {
    if (!this.engineOsc || !this.ctx) return;
    const freq = 40 + (rpm / 7200) * 320;
    this.engineOsc.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + 0.3);
  }
}

function makeDistortionCurve(amount: number): Float32Array {
  const samples = 256;
  const curve = new Float32Array(samples);
  const k = amount;
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

export const soundEngine = new SoundEngine();
