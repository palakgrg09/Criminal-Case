import React from 'react';
import { Target, ArrowRight, X } from 'lucide-react';
import { LevelData } from '../../types/game';
import { TotoAgentBadge, DangerousQuoteSticker, DetectiveEmblem } from '../common/VintageStickers';

interface LevelBriefingModalProps {
  level: LevelData;
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const LevelBriefingModal: React.FC<LevelBriefingModalProps> = ({
  level,
  isOpen,
  onClose,
  onStart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#f3e9d2] border-4 border-[#654735] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#302820]">
        {/* Header (Forest Olive with Old Ivory text) */}
        <div className="px-6 py-4 bg-[#515b3a] border-b-2 border-[#302820] flex items-center justify-between text-[#f3e9d2]">
          <div className="flex items-center space-x-3">
            <DetectiveEmblem size={28} />
            <span className="px-2.5 py-1 bg-[#302820] text-[#c5a253] text-xs font-mono font-black uppercase rounded-md border border-[#654735]">
              LEVEL {level.id}
            </span>
            <span className="text-xs font-serif font-black text-[#f3e9d2] tracking-wide">
              CASE BRIEFING
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#e5d5b7] hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Antique Beige / Ivory with Walnut details) */}
        <div className="p-7 overflow-y-auto space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-black text-[#302820]">
                {level.title}
              </h2>
              <p className="text-xs text-[#515b3a] font-mono mt-1 uppercase font-bold tracking-wider">
                {level.subtitle}
              </p>
            </div>
            <DangerousQuoteSticker rotate={2} />
          </div>

          {/* Cinematic Briefing */}
          <div className="bg-[#e5d5b7] p-4 rounded-xl border border-[#654735]/30 space-y-2.5 font-serif text-sm leading-relaxed text-[#302820]">
            {level.briefing.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* TOTO Detective Partner Intro */}
          <div className="bg-white p-4 rounded-xl border-2 border-[#654735]/30 flex items-start gap-3 shadow-xs">
            <TotoAgentBadge size={44} />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#515b3a] block">
                Partner TOTO:
              </span>
              <p className="text-xs text-[#302820] italic mt-1 leading-relaxed font-serif">
                "{level.totoIntro}"
              </p>
            </div>
          </div>

          {/* Clear Goals */}
          <div className="bg-[#e5d5b7] p-4 rounded-xl border border-[#654735]/30 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#302820] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#515b3a]" /> Your Detective Tasks:
            </h4>
            <ul className="space-y-1.5 text-xs text-[#302820]">
              {level.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#515b3a] font-black">✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#515b3a] border-t-2 border-[#302820] flex justify-between items-center text-[#f3e9d2]">
          <span className="text-xs text-[#e5d5b7] font-mono">
            Locard's Exchange Principle: Every action leaves a trace.
          </span>
          <button
            onClick={() => {
              onClose();
              onStart();
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#c5a253] hover:bg-[#b08f42] text-[#302820] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
          >
            <span>Begin Investigation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
