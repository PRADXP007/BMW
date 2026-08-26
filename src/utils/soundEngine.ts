// Spatial Audio Engine with Howler.js + Procedural Web Audio Panning
import { Howl } from 'howler';

class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private pannerNode: StereoPannerNode | null = null;
  private engineLoopHowl: Howl | null = null;

  constructor() {
    // Initialize Howl fallback for ambient telemetry drone
    try {
      this.engineLoopHowl = new Howl({
        src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
        loop: true,
        volume: 0.2,
      });
    } catch {
      // Safe fallback
    }
  }

  private init() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.pannerNode && this.ctx.createStereoPanner) {
      this.pannerNode = this.ctx.createStereoPanner();
      this.pannerNode.connect(this.ctx.destination);
    }
  }

  public setStereoPan(pan: number) {
    if (this.pannerNode && this.ctx) {
      // Clamp between -1.0 (Left) and 1.0 (Right)
      const clamped = Math.max(-1, Math.min(1, pan));
      this.pannerNode.pan.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.engineLoopHowl) {
      if (this.isMuted) {
        this.engineLoopHowl.mute(true);
      } else {
        this.engineLoopHowl.mute(false);
      }
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Micro-Sound Positional UI Click Feedback
  public playClick(pitch: number = 800, pan: number = 0) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const localPanner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      if (localPanner) {
        localPanner.pan.setValueAtTime(pan, now);
        osc.connect(gain);
        gain.connect(localPanner);
        localPanner.connect(this.ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(this.ctx.destination);
      }

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio safety
    }
  }

  // Pneumatic Actuator Hiss with Spatial Diffusion
  public playPneumatic(pan: number = 0) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.18);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      const localPanner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      if (localPanner) {
        localPanner.pan.setValueAtTime(pan, now);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(localPanner);
        localPanner.connect(this.ctx.destination);
      } else {
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
      }

      noise.start(now);
    } catch {
      // Audio safety
    }
  }

  // High-Energy Spatial Twin-Turbo V8 Engine Throttle Rev Loop
  public playEngineRev(onRpmUpdate?: (rpm: number) => void, spatialPan: number = 0) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 2.4;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const sub = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      sub.type = 'sine';

      // Twin-Turbo V8 Throttle Curve (1,150 -> 12,000 RPM)
      osc1.frequency.setValueAtTime(55, now);
      osc1.frequency.exponentialRampToValueAtTime(340, now + 0.6);
      osc1.frequency.exponentialRampToValueAtTime(440, now + 1.0);
      osc1.frequency.exponentialRampToValueAtTime(80, now + 1.8);
      osc1.frequency.exponentialRampToValueAtTime(50, now + duration);

      osc2.frequency.setValueAtTime(56, now);
      osc2.frequency.exponentialRampToValueAtTime(345, now + 0.6);
      osc2.frequency.exponentialRampToValueAtTime(445, now + 1.0);
      osc2.frequency.exponentialRampToValueAtTime(82, now + 1.8);
      osc2.frequency.exponentialRampToValueAtTime(52, now + duration);

      sub.frequency.setValueAtTime(30, now);
      sub.frequency.exponentialRampToValueAtTime(95, now + 0.8);
      sub.frequency.exponentialRampToValueAtTime(30, now + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(4200, now + 0.7);
      filter.frequency.exponentialRampToValueAtTime(800, now + 1.8);
      filter.frequency.exponentialRampToValueAtTime(300, now + duration);

      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.38, now + 0.2);
      gainNode.gain.linearRampToValueAtTime(0.45, now + 0.9);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      sub.connect(filter);
      filter.connect(gainNode);

      if (panner) {
        panner.pan.setValueAtTime(spatialPan, now);
        panner.pan.linearRampToValueAtTime(0.2, now + 0.6);
        panner.pan.linearRampToValueAtTime(-0.2, now + 1.4);
        panner.pan.setValueAtTime(0, now + duration);
        gainNode.connect(panner);
        panner.connect(this.ctx.destination);
      } else {
        gainNode.connect(this.ctx.destination);
      }

      osc1.start(now);
      osc2.start(now);
      sub.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      sub.stop(now + duration);

      if (onRpmUpdate) {
        const startTime = performance.now();
        const interval = setInterval(() => {
          const elapsed = (performance.now() - startTime) / 1000;
          if (elapsed > duration) {
            clearInterval(interval);
            onRpmUpdate(1150);
            return;
          }
          if (elapsed < 0.9) {
            const currentRpm = 1150 + Math.sin((elapsed / 0.9) * (Math.PI / 2)) * 10850;
            onRpmUpdate(Math.round(currentRpm));
          } else {
            const decay = (elapsed - 0.9) / (duration - 0.9);
            const currentRpm = 12000 - decay * 10850;
            onRpmUpdate(Math.max(1150, Math.round(currentRpm)));
          }
        }, 30);
      }
    } catch {
      // Audio safety
    }
  }

  // Deep Bass Sub Boom on Enter
  public playSubDrop() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 1.2);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {
      // Audio safety
    }
  }
}

export const soundEngine = new SpatialAudioEngine();
