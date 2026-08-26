import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { X, Check, ShieldCheck, Download, Sparkles } from 'lucide-react';

export const CommissionModal: React.FC = () => {
  const { isCommissionOpen, setIsCommissionOpen, commissionConfig, updateCommission } = useAppStore();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isCommissionOpen) return null;

  const finishes: ('Matte Alpine White' | 'Raw Pre-Preg Carbon' | 'Frozen Titanium Silver' | 'Signal Orange Accent')[] = [
    'Matte Alpine White',
    'Raw Pre-Preg Carbon',
    'Frozen Titanium Silver',
    'Signal Orange Accent',
  ];

  const aeroPackages: ('Stage 1 Ground-Effects' | 'Stage 2 Active Diffuser + Vortex' | 'Stage 3 Le Mans Skunkworks Spec')[] = [
    'Stage 1 Ground-Effects',
    'Stage 2 Active Diffuser + Vortex',
    'Stage 3 Le Mans Skunkworks Spec',
  ];

  const powertrains: ('1,050 HP Twin-Turbo V8 Hybrid' | '1,200 HP Track Unrestricted Calibration')[] = [
    '1,050 HP Twin-Turbo V8 Hybrid',
    '1,200 HP Track Unrestricted Calibration',
  ];

  const interiorSpecs: ('Asylum 6AL-4V Titanium + Alcantara' | 'Minimalist Nomex Carbon Monocoque')[] = [
    'Asylum 6AL-4V Titanium + Alcantara',
    'Minimalist Nomex Carbon Monocoque',
  ];

  const handleClose = () => {
    soundEngine.playClick(600);
    setIsCommissionOpen(false);
    setIsSubmitted(false);
  };

  const handleCompleteCommission = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSubDrop();
    soundEngine.playPneumatic();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex justify-center items-center p-4 md:p-8 font-mono animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-surface-dim text-white border-2 border-surface-container-highest shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-auto">
        {/* Top Header */}
        <div className="bg-surface-container-low px-6 py-4 border-b border-surface-container-highest flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-m-orange animate-pulse"></div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                SKUNKWORKS COMMISSION // 01
              </span>
              <h2 className="font-display text-xl md:text-2xl uppercase tracking-tight text-white m-0">
                CHASSIS ALLOCATION PROTOCOL
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-m-orange hover:text-white transition-colors cursor-pointer border-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {!isSubmitted ? (
          <form onSubmit={handleCompleteCommission} className="p-6 md:p-8 space-y-6">
            {/* Chassis Allocation ID */}
            <div className="glass-panel p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-l-4 border-l-m-orange">
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block">
                  ASSIGNED MONOCOQUE CHASSIS SERIAL
                </span>
                <span className="font-mono text-lg font-bold text-white tracking-widest">
                  {commissionConfig.chassisCode}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  ALLOTMENT: RESERVED (1 OF 25 WORLDWIDE)
                </span>
              </div>
            </div>

            {/* Config Option 1: Exterior Finish */}
            <div>
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
                01 // EXTERIOR AERODYNAMIC FINISH
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {finishes.map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => {
                      soundEngine.playClick(1000);
                      updateCommission({ exteriorFinish: f });
                    }}
                    className={`p-3 text-left border transition-all text-xs font-mono uppercase cursor-pointer ${
                      commissionConfig.exteriorFinish === f
                        ? 'border-m-orange bg-m-orange/15 text-white font-bold shadow-[0_0_15px_rgba(228,73,46,0.3)]'
                        : 'border-surface-container-high bg-surface-container-lowest/60 text-on-surface-variant hover:border-white/60'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] opacity-60">FINISH</span>
                      {commissionConfig.exteriorFinish === f && <Check className="w-3.5 h-3.5 text-m-orange" />}
                    </div>
                    <span>{f}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Config Option 2: Aero Package */}
            <div>
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
                02 // GROUND-EFFECTS & DOWNFORCE TIER
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {aeroPackages.map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => {
                      soundEngine.playClick(1000);
                      updateCommission({ aeroPackage: a });
                    }}
                    className={`p-3 text-left border transition-all text-xs font-mono uppercase cursor-pointer ${
                      commissionConfig.aeroPackage === a
                        ? 'border-m-orange bg-m-orange/15 text-white font-bold shadow-[0_0_15px_rgba(228,73,46,0.3)]'
                        : 'border-surface-container-high bg-surface-container-lowest/60 text-on-surface-variant hover:border-white/60'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] opacity-60">AERO DYNAMICS</span>
                      {commissionConfig.aeroPackage === a && <Check className="w-3.5 h-3.5 text-m-orange" />}
                    </div>
                    <span>{a}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Config Option 3: Powertrain & Interior */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold block mb-2">
                  03 // POWERTRAIN CALIBRATION
                </label>
                <div className="space-y-2">
                  {powertrains.map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => {
                        soundEngine.playClick(1000);
                        updateCommission({ powertrainTune: p });
                      }}
                      className={`w-full p-3 text-left border transition-all text-xs font-mono uppercase cursor-pointer ${
                        commissionConfig.powertrainTune === p
                          ? 'border-m-orange bg-m-orange/15 text-white font-bold'
                          : 'border-surface-container-high bg-surface-container-lowest/60 text-on-surface-variant hover:border-white/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{p}</span>
                        {commissionConfig.powertrainTune === p && <Check className="w-3.5 h-3.5 text-m-orange" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold block mb-2">
                  04 // COCKPIT ERGONOMICS
                </label>
                <div className="space-y-2">
                  {interiorSpecs.map((i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => {
                        soundEngine.playClick(1000);
                        updateCommission({ interiorSpec: i });
                      }}
                      className={`w-full p-3 text-left border transition-all text-xs font-mono uppercase cursor-pointer ${
                        commissionConfig.interiorSpec === i
                          ? 'border-m-orange bg-m-orange/15 text-white font-bold'
                          : 'border-surface-container-high bg-surface-container-lowest/60 text-on-surface-variant hover:border-white/60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{i}</span>
                        {commissionConfig.interiorSpec === i && <Check className="w-3.5 h-3.5 text-m-orange" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pilot Identification Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-1">
                  PILOT CALLSIGN / DESIGNATION
                </label>
                <input
                  type="text"
                  value={commissionConfig.pilotDesignation}
                  onChange={(e) => updateCommission({ pilotDesignation: e.target.value.toUpperCase() })}
                  className="w-full bg-surface-container-lowest border border-surface-container-high px-4 py-2.5 text-white font-mono text-xs uppercase focus:border-m-orange focus:outline-none"
                  placeholder="E.G., PILOT // 001"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-1">
                  DELIVERY SECTOR / TRACK HUB
                </label>
                <input
                  type="text"
                  value={commissionConfig.deliverySector}
                  onChange={(e) => updateCommission({ deliverySector: e.target.value.toUpperCase() })}
                  className="w-full bg-surface-container-lowest border border-surface-container-high px-4 py-2.5 text-white font-mono text-xs uppercase focus:border-m-orange focus:outline-none"
                  placeholder="E.G., MUNICH // GARCHING SKUNKWORKS"
                />
              </div>
            </div>

            {/* Bottom Submit Actions */}
            <div className="pt-4 border-t border-surface-container-highest flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-[10px] text-on-surface-variant uppercase">
                PRODUCTION RUN: 25 BESPOKE UNITS // AUTOCLAVE MONOCOQUE GUARANTEED
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-m-orange text-white font-mono text-xs uppercase px-8 py-4 font-bold tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer border-none btn-brutalist flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(228,73,46,0.6)]"
              >
                <span>TRANSMIT COMMISSION TELEMETRY</span>
                <span className="font-bold">&gt;&gt;</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Specimen Certificate */
          <div className="p-8 md:p-12 flex flex-col items-center text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-m-orange/20 border-2 border-m-orange flex items-center justify-center text-m-orange">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <div className="font-mono text-xs text-m-orange uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMISSION TELEMETRY CONFIRMED</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white m-0">
                CHASSIS {commissionConfig.chassisCode} ASSIGNED
              </h2>
              <p className="font-mono text-xs text-on-surface-variant uppercase max-w-lg mt-2 mx-auto">
                PILOT: <strong className="text-white">{commissionConfig.pilotDesignation}</strong> // SECTOR:{' '}
                <strong className="text-white">{commissionConfig.deliverySector}</strong>
              </p>
            </div>

            {/* Spec Sheet Summary Card */}
            <div className="w-full max-w-lg bg-surface-container-low p-6 border border-white/20 text-left font-mono text-xs space-y-2.5">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-on-surface-variant">EXTERIOR FINISH:</span>
                <span className="text-white font-bold">{commissionConfig.exteriorFinish}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-on-surface-variant">AERO DOWNFORCE:</span>
                <span className="text-white font-bold">{commissionConfig.aeroPackage}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-on-surface-variant">POWERTRAIN:</span>
                <span className="text-white font-bold">{commissionConfig.powertrainTune}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">COCKPIT INTERIOR:</span>
                <span className="text-white font-bold">{commissionConfig.interiorSpec}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => {
                  soundEngine.playClick(1000);
                  window.print();
                }}
                className="bg-white text-carbon-black font-mono text-xs uppercase px-6 py-3 font-bold tracking-widest hover:bg-m-orange hover:text-white transition-colors cursor-pointer border-none flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT BUILD SHEET PDF</span>
              </button>

              <button
                onClick={handleClose}
                className="bg-surface-container-high text-white font-mono text-xs uppercase px-6 py-3 font-bold tracking-widest hover:bg-m-orange transition-colors cursor-pointer border-none"
              >
                RETURN TO EXPERIENCE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
