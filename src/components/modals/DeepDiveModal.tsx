import React from 'react';
import { useExperienceStore, DeepDiveModalType } from '../../store/useExperienceStore';
import { useSoundEngine } from '../../hooks/useSoundEngine';
import { OriginContent } from './modal-content/OriginContent';
import { BeautyContent } from './modal-content/BeautyContent';
import { AsylumContent } from './modal-content/AsylumContent';
import { ObsessionContent } from './modal-content/ObsessionContent';
import { StrengthContent } from './modal-content/StrengthContent';
import { Plus, X } from 'lucide-react';

export const DeepDiveModal: React.FC = () => {
  const { activeModal, setActiveModal } = useExperienceStore();
  const { playClick } = useSoundEngine();

  if (!activeModal) return null;

  const sequence: DeepDiveModalType[] = ['ORIGIN', 'BEAUTY', 'ASYLUM', 'OBSESSION', 'STRENGTH'];

  const handleNextCyclic = () => {
    playClick(1300, 0.4);
    const currentIndex = sequence.indexOf(activeModal);
    const nextIndex = (currentIndex + 1) % sequence.length;
    setActiveModal(sequence[nextIndex]);
  };

  const handleClose = () => {
    playClick(600, 0);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl flex justify-center items-center overflow-hidden font-mono animate-fadeIn">
      {/* Dynamic Content by Active Modal */}
      {activeModal === 'ORIGIN' && <OriginContent />}
      {activeModal === 'BEAUTY' && <BeautyContent />}
      {activeModal === 'ASYLUM' && <AsylumContent />}
      {activeModal === 'OBSESSION' && <ObsessionContent />}
      {activeModal === 'STRENGTH' && <StrengthContent />}

      {/* Top Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center hover:bg-[#E4492E] transition-colors border border-white/20 cursor-pointer shadow-xl"
        title="Close Modal"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Right-Side Persistent Orange + Button for Cyclic Navigation: 08 -> 09 -> 10 -> 11 -> 12 -> 08 */}
      <button
        onClick={handleNextCyclic}
        className="fixed right-6 md:right-margin-edge top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#E4492E] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_35px_rgba(228,73,46,0.9)] z-50 cursor-pointer group border-2 border-white/40"
        title="Next Deep Dive Specification (08 -> 09 -> 10 -> 11 -> 12 -> 08)"
      >
        <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300 text-white" />
      </button>
    </div>
  );
};
