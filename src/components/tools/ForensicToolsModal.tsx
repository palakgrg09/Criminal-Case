import React, { useState } from 'react';
import {
  X,
  Hash,
  Clock,
  Globe,
  ListOrdered,
  FileCheck,
  Search,
  Network,
  Binary,
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { DetectiveEmblem } from '../common/VintageStickers';

interface ForensicToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTool?: string;
}

export const ForensicToolsModal: React.FC<ForensicToolsModalProps> = ({
  isOpen,
  onClose,
  defaultTool = 'hash-compare'
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTool);

  const [hashInputA, setHashInputA] = useState('');
  const [hashInputB, setHashInputB] = useState('');
  const [hashResult, setHashResult] = useState<'match' | 'mismatch' | null>(null);

  const [unixInput, setUnixInput] = useState('1735689600');
  const [utcOutput, setUtcOutput] = useState('2025-01-01 00:00:00 UTC');
  const [istOutput, setIstOutput] = useState('2025-01-01 05:30:00 IST');

  const [logFilterQuery, setLogFilterQuery] = useState('');
  const [logFilterUser, setLogFilterUser] = useState('ALL');

  if (!isOpen) return null;

  const handleCompareHashes = () => {
    const a = hashInputA.trim().toLowerCase();
    const b = hashInputB.trim().toLowerCase();
    if (!a || !b) {
      setHashResult(null);
      return;
    }
    setHashResult(a === b ? 'match' : 'mismatch');
  };

  const handleConvertTimestamp = (val: string) => {
    setUnixInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      const date = new Date(num * 1000);
      setUtcOutput(date.toUTCString().replace('GMT', 'UTC'));

      const istTime = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
      setIstOutput(
        istTime.toISOString().replace('T', ' ').substring(0, 19) + ' IST (UTC+05:30)'
      );
    } else {
      setUtcOutput('Invalid Unix timestamp');
      setIstOutput('Invalid Unix timestamp');
    }
  };

  const sampleLogs = [
    { time: '15:15:00 UTC (20:45 IST)', user: 'ereed', level: 'AUTH', msg: 'session opened for user ereed by uid=0' },
    { time: '15:30:10 UTC (21:00 IST)', user: 'ereed', level: 'WARN', msg: 'sudo: auth failure for /usr/bin/cat /etc/shadow' },
    { time: '18:00:00 UTC (23:30 IST)', user: 'kernel', level: 'INFO', msg: 'usb 2-1: SanDisk Extreme Pro (SN: AA0101250099412) attached' },
    { time: '18:02:15 UTC (23:32 IST)', user: 'ereed', level: 'AUTH', msg: 'Session 4 logged out. User ereed' },
    { time: '18:10:14 UTC (23:40 IST)', user: 'network', level: 'NET', msg: 'Outbound TCP connection to 203.0.113.88:8443' },
    { time: '18:12:00 UTC (23:42 IST)', user: 'avale', level: 'FS', msg: 'Inode 1441892 (project_elysium.zip) unlinked' },
    { time: '18:14:48 UTC (23:44 IST)', user: 'network', level: 'NET', msg: '47.1 MB payload transferred to 203.0.113.88' },
    { time: '18:15:00 UTC (23:45 IST)', user: 'kernel', level: 'INFO', msg: 'usb 2-1: USB disconnect, device number 4' }
  ];

  const filteredLogs = sampleLogs.filter(log => {
    const matchesUser = logFilterUser === 'ALL' || log.user === logFilterUser;
    const matchesQuery =
      log.msg.toLowerCase().includes(logFilterQuery.toLowerCase()) ||
      log.time.toLowerCase().includes(logFilterQuery.toLowerCase());
    return matchesUser && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#f3e9d2] border-4 border-[#654735] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#302820]">
        {/* Header (Forest Olive with Old Ivory) */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#515b3a] border-b-2 border-[#302820] text-[#f3e9d2]">
          <div className="flex items-center space-x-3">
            <DetectiveEmblem size={32} />
            <div>
              <h2 className="text-xl font-bold font-serif text-[#f3e9d2] tracking-wide">
                FORENSIC INVESTIGATION WORKBENCH
              </h2>
              <p className="text-xs text-[#e5d5b7] font-medium">
                8 Certified Forensic Analysis Instruments
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#e5d5b7] hover:text-white rounded-lg transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b-2 border-[#654735]/30 bg-[#e5d5b7] px-4 gap-1">
          {[
            { id: 'hash-compare', label: '1. Hash Comparator', icon: Hash },
            { id: 'timestamp-converter', label: '2. Timestamp Converter', icon: Clock },
            { id: 'utc-ist-ref', label: '3. UTC / IST Reference', icon: Globe },
            { id: 'timeline-builder', label: '4. Timeline Matrix', icon: ListOrdered },
            { id: 'evidence-integrity', label: '5. Integrity Viewer', icon: FileCheck },
            { id: 'log-sandbox', label: '6. Log Analysis Sandbox', icon: Search },
            { id: 'packet-viewer', label: '7. Network Packet Viewer', icon: Network },
            { id: 'magic-signatures', label: '8. File Signatures Table', icon: Binary }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-2.5 text-xs font-bold transition border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#515b3a] text-[#515b3a] bg-[#f3e9d2]'
                    : 'border-transparent text-[#654735] hover:text-[#302820] hover:bg-[#d8c5a1]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#515b3a]' : 'text-[#654735]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#fcfaf4] text-[#2c221a]">
          {/* TOOL 1: Hash Comparison Tool */}
          {activeTab === 'hash-compare' && (
            <div className="space-y-6">
              <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                <h3 className="text-base font-bold font-serif text-[#2c221a] mb-1 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-[#8b2635]" /> Cryptographic Hash Verification Instrument
                </h3>
                <p className="text-xs text-[#5c4a3a]">
                  Hashes are like digital fingerprints. If even 1 letter or pixel changes, the entire SHA-256 hash becomes completely different!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#786452]">
                    Digest A (Recorded / Register Hash)
                  </label>
                  <textarea
                    rows={3}
                    value={hashInputA}
                    onChange={e => setHashInputA(e.target.value)}
                    placeholder="Paste recorded SHA-256..."
                    className="w-full bg-white border-2 border-[#dfd2bc] rounded-xl p-3 font-mono text-xs text-[#2b6cb0] focus:outline-none focus:border-[#8b2635]"
                  />
                  <button
                    onClick={() => setHashInputA('a4f9c83b2e71d4e09f58321cba770e2f9812456bc3de01289fedc456a1234567')}
                    className="text-xs text-[#8b2635] font-bold hover:underline"
                  >
                    Load CCTV Register Hash (Level 1)
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#786452]">
                    Digest B (Observed / Current Video Hash)
                  </label>
                  <textarea
                    rows={3}
                    value={hashInputB}
                    onChange={e => setHashInputB(e.target.value)}
                    placeholder="Paste observed SHA-256..."
                    className="w-full bg-white border-2 border-[#dfd2bc] rounded-xl p-3 font-mono text-xs text-[#8b2635] focus:outline-none focus:border-[#8b2635]"
                  />
                  <button
                    onClick={() => setHashInputB('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')}
                    className="text-xs text-[#8b2635] font-bold hover:underline"
                  >
                    Load Observed CCTV File Hash
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCompareHashes}
                  className="px-5 py-2.5 bg-[#8b2635] hover:bg-[#a83244] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  Compare Hashes
                </button>
                <button
                  onClick={() => {
                    setHashInputA('');
                    setHashInputB('');
                    setHashResult(null);
                  }}
                  className="px-4 py-2.5 bg-[#ede2cb] hover:bg-[#dfd2bc] text-[#2c221a] text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Clear Fields
                </button>
              </div>

              {hashResult && (
                <div
                  className={`p-4 rounded-xl border-2 flex items-start gap-3 ${
                    hashResult === 'match'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                      : 'bg-red-50 border-red-500 text-red-950'
                  }`}
                >
                  {hashResult === 'match' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm">
                      {hashResult === 'match'
                        ? '100% CRYPTOGRAPHIC MATCH CONFIRMED'
                        : 'HASH MISMATCH DETECTED (INTEGRITY COMPROMISED)'}
                    </h4>
                    <p className="text-xs mt-1 leading-relaxed">
                      {hashResult === 'match'
                        ? 'Both digests are identical bit-for-bit. The evidence has maintained verified integrity since acquisition.'
                        : 'The observed digest diverges from the evidence register. The file has been modified, corrupted, truncated, or replaced.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOOL 2: Timestamp Converter */}
          {activeTab === 'timestamp-converter' && (
            <div className="space-y-6">
              <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                <h3 className="text-base font-bold font-serif text-[#2c221a] mb-1 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#2b6cb0]" /> Unix Epoch to UTC & Local Time Converter
                </h3>
                <p className="text-xs text-[#5c4a3a]">
                  Converts raw Unix timestamps (seconds since 1970) into standardized UTC and Indian Standard Time (IST = UTC+05:30).
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#dfd2bc] space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2c221a]">Worked Reference Example:</span>
                  <button
                    onClick={() => handleConvertTimestamp('1735689600')}
                    className="text-xs text-[#8b2635] font-bold hover:underline"
                  >
                    Load Worked Reference (1735689600)
                  </button>
                </div>
                <p className="text-xs font-mono text-[#5c4a3a]">
                  Epoch 1735689600 = 2025-01-01 00:00:00 UTC = 2025-01-01 05:30:00 IST
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#786452]">
                  Enter Unix Epoch Seconds
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={unixInput}
                    onChange={e => handleConvertTimestamp(e.target.value)}
                    className="flex-1 bg-white border-2 border-[#dfd2bc] rounded-xl px-3.5 py-2.5 font-mono text-sm text-[#2c221a] focus:outline-none focus:border-[#8b2635]"
                    placeholder="e.g. 1735754400"
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => handleConvertTimestamp('1735754400')}
                    className="text-xs font-bold bg-[#ede2cb] hover:bg-[#dfd2bc] px-3 py-1.5 rounded-lg border border-[#d9ccb6]"
                  >
                    USB Insert (1735754400)
                  </button>
                  <button
                    onClick={() => handleConvertTimestamp('1735755120')}
                    className="text-xs font-bold bg-[#ede2cb] hover:bg-[#dfd2bc] px-3 py-1.5 rounded-lg border border-[#d9ccb6]"
                  >
                    Archive Deletion (1735755120)
                  </button>
                  <button
                    onClick={() => handleConvertTimestamp('1735755300')}
                    className="text-xs font-bold bg-[#ede2cb] hover:bg-[#dfd2bc] px-3 py-1.5 rounded-lg border border-[#d9ccb6]"
                  >
                    USB Remove (1735755300)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#786452]">
                    Normalized Coordinated Universal Time (UTC)
                  </span>
                  <div className="text-base font-mono font-bold text-[#2b6cb0] mt-1">{utcOutput}</div>
                </div>

                <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#786452]">
                    Normalized Indian Standard Time (IST = UTC+05:30)
                  </span>
                  <div className="text-base font-mono font-bold text-emerald-700 mt-1">{istOutput}</div>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 3: UTC / IST Reference */}
          {activeTab === 'utc-ist-ref' && (
            <div className="space-y-6">
              <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                <h3 className="text-base font-bold font-serif text-[#2c221a] mb-1 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-700" /> Time Zone Cheat Sheet (UTC vs. IST)
                </h3>
                <p className="text-xs text-[#5c4a3a]">
                  Indian Standard Time (IST) is always UTC + 5 hours and 30 minutes!
                </p>
              </div>

              <div className="overflow-x-auto border-2 border-[#dfd2bc] rounded-xl bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#ede2cb] text-[#2c221a] uppercase font-mono font-bold">
                    <tr>
                      <th className="p-3 border-b border-[#dfd2bc]">Event Description</th>
                      <th className="p-3 border-b border-[#dfd2bc]">UTC Timestamp</th>
                      <th className="p-3 border-b border-[#dfd2bc]">Local IST (+05:30)</th>
                      <th className="p-3 border-b border-[#dfd2bc]">Case Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfd2bc] font-mono">
                    <tr className="hover:bg-[#fbf7ee]">
                      <td className="p-3 text-[#2c221a] font-sans font-bold">Reed Claimed Departure</td>
                      <td className="p-3 text-[#2b6cb0]">15:30:00 UTC</td>
                      <td className="p-3 text-amber-800 font-bold">21:00:00 IST</td>
                      <td className="p-3 text-[#5c4a3a] font-sans">Sworn alibi (disproven)</td>
                    </tr>
                    <tr className="hover:bg-[#fbf7ee]">
                      <td className="p-3 text-[#2c221a] font-sans font-bold">SanDisk USB Plugged In</td>
                      <td className="p-3 text-[#2b6cb0]">18:00:00 UTC</td>
                      <td className="p-3 text-emerald-800 font-bold">23:30:00 IST</td>
                      <td className="p-3 text-[#5c4a3a] font-sans">Physical device connected to WS-04</td>
                    </tr>
                    <tr className="hover:bg-[#fbf7ee]">
                      <td className="p-3 text-[#2c221a] font-sans font-bold">Reed Account Logout</td>
                      <td className="p-3 text-[#2b6cb0]">18:02:15 UTC</td>
                      <td className="p-3 text-emerald-800 font-bold">23:32:15 IST</td>
                      <td className="p-3 text-[#5c4a3a] font-sans">WS-04 session active 2.5 hrs after alibi</td>
                    </tr>
                    <tr className="hover:bg-[#fbf7ee]">
                      <td className="p-3 text-[#2c221a] font-sans font-bold">Outbound Exfiltration</td>
                      <td className="p-3 text-[#2b6cb0]">18:10:14 UTC</td>
                      <td className="p-3 text-emerald-800 font-bold">23:40:14 IST</td>
                      <td className="p-3 text-[#5c4a3a] font-sans">47.1 MB sent to 203.0.113.88:8443</td>
                    </tr>
                    <tr className="hover:bg-[#fbf7ee]">
                      <td className="p-3 text-[#2c221a] font-sans font-bold">Archive Inode Deleted</td>
                      <td className="p-3 text-[#2b6cb0]">18:12:00 UTC</td>
                      <td className="p-3 text-emerald-800 font-bold">23:42:00 IST</td>
                      <td className="p-3 text-[#5c4a3a] font-sans">project_elysium.zip deleted from disk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TOOL 4: Timeline Matrix */}
          {activeTab === 'timeline-builder' && (
            <div className="space-y-4">
              <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                <h3 className="text-base font-bold font-serif text-[#2c221a] mb-1 flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-[#8b2635]" /> Reconstructed Event Sequence
                </h3>
                <p className="text-xs text-[#5c4a3a]">
                  Reconstruction of events during the critical 30-minute breach window.
                </p>
              </div>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#8b2635]">
                {[
                  { time: '21:00:00 IST', title: 'Claimed Departure', desc: 'Elias Reed states he departed the building. No camera corroboration exists due to export mismatch.', tag: 'Alibi' },
                  { time: '23:30:00 IST', title: 'SanDisk USB Inserted', desc: 'Kernel dmesg log: Vendor 0781, Product 5588 attached to USB port.', tag: 'Hardware' },
                  { time: '23:32:15 IST', title: 'Session 4 Logged Out', desc: 'Local session for user ereed formally logs out via lightdm on console.', tag: 'Auth' },
                  { time: '23:40:14 IST', title: 'TLS Data Exfiltration', desc: 'Workstation establishes direct TLS 1.3 socket to 203.0.113.88:8443.', tag: 'Network' },
                  { time: '23:42:00 IST', title: 'Archive Deleted', desc: 'project_elysium.zip unlinked from directory index under Dr. Vale session.', tag: 'File System' },
                  { time: '23:45:00 IST', title: 'USB Removed', desc: 'SanDisk USB unplugged and kicked under workstation desk seam.', tag: 'Hardware' }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#8b2635] border-2 border-white" />
                    <div className="bg-white p-3.5 rounded-xl border border-[#dfd2bc] shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#8b2635]">{item.time}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-[#ede2cb] rounded text-[#2c221a] uppercase font-bold">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#2c221a] mt-1">{item.title}</h4>
                      <p className="text-xs text-[#5c4a3a] mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOOL 5: Evidence Integrity Viewer */}
          {activeTab === 'evidence-integrity' && (
            <div className="space-y-4">
              <div className="bg-[#e5d5b7] p-4 rounded-xl border border-[#654735]/30">
                <h3 className="text-base font-bold font-serif text-[#302820] mb-1 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#515b3a]" /> Evidence Cryptographic Integrity Registry
                </h3>
                <p className="text-xs text-[#5c4a3a]">
                  Status of all digital artifacts impounded during the Vault B-04 case.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'EV-01', name: 'Workstation NVMe Disk Image (ws04_disk.raw)', hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', status: 'VERIFIED', notes: 'Pre- & post-acquisition hashes match. Acquired via forensic write-blocker.' },
                  { id: 'EV-02', name: 'Corridor CCTV Video Export (CAM_B04.mp4)', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', status: 'MISMATCH', notes: 'Observed hash differs from evidence receipt (a4f9c83b...). Evidence altered or substituted.' },
                  { id: 'EV-03', name: 'SanDisk Extreme Pro 64GB USB (EV-USB-UNKNOWN)', hash: '4b92c1098dfa931084201cd9812401f892019481902481029481092841029481', status: 'VERIFIED', notes: 'Bit-stream image extracted via forensic bridge.' },
                  { id: 'EV-04', name: 'Carved Research Archive (recovered_archive.zip)', hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', status: 'VERIFIED', notes: 'ZIP header integrity intact (50 4B 03 04).' }
                ].map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-[#dfd2bc] shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#2c221a]">{item.id}: {item.name}</span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                          item.status === 'VERIFIED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-red-100 text-red-800 border border-red-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-mono text-[#2b6cb0] break-all bg-[#f8f2e4] p-2 rounded-lg">
                      SHA-256: {item.hash}
                    </div>
                    <p className="text-xs text-[#5c4a3a] mt-2">{item.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOOL 6: Searchable Log Analysis Sandbox */}
          {activeTab === 'log-sandbox' && (
            <div className="space-y-4">
              <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                <h3 className="text-base font-bold font-serif text-[#2c221a] mb-1 flex items-center gap-2">
                  <Search className="w-5 h-5 text-amber-700" /> Log Analysis Sandbox
                </h3>
                <p className="text-xs text-[#5c4a3a]">
                  Query and filter syslog, auth, and kernel events.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-2">
                  <input
                    type="text"
                    value={logFilterQuery}
                    onChange={e => setLogFilterQuery(e.target.value)}
                    placeholder="Search keywords (e.g. 'ereed', 'usb', 'logout')..."
                    className="w-full bg-white border-2 border-[#dfd2bc] rounded-xl px-3.5 py-2 text-xs text-[#2c221a] focus:outline-none focus:border-[#8b2635]"
                  />
                </div>
                <div>
                  <select
                    value={logFilterUser}
                    onChange={e => setLogFilterUser(e.target.value)}
                    className="w-full bg-white border-2 border-[#dfd2bc] rounded-xl px-3 py-2 text-xs text-[#2c221a] focus:outline-none"
                  >
                    <option value="ALL">All Event Sources</option>
                    <option value="ereed">User: ereed</option>
                    <option value="avale">User: avale</option>
                    <option value="kernel">Kernel / udev</option>
                    <option value="network">Network Subsystem</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-[#dfd2bc] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#ede2cb] text-[#2c221a] border-b border-[#dfd2bc]">
                    <tr>
                      <th className="p-2.5">Normalized Timestamp</th>
                      <th className="p-2.5">Source</th>
                      <th className="p-2.5">Severity</th>
                      <th className="p-2.5">Log Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfd2bc]">
                    {filteredLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-[#fbf7ee]">
                        <td className="p-2.5 text-[#2b6cb0] whitespace-nowrap">{log.time}</td>
                        <td className="p-2.5 text-[#8b2635] font-bold">{log.user}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              log.level === 'WARN'
                                ? 'bg-amber-100 text-amber-800'
                                : log.level === 'NET'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {log.level}
                          </span>
                        </td>
                        <td className="p-2.5 text-[#2c221a]">{log.msg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TOOL 7: Simulated Network Packet Viewer */}
          {activeTab === 'packet-viewer' && (
            <div className="space-y-4">
              <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                <h3 className="text-base font-bold font-serif text-[#2c221a] mb-1 flex items-center gap-2">
                  <Network className="w-5 h-5 text-indigo-700" /> Network Packet Capture Stream (`tshark`)
                </h3>
                <p className="text-xs text-[#5c4a3a]">
                  Packets recorded during Dr. Vale's disappearance.
                </p>
              </div>

              <div className="overflow-x-auto border-2 border-[#dfd2bc] rounded-xl bg-white shadow-xs">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#ede2cb] text-[#2c221a] uppercase font-bold">
                    <tr>
                      <th className="p-2.5">No.</th>
                      <th className="p-2.5">Time (UTC)</th>
                      <th className="p-2.5">Source IP:Port</th>
                      <th className="p-2.5">Destination IP:Port</th>
                      <th className="p-2.5">Protocol</th>
                      <th className="p-2.5">Volume</th>
                      <th className="p-2.5">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfd2bc]">
                    <tr className="hover:bg-[#fbf7ee]">
                      <td className="p-2.5 text-[#786452]">1002</td>
                      <td className="p-2.5 text-[#2b6cb0]">18:05:12</td>
                      <td className="p-2.5">192.168.10.45:51420</td>
                      <td className="p-2.5">192.168.10.1:53</td>
                      <td className="p-2.5 text-emerald-700 font-bold">DNS</td>
                      <td className="p-2.5">128 B</td>
                      <td className="p-2.5 text-[#5c4a3a] font-sans">Query shadow.vault-relay.ch &rarr; 203.0.113.88</td>
                    </tr>
                    <tr className="bg-red-50 text-red-950 font-bold">
                      <td className="p-2.5 text-red-800">1044</td>
                      <td className="p-2.5 text-[#2b6cb0]">18:10:14</td>
                      <td className="p-2.5">192.168.10.45:49822</td>
                      <td className="p-2.5 text-[#8b2635] font-black">203.0.113.88:8443</td>
                      <td className="p-2.5 text-[#8b2635]">TLS 1.3</td>
                      <td className="p-2.5">47.1 MB</td>
                      <td className="p-2.5 text-red-800 font-sans">HIGH VOLUME OUTBOUND EXFILTRATION STREAM</td>
                    </tr>
                    <tr className="hover:bg-[#fbf7ee]">
                      <td className="p-2.5 text-[#786452]">1390</td>
                      <td className="p-2.5 text-[#2b6cb0]">18:15:30</td>
                      <td className="p-2.5">192.168.10.45:123</td>
                      <td className="p-2.5">172.16.0.12:123</td>
                      <td className="p-2.5 text-indigo-700 font-bold">NTP</td>
                      <td className="p-2.5">96 B</td>
                      <td className="p-2.5 text-[#5c4a3a] font-sans">Internal clock sync</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TOOL 8: File Signature Reference */}
          {activeTab === 'magic-signatures' && (
            <div className="space-y-4">
              <div className="bg-[#f7efe0] p-4 rounded-xl border border-[#dfd2bc]">
                <h3 className="text-base font-bold font-serif text-[#2c221a] mb-1 flex items-center gap-2">
                  <Binary className="w-5 h-5 text-amber-800" /> Magic Byte File Signature Catalog
                </h3>
                <p className="text-xs text-[#5c4a3a]">
                  Files have internal headers that tell their genuine type, no matter how they are renamed!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { format: 'PKZIP Archive (.zip)', hex: '50 4B 03 04', ascii: 'PK..', notes: 'Matches sample.bin and carved archive!' },
                  { format: 'JPEG Image (.jpg)', hex: 'FF D8 FF E0 / E1', ascii: 'ÿØÿà', notes: 'Standard image files' },
                  { format: 'PDF Document (.pdf)', hex: '25 50 44 46', ascii: '%PDF', notes: 'Standard Adobe documents' },
                  { format: 'Linux Executable (ELF)', hex: '7F 45 4C 46', ascii: '.ELF', notes: 'Compiled software utilities' }
                ].map((sig, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#dfd2bc] shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#2c221a]">{sig.format}</span>
                      <span className="font-mono text-[11px] text-emerald-700 font-bold">{sig.ascii}</span>
                    </div>
                    <div className="mt-1 font-mono text-xs text-[#8b2635] bg-[#f8f2e4] px-2 py-1 rounded-md font-bold">
                      {sig.hex}
                    </div>
                    <p className="text-[11px] text-[#5c4a3a] mt-1">{sig.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#f4ebd7] border-t-2 border-[#dfd2bc] flex justify-between items-center text-xs">
          <span className="text-[#786452] font-mono">Criminal Case Forensic Tools v2.0</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8b2635] hover:bg-[#a83244] text-white font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            Return to Case
          </button>
        </div>
      </div>
    </div>
  );
};
