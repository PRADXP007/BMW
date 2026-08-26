import { create } from 'zustand';

export type DeepDiveModalType = 'POWER' | 'ORIGIN' | 'BEAUTY' | 'ASYLUM' | 'OBSESSION' | 'STRENGTH' | null;
export type CameraAngleType = '01 PROFILE' | '02 TOP' | '03 FRONT';
export type LightingModeType = 'amber-cyan' | 'studio-high-key' | 'carbon-void';

interface ExperienceState {
  hasEntered: boolean;
  setHasEntered: (entered: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeModal: DeepDiveModalType;
  setActiveModal: (modal: DeepDiveModalType) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  currentRpm: number;
  setCurrentRpm: (rpm: number) => void;
  cameraAngle: CameraAngleType;
  setCameraAngle: (angle: CameraAngleType) => void;
  lightingMode: LightingModeType;
  setLightingMode: (mode: LightingModeType) => void;
  isCommissionOpen: boolean;
  setIsCommissionOpen: (open: boolean) => void;
  isSpecSheetOpen: boolean;
  setIsSpecSheetOpen: (open: boolean) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  hasEntered: false,
  setHasEntered: (entered) => set({ hasEntered: entered }),
  activeSection: 'preloader',
  setActiveSection: (section) => set({ activeSection: section }),
  activeModal: null,
  setActiveModal: (modal) => set({ activeModal: modal }),
  isAudioPlaying: false,
  setIsAudioPlaying: (playing) => set({ isAudioPlaying: playing }),
  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  currentRpm: 1150,
  setCurrentRpm: (rpm) => set({ currentRpm: rpm }),
  cameraAngle: '01 PROFILE',
  setCameraAngle: (angle) => set({ cameraAngle: angle }),
  lightingMode: 'amber-cyan',
  setLightingMode: (mode) => set({ lightingMode: mode }),
  isCommissionOpen: false,
  setIsCommissionOpen: (open) => set({ isCommissionOpen: open }),
  isSpecSheetOpen: false,
  setIsSpecSheetOpen: (open) => set({ isSpecSheetOpen: open }),
}));
