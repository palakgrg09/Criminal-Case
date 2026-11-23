export interface TerminalCommandResponse {
  output: string;
  error?: boolean;
  linkArticleId?: string;
}

export const SIMULATED_FILESYSTEM: Record<string, string> = {
  'incident_report.txt': `BLACKTHORN LAB RESTRICTED INCIDENT REPORT: CASE #BT-2025-0881
Reported: 2025-01-01 23:55:00 IST
Subject: Dr. Adrian Vale - Absence & Possible Asset Compromise
Status: Active Forensics Investigation
Note: Monitor post-it left by Vale: "Every action leaves a trace. Find the first trace, and you will understand the last."`,

  'evidence/cctv_export.mp4': `[BINARY STREAM: CAM_B04_20250101_2300_2355.mp4]
Container: MP4 Video (H.264/AAC)
Current SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Expected SHA-256: a4f9c83b2e71d4e09f58321cba770e2f9812456bc3de01289fedc456a1234567
Integrity: CRYPTOGRAPHIC HASH MISMATCH DETECTED.`,

  'evidence/sample.bin': `[RAW BYTES] Offset 0000: 50 4B 03 04 14 00 00 00 08 00 5C 8E 7A 59 12 34
ASCII Header: PK..
True Format: PKZIP compressed archive (Magic bytes: 50 4B 03 04).`,

  'evidence/project_elysium.zip': `[DELETED INODE 1441892]
Original Path: /home/avale/research/archive_staging/project_elysium.zip
Status: Flagged UNALLOCATED in EXT4 inode table.
Carved Size: 47,431,680 bytes (45.2 MB)
Deletion Unix Epoch: 1735755120 (2025-01-01 18:12:00 UTC / 23:42:00 IST)
Embedded Metadata Note: "Check the time before trusting the story."`,

  'evidence/recovered_archive.zip': `[FORENSIC CARVED ARTIFACT]
Source: Inode 1441892 unallocated data blocks
SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
Content: Encrypted research databases, cryptographic key material, and sensor telemetry.`,

  'logs/system.log': `2025-01-01T15:15:00Z bt-ws04 auth: Session opened for user ereed
2025-01-01T15:30:10Z bt-ws04 sudo: ereed: authentication failure for /etc/shadow
2025-01-01T18:00:00Z bt-ws04 kernel: usb 2-1: new SuperSpeed USB device found: SanDisk Extreme Pro (SN: AA0101250099412)
2025-01-01T18:02:15Z bt-ws04 auth: Session 4 logged out. User ereed
2025-01-01T18:10:14Z bt-ws04 net: TCP connection established to 203.0.113.88:8443
2025-01-01T18:12:00Z bt-ws04 fs: Inode 1441892 unlinked by process 4819 (user avale)
2025-01-01T18:14:48Z bt-ws04 net: 47,288,110 bytes sent to 203.0.113.88:8443
2025-01-01T18:15:00Z bt-ws04 kernel: usb 2-1: USB disconnect, device number 4`
};

export function executeSimulatedCommand(rawCommand: string, currentLevel: number): TerminalCommandResponse {
  const trimmed = rawCommand.trim();
  if (!trimmed) {
    return { output: '' };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  const target = args[0] ? args[0].replace(/^["']|["']$/g, '') : '';

  switch (cmd) {
    case 'help':
      return {
        output: `Available Simulated Forensic Commands:
  help                     - Display this command manual
  ls [path]                - List directory contents (e.g. ls evidence/)
  cat <file>               - Display file contents
  stat <file>              - Inspect file metadata and inode MACB timestamps
  file <file>              - Detect genuine file type via magic byte signatures
  hash <file>              - Compute SHA-256 cryptographic digest
  grep <term> <file>       - Search file or log for specific keywords
  timeline                 - Display normalized chronology of detected events
  network                  - Show active network connections & packet captures
  inspect <file>           - Deep hexadecimal & ASCII binary inspection
  recover deleted_files    - Execute SleuthKit carving on unallocated blocks
  clear                    - Clear terminal console

Tip: Click on suggested commands below or type directly. All commands run in a secure, simulated sandboxed environment.`,
        linkArticleId: 'linux-forensic-commands'
      };

    case 'ls': {
      const dir = target || '';
      if (!dir || dir === '.' || dir === '/') {
        return {
          output: `drwxr-xr-x 2 root root     4096 Jan  1 23:45 evidence/
drwxr-xr-x 2 root root     4096 Jan  1 23:30 logs/
-rw-r--r-- 1 avale avale   2048 Jan  1 23:55 incident_report.txt`
        };
      }
      if (dir.includes('evidence')) {
        return {
          output: `total 48920
-rw-r--r-- 1 root  root  38401200 Jan  1 23:58 cctv_export.mp4
-rw-r--r-- 1 avale avale    65536 Jan  1 23:40 sample.bin (disguised archive)
-rw-r--r-- 1 root  root  47431680 Jan  1 23:42 recovered_archive.zip
[Unallocated Inode 1441892: project_elysium.zip (unlinked)]`
        };
      }
      if (dir.includes('logs')) {
        return {
          output: `-rw-r--r-- 1 root root 8192 Jan  1 23:50 system.log
-rw-r----- 1 root adm  4096 Jan  1 23:32 auth.log
-rw-r--r-- 1 root root 3072 Jan  1 23:45 kern.log`
        };
      }
      return {
        output: `ls: cannot access '${dir}': No such file or directory`,
        error: true
      };
    }

    case 'cat': {
      if (!target) {
        return { output: 'cat: missing file operand', error: true };
      }
      const fileKey = Object.keys(SIMULATED_FILESYSTEM).find(k => k === target || k.endsWith(target));
      if (fileKey) {
        return { output: SIMULATED_FILESYSTEM[fileKey] };
      }
      return { output: `cat: ${target}: No such file or directory`, error: true };
    }

    case 'stat': {
      if (!target) {
        return { output: 'stat: missing operand', error: true };
      }
      if (target.includes('project_elysium') || target.includes('recovered_archive') || target.includes('1441892')) {
        return {
          output: `  File: evidence/project_elysium.zip
  Size: 47431680 bytes (45.2 MB)  Blocks: 92640  IO Block: 4096 regular file
Device: nvme0n1p2  Inode: 1441892  Links: 0 (FLAGGED UNALLOCATED / DELETED)
Access (atime): 2025-01-01 18:10:14 UTC (23:40:14 IST)
Modify (mtime): 2025-01-01 18:10:14 UTC (23:40:14 IST)
Change (ctime): 2025-01-01 18:12:00 UTC (23:42:00 IST)
Delete (dtime): 2025-01-01 18:12:00 UTC (23:42:00 IST) [Unix: 1735755120]
Attributes: Ext4 Inode unallocated, data blocks present in sector range 0x489000-0x4944FF`,
          linkArticleId: 'metadata-unix-timestamps'
        };
      }
      if (target.includes('cctv')) {
        return {
          output: `  File: evidence/cctv_export.mp4
  Size: 38401200 bytes  Blocks: 75000  regular file
Device: nvme0n1p2  Inode: 881290  Links: 1
Access: 2025-01-01 23:58:12 IST
Modify: 2025-01-01 23:58:12 IST
Note: Hash verification discrepancy flagged in system register.`
        };
      }
      return {
        output: `  File: ${target}
  Size: 2048 bytes  regular file
Device: nvme0n1p2  Inode: 772101  Links: 1
Access: 2025-01-01 23:55:00 IST`
      };
    }

    case 'file': {
      if (!target) {
        return { output: 'file: missing argument', error: true };
      }
      if (target.includes('sample') || target.includes('project_elysium') || target.includes('recovered')) {
        return {
          output: `${target}: Zip archive data, at least v2.0 to extract (Magic signature: 50 4B 03 04 "PK..")`,
          linkArticleId: 'file-signatures-hex'
        };
      }
      if (target.includes('cctv')) {
        return {
          output: `${target}: ISO Media, MP4 Base Media v1 [IS0 14496-12:2003]`
        };
      }
      if (target.includes('.txt') || target.includes('report')) {
        return {
          output: `${target}: ASCII text, with very long lines (942)`
        };
      }
      return {
        output: `${target}: data`
      };
    }

    case 'hash':
    case 'sha256sum': {
      if (!target) {
        return { output: 'hash: missing file argument', error: true };
      }
      if (target.includes('cctv')) {
        return {
          output: `SHA-256 Digest Calculation:
File: evidence/cctv_export.mp4
Computed Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Receipt Hash:  a4f9c83b2e71d4e09f58321cba770e2f9812456bc3de01289fedc456a1234567
[STATUS: INTEGRITY MISMATCH DETECTED]`,
          linkArticleId: 'hashing-integrity'
        };
      }
      if (target.includes('recovered') || target.includes('elysium') || target.includes('sample')) {
        return {
          output: `SHA-256 Digest Calculation:
File: ${target}
Computed Hash: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
Integrity: VERIFIED AGAINST RECOVERED BIT-STREAM MANIFEST`
        };
      }
      return {
        output: `SHA-256: 9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7  ${target}`
      };
    }

    case 'grep': {
      if (args.length < 1) {
        return { output: 'grep: search pattern required', error: true };
      }
      const pattern = args[0].replace(/["']/g, '').toLowerCase();
      const logContent = SIMULATED_FILESYSTEM['logs/system.log'];
      const matches = logContent
        .split('\n')
        .filter(line => line.toLowerCase().includes(pattern));

      if (matches.length > 0) {
        return { output: matches.join('\n') };
      }
      return { output: `[grep: no lines matching pattern "${pattern}"]` };
    }

    case 'timeline':
      return {
        output: `NORMALIZED FORENSIC EVENT TIMELINE:
[21:00:00 IST] Elias Reed claims departure from facility (UNVERIFIED ALIBI)
[23:30:00 IST] [18:00:00 UTC] [Epoch: 1735754400] SanDisk Extreme USB inserted (SN: AA0101250099412)
[23:32:15 IST] [18:02:15 UTC] auth.log: Session 4 logged out for user 'ereed'
[23:40:14 IST] [18:10:14 UTC] Workstation WS-04 opens outbound TLS stream to 203.0.113.88:8443
[23:42:00 IST] [18:12:00 UTC] [Epoch: 1735755120] Inode 1441892 (project_elysium.zip) unlinked by user 'avale'
[23:44:48 IST] [18:14:48 UTC] 47.1 MB transmission completed to 203.0.113.88
[23:45:00 IST] [18:15:00 UTC] [Epoch: 1735755300] SanDisk Extreme USB removed
[23:55:00 IST] Security arrives; Vault B-04 locked from inside; WS-04 left running`,
        linkArticleId: 'utc-vs-ist'
      };

    case 'network':
      return {
        output: `ACTIVE & CAPTURED NETWORK CONNECTIONS:
Prot  Source IP:Port         Destination IP:Port    State       Volume    Description
TCP   192.168.10.45:49822    203.0.113.88:8443      CLOSED      47.1 MB   TLS 1.3 Outbound (shadow.vault-relay.ch)
UDP   192.168.10.45:51420    192.168.10.1:53        SUCCESS     128 B     DNS Query for shadow.vault-relay.ch
TCP   192.168.10.45:22       192.168.10.45:52140    TIME_WAIT   4.2 KB    Internal SSH session`,
        linkArticleId: 'network-forensics-pcap'
      };

    case 'inspect': {
      return {
        output: `HEX DUMP INSPECTION: evidence/sample.bin
00000000: 50 4B 03 04 14 00 00 00  08 00 5C 8E 7A 59 12 34  PK........\\.zY.4
00000010: 56 78 90 AB CD EF 01 23  45 67 89 00 12 00 00 00  Vx.....#Eg......
Magic Bytes: 50 4B 03 04 -> Definitive PKZIP Archive Container.
Embedded Comment: "Check the time before trusting the story."`,
        linkArticleId: 'file-signatures-hex'
      };
    }

    case 'recover': {
      return {
        output: `[TSK_RECOVER / ICAT EXECUTED]
Scanning unallocated clusters on /dev/nvme0n1p2...
Found unallocated Inode 1441892:
  File name: project_elysium.zip
  Cluster chain: 0x489000 - 0x4944FF
  Bytes recovered: 47,431,680 bytes (45.2 MB)
Output saved to: evidence/recovered_archive.zip
Verification SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
SUCCESS: Archive reconstructed from raw unallocated blocks.`,
        linkArticleId: 'filesystems-deleted-recovery'
      };
    }

    case 'clear':
      return { output: '__CLEAR__' };

    default:
      return {
        output: `bash: ${cmd}: command not recognized. Type 'help' for available simulated forensic commands.`,
        error: true
      };
  }
}
