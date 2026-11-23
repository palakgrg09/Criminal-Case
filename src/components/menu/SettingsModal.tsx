import React, { useState } from 'react';
import { X, Volume2, VolumeX, Eye, RotateCcw, Sliders, AlertTriangle } from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { DetectiveEmblem } from '../common/VintageStickers';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { gameState, updateSettings, resetGame } = useGameState();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-[#f3e9d2] border-4 border-[#654735] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-[#302820]">
        {/* Header (Forest Olive with Old Ivory) */}
        <div className="px-6 py-4 bg-[#515b3a] border-b-2 border-[#302820] flex items-center justify-between text-[#f3e9d2]">
          <div className="flex items-center space-x-2.5">
            <DetectiveEmblem size={26} />
            <h3 className="font-serif font-black text-base text-[#f3e9d2]">
              DETECTIVE SETTINGS
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#e5d5b7] hover:text-white rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Audio */}
          <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border-2 border-[#654735]/30 shadow-xs">
            <div className="flex items-center space-x-3">
              {gameState.settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-[#515b3a]" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <div className="font-bold text-[#302820]">Audio Effects</div>
                <div className="text-[11px] text-[#654735]">Terminal clicks and feedback tones</div>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ soundEnabled: !gameState.settings.soundEnabled })}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer shadow-xs ${
                gameState.settings.soundEnabled
                  ? 'bg-[#515b3a] text-[#f3e9d2]'
                  : 'bg-[#e5d5b7] text-[#654735]'
              }`}
            >
              {gameState.settings.soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border-2 border-[#654735]/30 shadow-xs">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-[#515b3a]" />
              <div>
                <div className="font-bold text-[#302820]">Reduced Motion Mode</div>
                <div className="text-[11px] text-[#654735]">Disable animations and pulsing lines</div>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ reducedMotion: !gameState.settings.reducedMotion })}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer shadow-xs ${
                gameState.settings.reducedMotion
                  ? 'bg-[#515b3a] text-[#f3e9d2]'
                  : 'bg-[#e5d5b7] text-[#654735]'
              }`}
            >
              {gameState.settings.reducedMotion ? 'On' : 'Off'}
            </button>
          </div>

          {/* Font Size */}
          <div className="space-y-2 p-3.5 bg-white rounded-xl border-2 border-[#654735]/30 shadow-xs">
            <label className="font-bold text-[#302820] block">Typography Size</label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'x-large'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => updateSettings({ fontSize: size })}
                  className={`py-2 px-3 rounded-lg text-center capitalize transition border-2 font-bold cursor-pointer ${
                    gameState.settings.fontSize === size
                      ? 'bg-[#515b3a] text-[#f3e9d2] border-[#302820] shadow-xs'
                      : 'bg-[#e5d5b7] text-[#654735] border-[#654735]/20'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Investigation */}
          <div className="p-4 bg-red-50/90 border-2 border-red-200 rounded-xl space-y-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-700 shrink-0" />
              <div>
                <h4 className="font-bold text-red-900">Reset Case Progress</h4>
                <p className="text-[11px] text-red-950 mt-0.5">
                  Wipes all unlocked levels, scores, and discovered evidence from local storage.
                </p>
              </div>
            </div>

            {showConfirmReset ? (
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    resetGame();
                    setShowConfirmReset(false);
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-xs transition cursor-pointer shadow-sm"
                >
                  Yes, Wipe Save
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-3.5 py-2 bg-[#e5d5b7] text-[#302820] rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="px-3.5 py-2 bg-white hover:bg-red-100 text-red-900 font-bold rounded-lg text-xs border border-red-300 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Case</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#515b3a] border-t-2 border-[#302820] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#c5a253] hover:bg-[#b08f42] text-[#302820] font-bold rounded-xl text-xs transition cursor-pointer shadow-md"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
