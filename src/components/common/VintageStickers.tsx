import React from 'react';

// Reusable illustrated vintage stickers matching the user's reference images
// Styled with thick cream/white sticker cut borders and realistic paper drop shadows

interface StickerProps {
  className?: string;
  size?: number;
  rotate?: number;
}

// Detective Emblem to replace all shield logos
export const DetectiveEmblem: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = ''
}) => (
  <div className={`relative inline-flex items-center justify-center ${className}`}>
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#302820" stroke="#c5a253" strokeWidth="2" />
      {/* Fedora Silhouette */}
      <ellipse cx="20" cy="18" rx="12" ry="3.5" fill="#f3e9d2" />
      <path d="M12 18 C13 11, 27 11, 28 18 Z" fill="#f3e9d2" />
      <path d="M12 17 C16 15, 24 15, 28 17" stroke="#c5a253" strokeWidth="1.5" />
      {/* Magnifying Glass Silhouette */}
      <circle cx="20" cy="27" r="4.5" stroke="#f3e9d2" strokeWidth="1.8" fill="none" />
      <line x1="23.5" y1="30.5" x2="27" y2="34" stroke="#c5a253" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

// 1. Detective in Fedora & Trenchcoat sticker (from user reference image 1)
export const DetectiveSticker: React.FC<StickerProps & { text?: string }> = ({
  className = '',
  size = 120,
  rotate = -3,
  text = 'MYSTERIOUS CRIME'
}) => (
  <div
    style={{ transform: `rotate(${rotate}deg)` }}
    className={`inline-block select-none filter drop-shadow-[2px_4px_8px_rgba(48,40,32,0.3)] hover:scale-105 transition-transform duration-200 ${className}`}
  >
    <div className="bg-[#f3e9d2] p-2 rounded-2xl border-2 border-white shadow-sm flex flex-col items-center">
      <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Fedora Hat */}
        <ellipse cx="50" cy="28" rx="38" ry="10" fill="#302820" />
        <path d="M26 26 C28 10, 72 10, 74 26 Z" fill="#42362b" />
        <path d="M26 24 C35 20, 65 20, 74 24" stroke="#c5a253" strokeWidth="4" />
        {/* Trenchcoat Collar & Body */}
        <path d="M30 38 L15 95 L85 95 L70 38 Z" fill="#654735" />
        <path d="M50 38 L35 70 L50 85 L65 70 Z" fill="#302820" />
        <path d="M30 38 L45 70 L25 80 Z" fill="#a88b68" />
        <path d="M70 38 L55 70 L75 80 Z" fill="#515b3a" />
        {/* Scarf / Mask */}
        <rect x="36" y="32" width="28" height="14" rx="4" fill="#302820" />
        {/* Buttons */}
        <circle cx="50" cy="68" r="2.5" fill="#c5a253" />
        <circle cx="50" cy="80" r="2.5" fill="#c5a253" />
      </svg>
      {text && (
        <span className="mt-1 px-2.5 py-0.5 bg-[#302820] text-[#f3e9d2] text-[9px] font-serif font-black tracking-widest uppercase rounded">
          {text}
        </span>
      )}
    </div>
  </div>
);

// 2. Camera with Red Star Flash sticker (matching user reference image 3)
export const CameraFlashSticker: React.FC<StickerProps> = ({
  className = '',
  size = 110,
  rotate = 4
}) => (
  <div
    style={{ transform: `rotate(${rotate}deg)` }}
    className={`inline-block select-none filter drop-shadow-[2px_4px_8px_rgba(48,40,32,0.3)] hover:scale-105 transition-transform duration-200 ${className}`}
  >
    <div className="bg-[#f3e9d2] p-2 rounded-2xl border-2 border-white shadow-sm flex flex-col items-center">
      <svg width={size} height={size * 0.9} viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 30 H80 V80 H20 Z" fill="#302820" rx="6" />
        <rect x="25" y="24" width="20" height="6" fill="#654735" rx="2" />
        <circle cx="75" cy="27" r="4" fill="#c5a253" />
        <circle cx="50" cy="55" r="20" fill="#201b15" stroke="#a88b68" strokeWidth="3" />
        <circle cx="50" cy="55" r="14" fill="#302820" />
        <circle cx="50" cy="55" r="7" fill="#111" />
        <circle cx="47" cy="52" r="2.5" fill="#fff" opacity="0.9" />
        {/* Red starburst flash */}
        <path
          d="M50 35 L54 45 L65 42 L58 50 L68 56 L56 59 L59 70 L50 63 L41 70 L44 59 L32 56 L42 50 L35 42 L46 45 Z"
          fill="#c53030"
          stroke="#fff"
          strokeWidth="1.5"
        />
      </svg>
      <span className="text-[9px] font-mono font-bold tracking-wider text-[#c53030] uppercase mt-0.5">
        EVIDENCE PHOTO
      </span>
    </div>
  </div>
);

// 3. Vintage Newspaper "CRIME SCENE" sticker (matching user reference image 1)
export const CrimeScenePaperSticker: React.FC<StickerProps & { headline?: string }> = ({
  className = '',
  size = 110,
  rotate = -2,
  headline = 'CRIME SCENE'
}) => (
  <div
    style={{ transform: `rotate(${rotate}deg)` }}
    className={`inline-block select-none filter drop-shadow-[2px_4px_8px_rgba(48,40,32,0.3)] hover:scale-105 transition-transform duration-200 ${className}`}
  >
    <div className="bg-[#e5d5b7] p-2.5 rounded-lg border-2 border-white shadow-sm w-[110px] text-[#302820]">
      <div className="border-b border-[#302820] pb-1 text-center">
        <div className="text-[7px] font-mono tracking-widest uppercase text-[#654735]">THE DAILY EVIDENCE</div>
        <div className="text-xs font-serif font-black tracking-tight leading-tight uppercase mt-0.5">
          {headline}
        </div>
      </div>
      <div className="my-1.5 flex items-center gap-1.5">
        <div className="w-9 h-11 bg-[#302820] rounded flex items-center justify-center text-[#f3e9d2]">
          <DetectiveEmblem size={22} />
        </div>
        <div className="space-y-1 flex-1">
          <div className="h-1 bg-[#515b3a] rounded w-full" />
          <div className="h-1 bg-[#515b3a] rounded w-4/5" />
          <div className="h-1 bg-[#515b3a] rounded w-full" />
          <div className="h-1 bg-[#654735] rounded w-2/3" />
        </div>
      </div>
      <div className="text-[7px] font-mono text-center text-[#654735] font-bold border-t border-[#302820]/30 pt-0.5">
        CASE DOSSIER
      </div>
    </div>
  </div>
);

// 4. Vintage Typewriter sticker (matching user reference image 1)
export const TypewriterSticker: React.FC<StickerProps> = ({
  className = '',
  size = 100,
  rotate = 3
}) => (
  <div
    style={{ transform: `rotate(${rotate}deg)` }}
    className={`inline-block select-none filter drop-shadow-[2px_4px_8px_rgba(48,40,32,0.3)] hover:scale-105 transition-transform duration-200 ${className}`}
  >
    <div className="bg-[#f3e9d2] p-2 rounded-2xl border-2 border-white shadow-sm flex flex-col items-center">
      <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="5" width="40" height="25" fill="#fdfcf8" stroke="#302820" strokeWidth="1" />
        <text x="35" y="18" fill="#654735" fontSize="7" fontFamily="monospace" fontWeight="bold">CRIME</text>
        <line x1="34" y1="22" x2="66" y2="22" stroke="#654735" strokeWidth="0.8" />
        <rect x="20" y="24" width="60" height="8" rx="2" fill="#302820" />
        <path d="M15 32 L20 72 H80 L85 32 Z" fill="#42362b" />
        <circle cx="32" cy="45" r="2.5" fill="#c5a253" />
        <circle cx="44" cy="45" r="2.5" fill="#c5a253" />
        <circle cx="56" cy="45" r="2.5" fill="#c5a253" />
        <circle cx="68" cy="45" r="2.5" fill="#c5a253" />
        <circle cx="28" cy="54" r="2.5" fill="#f3e9d2" />
        <circle cx="40" cy="54" r="2.5" fill="#f3e9d2" />
        <circle cx="52" cy="54" r="2.5" fill="#f3e9d2" />
        <circle cx="64" cy="54" r="2.5" fill="#f3e9d2" />
        <circle cx="76" cy="54" r="2.5" fill="#f3e9d2" />
        <rect x="35" y="62" width="30" height="3" rx="1.5" fill="#c5a253" />
      </svg>
      <span className="text-[8px] font-mono font-bold tracking-widest text-[#302820] uppercase">
        DETECTIVE LOG
      </span>
    </div>
  </div>
);

// 5. Brass Magnifying Glass sticker
export const MagnifyingGlassSticker: React.FC<StickerProps> = ({
  className = '',
  size = 75,
  rotate = -12
}) => (
  <div
    style={{ transform: `rotate(${rotate}deg)` }}
    className={`inline-block select-none filter drop-shadow-[2px_4px_8px_rgba(48,40,32,0.3)] hover:scale-110 transition-transform duration-200 ${className}`}
  >
    <div className="bg-[#f3e9d2] p-1.5 rounded-full border-2 border-white shadow-sm">
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="16" stroke="#c5a253" strokeWidth="5" fill="#eaf2f8" fillOpacity="0.5" />
        <circle cx="24" cy="24" r="13" stroke="#e5d5b7" strokeWidth="1.5" />
        <path d="M36 36 L52 52" stroke="#654735" strokeWidth="6" strokeLinecap="round" />
        <path d="M38 38 L48 48" stroke="#302820" strokeWidth="3" strokeLinecap="round" />
        <path d="M16 16 A 10 10 0 0 1 26 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

// 6. "OF COURSE I'M DANGEROUS." sticker (matching user reference image 2)
export const DangerousQuoteSticker: React.FC<StickerProps> = ({
  className = '',
  rotate = -1
}) => (
  <div
    style={{ transform: `rotate(${rotate}deg)` }}
    className={`inline-block select-none filter drop-shadow-[2px_4px_6px_rgba(48,40,32,0.25)] hover:scale-105 transition-transform duration-200 ${className}`}
  >
    <div className="bg-[#f3e9d2] px-3.5 py-1.5 rounded-lg border-2 border-white shadow-sm flex items-center gap-2">
      <DetectiveEmblem size={18} />
      <span className="font-mono text-[10px] font-black tracking-widest text-[#302820] uppercase border-l-2 border-[#654735] pl-2">
        OF COURSE I'M DANGEROUS.
      </span>
    </div>
  </div>
);

// 7. Vintage Banner Sticker
export const CrimeRibbonSticker: React.FC<StickerProps & { text?: string }> = ({
  className = '',
  rotate = 2,
  text = 'CRIME'
}) => (
  <div
    style={{ transform: `rotate(${rotate}deg)` }}
    className={`inline-block select-none filter drop-shadow-[2px_3px_5px_rgba(48,40,32,0.25)] ${className}`}
  >
    <div className="bg-[#e5d5b7] px-4 py-1 rounded-sm border-2 border-white shadow-sm text-center">
      <span className="font-serif font-black text-xs tracking-widest text-[#302820] uppercase">
        {text}
      </span>
    </div>
  </div>
);

// 8. TOTO Detective Symbol Badge Sticker (AUTHENTIC DETECTIVE SYMBOL - NOT A DOG!)
export const TotoAgentBadge: React.FC<{ size?: number; className?: string }> = ({
  size = 46,
  className = ''
}) => (
  <div className={`relative inline-block select-none filter drop-shadow-[2px_3px_6px_rgba(48,40,32,0.25)] ${className}`}>
    <div className="bg-[#f3e9d2] p-1.5 rounded-2xl border-2 border-white shadow-sm flex items-center justify-center">
      <div className="w-10 h-10 rounded-xl bg-[#515b3a] border border-[#c5a253] flex items-center justify-center relative shadow-inner">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fedora hat */}
          <ellipse cx="12" cy="10" rx="9" ry="2.5" fill="#f3e9d2" />
          <path d="M6 10 C7 4, 17 4, 18 10 Z" fill="#f3e9d2" />
          <path d="M6 9 C9 7.5, 15 7.5, 18 9" stroke="#c5a253" strokeWidth="1.2" />
          {/* Magnifying Glass */}
          <circle cx="12" cy="16.5" r="3.2" stroke="#f3e9d2" strokeWidth="1.5" fill="none" />
          <line x1="14.5" y1="19" x2="17" y2="21.5" stroke="#c5a253" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <div className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-[#302820] text-[#c5a253] text-[8px] font-black font-mono rounded border border-[#c5a253]">
          TOTO
        </div>
      </div>
    </div>
  </div>
);
