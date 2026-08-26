export type DeepDivePillar = 'POWER' | 'ORIGIN' | 'BEAUTY' | 'ASYLUM' | 'OBSESSION' | 'STRENGTH' | null;

export type LightingMode = 'amber-cyan' | 'studio-high-key' | 'carbon-void' | 'thermal-infra';

export type CameraAngle = '01 PROFILE' | '02 TOP' | '03 FRONT' | '04 REAR' | '05 MONOCOQUE';

export interface CommissionConfig {
  chassisCode: string;
  exteriorFinish: 'Matte Alpine White' | 'Raw Pre-Preg Carbon' | 'Frozen Titanium Silver' | 'Signal Orange Accent';
  aeroPackage: 'Stage 1 Ground-Effects' | 'Stage 2 Active Diffuser + Vortex' | 'Stage 3 Le Mans Skunkworks Spec';
  powertrainTune: '1,050 HP Twin-Turbo V8 Hybrid' | '1,200 HP Track Unrestricted Calibration';
  interiorSpec: 'Asylum 6AL-4V Titanium + Alcantara' | 'Minimalist Nomex Carbon Monocoque';
  pilotDesignation: string;
  deliverySector: string;
}
