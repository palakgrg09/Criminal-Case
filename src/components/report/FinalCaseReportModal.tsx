import React, { useState } from 'react';
import { X, Printer, Award } from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { DetectiveEmblem } from '../common/VintageStickers';

interface FinalCaseReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinalCaseReportModal: React.FC<FinalCaseReportModalProps> = ({ isOpen, onClose }) => {
  const { gameState, saveReport } = useGameState();
  const [investigatorNotes, setInvestigatorNotes] = useState(
    'All four physical and digital layers have been verified. Evidence proves unauthorized console operations and outbound exfiltration; human attribution is appropriately qualified.'
  );
  const [isSigned, setIsSigned] = useState(!!gameState.reportData);

  if (!isOpen) return null;

  const handleSignReport = () => {
    setIsSigned(true);
    saveReport({
      incidentSummary: 'Unauthorized breach and archive exfiltration at Blackthorn Lab Vault B-04.',
      evidenceExamined: gameState.discoveredEvidence,
      hashObservations: 'CCTV feed integrity compromised (hash mismatch); disk and USB images verified.',
      timeline: '23:30 to 23:45 IST breach window established with normalized UTC/IST conversions.',
      fileSystemFindings: 'Inode 1441892 carved; PKZIP header (50 4B 03 04) confirmed.',
      networkFindings: '47.1 MB TLS 1.3 outbound stream to 203.0.113.88:8443.',
      connections: 'Correlated physical USB -> carved archive -> network stream -> CCTV hash alteration.',
      alternativeHypotheses: 'Evaluated Elias Reed sole perpetrator vs. secondary operator using Dr. Vale credentials.',
      limitations: 'Without untampered CCTV footage, biometric proof of physical console operator is inconclusive.',
      conclusion: investigatorNotes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#f3e9d2] text-[#302820] border-4 border-[#654735] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Dossier Header (Forest Olive with Old Ivory & Mustard) */}
        <div className="px-8 py-4 bg-[#515b3a] border-b-2 border-[#302820] flex items-center justify-between text-[#f3e9d2]">
          <div className="flex items-center space-x-3">
            <DetectiveEmblem size={34} />
            <div>
              <span className="text-xs font-serif font-black text-[#f3e9d2] tracking-wider block">
                CRIMINAL CASE OFFICIAL CLOSURE REPORT
              </span>
              <h2 className="text-xl font-serif font-black text-[#c5a253]">
                THE LAST DIGITAL TRACE
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 text-[#e5d5b7] hover:text-white rounded-lg transition cursor-pointer"
              title="Print Official Report"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-1.5 text-[#e5d5b7] hover:text-white rounded-lg transition cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs text-[#302820] font-sans">
          {/* Executive Stamp */}
          <div className="flex items-center justify-between border-b-2 border-[#654735]/20 pb-4">
            <div>
              <div className="text-[11px] font-mono uppercase text-[#654735] font-bold">Forensic Agency</div>
              <div className="font-serif font-black text-sm text-[#302820]">Blackthorn Digital Forensics Research Institute</div>
              <div className="text-[10px] text-[#654735] font-mono">Standard: ISO/IEC 27037 // NIST SP 800-86</div>
            </div>

            <div className="text-right">
              <div className="px-3 py-1 border-2 border-[#515b3a] text-[#515b3a] font-serif font-black uppercase tracking-wider rotate-1 bg-[#e5d5b7] shadow-xs">
                {isSigned ? 'OFFICIALLY CERTIFIED' : 'PENDING DETECTIVE SIGNATURE'}
              </div>
              <div className="text-[10px] font-mono text-[#654735] mt-1 font-bold">
                Rank: <span className="text-[#515b3a]">{gameState.investigatorRank}</span> ({gameState.totalScore} PTS)
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-1.5">
            <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#515b3a] border-b border-[#654735]/20 pb-1">
              1. Executive Incident Summary
            </h4>
            <p className="leading-relaxed text-[#302820]">
              At 23:47 IST on January 1, 2025, Senior Lead Researcher Dr. Adrian Vale vanished from Restricted Vault B-04. Workstation WS-04 was left operational with active terminal sessions. Preliminary dispatches accused junior researcher Elias Reed. An impartial, comprehensive digital forensic investigation was conducted to preserve volatile memory, verify cryptographic hashes, carve deleted files, normalize disparate logs, and inspect perimeter network telemetry.
            </p>
          </div>

          {/* Section 2: Evidence Analyzed & Integrity Observations */}
          <div className="space-y-1.5">
            <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#515b3a] border-b border-[#654735]/20 pb-1">
              2. Evidentiary Audit & Cryptographic Hash Observations
            </h4>
            <p className="leading-relaxed text-[#302820]">
              Cryptographic integrity auditing revealed a critical anomaly: the exported corridor surveillance video (<span className="font-mono font-bold">CAM_B04.mp4</span>) produced SHA-256 digest <span className="font-mono text-[11px] text-[#9b2c2c] font-bold">e3b0c442...</span>, diverging from Officer Danvers' evidence receipt (<span className="font-mono text-[11px] font-bold">a4f9c83b...</span>). Standalone visual records were declared compromised. Physical inspection recovered an unregistered SanDisk Extreme 64GB USB drive (<span className="font-mono font-bold">EV-USB-UNKNOWN</span>) concealed near Workstation WS-04.
            </p>
          </div>

          {/* Section 3: File System Carving & Magic Byte Inspection */}
          <div className="space-y-1.5">
            <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#515b3a] border-b border-[#654735]/20 pb-1">
              3. Storage Reconstruction & Inode Carving
            </h4>
            <p className="leading-relaxed text-[#302820]">
              Inspection of the forensic bit-stream image (<span className="font-mono">ws04_disk.raw</span>) utilizing SleuthKit utilities identified unallocated Inode 1441892 in EXT4 block range 0x489000-0x4944FF. The 45.2 MB data payload of <span className="font-mono font-bold">project_elysium.zip</span> was carved intact. Hexadecimal inspection confirmed the standard PKZIP magic byte header (<span className="font-mono font-bold">50 4B 03 04</span>) and recovered Dr. Vale's embedded message: <em>"Check the time before trusting the story."</em>
            </p>
          </div>

          {/* Section 4: Timeline Normalization (UTC vs IST) */}
          <div className="space-y-1.5">
            <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#515b3a] border-b border-[#654735]/20 pb-1">
              4. Chronological Timeline Reconstruction
            </h4>
            <div className="bg-[#e5d5b7] p-3.5 rounded-xl border border-[#654735]/30 font-mono text-[11px] space-y-1 text-[#302820]">
              <div>• 21:00:00 IST: Elias Reed claimed facility departure (Disproven by auth logs).</div>
              <div>• 23:30:00 IST (18:00 UTC): Unregistered SanDisk USB attached to WS-04 [Unix 1735754400].</div>
              <div>• 23:32:15 IST (18:02 UTC): Session 4 logged out for user 'ereed'.</div>
              <div>• 23:40:14 IST (18:10 UTC): Outbound TLS stream initiated from WS-04 to 203.0.113.88:8443.</div>
              <div>• 23:42:00 IST (18:12 UTC): Inode 1441892 unlinked under Dr. Vale's active session [Unix 1735755120].</div>
              <div>• 23:44:48 IST (18:14 UTC): 47.1 MB payload acknowledged by offshore relay server.</div>
              <div>• 23:45:00 IST (18:15 UTC): SanDisk USB disconnected and concealed.</div>
            </div>
          </div>

          {/* Section 5: Network Packet Forensics */}
          <div className="space-y-1.5">
            <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#515b3a] border-b border-[#654735]/20 pb-1">
              5. Network Exfiltration Telemetry
            </h4>
            <p className="leading-relaxed text-[#302820]">
              Perimeter switch mirror packets (<span className="font-mono">capture_vault_b04.pcap</span>) establish that 47,288,110 bytes were transferred outbound to Swiss IP <span className="font-mono font-bold text-[#515b3a]">203.0.113.88:8443</span> (<span className="font-mono">shadow.vault-relay.ch</span>) over TLS 1.3 during the precise four-minute window between archive deletion and USB removal.
            </p>
          </div>

          {/* Section 6: Locard's Exchange Principle & Synthesis */}
          <div className="space-y-1.5">
            <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#515b3a] border-b border-[#654735]/20 pb-1">
              6. Locard's Exchange Principle & Defensible Attribution
            </h4>
            <p className="leading-relaxed text-[#302820]">
              In accordance with Locard's Exchange Principle, physical interaction with the laboratory workstation generated verifiable digital artifacts across three independent domains: kernel USB logs, filesystem unallocated inode blocks, and edge network packets.
              While junior researcher Elias Reed's alibi is demonstrably false, the subsequent session actions occurred under Dr. Adrian Vale's local account. In professional digital forensics, machine logs prove <em>which terminal and accounts were manipulated</em>, but cannot establish biological identity without uncompromised biometric or video evidence.
            </p>
          </div>

          {/* Section 7: Investigator Certification */}
          <div className="bg-[#e5d5b7] p-4 rounded-xl border-2 border-[#654735]/30 space-y-3 shadow-xs">
            <h4 className="font-serif font-black text-xs uppercase tracking-wider text-[#302820]">
              Lead Forensic Examiner Formal Sign-Off:
            </h4>
            <textarea
              rows={2}
              value={investigatorNotes}
              onChange={e => setInvestigatorNotes(e.target.value)}
              disabled={isSigned}
              className="w-full bg-white border-2 border-[#654735]/30 p-2.5 font-mono text-xs text-[#302820] rounded-lg focus:outline-none"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-[#654735] font-mono">
                Digitally Sealed: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
              </span>
              {!isSigned && (
                <button
                  onClick={handleSignReport}
                  className="px-5 py-2 bg-[#515b3a] hover:bg-[#302820] text-[#f3e9d2] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                >
                  Certify & Sign Final Case Report
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-3.5 bg-[#515b3a] border-t-2 border-[#302820] flex justify-between items-center text-xs text-[#f3e9d2]">
          <span className="font-mono text-[#e5d5b7] text-[11px] font-bold">
            Criminal Case Solved // Certified Master Detective
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#c5a253] hover:bg-[#b08f42] text-[#302820] font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
