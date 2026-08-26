// High-performance 2D Canvas 360-Degree Image Sequencer & Memory Cache

const STITCH_KEYFRAMES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCeS39kiYI-1K_UXXnzcZsILBWIyzFpCm2sUqSDvddBSsTiGZC7DDxv7A7fbr_Di07pjUA2uTO2gDrfU79z3vh0x4ozfrzjBe6EBCPjuCnsJMHl3ZE8EF4UL0rApLOgmK2ZkNlbTbKdaAL4_S4O8K4CN1OSYy4rNh9LOkVcWY12i-SUcCxHIZV-9SGcAXq2hg3gza5fsm3LxIocxpzsZEr_yXOtp3AV6Ph8dWlcrqt2-tPHGG_2Mf8',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBbC1q_cXA2ckKqSN2fpqanSuVjXW4o2j6Lyx5kIi2qoXXJZlKfp6Jmzf9KPCs_5QdQNEHTrMPE-hMR2kEJQUs1vwcYaJY6J-ufn6T65Pf5fQ7nXCHaL5L0DX-bS-2C850mWndeQ_0jXsKdFR-hLDPWJgc_YiU7ckNeC89kfCALOFutTv0JmRlZUvnf0Sc-zaVcYZ3dpjg5KEvQ2PfS4_UH_g3jOtoS6mfbaKMJRadx7Zo897VjXqU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBFgTDx5CwV7CuEe1jS4IDq1fRESZkRjIo7Jfy_EBEqG6Hp67sLJn3lb2l8fmvsGfcO5_coWuJMiaEbmg2aOoDmFpMN2cMAlaCbbPbrMuwiM4qe5H3FG5ABEGYfZL1JQM-40oe5Qwuz6QYGjBOX8EXHB3lZtWSyNh57YEewD9mnZAw7BiSvZdSoQkt-cT_wqRWbMUmhLKEq6Pg0IRO1PMOv0XzZLfrxOYS_IJ1MrpOKuSJV4pN4oHY',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBIkN3bxppwKViYZnZBfHETHwo1pU2qTvYrg2as0QEjZlACNiLhYCnNLaEvghloSsOPQ79l0nU5OajseJ51ybviLPB1o_PDZi4eR0PFhIVwbjFPHnQy1hhn7TqlYakA5u5WkmvoW6oZ43ub8jG8PCew1_5xLsoezf_JPGxadX0guF-K2Xvhhdc3emJEgBrqYEkSswo2N6BclJsOzVKNQfebfIkVvYnD8EjOnmcX8pzSn97Uf3VbWHE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBa8W2BqgKJlHkS5DEJk8waKO4hCNYg0pF1Ws2ilquLD8Iana7U_JqFSucaOCKeV7zcE2IC-MtMRAgbJRTTCjU-mXKakI1UH_yD8G5V-qIcXV96dAaXIBYn2Q1996YXjvOuUPwdn3J9YpjSuDBpKlz-VsLHQ5KFFrlIGmGgGmbx9hcUaRkaDLRbP4qs9YH4FeRZ-neI2Wbj0r4WK1OePB_fH8UDPdWjK4EK7FSJdNvb_ChoYyQ9vOk',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAeiGxTUpMraXQEX5pP0T76QQQQvFHAyWxteqXh6tJGf721rR1Hs76kCXJTal3UcowEdFpMJ2rtSVon4gSc0R4iUCr0FjIP1McA9II75EPcZDZg4S0Gba1cfst0JUVLQdZGDwL0Hk_9j-PUbn3RIXJSqOxwJHpXyIPo69Up89xA8D-gpzjgFWqLPr8afSJILXdn7pvbjBg5VCeTskN7GfmlMFnCRi3BrdQ1TC3g8KejK_Vzwbz_QbY',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAAWUaPB1HVcE9ym34ampjiAxXxV6ohygj1GnThPKfSFfE56NWdbAVCaaoCkToWwZh1i3lBJ6R5xe-xwUcY413fsP06WbZzaCyP_1lfC0_iv2iYUvXTIDREja-wkUqozBxw-4fnKasG1GjWoY0-algzqwvv3zO0D65fY0gtmaVPQ4-BErHJ3TheX126eFeHuzT5kCDE3OtWoxG5X6MYXaly65ozNKZPu78zNXTMv-jIQ96RgrzS_cY',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCvASlu7BWm0tDb2STi5EWk26qJAO93r5rLWAhWc4UaDXKbYwaCeUhlKi3So0AbtCOYVINGd88OEJfxTVpN_owCTWmKHg3LBwNA4EzSLYa4l9iIb2NwXyed-H8oD7mokRQYuKhsrHX2K6FrnRTmU4WOmQeZoG3tceftNfb_QBUzq_YU3iuW1rG-Ok2L02-452nc8xa_Iy-Bvper2HwYCMf5dLweVp-oyiqV5NjoNcrMtB6w6FKXypQ',
];

export const TOTAL_360_FRAMES = 72;

class FrameSequencerManager {
  private frames: HTMLImageElement[] = [];
  private isLoaded: boolean = false;

  public async preloadFrames(onProgress?: (percent: number) => void): Promise<HTMLImageElement[]> {
    if (this.isLoaded && this.frames.length === TOTAL_360_FRAMES) {
      if (onProgress) onProgress(100);
      return this.frames;
    }

    const loadedImages: HTMLImageElement[] = [];
    const totalKeyframes = STITCH_KEYFRAMES.length;

    // Load each unique photographic keyframe
    const keyframePromises = STITCH_KEYFRAMES.map((src) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img); // Fallback safe
      });
    });

    const keyframeImages = await Promise.all(keyframePromises);

    // Build the 72-frame turntable mapped array
    for (let i = 0; i < TOTAL_360_FRAMES; i++) {
      const keyIndex = Math.floor((i / TOTAL_360_FRAMES) * totalKeyframes) % totalKeyframes;
      loadedImages.push(keyframeImages[keyIndex]);

      if (onProgress) {
        const progress = Math.round(((i + 1) / TOTAL_360_FRAMES) * 100);
        onProgress(progress);
      }
    }

    this.frames = loadedImages;
    this.isLoaded = true;
    return this.frames;
  }

  public getFrame(index: number): HTMLImageElement | null {
    if (this.frames.length === 0) return null;
    const normalizedIndex = ((Math.floor(index) % TOTAL_360_FRAMES) + TOTAL_360_FRAMES) % TOTAL_360_FRAMES;
    return this.frames[normalizedIndex];
  }

  public renderFrameToCanvas(
    canvas: HTMLCanvasElement,
    frameIndex: number,
    lightingMode: 'amber-cyan' | 'studio-high-key' | 'carbon-void' | 'thermal-infra' = 'amber-cyan'
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frame = this.getFrame(frameIndex);
    if (!frame || !frame.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Aspect-fit image draw
    const imgAspect = frame.naturalWidth / frame.naturalHeight || 16 / 9;
    const canvasAspect = width / height;

    let drawW = width;
    let drawH = height;
    let drawX = 0;
    let drawY = 0;

    if (canvasAspect > imgAspect) {
      drawW = width;
      drawH = width / imgAspect;
      drawY = (height - drawH) / 2;
    } else {
      drawH = height;
      drawW = height * imgAspect;
      drawX = (width - drawW) / 2;
    }

    ctx.drawImage(frame, drawX, drawY, drawW, drawH);

    // Photometric Post-Processing Pass directly in Canvas
    if (lightingMode === 'amber-cyan') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, 'rgba(228, 73, 46, 0.12)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(1, 'rgba(0, 210, 255, 0.12)');
      ctx.fillStyle = grad;
      ctx.globalCompositeOperation = 'screen';
      ctx.fillRect(0, 0, width, height);
    } else if (lightingMode === 'carbon-void') {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.25)';
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillRect(0, 0, width, height);
    } else if (lightingMode === 'thermal-infra') {
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 1.5);
      grad.addColorStop(0, 'rgba(255, 62, 0, 0.3)');
      grad.addColorStop(1, 'rgba(90, 0, 180, 0.25)');
      ctx.fillStyle = grad;
      ctx.globalCompositeOperation = 'color';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
  }
}

export const frameSequencer = new FrameSequencerManager();
