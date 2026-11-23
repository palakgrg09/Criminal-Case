import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, HelpCircle, CornerDownLeft, Sparkles } from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';

interface SimulatedTerminalProps {
  onOpenHelpArticle?: (articleId: string) => void;
}

export const SimulatedTerminal: React.FC<SimulatedTerminalProps> = ({ onOpenHelpArticle }) => {
  const { gameState, executeTerminal } = useGameState();
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pastCommands = gameState.terminalHistory.map(h => h.command);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [gameState.terminalHistory]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    executeTerminal(cmd);
    setInputVal('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const nextIndex = historyIndex === -1 ? pastCommands.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(pastCommands[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= pastCommands.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(pastCommands[nextIndex] || '');
      }
    }
  };

  const handleQuickCommand = (cmd: string) => {
    executeTerminal(cmd);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1b1e24] border-2 border-[#dfd2bc] rounded-2xl shadow-lg overflow-hidden font-mono text-xs text-[#e2e8f0]">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252a33] border-b border-[#353d4a] text-[#cbd5e0]">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-[#e2a854]" />
          <span className="font-bold text-[#fdfaf2] tracking-wide">
            BT-RESEARCH-WS04 // FORENSIC TERMINAL
          </span>
          <span className="text-[10px] text-[#a0aec0] hidden sm:inline">
            (1-Click Beginner Mode)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => executeTerminal('help')}
            className="flex items-center gap-1 text-[11px] text-[#cbd5e0] hover:text-[#e2a854] transition px-2.5 py-1 rounded-md bg-[#333b47]"
            title="Help"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help</span>
          </button>
          <button
            onClick={() => executeTerminal('clear')}
            className="flex items-center gap-1 text-[11px] text-[#cbd5e0] hover:text-[#ff6b6b] transition px-2.5 py-1 rounded-md bg-[#333b47]"
            title="Clear terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-5 overflow-y-auto space-y-3 cursor-text selection:bg-[#8b2635]/40"
      >
        <div className="text-[#a0aec0] text-[11px] border-b border-[#2d3542] pb-2 leading-relaxed font-sans">
          💡 <strong className="text-white">Beginner Tip:</strong> You don't need to type commands manually! Click any of the shortcut buttons below to run forensic checks instantly.
        </div>

        {gameState.terminalHistory.map(entry => (
          <div key={entry.id} className="space-y-1">
            <div className="flex items-center space-x-2 text-[#a0aec0]">
              <span className="text-[#48bb78] font-bold">avale@bt-ws04:~$</span>
              <span className="text-[#fdfaf2] font-semibold">{entry.command}</span>
            </div>
            <pre className="text-[#d8e2ec] whitespace-pre-wrap leading-relaxed pl-2.5 border-l-2 border-[#3a4454]">
              {entry.output}
            </pre>
          </div>
        ))}
      </div>

      {/* 1-Click Command Shortcuts Tray */}
      <div className="px-4 py-2.5 bg-[#17191f] border-t border-[#2d3542] flex flex-wrap gap-2 items-center">
        <span className="text-[10px] uppercase font-bold text-[#e2a854] mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Quick Buttons:
        </span>
        {[
          { label: '📁 ls evidence/', cmd: 'ls evidence/' },
          { label: '🏷️ file sample.bin', cmd: 'file evidence/sample.bin' },
          { label: '🔍 stat project_elysium.zip', cmd: 'stat evidence/project_elysium.zip' },
          { label: '🔐 hash cctv_export.mp4', cmd: 'hash evidence/cctv_export.mp4' },
          { label: '🕵️ grep ereed', cmd: 'grep "ereed" logs/system.log' },
          { label: '⏰ timeline', cmd: 'timeline' },
          { label: '🌐 network', cmd: 'network' },
          { label: '💾 recover files', cmd: 'recover deleted_files' }
        ].map(s => (
          <button
            key={s.cmd}
            onClick={() => handleQuickCommand(s.cmd)}
            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#252b36] hover:bg-[#8b2635] text-[#e2e8f0] hover:text-white border border-[#374151] transition cursor-pointer shadow-xs"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Command Input Prompt */}
      <form onSubmit={handleSubmit} className="flex items-center px-4 py-2.5 bg-[#121418] border-t border-[#2d3542]">
        <span className="text-[#48bb78] font-bold mr-2">avale@bt-ws04:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Click shortcuts above or type command (ls, stat, file, hash)..."
          className="flex-1 bg-transparent text-[#fdfaf2] focus:outline-none font-mono text-xs caret-[#e2a854]"
          autoFocus
        />
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="ml-2 px-3 py-1.5 rounded-lg bg-[#8b2635] hover:bg-[#a83244] disabled:opacity-40 disabled:hover:bg-[#8b2635] text-white transition cursor-pointer"
          title="Execute"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
