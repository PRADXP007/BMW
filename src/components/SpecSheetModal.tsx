import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { soundEngine } from '../utils/soundEngine';
import { X, Download, FileText } from 'lucide-react';

export const SpecSheetModal: React.FC = () => {
  const { isSpecSheetOpen, setIsSpecSheetOpen } = useAppStore();

  if (!isSpecSheetOpen) return null;

  const handleClose = () => {
    soundEngine.playClick(600);
    setIsSpecSheetOpen(false);
  };

  const specs = [
    { category: 'CHASSIS & ARCHITECTURE', item: 'Monocoque', val: 'Autoclave Pre-Preg Carbon Fiber with Aluminum Lugs' },
    { category: 'CHASSIS & ARCHITECTURE', item: 'Torsional Rigidity', val: '45,000 Nm/degree' },
    { category: 'CHASSIS & ARCHITECTURE', item: 'Curb Weight', val: '1,840 lbs (834 kg dry)' },
    { category: 'POWERTRAIN', item: 'Combustion Engine', val: '4.4L Twin-Turbo Flat-Plane Crank V8' },
    { category: 'POWERTRAIN', item: 'Hybrid Assist', val: 'Axial-Flux Permanent Magnet Synchronous Motor' },
    { category: 'POWERTRAIN', item: 'Combined Output', val: '1,050 HP @ 10,500 RPM' },
    { category: 'POWERTRAIN', item: 'Torque', val: '1,100 Nm (811 lb-ft)' },
    { category: 'POWERTRAIN', item: 'Redline', val: '12,000 RPM Limit' },
    { category: 'TRANSMISSION', item: 'Gearbox', val: '6AL-4V Titanium Open-Gated 6-Speed Manual with Dog Rings' },
    { category: 'SUSPENSION & BRAKES', item: 'Suspension Type', val: 'Pushrod Inboard Double Wishbone with 4-Way Dampers' },
    { category: 'SUSPENSION & BRAKES', item: 'Braking System', val: 'Carbon-Silicon Carbide (C/SiC) 390mm Monobloc 6-Piston' },
    { category: 'AERODYNAMICS', item: 'Downforce', val: '890 kg @ 240 km/h (Active Diffuser + Vortex Cavities)' },
    { category: 'AERODYNAMICS', item: 'Drag Coefficient', val: 'Cd 0.28 (High-Speed Mode) / 0.38 (Track Max Downforce)' },
    { category: 'PERFORMANCE', item: '0-60 mph (0-100 km/h)', val: '2.4 seconds' },
    { category: 'PERFORMANCE', item: '0-124 mph (0-200 km/h)', val: '5.8 seconds' },
    { category: 'PERFORMANCE', item: 'Top Speed', val: '228 mph (367 km/h) electronically limited' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex justify-center items-center p-4 md:p-8 font-mono animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-surface-dim text-white border-2 border-surface-container-highest shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-surface-container-low px-6 py-4 border-b border-surface-container-highest flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-m-orange" />
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                DOCUMENTATION // MN-SKW-DOC-001
              </span>
              <h2 className="font-display text-xl md:text-2xl uppercase tracking-tight text-white m-0">
                BMW M-PROJECT // 01 COMPLETE SPECIFICATION MATRIX
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

        {/* Scrollable Specification Table */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 gap-2">
            {specs.map((s, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2.5 px-4 bg-surface-container-lowest/80 border-b border-surface-container-highest/60 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-[10px] text-m-orange uppercase font-bold tracking-wider w-36">
                    {s.category}
                  </span>
                  <span className="text-xs text-white font-bold">{s.item}</span>
                </div>
                <span className="text-xs text-on-surface-variant font-mono mt-1 sm:mt-0 font-medium">
                  {s.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="bg-surface-container-low px-6 py-4 border-t border-surface-container-highest flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <span className="text-[10px] text-on-surface-variant uppercase">
            CERTIFIED BY BMW M GARCHING DEVELOPMENT TEAM
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playClick(1000);
                window.print();
              }}
              className="bg-white text-carbon-black font-mono text-xs uppercase px-5 py-2.5 font-bold tracking-widest hover:bg-m-orange hover:text-white transition-colors cursor-pointer border-none flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PRINT SPEC SHEET</span>
            </button>

            <button
              onClick={handleClose}
              className="bg-surface-container-high text-white font-mono text-xs uppercase px-5 py-2.5 font-bold tracking-widest hover:bg-m-orange transition-colors cursor-pointer border-none"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
