import React from 'react';
import {
  Play,
  Pin,
  BookOpen,
  Sliders,
  Award,
  Lock
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { LEVELS } from '../../data/levelsData';
import {
  DetectiveSticker,
  CameraFlashSticker,
  CrimeScenePaperSticker,
  TypewriterSticker,
  MagnifyingGlassSticker,
  DangerousQuoteSticker,
  CrimeRibbonSticker,
  TotoAgentBadge,
  DetectiveEmblem
} from '../common/VintageStickers';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenBoard: () => void;
  onOpenHelp: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onOpenBoard,
  onOpenHelp,
  onOpenSettings
}) => {
  const { gameState, startLevel } = useGameState();

  const hasSave = gameState.completedLevels.length > 0 || gameState.totalScore > 0;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#879477] text-[#302820] overflow-hidden select-none font-sans">
      {/* Background Vintage Textures Over Sage Green */}
      <div className="absolute inset-0 bg-[radial-gradient(#748265_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#879477]/40 via-transparent to-[#515b3a]/30 pointer-events-none" />

      {/* Decorative Red Crime Scene Strings in Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <line x1="12%" y1="22%" x2="48%" y2="52%" stroke="#b33939" strokeWidth="2.5" strokeDasharray="6,4" />
        <line x1="48%" y1="52%" x2="86%" y2="28%" stroke="#b33939" strokeWidth="2.5" />
        <line x1="48%" y1="52%" x2="72%" y2="82%" stroke="#b33939" strokeWidth="2.5" strokeDasharray="4,4" />
      </svg>

      {/* Scattered Vintage Illustrated Stickers in Background Margins */}
      <div className="absolute top-20 left-6 hidden xl:block pointer-events-none">
        <DetectiveSticker size={130} rotate={-6} />
      </div>

      <div className="absolute top-24 right-8 hidden xl:block pointer-events-none">
        <CameraFlashSticker size={120} rotate={6} />
      </div>

      <div className="absolute bottom-20 left-10 hidden xl:block pointer-events-none">
        <TypewriterSticker size={110} rotate={4} />
      </div>

      <div className="absolute bottom-24 right-12 hidden xl:block pointer-events-none">
        <CrimeScenePaperSticker size={115} rotate={-5} />
      </div>

      <div className="absolute top-64 left-24 hidden 2xl:block pointer-events-none">
        <MagnifyingGlassSticker size={85} rotate={-14} />
      </div>

      {/* Top Header Bar (Forest Olive with Old Ivory text) */}
      <header className="relative z-10 px-8 py-4 flex items-center justify-between border-b-2 border-[#302820] bg-[#515b3a] text-[#f3e9d2] shadow-md">
        <div className="flex items-center space-x-3">
          <DetectiveEmblem size={36} />
          <div>
            <div className="font-serif font-black text-lg tracking-wider text-[#f3e9d2] leading-tight">
              CRIMINAL CASE
            </div>
          </div>
        </div>

        {hasSave && (
          <div className="flex items-center space-x-3 bg-[#302820] px-4 py-2 rounded-xl border border-[#654735] shadow-inner">
            <Award className="w-5 h-5 text-[#c5a253]" />
            <div className="text-xs">
              <span className="text-[#e5d5b7] uppercase font-mono text-[10px] font-bold">Detective: </span>
              <span className="font-bold text-[#f3e9d2]">{gameState.investigatorRank}</span>
              <span className="text-[#c5a253] font-mono ml-2 font-black">({gameState.totalScore} PTS)</span>
            </div>
          </div>
        )}
      </header>

      {/* Center Case Desk / Scrapbook Hero */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 flex flex-col items-center text-center space-y-6">
        {/* Case Badge & Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <CrimeRibbonSticker text="FORENSIC DOSSIER" rotate={-2} />
          <DangerousQuoteSticker rotate={2} />
        </div>

        {/* Game Title */}
        <div className="space-y-1">
          <h1 className="font-serif font-black text-6xl sm:text-7xl md:text-8xl tracking-tight text-[#302820] drop-shadow-md">
            CRIMINAL CASE
          </h1>
          <div className="h-1.5 w-32 bg-[#c5a253] mx-auto rounded-full my-2" />
        </div>

        {/* Narrative Teaser Box (Antique Beige & Ivory Paper Card with Walnut Border) */}
        <div className="max-w-2xl bg-[#f3e9d2] border-2 border-[#654735] p-6 rounded-2xl shadow-2xl relative text-[#302820]">
          {/* Top Stamp */}
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 bg-[#515b3a] text-[#f3e9d2] text-[10px] font-mono font-bold uppercase rounded-md shadow-sm border border-[#302820]">
            THE VANISHING OF VAULT B-04
          </div>

          <p className="font-serif text-sm sm:text-base leading-relaxed text-[#302820] italic pt-1">
            "Late at night, chief scientist Dr. Adrian Vale locked himself inside high-security Vault B-04. When the emergency alarms wailed, the room was empty, the computer screens were glowing, and the top-secret research container had vanished. Security rushed to accuse a junior technician, but computers don't tell rumors, they keep exact records. Every key pressed, file deleted, and network packet transmitted left behind an unchangeable clue."
          </p>

          <div className="mt-4 pt-3 border-t border-[#654735]/30 flex flex-wrap items-center justify-between text-xs font-mono text-[#654735]">
            <span className="font-bold">Locard's Forensic Principle:</span>
            <span className="text-[#515b3a] italic font-serif font-bold text-sm">
              "Every contact leaves a trace."
            </span>
          </div>
        </div>

        {/* TOTO Partner */}
        <div className="flex items-center gap-3 bg-[#f3e9d2] px-4 py-2 rounded-2xl border-2 border-[#654735] shadow-md">
          <TotoAgentBadge size={38} />
          <div className="text-left">
            <span className="font-serif font-black text-[#302820] text-sm block">
              TOTO, your partner
            </span>
          </div>
        </div>

        {/* Action Buttons (Clean, without subtitles) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md pt-2">
          <button
            onClick={() => {
              if (gameState.currentLevel > 1) {
                startLevel(gameState.currentLevel);
              } else {
                startLevel(1);
              }
            }}
            className="w-full sm:flex-1 py-4 px-6 bg-[#515b3a] hover:bg-[#302820] text-[#f3e9d2] hover:text-[#c5a253] rounded-xl shadow-xl border-2 border-[#654735] font-serif font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current text-[#c5a253]" />
            <span>{hasSave ? 'Continue Case' : 'Start Case'}</span>
          </button>

          <button
            onClick={onOpenBoard}
            className="w-full sm:w-auto py-4 px-6 bg-[#f3e9d2] hover:bg-[#e5d5b7] text-[#302820] rounded-xl border-2 border-[#654735] font-serif font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer shadow-md"
          >
            <Pin className="w-5 h-5 text-[#515b3a]" />
            <span>Case Board</span>
          </button>
        </div>

        {/* Secondary Buttons Row (Clean, without subtitles) */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono font-bold">
          <button
            onClick={onOpenHelp}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#f3e9d2] hover:bg-[#e5d5b7] text-[#302820] border-2 border-[#654735] shadow-sm transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#515b3a]" />
            <span>Field Manual</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#f3e9d2] hover:bg-[#e5d5b7] text-[#302820] border-2 border-[#654735] shadow-sm transition cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-[#515b3a]" />
            <span>Settings</span>
          </button>
        </div>

        {/* 4 Levels Grid (Clean cards: NO "easy to medium" or other subtitles) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full pt-2">
          {LEVELS.map(lvl => {
            const isUnlocked = gameState.unlockedLevels.includes(lvl.id);
            const isDone = gameState.completedLevels.includes(lvl.id);

            return (
              <div
                key={lvl.id}
                onClick={() => isUnlocked && startLevel(lvl.id)}
                className={`p-4 rounded-xl border-2 text-left transition shadow-md ${
                  isUnlocked
                    ? 'bg-[#f3e9d2] border-[#654735] cursor-pointer hover:border-[#c5a253] hover:scale-102'
                    : 'bg-[#879477]/50 border-[#654735]/40 opacity-60 cursor-not-allowed text-[#302820]/70'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono font-black text-[#515b3a]">
                  <span>LEVEL {lvl.id}</span>
                  {isDone ? (
                    <span className="text-[#515b3a] font-black">✓ SOLVED</span>
                  ) : isUnlocked ? (
                    <span className="text-[#c5a253] font-black">OPEN</span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-[#654735]" />
                  )}
                </div>
                <div className="font-serif font-black text-sm text-[#302820] mt-2 truncate">
                  {lvl.title.replace(/^Level \d+: /, '')}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer (Forest Olive) */}
      <footer className="relative z-10 px-8 py-3.5 border-t-2 border-[#302820] bg-[#515b3a] text-[#f3e9d2] flex flex-wrap items-center justify-between text-xs font-mono">
        <div>
          CRIMINAL CASE // University Digital Forensics Case Study
        </div>
        <div>
          Every action leaves a trace. Verify clues, consult TOTO, and find the truth!
        </div>
      </footer>
    </div>
  );
};
