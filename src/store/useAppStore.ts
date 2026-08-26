import { create } from 'zustand';
import { DeepDivePillar, LightingMode, CameraAngle, CommissionConfig } from '../types';

interface AppState {
  hasEntered: boolean;
  activeDeepDive: DeepDivePillar;
  isCommissionOpen: boolean;
  isSpecSheetOpen: boolean;
  lightingMode: LightingMode;
  cameraAngle: CameraAngle;
  rotationDegrees: number;
  currentRpm: number;
  isMuted: boolean;
  commissionConfig: CommissionConfig;

  // Actions
  setHasEntered: (entered: boolean) => void;
  setActiveDeepDive: (pillar: DeepDivePillar) => void;
  setIsCommissionOpen: (open: boolean) => void;
  setIsSpecSheetOpen: (open: boolean) => void;
  setLightingMode: (mode: LightingMode) => void;
  setCameraAngle: (angle: CameraAngle) => void;
  setRotationDegrees: (deg: number) => void;
  setCurrentRpm: (rpm: number) => void;
  toggleMute: () => void;
  updateCommission: (updates: Partial<CommissionConfig>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  hasEntered: false,
  activeDeepDive: null,
  isCommissionOpen: false,
  isSpecSheetOpen: false,
  lightingMode: 'amber-cyan',
  cameraAngle: '01 PROFILE',
  rotationDegrees: 0,
  currentRpm: 1150,
  isMuted: false,

  commissionConfig: {
    chassisCode: 'MN-SKW-01-8842',
    exteriorFinish: 'Matte Alpine White',
    aeroPackage: 'Stage 2 Active Diffuser + Vortex',
    powertrainTune: '1,050 HP Twin-Turbo V8 Hybrid',
    interiorSpec: 'Asylum 6AL-4V Titanium + Alcantara',
    pilotDesignation: 'PILOT // 001',
    deliverySector: 'MUNICH // GARCHING SKUNKWORKS',
  },

  setHasEntered: (entered) => set({ hasEntered: entered }),
  setActiveDeepDive: (pillar) => set({ activeDeepDive: pillar }),
  setIsCommissionOpen: (open) => set({ isCommissionOpen: open }),
  setIsSpecSheetOpen: (open) => set({ isSpecSheetOpen: open }),
  setLightingMode: (mode) => set({ lightingMode: mode }),
  setCameraAngle: (angle) => set({ cameraAngle: angle }),
  setRotationDegrees: (deg) => set({ rotationDegrees: deg }),
  setCurrentRpm: (rpm) => set({ currentRpm: rpm }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  updateCommission: (updates) =>
    set((state) => ({
      commissionConfig: { ...state.commissionConfig, ...updates },
    })),
}));
