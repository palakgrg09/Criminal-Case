import React from 'react';
import { CheckCircle2, Award, ArrowRight, BookOpen } from 'lucide-react';
import { LevelData } from '../../types/game';
import { useGameState } from '../../context/GameStateContext';
import { TotoAgentBadge, DetectiveEmblem } from '../common/VintageStickers';

interface LevelCompleteModalProps {
  level: LevelData;
  isOpen: boolean;
  onProceed: () => void;
  onOpenReport?: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  level,
  isOpen,
  onProceed,
  onOpenReport
}) => {
  const { gameState } = useGameState();

  if (!isOpen) return null;

  const levelScore = gameState.levelScores[level.id] || 0;
  const hintsUsed = (gameState.hintsRevealed[level.id] || []).length;
  const isFinalLevel = level.id === 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#f3e9d2] border-4 border-[#654735] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#302820] animate-fadeIn">
        {/* Header (Forest Olive with Old Ivory & Mustard) */}
        <div className="px-6 py-4 bg-[#515b3a] border-b-2 border-[#302820] flex items-center justify-between text-[#f3e9d2]">
          <div className="flex items-center space-x-3">
            <DetectiveEmblem size={32} />
            <div>
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#c5a253]">
                LEVEL {level.id} SOLVED // CLUES VERIFIED
              </span>
              <h2 className="text-xl font-serif font-black text-[#f3e9d2]">
                {level.title}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-[#e5d5b7] font-semibold">Score Earned</span>
            <div className="text-lg font-mono font-black text-[#c5a253]">
              +{levelScore} PTS
            </div>
          </div>
        </div>

        {/* Content (Antique Beige / Ivory with Walnut details) */}
        <div className="p-7 overflow-y-auto space-y-5">
          {/* Tally Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#e5d5b7] p-4 rounded-xl border border-[#654735]/30 text-center">
            <div>
              <span className="text-[10px] text-[#654735] uppercase font-bold">Level Score</span>
              <div className="text-base font-bold font-mono text-[#515b3a]">+{levelScore}</div>
            </div>
            <div>
              <span className="text-[10px] text-[#654735] uppercase font-bold">Hints Used</span>
              <div className="text-base font-bold font-mono text-[#302820]">{hintsUsed} / 3</div>
            </div>
            <div>
              <span className="text-[10px] text-[#654735] uppercase font-bold">Total Score</span>
              <div className="text-base font-bold font-mono text-[#515b3a]">{gameState.totalScore}</div>
            </div>
            <div>
              <span className="text-[10px] text-[#654735] uppercase font-bold">Rank</span>
              <div className="text-base font-bold font-mono text-[#302820]">{gameState.investigatorRank}</div>
            </div>
          </div>

          {/* Story Revelation */}
          <div className="bg-white p-5 rounded-xl border-2 border-[#654735]/30 space-y-2.5 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#515b3a] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#c5a253]" /> Case Story Breakthrough:
            </h4>
            <div className="font-serif text-sm leading-relaxed text-[#302820] space-y-2">
              {level.storyReveal.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* TOTO Companion Reveal Commentary */}
          <div className="bg-[#e5d5b7] p-4 rounded-xl border-2 border-[#654735]/30 flex items-start gap-3">
            <TotoAgentBadge size={40} />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#515b3a]">
                Partner TOTO:
              </span>
              <p className="text-xs text-[#302820] italic mt-1 leading-relaxed font-serif">
                "{level.totoReveal}"
              </p>
            </div>
          </div>

          {/* Core Educational Takeaway */}
          <div className="bg-[#879477]/25 p-4 rounded-xl border-2 border-[#515b3a]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#515b3a] mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#c5a253]" /> Detective Lesson Learned:
            </h4>
            <p className="text-xs text-[#302820] leading-relaxed font-sans font-medium">
              {level.learningTakeaway}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#515b3a] border-t-2 border-[#302820] flex justify-between items-center text-[#f3e9d2]">
          <span className="text-xs text-[#e5d5b7] font-mono italic">
            {level.nextLevelPreview}
          </span>
          {isFinalLevel ? (
            <button
              onClick={onOpenReport}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#c5a253] hover:bg-[#b08f42] text-[#302820] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
            >
              <span>View Case Report</span>
              <Award className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onProceed}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#c5a253] hover:bg-[#b08f42] text-[#302820] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
            >
              <span>Next Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
