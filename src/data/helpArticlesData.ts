import { HelpArticle } from '../types/game';

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: 'fundamentals',
    title: '1. Digital Forensics Fundamentals',
    category: 'Core Concepts',
    explanation: 'Digital forensics is the branch of forensic science encompassing the identification, acquisition, preservation, examination, and analysis of data stored electronically in digital devices, in a manner suitable for presentation in a court of law.',
    whyItMatters: 'Without strict scientific methodology, digital evidence can be accidentally tainted, altered, or deemed inadmissible in legal or corporate proceedings.',
    whenUsed: 'Invoked during data breaches, cyber attacks, insider threats, intellectual property theft, and criminal incident response.',
    example: 'A first responder uses a hardware write-blocker to image an enterprise NVMe drive without altering a single bit of file access timestamps.',
    commonMistakes: [
      'Booting a suspect machine normally, which modifies thousands of temporary files, registries, and timestamps.',
      'Failing to document the environmental and physical conditions of the hardware at the time of discovery.',
      'Confusing an automated scan report with a verified forensic conclusion.'
    ],
    relatedLevels: [1, 2, 3, 4]
  },
  {
    id: 'locards-exchange-principle',
    title: "2. Locard's Exchange Principle",
    category: 'Forensic Principles',
    explanation: "Originally formulated by French criminologist Dr. Edmond Locard: 'Whenever two objects come into contact, there is an exchange of material.' In digital investigations, physical contact, network handshakes, keyboard interaction, or storage media insertion invariably leaves digital traces (logs, inodes, ARP tables, volatile cache).",
    whyItMatters: 'It is the core philosophical and practical foundation of all forensic investigation. It assures the investigator that an actor cannot interact with a system without leaving some imprint.',
    whenUsed: 'Applied at every stage of analysis, from tracking USB device insertions to cross-referencing network firewall states and file metadata.',
    example: "Inserting an unauthorized USB thumb drive transfers the drive's vendor and serial number into the operating system's udev and kernel logs, while the drive's filesystem records the host OS partition metadata.",
    commonMistakes: [
      'Assuming that because a file was deleted, all traces of the interaction have vanished.',
      'Expecting traces to always be complete or unaltered: anti-forensics techniques can suppress or alter traces, requiring cross-system correlation.',
      'Treating Locard\'s principle as proof of biological identity rather than proof of system interaction.'
    ],
    relatedLevels: [1, 2, 3, 4]
  },
  {
    id: 'preservation-chain-of-custody',
    title: '3. Evidence Preservation & Chain of Custody',
    category: 'Procedures',
    explanation: 'Chain of Custody is a chronological, unbroken legal document tracking the seizure, custody, transfer, analysis, and disposition of physical and digital evidence, aligned with standards such as ISO/IEC 27037.',
    whyItMatters: 'If the defense or audit team can demonstrate an unlogged gap in evidence handling, the entire evidentiary finding can be thrown out of court.',
    whenUsed: 'Commences the exact second evidence is encountered at a crime scene and continues through trial and final evidence disposition.',
    example: 'Evidence Bag #0914-A sealed with tamper-evident tape, initialed by Officer Danvers at 23:55 IST, transferred to Lead Investigator with dual signatures.',
    commonMistakes: [
      'Handing digital storage media to another examiner without immediate log sign-off.',
      'Storing magnetic or solid-state media without anti-static shielding.',
      'Failing to record the exact hardware serial numbers and physical discovery coordinates.'
    ],
    relatedLevels: [1, 4]
  },
  {
    id: 'hashing-integrity',
    title: '4. Hashing & Evidence Integrity',
    category: 'Cryptographic Forensics',
    explanation: 'Cryptographic hash functions (such as SHA-256 and MD5) take an arbitrary stream of input bytes and generate a deterministic, fixed-length hexadecimal digest. They possess the avalanche effect: altering even a single bit in a 100 GB disk image completely changes the resulting hash.',
    whyItMatters: 'Hashing mathematically proves that a forensic disk image or video file is a bit-for-bit, 100% authentic duplicate of the original evidence at the time of seizure.',
    whenUsed: 'Calculated immediately upon acquisition, during verification audits, and prior to introducing evidence in legal reports.',
    example: 'Pre-acquisition SHA-256 of /dev/nvme0n1: 7f83b165... Post-acquisition SHA-256 of image.raw: 7f83b165... Match confirmed.',
    commonMistakes: [
      'Assuming a hash mismatch automatically proves deliberate sabotage: disk corruption, truncation, or file transcoding can also cause mismatches.',
      'Calculating hashes using obsolete, collision-vulnerable algorithms like MD5 without secondary SHA-256 validation.',
      'Hashing a running, changing live filesystem instead of a static, write-blocked bit-stream image.'
    ],
    relatedLevels: [1, 4]
  },
  {
    id: 'disk-imaging',
    title: '5. Disk Imaging & Acquisition',
    category: 'Storage Forensics',
    explanation: 'Forensic disk acquisition involves generating an exact bit-stream duplicate (sector-by-sector copy) of a storage drive, including unallocated space, slack space, and hidden partitions, typically using hardware write-blockers and tools like `dd`, `dcfldd`, or `ewfacquire` (E01).',
    whyItMatters: 'Examiners never conduct forensic analysis on the original suspect drive. All carving, indexing, and recovery must be performed on authenticated forensic clones.',
    whenUsed: 'During initial scene triage and lab processing of hard drives, SSDs, USB drives, and flash cards.',
    example: 'Command: `dcfldd if=/dev/sdb of=/evidence/usb_image.raw hash=sha256` ensures verified bit-level acquisition with zero writes to source.',
    commonMistakes: [
      'Using drag-and-drop file copying instead of sector-by-sector disk imaging, which misses deleted files and unallocated clusters.',
      'Plugging a suspect drive directly into an OS without a write-blocker, allowing OS automount scripts to write metadata.',
      'Failing to verify the image hash against the source drive hash.'
    ],
    relatedLevels: [1, 2]
  },
  {
    id: 'filesystems-deleted-recovery',
    title: '6. File Systems & Deleted File Recovery',
    category: 'File System Forensics',
    explanation: 'Modern filesystems (EXT4, NTFS, APFS) separate file metadata (inodes, MFT records) from actual data blocks on disk. When a user deletes a file, the operating system usually just marks the inode or clusters as "unallocated" and removes the directory link. The raw data remains intact until overwritten by new files.',
    whyItMatters: 'Critical documents, exfiltrated archives, or malware binaries that perpetrators believe they erased can frequently be carved intact from unallocated space.',
    whenUsed: 'When looking for destroyed evidence, wiped logs, or hidden archives.',
    example: 'Using SleuthKit `fls -r -d` to identify unlinked Inode 1441892, followed by `icat` to dump its clusters directly to a file.',
    commonMistakes: [
      'Assuming a deleted file is gone forever.',
      'Allowing the suspect machine to keep running intensive software that overwrites unallocated sectors with new data.',
      'Claiming that carving a deleted file proves who created or deleted it without checking user session timelines.'
    ],
    relatedLevels: [2]
  },
  {
    id: 'metadata-unix-timestamps',
    title: '7. File Metadata & Unix Timestamps',
    category: 'Temporal Forensics',
    explanation: 'Unix timestamps represent the number of elapsed seconds since January 1, 1970 00:00:00 UTC (the Unix Epoch). Filesystems maintain MACB timestamps: Modified (M), Accessed (A), Changed/Metadata (C), and Birth/Creation (B). In EXT4, deleted files also record a Deletion timestamp (dtime).',
    whyItMatters: 'Timestamps provide the objective chronological sequence of file operations (when a file was created, read, or deleted).',
    whenUsed: 'Essential for constructing an investigative timeline and checking suspect alibis.',
    example: 'Unix epoch 1735755120 translates to 2025-01-01 18:12:00 UTC, pinpointing the exact second an inode was de-allocated.',
    commonMistakes: [
      'Confusing modification time (content changed) with change time (inode metadata changed).',
      'Forgetting that simply reading or copying a file can alter its access time (atime).',
      'Ignoring timestomping: where attackers deliberately spoof file timestamps using tools like `touch -t`.'
    ],
    relatedLevels: [2, 3]
  },
  {
    id: 'utc-vs-ist',
    title: '8. UTC versus IST (Time Zone Normalization)',
    category: 'Temporal Forensics',
    explanation: 'Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks. Indian Standard Time (IST) is UTC+05:30 (5 hours and 30 minutes ahead of UTC). Forensic logs, network packet captures, and cloud services typically record in UTC, whereas witness statements and CCTV recorders use local time (IST).',
    whyItMatters: 'Failing to normalize time zones can lead an investigator to believe an event occurred 5.5 hours before or after it actually did, resulting in false accusations.',
    whenUsed: 'Required whenever correlating logs from multiple servers, network devices, and local witness testimonies.',
    example: 'Event logged at 18:00:00 UTC. To convert to IST: add 5 hours and 30 minutes -> 23:30:00 IST (11:30 PM local time).',
    commonMistakes: [
      'Comparing a UTC server log directly to a local IST witness statement without conversion.',
      'Forgetting the extra 30-minute offset in timezones like IST (+05:30) or ACST (+09:30).',
      'Failing to verify whether local CCTV hardware observes daylight saving time or drift.'
    ],
    relatedLevels: [3, 4]
  },
  {
    id: 'linux-forensic-commands',
    title: '9. Linux Forensic Commands & SleuthKit',
    category: 'Command Reference',
    explanation: 'Professional forensic examiners use specialized Unix commands and open-source suites like The Sleuth Kit (TSK) to inspect filesystems without relying on suspect operating system binaries.',
    whyItMatters: 'Native commands like `ls` or file explorers rely on intact directory listings. Forensic tools bypass OS abstractions to parse raw filesystem structures directly.',
    whenUsed: 'During disk image analysis, inode inspection, file carving, and memory artifact analysis.',
    example: '`fls -r -d image.raw` lists deleted entries; `icat image.raw <inode>` carves file contents.',
    commonMistakes: [
      'Running investigative commands directly on live media with write-access enabled.',
      'Trusting file extensions instead of using the `file` command to inspect magic bytes.',
      'Neglecting to document the full command line syntax and hash outputs for evidence logs.'
    ],
    relatedLevels: [1, 2, 3]
  },
  {
    id: 'network-forensics-pcap',
    title: '10. Network Forensics & Packet Analysis',
    category: 'Network Forensics',
    explanation: 'Network forensics captures, records, and analyzes network events and raw packets (PCAP) to discover the source of security attacks, intrusions, or data exfiltration. Key attributes include 5-tuple: Source IP, Destination IP, Source Port, Destination Port, and Protocol.',
    whyItMatters: 'Storage artifacts show what was created or deleted locally; network traffic proves whether data left the physical building and where it was sent.',
    whenUsed: 'During investigation of data breaches, command-and-control (C2) communication, and remote exfiltration.',
    example: 'A packet capture shows a 47.1 MB TCP TLS 1.3 data transfer from internal workstation 192.168.10.45:49822 to external Swiss server 203.0.113.88:8443.',
    commonMistakes: [
      'Assuming that because traffic is encrypted with TLS/HTTPS, packet size and flow timing cannot be correlated with stolen files.',
      'Confusing internal RFC 1918 private IP addresses (192.168.x.x, 10.x.x.x) with publicly routable Internet IPs.',
      'Overlooking DNS query logs, which often reveal domains contacted immediately prior to direct IP connections.'
    ],
    relatedLevels: [4]
  },
  {
    id: 'log-analysis-event-reconstruction',
    title: '11. Log Analysis & Event Reconstruction',
    category: 'System Forensics',
    explanation: 'Log analysis aggregates records from operating system authentication facilities (`/var/log/auth.log`, Windows Event Logs), daemon services, and kernel rings (`dmesg`). Event reconstruction weaves these disparate logs into a unified narrative timeline.',
    whyItMatters: 'Logs provide an audit trail of authenticated user logins, privilege escalation attempts (`sudo`), and device connections.',
    whenUsed: 'Employed to verify alibis, determine intrusion entry vectors, and identify lateral movement.',
    example: 'Authentication log reveals user `ereed` logged in at 15:15 UTC, failed sudo at 15:30 UTC, and logged out at 18:02 UTC (23:32 IST).',
    commonMistakes: [
      'Assuming that a username in a log proves that specific human was sitting in front of the keyboard.',
      'Failing to verify whether log timestamps were altered or cleared by an attacker with root privileges.',
      'Analyzing logs in isolation without cross-referencing network connections and hardware events.'
    ],
    relatedLevels: [3, 4]
  },
  {
    id: 'file-signatures-hex',
    title: '12. File Signatures & Hexadecimal Inspection',
    category: 'Binary Analysis',
    explanation: 'File signatures, colloquially known as "magic numbers" or "magic bytes", are fixed hexadecimal byte sequences located at the very start of a file header that declare its true format, independent of the file extension.',
    whyItMatters: 'Malicious actors frequently disguise executable payloads or stolen ZIP archives as innocent `.jpg` or `.txt` files to evade detection and basic file filters.',
    whenUsed: 'Used when verifying unknown files, carving corrupted media, and detecting malware evasion tactics.',
    example: '`50 4B 03 04` in the first 4 bytes identifies a PKZIP archive, regardless of whether the file is named `report.docx` or `vacation.jpg`.',
    commonMistakes: [
      'Relying on Windows or macOS default file extension associations to determine file safety or type.',
      'Failing to inspect the file trailer/footer (e.g., `FF D9` for JPEGs) to verify whether the file is complete or truncated.',
      'Confusing ASCII character representations with raw hexadecimal values.'
    ],
    relatedLevels: [2]
  },
  {
    id: 'evidence-correlation-hypotheses',
    title: '13. Evidence Correlation & Competing Hypotheses',
    category: 'Forensic Methodology',
    explanation: 'Analysis of Competing Hypotheses (ACH) is an unbiased forensic methodology where the examiner evaluates all plausible theories against the totality of collected evidence, deliberately seeking evidence that disproves hypotheses rather than merely seeking confirmatory clues.',
    whyItMatters: 'Prevents confirmation bias and tunnel vision, ensuring investigators do not fixate on the first suspect mentioned in an incident report.',
    whenUsed: 'Crucial in complex cases with conflicting clues, tampered logs, or multiple individuals with physical/digital access.',
    example: 'Testing whether Elias Reed acted alone versus whether another party operated the terminal under Dr. Vale\'s credentials.',
    commonMistakes: [
      'Confirmation bias: searching only for evidence that incriminates the initial suspect while ignoring contradictory traces.',
      'Conflating correlation with causation: assuming that because an event happened near another in time, one caused the other.',
      'Delivering definitive biological attribution when digital artifacts only establish machine-level operations.'
    ],
    relatedLevels: [1, 2, 3, 4]
  },
  {
    id: 'legal-ethical-considerations',
    title: '14. Legal & Ethical Considerations',
    category: 'Professional Ethics',
    explanation: 'Digital forensics professionals operate under strict legal standards (such as Daubert and Frye standards for expert testimony) and ethical codes. Investigators must maintain objectivity, adhere to strict privacy boundaries, and report both exculpatory and inculpatory evidence impartially.',
    whyItMatters: 'A biased investigation or an unconstitutional search violates civil rights, exposes organizations to massive liabilities, and undermines justice.',
    whenUsed: 'Governs every single case from the issuance of search warrants to laboratory note-taking and courtroom testimony.',
    example: 'An examiner explicitly documents in their formal report that while a suspect was logged into a workstation, there is no evidence verifying who was physically at the keyboard.',
    commonMistakes: [
      'Advocating for a specific client outcome instead of serving as an impartial witness to scientific facts.',
      'Exceeding the legal scope of a search warrant or internal corporate investigation authorization.',
      'Suppressing evidence that contradicts the investigator\'s preferred theory.'
    ],
    relatedLevels: [1, 2, 3, 4]
  }
];

export const REAL_COMMAND_REFERENCES = [
  {
    command: 'ls -la',
    description: 'Lists all directory contents including hidden files (.dotfiles), file permissions, ownership, byte size, and modification timestamps.',
    usage: 'ls -la /path/to/target/',
    example: 'ls -la evidence/',
    output: `total 48920
drwxr-xr-x 2 root root     4096 Jan  1 23:45 .
drwxr-xr-x 8 avale avale   4096 Jan  1 23:30 ..
-rw-r--r-- 1 avale avale   2048 Jan  1 23:55 incident_report.txt
-rw-r--r-- 1 root root  47431680 Jan  1 23:42 recovered_archive.zip`
  },
  {
    command: 'file',
    description: 'Determines the genuine file type by inspecting header magic bytes, disregarding file extension.',
    usage: 'file /path/to/file',
    example: 'file evidence/sample.bin',
    output: 'evidence/sample.bin: Zip archive data, at least v2.0 to extract, compressed size 45218820'
  },
  {
    command: 'stat',
    description: 'Displays detailed inode metadata including exact block allocations, UID/GID permissions, and MACB timestamps (Access, Modify, Change, Birth).',
    usage: 'stat /path/to/file',
    example: 'stat evidence/project_elysium.zip',
    output: `  File: evidence/project_elysium.zip
  Size: 47431680   Blocks: 92640      IO Block: 4096   regular file
Device: nvme0n1p2  Inode: 1441892     Links: 0 (Unallocated / Deleted)
Access: 2025-01-01 23:42:00.000000000 +0530
Modify: 2025-01-01 23:40:15.000000000 +0530
Change: 2025-01-01 23:42:00.000000000 +0530
 Birth: 2025-01-01 23:15:00.000000000 +0530`
  },
  {
    command: 'sha256sum',
    description: 'Calculates the 256-bit cryptographic SHA-256 digest of a target file or raw storage partition.',
    usage: 'sha256sum /path/to/evidence.raw',
    example: 'sha256sum evidence/cctv_export.mp4',
    output: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  evidence/cctv_export.mp4'
  },
  {
    command: 'xxd',
    description: 'Creates a hex dump of a file or standard input, displaying byte offsets, hex representations, and ASCII decoded text.',
    usage: 'xxd -l 64 /path/to/binary',
    example: 'xxd -l 32 evidence/sample.bin',
    output: `00000000: 504b 0304 1400 0000 0800 5c8e 7a59 1234  PK........\\.zY.4
00000010: 5678 90ab cdef 0123 4567 8900 1200 0000  Vx.....#Eg......`
  },
  {
    command: 'strings',
    description: 'Scans binary files or raw memory dumps for printable character sequences of a minimum length (default 4 chars).',
    usage: 'strings -n 8 /path/to/binary',
    example: 'strings evidence/recovered_archive.zip | grep -i "trace"',
    output: `Every action leaves a trace.
Find the first trace, and you will understand the last.`
  },
  {
    command: 'grep',
    description: 'Searches text files or log streams for regular expression matches or specific keywords.',
    usage: 'grep "pattern" /path/to/logfile',
    example: 'grep "ereed" /var/log/auth.log',
    output: `2025-01-01T15:15:00Z bt-ws04 lightdm: pam_unix(lightdm:session): session opened for user ereed
2025-01-01T18:02:15Z bt-ws04 systemd-logind[910]: Session 4 logged out. User ereed.`
  },
  {
    command: 'exiftool',
    description: 'Reads and writes metadata information in a wide variety of files, including EXIF camera tags, GPS coordinates, and encoding profiles.',
    usage: 'exiftool /path/to/image_or_video',
    example: 'exiftool evidence/CAM_B04.mp4',
    output: `File Name                       : CAM_B04.mp4
File Modification Date/Time     : 2025:01:01 23:58:12+05:30
Encoder                         : Lavf58.76.100 (Modified via ffmpeg)
Duration                        : 00:55:00`
  },
  {
    command: 'mmls',
    description: 'Displays the partition layout of a volume system (SleuthKit utility for MBR, GPT, and Sun disk labels).',
    usage: 'mmls /path/to/image.raw',
    example: 'mmls ws04_disk.raw',
    output: `GUID Partition Table (GPT)
Units are in 512-byte sectors
      Slot      Start        End          Length       Description
000:  Meta      0000000000   0000000000   0000000001   Safety Table
001:  -------   0000000001   0000002047   0000002047   Unallocated
002:  000       0000002048   0001050623   0001048576   EFI System Partition (FAT32)
003:  001       0001050624   3844143103   3843092480   Linux Filesystem (EXT4)`
  },
  {
    command: 'fls',
    description: 'Lists file and directory names in an image file (SleuthKit). With `-d`, lists deleted entries only.',
    usage: 'fls -r -d -p /path/to/image.raw',
    example: 'fls -r -d ws04_disk.raw',
    output: `d/d * 1441891:  /home/avale/research/archive_staging
v/v 1441892:    * /home/avale/research/archive_staging/project_elysium.zip (deleted)`
  },
  {
    command: 'icat',
    description: 'Extracts the raw data blocks corresponding to a specific inode number directly to standard output.',
    usage: 'icat /path/to/image.raw <inode_number>',
    example: 'icat ws04_disk.raw 1441892 > carved_archive.zip',
    output: '[Extracted 47,431,680 bytes from Inode 1441892 to carved_archive.zip]'
  },
  {
    command: 'tshark',
    description: 'Terminal-based packet capture and network protocol analyzer (CLI version of Wireshark).',
    usage: 'tshark -r capture.pcap -Y "filter"',
    example: 'tshark -r capture_vault_b04.pcap -Y "tcp.len > 10000"',
    output: `1044 18:10:14.002 192.168.10.45 -> 203.0.113.88 TLSv1.3 47288110 Application Data`
  }
];
