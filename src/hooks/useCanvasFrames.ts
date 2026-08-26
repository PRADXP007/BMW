import { useState, useEffect } from 'react';
import { frameSequencer, TOTAL_360_FRAMES } from '../utils/frameSequencer';

export const useCanvasFrames = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    frameSequencer
      .preloadFrames((pct) => {
        setProgress(pct);
      })
      .then((loadedFrames) => {
        setFrames(loadedFrames);
        setIsLoaded(true);
      });
  }, []);

  return {
    progress,
    isLoaded,
    frames,
    totalFrames: TOTAL_360_FRAMES,
    getFrame: (index: number) => frameSequencer.getFrame(index),
    renderToCanvas: (
      canvas: HTMLCanvasElement,
      index: number,
      lighting: 'amber-cyan' | 'studio-high-key' | 'carbon-void' = 'amber-cyan'
    ) => frameSequencer.renderFrameToCanvas(canvas, index, lighting),
  };
};
