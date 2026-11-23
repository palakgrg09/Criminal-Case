import React from 'react';
import {
  Award,
  Pin,
  Terminal,
  BookOpen,
  Wrench,
  FileText,
  Sliders
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { DetectiveEmblem } from '../common/VintageStickers';

interface HeaderProps {
  onOpenBoard: () => void;
  onOpenTerminal: () => void;
  onOpenHelp: () => void;
  onOpenTools: () => void;
  onOpenReport: () => void;
  onOpenSettings: () => void;
  onReturnMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBoard,
  onOpenTerminal,
  onOpenHelp,
  onOpenTools,
  onOpenReport,
  onOpenSettings,
  onReturnMenu
}) => {
  const { gameState } = useGameState();

  return (
    <header className="relative z-30 bg-[#515b3a] border-b-2 border-[#302820] text-[#f3e9d2] px-5 py-2.5 flex items-center justify-between gap-4 shadow-md font-sans">
      {/* Title & Brand */}
      <button
        onClick={onReturnMenu}
        className="flex items-center space-x-3 text-left group cursor-pointer"
        title="Return to Main Menu"
      >
        <DetectiveEmblem size={34} />
        <div>
          <h1 className="font-serif font-black tracking-wider text-lg text-[#f3e9d2] group-hover:text-[#c5a253] transition leading-none">
            CRIMINAL CASE
          </h1>
        </div>
      </button>

      {/* Middle: Rank & Score Ticker (NO level bar) */}
      <div className="flex items-center space-x-4 bg-[#302820] px-4 py-1.5 rounded-xl border border-[#654735] shadow-inner">
        {/* Investigator Rank */}
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-[#c5a253]" />
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#e5d5b7]">Detective Rank</div>
            <div className="text-xs font-bold text-[#f3e9d2] font-serif leading-none">
              {gameState.investigatorRank}
            </div>
          </div>
        </div>

        {/* Total Score */}
        <div className="border-l border-[#654735] pl-3">
          <div className="text-[9px] font-mono uppercase tracking-wider text-[#e5d5b7]">Score</div>
          <div className="text-xs font-mono font-black text-[#c5a253] leading-none">
            {gameState.totalScore} PTS
          </div>
        </div>

        {/* Current Level Score */}
        <div className="border-l border-[#654735] pl-3 hidden sm:block">
          <div className="text-[9px] font-mono uppercase tracking-wider text-[#e5d5b7]">Level Score</div>
          <div className="text-xs font-mono font-bold text-[#9aa889] leading-none">
            +{gameState.levelScores[gameState.currentLevel] || 0}
          </div>
        </div>
      </div>

      {/* Right Quick Nav Actions (Clean buttons with NO subtitles) */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenBoard}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#302820] hover:bg-[#654735] text-xs font-bold text-[#f3e9d2] hover:text-[#c5a253] border border-[#654735] transition shadow-xs cursor-pointer"
          title="Case Investigation Board"
        >
          <Pin className="w-3.5 h-3.5 text-[#c5a253]" />
          <span className="hidden md:inline">Case Board</span>
        </button>

        <button
          onClick={onOpenTerminal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#302820] hover:bg-[#654735] text-xs font-bold text-[#f3e9d2] hover:text-[#c5a253] border border-[#654735] transition shadow-xs cursor-pointer"
          title="Workstation Terminal"
        >
          <Terminal className="w-3.5 h-3.5 text-[#c5a253]" />
          <span className="hidden md:inline">Terminal</span>
        </button>

        <button
          onClick={onOpenTools}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#302820] hover:bg-[#654735] text-xs font-bold text-[#f3e9d2] hover:text-[#c5a253] border border-[#654735] transition shadow-xs cursor-pointer"
          title="Forensic Tools"
        >
          <Wrench className="w-3.5 h-3.5 text-[#c5a253]" />
          <span className="hidden md:inline">Tools</span>
        </button>

        <button
          onClick={onOpenHelp}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#302820] hover:bg-[#654735] text-xs font-bold text-[#f3e9d2] hover:text-[#c5a253] border border-[#654735] transition shadow-xs cursor-pointer"
          title="Help Manual"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#c5a253]" />
          <span className="hidden md:inline">Help</span>
        </button>

        <button
          onClick={onOpenReport}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#302820] hover:bg-[#654735] text-xs font-bold text-[#f3e9d2] hover:text-[#c5a253] border border-[#654735] transition shadow-xs cursor-pointer"
          title="Final Report"
        >
          <FileText className="w-3.5 h-3.5 text-[#c5a253]" />
          <span className="hidden md:inline">Report</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg bg-[#302820] hover:bg-[#654735] text-[#f3e9d2] hover:text-[#c5a253] border border-[#654735] transition cursor-pointer"
          title="Preferences"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
