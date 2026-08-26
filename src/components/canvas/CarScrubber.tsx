import React, { useRef, useEffect, useCallback } from 'react';
import { useCanvasFrames } from '../../hooks/useCanvasFrames';
import { LightingModeType } from '../../store/useExperienceStore';

interface CarScrubberProps {
  currentFrame: number;
  lightingMode?: LightingModeType;
  className?: string;
}

export const CarScrubber: React.FC<CarScrubberProps> = ({
  currentFrame,
  lightingMode = 'amber-cyan',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { renderToCanvas } = useCanvasFrames();

  const render = useCallback(() => {
    if (!canvasRef.current) return;
    renderToCanvas(canvasRef.current, currentFrame, lightingMode);
  }, [renderToCanvas, currentFrame, lightingMode]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      render();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-cover select-none ${className}`}
    />
  );
};
