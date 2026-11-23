import React, { useState } from 'react';
import {
  Pin,
  Search,
  Trash2,
  FileText,
  Film,
  Cpu,
  HardDrive,
  Database,
  Binary,
  Lock,
  Radio,
  Users,
  Network,
  Globe,
  CheckSquare,
  Eye,
  Link as LinkIcon
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { INITIAL_EVIDENCE } from '../../data/evidenceData';
import { EvidenceItem } from '../../types/game';
import {
  CameraFlashSticker,
  CrimeScenePaperSticker,
  TypewriterSticker,
  DangerousQuoteSticker,
  DetectiveEmblem
} from '../common/VintageStickers';

interface InvestigationBoardProps {
  onSelectEvidence: (item: EvidenceItem) => void;
}

const ICON_MAP: Record<string, any> = {
  FileText,
  Film,
  Cpu,
  HardDrive,
  Database,
  Trash2,
  Binary,
  Lock,
  Radio,
  Users,
  Network,
  Globe,
  CheckSquare
};

export const InvestigationBoard: React.FC<InvestigationBoardProps> = ({ onSelectEvidence }) => {
  const { gameState, addBoardConnection, removeBoardConnection } = useGameState();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);

  const unlockedEvidence = INITIAL_EVIDENCE.filter(e =>
    gameState.discoveredEvidence.includes(e.id)
  );

  const filteredEvidence = unlockedEvidence.filter(e => {
    const matchesCat = filterCategory === 'ALL' || e.category === filterCategory;
    const matchesQuery =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const categories = ['ALL', ...Array.from(new Set(unlockedEvidence.map(e => e.category)))];

  const handleCardClick = (item: EvidenceItem) => {
    if (connectingFrom) {
      if (connectingFrom !== item.id) {
        addBoardConnection(connectingFrom, item.id, 'Investigative Link');
      }
      setConnectingFrom(null);
    } else {
      onSelectEvidence(item);
    }
  };

  const handleStartConnect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (connectingFrom === id) {
      setConnectingFrom(null);
    } else {
      setConnectingFrom(id);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#515b3a] overflow-hidden select-none font-sans text-[#302820]">
      {/* Cork / Olive Board Overlays */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#424b2e_1.5px,transparent_1.5px)] [background-size:18px_18px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#302820]/30 pointer-events-none" />

      {/* Control Bar (Dark Espresso with Old Ivory & Mustard) */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-[#302820] border-b-2 border-[#654735] shadow-md text-[#f3e9d2]">
        <div className="flex items-center space-x-3">
          <DetectiveEmblem size={28} />
          <span className="font-serif font-black text-sm tracking-wider text-[#f3e9d2]">
            CASE INVESTIGATION BOARD
          </span>
          <span className="text-xs text-[#e5d5b7] hidden md:inline font-medium">
            Pinned Clues ({unlockedEvidence.length}) // Red String Connections ({gameState.boardConnections.length})
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-[#515b3a] border-2 border-[#654735] text-[#f3e9d2] text-xs px-3 py-1.5 rounded-lg focus:outline-none font-medium cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'ALL' ? 'All Clue Types' : cat}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#c5a253] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search clues..."
              className="bg-[#515b3a] border-2 border-[#654735] text-xs text-[#f3e9d2] pl-8 pr-3 py-1.5 rounded-lg focus:outline-none placeholder-[#e5d5b7]/60"
            />
          </div>
        </div>
      </div>

      {connectingFrom && (
        <div className="relative z-20 bg-[#c5a253] text-[#302820] px-4 py-2 text-xs text-center flex items-center justify-center gap-3 shadow-md font-bold">
          <span>Click another clue card to string a red line between them!</span>
          <button
            onClick={() => setConnectingFrom(null)}
            className="px-2.5 py-0.5 bg-[#302820] text-[#f3e9d2] hover:bg-[#654735] rounded-md text-[11px] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Main Board Area (Forest Olive with Antique Beige Clue Cards) */}
      <div className="relative z-10 flex-1 p-6 overflow-y-auto">
        {/* Stickers pinned to the board header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <CrimeScenePaperSticker rotate={-3} headline="CASE CLUES" />
          <DangerousQuoteSticker rotate={2} />
          <CameraFlashSticker size={100} rotate={-4} />
          <TypewriterSticker size={95} rotate={3} />
        </div>

        {/* Evidence Cards Grid (Old Ivory / Antique Beige Papers with Walnut borders) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {filteredEvidence.map(item => {
            const Icon = ICON_MAP[item.icon] || FileText;
            const isConnectingSource = connectingFrom === item.id;
            const cardConnections = gameState.boardConnections.filter(
              c => c.from === item.id || c.to === item.id
            );

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className={`relative group bg-[#f3e9d2] text-[#302820] p-5 rounded-2xl shadow-xl border-2 border-[#654735] cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-2xl ${
                  isConnectingSource
                    ? 'ring-4 ring-[#c5a253] scale-102'
                    : 'hover:rotate-0.5'
                }`}
              >
                {/* Vintage Pushpin (Red) */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#b33939] border-2 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/70" />
                </div>

                {/* Evidence Tag & Level */}
                <div className="flex items-center justify-between border-b border-[#654735]/20 pb-2 mt-1">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#654735]">
                    {item.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#515b3a] text-[#f3e9d2] font-bold font-mono">
                    LVL {item.level}
                  </span>
                </div>

                {/* Card Title */}
                <div className="flex items-start gap-2.5 mt-3">
                  <Icon className="w-5 h-5 text-[#515b3a] shrink-0 mt-0.5" />
                  <h4 className="font-serif font-black text-sm text-[#302820] leading-snug">
                    {item.title}
                  </h4>
                </div>

                {/* Short Description */}
                <p className="text-xs text-[#524234] mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Active Red Strings Count */}
                {cardConnections.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-[#654735]/20 flex items-center gap-1.5 text-[11px] text-[#b33939] font-bold">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#b33939] animate-pulse" />
                    <span>{cardConnections.length} String Link{cardConnections.length > 1 ? 's' : ''}</span>
                  </div>
                )}

                {/* Card Actions */}
                <div className="mt-4 pt-2 border-t border-[#654735]/20 flex items-center justify-between text-xs">
                  <button
                    onClick={e => handleStartConnect(e, item.id)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#515b3a] hover:text-[#302820] cursor-pointer"
                    title="Connect with red string"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[#c5a253]" />
                    <span>{isConnectingSource ? 'Connecting...' : 'String Link'}</span>
                  </button>

                  <button
                    onClick={() => onSelectEvidence(item)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#302820] hover:text-[#515b3a] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Existing Connections Drawer */}
        {gameState.boardConnections.length > 0 && (
          <div className="mt-8 bg-[#f3e9d2] border-2 border-[#654735] rounded-2xl p-5 shadow-xl text-[#302820]">
            <h5 className="font-serif font-black text-xs uppercase tracking-wider text-[#302820] mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#b33939]" />
              Active Red String Hypothesis Links ({gameState.boardConnections.length})
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {gameState.boardConnections.map((conn, idx) => {
                const itemA = INITIAL_EVIDENCE.find(e => e.id === conn.from);
                const itemB = INITIAL_EVIDENCE.find(e => e.id === conn.to);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#654735]/30 text-xs shadow-xs"
                  >
                    <div className="truncate pr-2">
                      <span className="text-[#515b3a] font-bold">{itemA?.title || conn.from}</span>
                      <span className="text-[#654735] mx-1.5">&harr;</span>
                      <span className="text-[#515b3a] font-bold">{itemB?.title || conn.to}</span>
                    </div>
                    <button
                      onClick={() => removeBoardConnection(conn.from, conn.to)}
                      className="text-[#654735] hover:text-[#b33939] p-1 cursor-pointer"
                      title="Sever connection"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
