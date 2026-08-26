import { useCallback } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { useExperienceStore } from '../store/useExperienceStore';

export const useSoundEngine = () => {
  const { isMuted, toggleMute, setIsAudioPlaying, setCurrentRpm } = useExperienceStore();

  const playEngineRev = useCallback(
    (pan: number = 0) => {
      setIsAudioPlaying(true);
      soundEngine.playEngineRev((rpm) => {
        setCurrentRpm(rpm);
      }, pan);
      setTimeout(() => {
        setIsAudioPlaying(false);
      }, 2400);
    },
    [setIsAudioPlaying, setCurrentRpm]
  );

  const playClick = useCallback((pitch: number = 800, pan: number = 0) => {
    soundEngine.playClick(pitch, pan);
  }, []);

  const playPneumatic = useCallback((pan: number = 0) => {
    soundEngine.playPneumatic(pan);
  }, []);

  const playSubDrop = useCallback(() => {
    soundEngine.playSubDrop();
  }, []);

  const handleToggleMute = useCallback(() => {
    soundEngine.toggleMute();
    toggleMute();
  }, [toggleMute]);

  return {
    isMuted,
    toggleMute: handleToggleMute,
    playEngineRev,
    playClick,
    playPneumatic,
    playSubDrop,
  };
};
