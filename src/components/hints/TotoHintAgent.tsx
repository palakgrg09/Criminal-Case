import React, { useState } from 'react';
import {
  Lightbulb,
  Unlock,
  Lock,
  ChevronRight,
  Smile,
  Search
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { LEVELS } from '../../data/levelsData';
import { TotoAgentBadge, DangerousQuoteSticker, DetectiveEmblem } from '../common/VintageStickers';

interface TotoHintAgentProps {
  onOpenHelp?: () => void;
  onOpenTools?: () => void;
}

export const TotoHintAgent: React.FC<TotoHintAgentProps> = ({ onOpenHelp, onOpenTools }) => {
  const { gameState, revealHint } = useGameState();
  const [activeTab, setActiveTab] = useState<'hints' | 'quick-guide'>('hints');

  const currentLevelData = LEVELS.find(l => l.id === gameState.currentLevel) || LEVELS[0];
  const revealedHints = gameState.hintsRevealed[gameState.currentLevel] || [];

  // Beginner-friendly guidance summaries
  const beginnerTips: Record<number, string[]> = {
    1: [
      "Tip 1: To solve a crime, keep the computer plugged in! Pulling the plug erases the live RAM memory.",
      "Tip 2: Hashes are digital fingerprints. If two SHA-256 strings differ by even 1 letter, it's a mismatch!",
      "Tip 3: Always put foreign flash drives in anti-static bags and use write-blockers to keep evidence pure."
    ],
    2: [
      "Tip 1: 'Deleted' files aren't vanished! They stay in unallocated drive sectors until overwritten.",
      "Tip 2: A file name can lie! Check the initial file header bytes: 50 4B 03 04 is always a ZIP archive.",
      "Tip 3: Click the shortcut buttons in the terminal to inspect files without typing long commands."
    ],
    3: [
      "Tip 1: IST is UTC + 5 hours and 30 minutes. Always convert timestamps before checking alibis!",
      "Tip 2: Reed said he clocked out at 9:00 PM (21:00 IST), but the access log shows activity past 11:30 PM!",
      "Tip 3: A server timestamp tells you WHEN something happened, but not WHO sat in the chair."
    ],
    4: [
      "Tip 1: Spot the massive 47 MB data transfer pushing out to an external Swiss server (port 8443).",
      "Tip 2: Connect the dots on the Case Board: USB Drive &rarr; Recovered File &rarr; Network Stream &rarr; Tampered Video.",
      "Tip 3: Great detectives don't guess! Always state what the evidence proves and what remains unproven."
    ]
  };

  return (
    <div className="flex flex-col h-full bg-[#f3e9d2] border-l-2 border-[#654735] font-sans text-[#302820]">
      {/* TOTO Detective Banner */}
      <div className="p-3.5 bg-[#515b3a] border-b-2 border-[#302820] flex items-center justify-between text-[#f3e9d2]">
        <div className="flex items-center space-x-2.5">
          <TotoAgentBadge size={38} />
          <div>
            <span className="font-serif font-black text-sm tracking-wide text-[#f3e9d2]">
              TOTO
            </span>
          </div>
        </div>

        {/* Clean Tabs without subtitles */}
        <div className="flex rounded-lg border border-[#654735] bg-[#302820] p-0.5 text-xs font-bold">
          <button
            onClick={() => setActiveTab('hints')}
            className={`px-3 py-1 rounded transition cursor-pointer ${
              activeTab === 'hints'
                ? 'bg-[#c5a253] text-[#302820] shadow-sm'
                : 'text-[#e5d5b7] hover:text-white'
            }`}
          >
            Hints ({revealedHints.length}/3)
          </button>
          <button
            onClick={() => setActiveTab('quick-guide')}
            className={`px-3 py-1 rounded transition cursor-pointer ${
              activeTab === 'quick-guide'
                ? 'bg-[#c5a253] text-[#302820] shadow-sm'
                : 'text-[#e5d5b7] hover:text-white'
            }`}
          >
            Guide
          </button>
        </div>
      </div>

      {/* Detective Speech Bubble */}
      <div className="p-3 bg-[#e5d5b7] border-b border-[#654735] flex items-start gap-2.5 text-xs text-[#302820]">
        <DetectiveEmblem size={22} className="shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#654735] uppercase tracking-wider text-[10px] block">
            Partner TOTO:
          </span>
          <p className="text-xs text-[#302820] mt-0.5 leading-relaxed font-serif italic">
            "Investigating <strong className="font-bold text-[#302820] not-italic">{currentLevelData.title.replace(/^Level \d+: /, '')}</strong>. Keep a sharp eye on every detail! If you hit a roadblock, unlock a clue below."
          </p>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#879477]/25">
        {activeTab === 'hints' ? (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[11px] text-[#302820]">
                Case Clues:
              </span>
              <span className="text-[10px] text-[#654735] font-bold">
                -10 pts on first reveal
              </span>
            </div>

            {/* 3 Progressive Hints Cards */}
            <div className="space-y-3">
              {currentLevelData.hints.map((hint, idx) => {
                const isUnlocked = revealedHints.includes(idx);
                const canUnlock = idx === 0 || revealedHints.includes(idx - 1);

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border-2 transition shadow-sm ${
                      isUnlocked
                        ? 'bg-[#f3e9d2] border-[#515b3a] text-[#302820]'
                        : 'bg-[#e5d5b7] border-[#654735]/40 text-[#654735]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-xs">
                        {isUnlocked ? (
                          <Unlock className="w-3.5 h-3.5 text-[#515b3a]" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-[#654735]" />
                        )}
                        <span>
                          Clue {idx + 1}: {hint.type === 'nudge' ? 'Gentle Nudge' : hint.type === 'method' ? 'Investigative Method' : 'Direct Guidance'}
                        </span>
                      </div>

                      {!isUnlocked ? (
                        <button
                          onClick={() => revealHint(currentLevelData.id, idx)}
                          disabled={!canUnlock}
                          className={`text-xs font-bold px-3 py-1 rounded-lg transition shadow-sm flex items-center gap-1.5 cursor-pointer ${
                            canUnlock
                              ? 'bg-[#515b3a] hover:bg-[#302820] text-[#f3e9d2]'
                              : 'bg-[#879477] text-[#302820]/60 cursor-not-allowed'
                          }`}
                        >
                          <Search className="w-3 h-3 text-[#c5a253]" />
                          <span>Ask TOTO (-10)</span>
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-[#515b3a] bg-[#879477]/30 border border-[#515b3a] px-2 py-0.5 rounded">
                          REVEALED
                        </span>
                      )}
                    </div>

                    {isUnlocked ? (
                      <div className="mt-2.5 pt-2 border-t border-[#654735]/20 text-xs text-[#302820] leading-relaxed font-serif bg-white/70 p-2.5 rounded-lg border border-[#654735]/20">
                        {hint.text}
                      </div>
                    ) : (
                      <p className="mt-1.5 text-[11px] text-[#654735] italic">
                        {canUnlock
                          ? "Click 'Ask TOTO' above to unlock this clue."
                          : `Unlock Clue ${idx} first!`}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sticker Decorator */}
            <div className="pt-2 flex justify-center">
              <DangerousQuoteSticker />
            </div>
          </div>
        ) : (
          /* Beginner Quick Guide Tab */
          <div className="space-y-3.5">
            <div className="bg-[#f3e9d2] p-4 rounded-xl border-2 border-[#654735] shadow-sm">
              <h4 className="font-serif font-black text-xs uppercase tracking-wider text-[#515b3a] flex items-center gap-1.5 mb-2">
                <Smile className="w-4 h-4 text-[#c5a253]" /> Detective Survival Guide
              </h4>
              <p className="text-xs text-[#302820] leading-relaxed">
                Welcome to Criminal Case! You do not need technical background to crack this mystery. Every level teaches one key forensic concept:
              </p>

              <ul className="mt-3 space-y-2 text-xs text-[#302820]">
                {beginnerTips[currentLevelData.id]?.map((tip, idx) => (
                  <li key={idx} className="bg-[#e5d5b7] p-2.5 rounded-lg border border-[#654735]/30 leading-relaxed font-medium">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions for Tools & Help (Clean Buttons) */}
            <div className="space-y-2">
              <button
                onClick={onOpenTools}
                className="w-full py-2.5 px-3 bg-[#e5d5b7] hover:bg-[#f3e9d2] border-2 border-[#654735] rounded-xl text-xs font-bold text-[#302820] flex items-center justify-between transition cursor-pointer shadow-xs"
              >
                <span>Forensic Tools</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#654735]" />
              </button>

              <button
                onClick={onOpenHelp}
                className="w-full py-2.5 px-3 bg-[#e5d5b7] hover:bg-[#f3e9d2] border-2 border-[#654735] rounded-xl text-xs font-bold text-[#302820] flex items-center justify-between transition cursor-pointer shadow-xs"
              >
                <span>Field Manual</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#654735]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 bg-[#515b3a] border-t-2 border-[#302820] text-center text-[11px] text-[#e5d5b7] font-mono">
        TOTO // Partner
      </div>
    </div>
  );
};
