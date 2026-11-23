import React, { useState } from 'react';
import {
  Pin,
  CheckCircle,
  Eye,
  Info,
  Wrench,
  Terminal as TerminalIcon
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { LEVELS } from '../../data/levelsData';
import { ChallengeRenderer } from '../level/ChallengeRenderer';
import { TotoHintAgent } from '../hints/TotoHintAgent';
import { SimulatedTerminal } from '../terminal/SimulatedTerminal';
import { EvidenceItem } from '../../types/game';

interface InvestigationScreenProps {
  onSelectEvidence: (item: EvidenceItem) => void;
  onOpenBoard: () => void;
  onOpenHelp: () => void;
  onOpenTools: () => void;
  onOpenBriefing: () => void;
}

export const InvestigationScreen: React.FC<InvestigationScreenProps> = ({
  onSelectEvidence,
  onOpenBoard,
  onOpenHelp,
  onOpenTools,
  onOpenBriefing
}) => {
  const { gameState } = useGameState();
  const [activeTab, setActiveTab] = useState<'challenge' | 'terminal'>('challenge');

  const currentLevelData = LEVELS.find(l => l.id === gameState.currentLevel) || LEVELS[0];
  const activeChallengeId = gameState.activeChallenge || currentLevelData.challenges[0]?.id;
  const activeChallenge =
    currentLevelData.challenges.find(c => c.id === activeChallengeId) ||
    currentLevelData.challenges[0];

  const currentEvidence = currentLevelData.evidence;

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-62px)] overflow-hidden bg-[#879477] text-[#302820]">
      {/* Left / Middle: Main Case Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden border-r-2 border-[#654735]">
        {/* Level Mission Banner (Forest Olive / Ivory with Walnut details) */}
        <div className="px-6 py-3 bg-[#515b3a] border-b-2 border-[#302820] flex flex-wrap items-center justify-between gap-3 shadow-sm text-[#f3e9d2]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#302820] text-[#c5a253] text-[10px] font-mono font-black uppercase border border-[#654735]">
                LEVEL {currentLevelData.id}
              </span>
              <h2 className="font-serif font-black text-base text-[#f3e9d2]">
                {currentLevelData.title.replace(/^Level \d+: /, '')}
              </h2>
            </div>
            <p className="text-xs text-[#e5d5b7] mt-0.5 font-medium">
              {currentLevelData.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenBriefing}
              className="px-3 py-1.5 rounded-lg bg-[#302820] hover:bg-[#654735] text-xs font-bold text-[#f3e9d2] hover:text-[#c5a253] border border-[#654735] flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-[#c5a253]" />
              <span>Case Briefing</span>
            </button>
            <button
              onClick={onOpenTools}
              className="px-3 py-1.5 rounded-lg bg-[#302820] hover:bg-[#654735] text-xs font-bold text-[#f3e9d2] hover:text-[#c5a253] border border-[#654735] flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-[#c5a253]" />
              <span>Forensic Tools</span>
            </button>
          </div>
        </div>

        {/* Challenge Stepper Tabs (Clean tabs without subtitles) */}
        <div className="flex items-center px-6 py-2 bg-[#748265] border-b border-[#654735] overflow-x-auto gap-2">
          {currentLevelData.challenges.map((c, idx) => {
            const isCurrent = c.id === activeChallengeId;
            const isCompleted = gameState.challengeResults[c.id]?.completed;

            return (
              <button
                key={c.id}
                onClick={() => {
                  setActiveTab('challenge');
                }}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition border shrink-0 shadow-xs cursor-pointer ${
                  isCurrent
                    ? 'bg-[#302820] text-[#c5a253] border-[#c5a253]'
                    : isCompleted
                    ? 'bg-[#515b3a] text-[#f3e9d2] border-[#654735]'
                    : 'bg-[#f3e9d2] text-[#302820] border-[#654735] hover:bg-[#e5d5b7]'
                }`}
              >
                <span>Task {idx + 1}</span>
                {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-[#c5a253]" />}
              </button>
            );
          })}

          <div className="h-5 w-[1px] bg-[#654735] mx-1" />

          <button
            onClick={() => setActiveTab(activeTab === 'terminal' ? 'challenge' : 'terminal')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition border shrink-0 shadow-xs cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-[#302820] text-[#c5a253] border-[#c5a253]'
                : 'bg-[#f3e9d2] text-[#302820] border-[#654735] hover:bg-[#e5d5b7]'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5 text-[#515b3a]" />
            <span>Terminal</span>
          </button>
        </div>

        {/* Main Work Area: Challenge or Terminal on Sage Background */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#879477] sage-board-bg">
          {activeTab === 'challenge' ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Evidence Strip for Level (Antique Beige Papers) */}
              <div className="bg-[#f3e9d2] p-4 rounded-2xl border-2 border-[#654735] shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#654735]">
                    Impounded Evidence Files (Click to Inspect):
                  </span>
                  <button
                    onClick={onOpenBoard}
                    className="text-xs font-bold text-[#515b3a] hover:text-[#302820] flex items-center gap-1 cursor-pointer"
                  >
                    <Pin className="w-3.5 h-3.5" /> View On Case Board
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  {currentEvidence.map(item => (
                    <div
                      key={item.id}
                      onClick={() => onSelectEvidence(item)}
                      className="p-3 rounded-xl bg-[#e5d5b7] hover:bg-[#d8c5a1] border border-[#654735]/40 cursor-pointer transition flex items-center justify-between shadow-xs group"
                    >
                      <div className="truncate pr-2">
                        <div className="text-xs font-bold text-[#302820] truncate group-hover:text-[#515b3a]">
                          {item.title}
                        </div>
                        <span className="text-[10px] text-[#654735] uppercase font-mono font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <Eye className="w-4 h-4 text-[#654735] group-hover:text-[#515b3a] shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge Renderer (Antique Beige & Ivory Cards with Mustard Highlights) */}
              <ChallengeRenderer
                challenge={activeChallenge}
                onOpenTerminal={() => setActiveTab('terminal')}
                onOpenTools={onOpenTools}
              />
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <SimulatedTerminal />
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar: TOTO Partner */}
      <div className="w-full lg:w-96 h-80 lg:h-full bg-[#f3e9d2]">
        <TotoHintAgent onOpenHelp={onOpenHelp} onOpenTools={onOpenTools} />
      </div>
    </div>
  );
};
