import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Send,
  ArrowRight,
  FileCheck
} from 'lucide-react';
import { Challenge } from '../../types/game';
import { useGameState } from '../../context/GameStateContext';

interface ChallengeRendererProps {
  challenge: Challenge;
  onSuccessNext?: () => void;
  onOpenTerminal?: () => void;
  onOpenTools?: () => void;
}

export const ChallengeRenderer: React.FC<ChallengeRendererProps> = ({
  challenge,
  onSuccessNext,
  onOpenTerminal
}) => {
  const { gameState, submitChallenge } = useGameState();

  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [selectedSingle, setSelectedSingle] = useState<string>('');
  const [hashAnswers, setHashAnswers] = useState<Record<string, string>>({
    'hash-match': '',
    'hash-implication': ''
  });
  const [formData, setFormData] = useState<Record<string, string>>({
    evidenceId: 'EV-USB-UNKNOWN',
    itemType: 'USB Flash Storage',
    collectionLocation: 'Near rear I/O panel of WS-04',
    integrityAction: 'Store in anti-static bag with write-blocker imaging'
  });
  const [timestampChoice, setTimestampChoice] = useState<{ utc: string; ist: string }>({
    utc: '',
    ist: ''
  });
  const [orderedItems, setOrderedItems] = useState<string[]>(
    challenge.type === 'ordering' ? challenge.data.events.map((e: any) => e.id) : []
  );
  const [networkAnswers, setNetworkAnswers] = useState<Record<string, string>>({
    'target-ip': '',
    'target-proto': ''
  });

  const [lastResult, setLastResult] = useState<{ success: boolean; feedback: string } | null>(null);

  const isCompleted = gameState.challengeResults[challenge.id]?.completed;

  const toggleMulti = (id: string) => {
    setSelectedMulti(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const moveOrderItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= orderedItems.length) return;
    const newItems = [...orderedItems];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setOrderedItems(newItems);
  };

  const handleSubmit = () => {
    let payload: any = null;

    switch (challenge.type) {
      case 'multi-select':
        payload = selectedMulti;
        break;
      case 'single-select':
      case 'file-identify':
      case 'log-filter':
        payload = selectedSingle;
        break;
      case 'hash-compare':
        payload = hashAnswers;
        break;
      case 'form-fill':
        payload = formData;
        break;
      case 'timestamp-convert':
        payload = timestampChoice;
        break;
      case 'ordering':
        payload = orderedItems;
        break;
      case 'network-filter':
        payload = networkAnswers;
        break;
      case 'terminal':
      case 'correlation':
      case 'report':
        payload = 'verified';
        break;
      default:
        payload = selectedSingle;
    }

    const result = submitChallenge(challenge.id, payload);
    setLastResult(result);
  };

  return (
    <div className="bg-[#f3e9d2] border-2 border-[#654735] rounded-2xl p-6 sm:p-7 shadow-xl space-y-6 text-[#302820]">
      {/* Header */}
      <div className="border-b-2 border-[#654735]/20 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#515b3a] text-[#f3e9d2] text-[10px] font-mono font-bold uppercase shadow-xs">
              {challenge.type}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-[#515b3a] text-xs font-bold bg-[#879477]/30 px-2.5 py-0.5 rounded-md border border-[#515b3a]">
                <CheckCircle className="w-4 h-4 text-[#515b3a]" /> TASK SOLVED (+{gameState.challengeResults[challenge.id]?.score} PTS)
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-[#654735] font-semibold">
            Attempts: {gameState.incorrectAttempts[challenge.id] || 0}
          </span>
        </div>

        <h3 className="text-2xl font-serif font-black text-[#302820] mt-2">
          {challenge.title}
        </h3>
        <p className="text-xs text-[#654735] mt-1.5 leading-relaxed font-medium">
          {challenge.description}
        </p>
      </div>

      {/* Friendly Directive Banner */}
      <div className="p-4 bg-[#e5d5b7] border-l-4 border-[#c5a253] rounded-r-xl text-xs text-[#302820] shadow-xs">
        <span className="font-bold text-[#515b3a] uppercase tracking-wide">Detective Goal: </span>
        {challenge.instruction}
      </div>

      {/* Interactive Controls */}
      <div className="space-y-4">
        {/* 1. Multi-Select */}
        {challenge.type === 'multi-select' && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#654735]">
              Select the 4 genuine digital evidence items (avoid physical clutter like coffee cups):
            </div>
            {challenge.data.options.map((opt: any) => {
              const isChecked = selectedMulti.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => !isCompleted && toggleMulti(opt.id)}
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition shadow-xs ${
                    isChecked
                      ? 'bg-[#e5d5b7] border-[#515b3a] text-[#302820] font-semibold'
                      : 'bg-white border-[#654735]/30 text-[#302820] hover:bg-[#faf6ee]'
                  }`}
                >
                  <span className="text-xs pr-3 leading-relaxed">{opt.label}</span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    disabled={isCompleted}
                    className="w-4 h-4 rounded cursor-pointer accent-[#515b3a]"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* 2. Single-Select & File-Identify & Log-Filter */}
        {(challenge.type === 'single-select' ||
          challenge.type === 'file-identify' ||
          challenge.type === 'log-filter') && (
          <div className="space-y-2.5">
            {challenge.data.hexDump && (
              <div className="bg-[#302820] p-3.5 rounded-xl font-mono text-xs text-[#c5a253] border border-[#654735]">
                <div className="text-[10px] text-[#e5d5b7] uppercase font-bold mb-1">Inspecting File Header Bytes:</div>
                {challenge.data.hexDump}
              </div>
            )}
            {challenge.data.question && (
              <p className="text-xs font-bold text-[#302820] mb-2">{challenge.data.question}</p>
            )}
            {challenge.data.options.map((opt: any) => {
              const isSelected = selectedSingle === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => !isCompleted && setSelectedSingle(opt.id)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 shadow-xs ${
                    isSelected
                      ? 'bg-[#e5d5b7] border-[#515b3a] text-[#302820] font-semibold'
                      : 'bg-white border-[#654735]/30 text-[#302820] hover:bg-[#faf6ee]'
                  }`}
                >
                  <input
                    type="radio"
                    name={`radio-${challenge.id}`}
                    checked={isSelected}
                    onChange={() => {}}
                    disabled={isCompleted}
                    className="mt-0.5 accent-[#515b3a] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs leading-relaxed block">{opt.label}</span>
                    {isCompleted && opt.explanation && (
                      <span className="text-[11px] text-[#654735] mt-1.5 block italic bg-[#e5d5b7] p-2 rounded-lg">
                        {opt.explanation}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Hash-Compare */}
        {challenge.type === 'hash-compare' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#e5d5b7] p-4 rounded-xl border border-[#654735]/30">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#654735]">
                  Recorded Hash (from Danvers' Receipt):
                </span>
                <div className="font-mono text-xs text-[#515b3a] font-bold mt-1 break-all bg-white p-2 rounded-lg border border-[#654735]/20">
                  {challenge.data.recordedHash}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#654735]">
                  Observed Hash (Current Video File):
                </span>
                <div className="font-mono text-xs text-[#9b2c2c] font-bold mt-1 break-all bg-white p-2 rounded-lg border border-[#654735]/20">
                  {challenge.data.observedHash}
                </div>
              </div>
            </div>

            {challenge.data.questions.map((q: any) => (
              <div key={q.id} className="space-y-2 bg-white p-4 rounded-xl border border-[#654735]/30 shadow-xs">
                <label className="text-xs font-bold text-[#302820]">{q.prompt}</label>
                <div className="space-y-2 pt-1">
                  {q.options.map((opt: any) => (
                    <label key={opt.id} className="flex items-center gap-2.5 text-xs text-[#302820] cursor-pointer">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.id}
                        checked={hashAnswers[q.id] === opt.id}
                        onChange={() => setHashAnswers({ ...hashAnswers, [q.id]: opt.id })}
                        disabled={isCompleted}
                        className="accent-[#515b3a]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Form-Fill (Chain of Custody) */}
        {challenge.type === 'form-fill' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#e5d5b7] p-5 rounded-xl border border-[#654735]/30">
            {challenge.data.fields.map((f: any) => (
              <div key={f.id} className="space-y-1.5">
                <label className="text-xs font-bold text-[#302820]">{f.label}</label>
                {f.options ? (
                  <select
                    value={formData[f.id] || ''}
                    onChange={e => setFormData({ ...formData, [f.id]: e.target.value })}
                    disabled={isCompleted}
                    className="w-full bg-white border border-[#654735]/40 text-xs text-[#302820] p-2.5 rounded-lg focus:outline-none focus:border-[#515b3a]"
                  >
                    {f.options.map((opt: string) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData[f.id] || ''}
                    onChange={e => setFormData({ ...formData, [f.id]: e.target.value })}
                    disabled={isCompleted}
                    placeholder={f.placeholder}
                    className="w-full bg-white border border-[#654735]/40 text-xs text-[#302820] p-2.5 rounded-lg focus:outline-none focus:border-[#515b3a]"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* 5. Terminal Interaction Verification */}
        {challenge.type === 'terminal' && (
          <div className="bg-[#e5d5b7] p-5 rounded-xl border border-[#654735]/30 space-y-3">
            <p className="text-xs text-[#302820] leading-relaxed">
              Open the workstation terminal to run forensic inspection commands (`ls`, `file`, `stat`, `recover`).
            </p>
            <div>
              <button
                onClick={onOpenTerminal}
                className="px-5 py-2.5 bg-[#515b3a] hover:bg-[#302820] text-[#f3e9d2] text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                Open Terminal
              </button>
            </div>
          </div>
        )}

        {/* 6. Timestamp Conversion */}
        {challenge.type === 'timestamp-convert' && (
          <div className="space-y-4 bg-[#e5d5b7] p-5 rounded-xl border border-[#654735]/30">
            <div className="bg-white p-3 rounded-lg text-xs font-mono text-[#302820] border border-[#654735]/30">
              <div>Target Unix Epoch: <span className="text-[#515b3a] font-black">{challenge.data.unixTimestamp}</span></div>
              <div className="text-[11px] text-[#654735] mt-1 font-sans">{challenge.data.workedExample}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 bg-white p-3 rounded-lg border border-[#654735]/30">
                <label className="text-xs font-bold text-[#302820]">Select Matching UTC Time:</label>
                {challenge.data.optionsUTC.map((opt: any) => (
                  <label key={opt.id} className="flex items-center gap-2 text-xs text-[#302820] cursor-pointer">
                    <input
                      type="radio"
                      name="utc-choice"
                      value={opt.id}
                      checked={timestampChoice.utc === opt.id}
                      onChange={() => setTimestampChoice({ ...timestampChoice, utc: opt.id })}
                      disabled={isCompleted}
                      className="accent-[#515b3a]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-2 bg-white p-3 rounded-lg border border-[#654735]/30">
                <label className="text-xs font-bold text-[#302820]">Select Matching IST Time (UTC+05:30):</label>
                {challenge.data.optionsIST.map((opt: any) => (
                  <label key={opt.id} className="flex items-center gap-2 text-xs text-[#302820] cursor-pointer">
                    <input
                      type="radio"
                      name="ist-choice"
                      value={opt.id}
                      checked={timestampChoice.ist === opt.id}
                      onChange={() => setTimestampChoice({ ...timestampChoice, ist: opt.id })}
                      disabled={isCompleted}
                      className="accent-[#515b3a]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. Chronological Ordering */}
        {challenge.type === 'ordering' && (
          <div className="space-y-2.5">
            <span className="text-xs text-[#654735] font-semibold block">
              Arrange the 5 events from earliest (top) to latest (bottom) using the arrows:
            </span>
            {orderedItems.map((itemId, idx) => {
              const eventObj = challenge.data.events.find((e: any) => e.id === itemId);
              return (
                <div
                  key={itemId}
                  className="flex items-center justify-between p-3.5 bg-white border-2 border-[#654735]/30 rounded-xl text-xs text-[#302820] shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#515b3a] text-[#f3e9d2] flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{eventObj?.text}</span>
                  </div>

                  {!isCompleted && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => moveOrderItem(idx, 'up')}
                        disabled={idx === 0}
                        className="px-2.5 py-1 bg-[#e5d5b7] hover:bg-[#d8c5a1] disabled:opacity-30 rounded-md text-xs font-bold cursor-pointer"
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveOrderItem(idx, 'down')}
                        disabled={idx === orderedItems.length - 1}
                        className="px-2.5 py-1 bg-[#e5d5b7] hover:bg-[#d8c5a1] disabled:opacity-30 rounded-md text-xs font-bold cursor-pointer"
                        title="Move Down"
                      >
                        ▼
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 8. Network-Filter */}
        {challenge.type === 'network-filter' && (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-[#654735]/30 rounded-xl bg-white shadow-xs">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#515b3a] text-[#f3e9d2]">
                  <tr>
                    <th className="p-2.5">Time</th>
                    <th className="p-2.5">Source</th>
                    <th className="p-2.5">Destination</th>
                    <th className="p-2.5">Protocol</th>
                    <th className="p-2.5">Port</th>
                    <th className="p-2.5">Volume</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#654735]/20">
                  {challenge.data.sessions.map((s: any) => (
                    <tr key={s.id} className={s.status === 'EXFILTRATION' ? 'bg-red-50 text-red-900 font-bold' : ''}>
                      <td className="p-2.5 text-[#515b3a]">{s.time}</td>
                      <td className="p-2.5">{s.src}</td>
                      <td className="p-2.5 font-bold text-[#9b2c2c]">{s.dst}</td>
                      <td className="p-2.5">{s.proto}</td>
                      <td className="p-2.5 text-[#c5a253] font-bold">{s.port}</td>
                      <td className="p-2.5 font-bold">{s.bytes}</td>
                      <td className="p-2.5 text-[10px] uppercase font-bold">{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {challenge.data.questions.map((q: any) => (
              <div key={q.id} className="space-y-2 bg-white p-4 rounded-xl border border-[#654735]/30 shadow-xs">
                <label className="text-xs font-bold text-[#302820]">{q.prompt}</label>
                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt: any) => (
                    <label key={opt.id} className="flex items-center gap-2.5 text-xs text-[#302820] cursor-pointer">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.id}
                        checked={networkAnswers[q.id] === opt.id}
                        onChange={() => setNetworkAnswers({ ...networkAnswers, [q.id]: opt.id })}
                        disabled={isCompleted}
                        className="accent-[#515b3a]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 9. Correlation / Report */}
        {(challenge.type === 'correlation' || challenge.type === 'report') && (
          <div className="bg-[#e5d5b7] p-5 rounded-xl border border-[#654735]/30 space-y-2 text-xs text-[#302820]">
            <p className="leading-relaxed">
              Review your findings across all 4 levels. Confirm your cross-evidence links on the Case Board and certify the official report!
            </p>
          </div>
        )}
      </div>

      {/* Result & Feedback Alerts */}
      {lastResult && (
        <div
          className={`p-4 rounded-xl border-2 flex items-start gap-3 shadow-sm ${
            lastResult.success
              ? 'bg-[#515b3a]/15 border-[#515b3a] text-[#302820]'
              : 'bg-red-50 border-red-500 text-red-950'
          }`}
        >
          {lastResult.success ? (
            <CheckCircle className="w-5 h-5 text-[#515b3a] shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="text-xs leading-relaxed">
            <span className="font-bold block text-sm mb-1">
              {lastResult.success ? 'EVIDENTIARY VALIDATION SUCCESS' : 'FORENSIC INCONSISTENCY FLAGGED'}
            </span>
            {lastResult.feedback}
          </div>
        </div>
      )}

      {/* Action Submit Button (Clean buttons) */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleSubmit}
          disabled={isCompleted}
          className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-md ${
            isCompleted
              ? 'bg-[#515b3a] text-[#f3e9d2] cursor-default'
              : 'bg-[#515b3a] hover:bg-[#302820] text-[#f3e9d2] hover:text-[#c5a253]'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4 text-[#c5a253]" /> Solved & Verified
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Submit Clue Answer
            </>
          )}
        </button>

        {isCompleted && onSuccessNext && (
          <button
            onClick={onSuccessNext}
            className="px-5 py-2.5 bg-[#302820] hover:bg-[#654735] text-[#f3e9d2] hover:text-[#c5a253] text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-sm"
          >
            <span>Next Detective Task</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
