import React from 'react';
import { X, Printer } from 'lucide-react';
import { EvidenceItem } from '../../types/game';
import { DetectiveEmblem } from '../common/VintageStickers';

interface EvidenceViewerModalProps {
  item: EvidenceItem | null;
  onClose: () => void;
  onPinToBoard?: (item: EvidenceItem) => void;
}

export const EvidenceViewerModal: React.FC<EvidenceViewerModalProps> = ({
  item,
  onClose
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#f3e9d2] text-[#302820] border-4 border-[#654735] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Folder Tab Header (Forest Olive with Old Ivory) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#515b3a] border-b-2 border-[#302820] text-[#f3e9d2]">
          <div className="flex items-center space-x-2.5">
            <DetectiveEmblem size={26} />
            <span className="px-2.5 py-0.5 bg-[#302820] text-[#c5a253] text-[10px] font-mono font-black uppercase rounded-md border border-[#654735]">
              EVIDENCE TAG: {item.id}
            </span>
            <span className="text-xs font-serif font-black text-[#f3e9d2] tracking-wider">
              CRIMINAL CASE ARCHIVE
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 text-[#e5d5b7] hover:text-white rounded-lg transition cursor-pointer"
              title="Print Dossier"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#e5d5b7] hover:text-white rounded-lg transition cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto space-y-5 bg-[#f3e9d2]">
          {/* Title & Classification */}
          <div className="border-b-2 border-[#654735]/20 pb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#515b3a] font-black">
                  {item.category}
                </span>
                <span className="text-xs text-[#654735] font-semibold">
                  • Discovered in Level {item.level}
                </span>
              </div>
              <h2 className="text-2xl font-serif font-black text-[#302820] mt-1 tracking-tight">
                {item.title}
              </h2>
            </div>

            <div className="px-3.5 py-1.5 border-2 border-[#515b3a] rounded-xl text-center bg-[#e5d5b7] shadow-xs rotate-1">
              <span className="text-[11px] font-serif font-black uppercase tracking-widest text-[#515b3a] block">
                CLASSIFIED
              </span>
              <span className="text-[9px] text-[#654735] font-mono font-bold">CHAIN VERIFIED</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#e5d5b7] p-4 rounded-xl border border-[#654735]/30 text-xs leading-relaxed text-[#302820] italic font-serif">
            "{item.description}"
          </div>

          {/* Metadata Grid */}
          {item.metadata && Object.keys(item.metadata).length > 0 && (
            <div className="bg-white p-4 rounded-xl border-2 border-[#654735]/30 space-y-2 shadow-xs">
              <h4 className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#654735] border-b border-[#654735]/20 pb-1">
                EVIDENTIARY ATTRIBUTES & CUSTODIAL METADATA
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(item.metadata).map(([key, val]) => (
                  <div key={key} className="space-y-0.5">
                    <span className="text-[10px] font-bold text-[#654735] block uppercase font-mono">
                      {key}:
                    </span>
                    <span className="font-mono text-xs font-bold text-[#302820] break-all">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Content / Log View */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#654735]">
              RECORDED DOSSIER TEXT / RAW ARTIFACT EXTRACT
            </h4>
            <pre className="p-4 bg-[#e5d5b7] text-[#302820] rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto border-2 border-[#654735]/30 shadow-inner font-medium">
              {item.content}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#515b3a] border-t-2 border-[#302820] flex justify-between items-center text-xs text-[#f3e9d2]">
          <span className="font-mono text-[11px] text-[#e5d5b7]">
            ISO/IEC 27037 Digital Preservation Standard
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#c5a253] hover:bg-[#b08f42] text-[#302820] font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            Close File
          </button>
        </div>
      </div>
    </div>
  );
};
