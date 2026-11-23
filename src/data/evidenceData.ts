import { EvidenceItem } from '../types/game';

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  // --- LEVEL 1 EVIDENCE ---
  {
    id: 'ev-incident-report',
    title: 'Incident Report: The Midnight Disappearance',
    category: 'Official Case File',
    description: 'Police summary of the night Dr. Adrian Vale vanished from his locked laboratory.',
    level: 1,
    icon: 'FileText',
    metadata: {
      'Date': 'January 1, 2025',
      'Time Reported': '11:55 PM (23:55 IST)',
      'Location': 'High-Tech Research Lab, Room B-04',
      'Missing Person': 'Dr. Adrian Vale (Senior Scientist)',
      'Primary Suspect': 'Elias Reed (Lab Assistant)'
    },
    content: `CASE INCIDENT SUMMARY:

WHAT HAPPENED:
Late on New Year's night, chief scientist Dr. Adrian Vale vanished from inside his research office. The heavy security door was locked from the inside, his computer workstation was still powered on, and the top-secret research archive ("Project Elysium") was missing.

THE SUSPECT:
Security officers pointed fingers at junior assistant Elias Reed because his keycard opened the outer hallway earlier that night. Reed insists he is innocent and left the building at 9:00 PM.

CRIME SCENE CLUES:
1. Computer WS-04 was left running with open windows.
2. Corridor security camera video CAM-B04 was saved for investigation.
3. A foreign USB flash drive was discovered dropped behind the desk.
4. Pinned to the computer monitor was a handwritten yellow note from Dr. Vale:
   "Every action leaves a trace. Find the first trace, and you will understand the last."

DETECTIVE TAKEAWAY:
Do not rush to conclusions. We must look at the digital traces left behind on the computer, the video file, and the mysterious USB drive to uncover the truth.`
  },
  {
    id: 'ev-cctv-export',
    title: 'Hallway Security Camera Video (CAM-B04)',
    category: 'Video Clue',
    description: 'Security camera recording of the hallway outside Dr. Vale\'s locked room.',
    level: 1,
    icon: 'Film',
    metadata: {
      'Camera': 'Hallway Camera CAM-B04',
      'Original Fingerprint (Hash)': 'a4f9c83b2e71d4e09f58321cba770e2f9812456bc3de01289fedc456a1234567',
      'Current Fingerprint (Hash)': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      'Status': 'Digital Fingerprint Mismatch Detected!'
    },
    content: `SECURITY VIDEO INVESTIGATION REPORT:

HOW DIGITAL FINGERPRINTS WORK:
Just like human fingertips, every computer file has a unique digital fingerprint called a "hash". If two video files are identical, their fingerprints match character for character. If even one single frame was cut, replaced, or edited, the fingerprint changes completely!

THE EVIDENCE:
- Fingerprint on Officer Danvers' Original Police Receipt:
  a4f9c83b2e71d4e09f58321cba770e2f9812456bc3de01289fedc456a1234567

- Fingerprint of the Current Video File:
  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855

DETECTIVE TAKEAWAY:
The two fingerprints do NOT match! They start with completely different letters (a4f9 vs e3b0). This proves the security video was modified, cut, or swapped after being recorded. Someone was trying to hide who really entered the room!`
  },
  {
    id: 'ev-workstation-ws04',
    title: 'Dr. Vale\'s Running Computer (WS-04)',
    category: 'Computer Hardware',
    description: 'The scientist\'s workstation, found turned on with active open programs.',
    level: 1,
    icon: 'Cpu',
    metadata: {
      'Computer Name': 'WS-04 (Dr. Vale\'s Workstation)',
      'Power State': 'Turned On and Unlocked',
      'Live Memory (RAM)': '64 GB Active Memory',
      'Logged-in User': 'avale (Dr. Adrian Vale)'
    },
    content: `WORKSTATION CRIME SCENE REPORT:

WHY LIVE MEMORY (RAM) MATTERS:
When a computer is running, its temporary memory (RAM) holds open programs, unsaved files, active network links, and passwords. But RAM only works while powered! If power is cut, everything in live memory vanishes in an instant.

RULES FOR PRESERVING A RUNNING COMPUTER:
1. NEVER pull the power plug out of the wall: this erases all live memory instantly.
2. NEVER click standard shutdown: shutting down runs cleanup scripts that overwrite files and destroy evidence.
3. ALWAYS save the live running memory (RAM) first while keeping the computer powered on.

DETECTIVE TAKEAWAY:
By keeping the computer on and capturing its live memory first, we preserve critical temporary clues that would otherwise disappear forever.`
  },
  {
    id: 'ev-usb-inventory',
    title: 'Mystery USB Flash Drive Found Under Desk',
    category: 'Physical Evidence',
    description: 'An unauthorized 64 GB black flash drive discovered hidden behind the computer desk.',
    level: 1,
    icon: 'HardDrive',
    metadata: {
      'Device Type': 'SanDisk Extreme Pro 64 GB USB Drive',
      'Serial Number': 'AA0101250099412',
      'Discovery Location': 'Dropped on the floor behind Workstation WS-04',
      'Official Lab Status': 'Not registered in lab inventory (Foreign Device)'
    },
    content: `USB FLASH DRIVE DISCOVERY REPORT:

PHYSICAL DISCOVERY:
While searching behind the computer desk, detectives spotted a black 64 GB SanDisk flash drive wedged between the floor and the computer cables.

INVENTORY CHECK:
The research lab has strict rules: all official USB drives are silver Kingston IronKey tokens. This black SanDisk drive does not belong to the lab inventory. It was brought into the building secretly!

PRESERVATION STEPS:
1. Store in an anti-static evidence bag.
2. Connect only through a forensic write-blocker (a safety device that prevents the computer from accidentally modifying the drive).
3. Extract an exact clone of its contents for investigation.

DETECTIVE TAKEAWAY:
Someone brought an unregistered 64 GB drive into Vault B-04. Did they use it to copy the missing research files?`
  },
  {
    id: 'ev-chain-of-custody',
    title: 'Evidence Log & Chain of Custody Record',
    category: 'Official Procedure',
    description: 'The official police register that tracks every piece of evidence from discovery to court.',
    level: 1,
    icon: 'ShieldCheck',
    metadata: {
      'Log Form': 'Evidence Register Form #0914-A',
      'Lead Detective': 'Senior Forensic Investigator',
      'Custody Status': 'Securely cataloged in Evidence Locker #3'
    },
    content: `CHAIN OF CUSTODY RULES:

WHAT IS CHAIN OF CUSTODY?
In detective work, chain of custody is the chronological paper trail proving who found the evidence, where it was kept, and who examined it. If there is even one missing entry, a defense lawyer can claim the evidence was tampered with and have the case thrown out of court!

REQUIRED FIELDS FOR EVERY CLUE:
1. Evidence Tag ID (e.g. EV-USB-UNKNOWN)
2. Device Type (e.g. USB Flash Storage)
3. Discovery Location (e.g. Near rear I/O panel of WS-04)
4. Preservation Action (e.g. Store in anti-static bag with write-blocker imaging)

DETECTIVE TAKEAWAY:
Always fill out the official evidence card accurately. Good detectives protect their clues from the moment they are found.`
  },

  // --- LEVEL 2 EVIDENCE ---
  {
    id: 'ev-disk-manifest',
    title: 'Workstation Hard Drive Forensic Clone',
    category: 'Storage Drive Clue',
    description: 'An exact bit-for-bit copy of Dr. Vale\'s 2 TB computer hard drive.',
    level: 2,
    icon: 'Database',
    metadata: {
      'Drive Capacity': '2 TB Solid-State Drive',
      'Clone Format': 'Bit-for-Bit Raw Forensic Image',
      'Safety Status': 'Write-Protected (Read-Only Copy)'
    },
    content: `HARD DRIVE INSPECTION REPORT:

HOW DETECTIVES SEARCH DRIVES:
Detectives never touch a suspect's original computer drive directly, because opening files changes the date and time stamps! Instead, we make an exact bit-for-bit duplicate clone and conduct all investigations on the clone safely.

WHAT WE ARE LOOKING FOR:
The suspect claimed the project archive was never on this computer. By searching the entire drive clone, including hidden and deleted areas, we can see every file that ever touched this computer.`
  },
  {
    id: 'ev-deleted-catalog',
    title: 'Recovered Deleted File: project_elysium.zip',
    category: 'Recovered File',
    description: 'A 45.2 MB secret research archive carved back out of unallocated storage.',
    level: 2,
    icon: 'Trash2',
    metadata: {
      'File Name': 'project_elysium.zip',
      'Size': '45.2 MB (47,431,680 bytes)',
      'Status': 'Deleted at 11:42 PM (23:42 IST)',
      'Secret Note Found Inside': '"Check the time before trusting the story."'
    },
    content: `DELETED FILE RECOVERY REPORT:

HOW FILE DELETION REALLY WORKS:
When someone clicks "Delete" on a file, the computer does NOT immediately erase the data. Think of it like a library book: deleting a file just removes the library index card, while the actual book is still sitting on the shelf! The file data stays intact on the drive until new files are saved over it.

WHAT WE RECOVERED:
Using our forensic tools, we recovered the deleted file "project_elysium.zip":
- File Size: 45.2 MB
- Time of Deletion: 11:42 PM (23:42 IST)
- Hidden Note Inside: Pinned inside the archive comments was a message written by Dr. Vale himself:
  "Check the time before trusting the story."

DETECTIVE TAKEAWAY:
The suspect lied: the research files definitely existed on this computer! And Dr. Vale left a vital clue telling us to examine the clock timestamps next.`
  },
  {
    id: 'ev-file-signatures',
    title: 'The Disguised File & Header Signature Analysis',
    category: 'Secret File Clue',
    description: 'Proof that a secret zip archive was disguised with a fake picture (.jpg) extension.',
    level: 2,
    icon: 'Binary',
    metadata: {
      'Disguised File Name': 'sample.jpg',
      'File Header Bytes': '50 4B 03 04 (Letters: PK)',
      'Real File Type': 'PKZIP Compressed Archive (Zip folder)',
      'Fake Extension': '.jpg (Disguised as a photograph)'
    },
    content: `FILE DISGUISE INVESTIGATION:

THE FAKE EXTENSION TRICK:
Anyone can rename a secret file from "secret.zip" to "cat.jpg". Windows and Mac will show a picture icon, but changing the name does NOT change what is inside the file!

HOW TO SPOT THE TRUTH (MAGIC BYTES):
Every file type starts with a unique set of opening header bytes (called magic numbers):
- PKZIP Archive (.zip): Starts with 50 4B 03 04 (ASCII letters: "PK")
- Real JPEG Photo (.jpg): Starts with FF D8 FF
- PDF Document (.pdf): Starts with 25 50 44 46 ("%PDF")

EXAMINING OUR FILE:
The file was named "sample.jpg", but when we peek at its very first bytes, we see:
50 4B 03 04 (Spelling out "PK" for Phil Katz, the creator of ZIP archives).

DETECTIVE TAKEAWAY:
The file was NOT a photo! It was a secret compressed ZIP archive disguised to slip past guards and security scans.`
  },

  // --- LEVEL 3 EVIDENCE ---
  {
    id: 'ev-auth-log',
    title: 'Computer Login and Logout Records',
    category: 'System Log',
    description: 'Official system records of who logged in and out of the computer on New Year\'s night.',
    level: 3,
    icon: 'Lock',
    metadata: {
      'Log File': '/var/log/auth.log',
      'Time Recording Standard': 'UTC (Universal Coordinated Time)',
      'Suspect User Account': 'ereed (Elias Reed)',
      'Scientist User Account': 'avale (Dr. Adrian Vale)'
    },
    content: `COMPUTER LOGIN LOG REPORT:

KEY LOG ENTRIES (RECORDED IN UTC TIME):
- 15:15:00 UTC (20:45:00 IST): Session opened for user "ereed".
- 18:02:15 UTC (23:32:15 IST): "Session 4 logged out. User ereed."
- 18:12:44 UTC (23:42:44 IST): User "avale" runs command to delete the research archive.
- 18:17:00 UTC (23:47:00 IST): User "avale" logs into the desktop.

DETECTIVE TAKEAWAY:
Look closely at entry #2: Elias Reed swore he went home at 9:00 PM (21:00 IST). But the official computer log proves his account remained actively logged in until 11:32 PM (23:32 IST), over two hours later! His alibi is completely broken.`
  },
  {
    id: 'ev-usb-syslog',
    title: 'USB Hardware Connection Timeline',
    category: 'Hardware Connection Log',
    description: 'System log recording the exact second the mystery USB drive was plugged in and removed.',
    level: 3,
    icon: 'Radio',
    metadata: {
      'Device Detected': 'SanDisk Extreme Pro 64 GB (Serial: AA0101250099412)',
      'Plugged In': '18:00:00 UTC (11:30:00 PM local IST)',
      'Unplugged': '18:15:00 UTC (11:45:00 PM local IST)',
      'Total Time Plugged In': '15 minutes'
    },
    content: `USB CONNECTION CHRONOLOGY:

EVENT 1: USB PLUGGED IN
- Server Time: 18:00:00 UTC
- Local Time: 23:30:00 IST (11:30 PM)
The computer detected the unauthorized 64 GB SanDisk flash drive plugged into the rear USB port.

EVENT 2: USB UNPLUGGED
- Server Time: 18:15:00 UTC
- Local Time: 23:45:00 IST (11:45 PM)
The USB drive was pulled out of the computer and dropped behind the desk.

DETECTIVE TAKEAWAY:
The mystery USB drive was active in the computer for exactly 15 minutes, from 11:30 PM to 11:45 PM. Everything critical happened during this exact 15-minute window!`
  },
  {
    id: 'ev-witness-statements',
    title: 'Suspect and Security Witness Statements',
    category: 'Interviews',
    description: 'Interviews with junior researcher Elias Reed and night guard Officer Danvers.',
    level: 3,
    icon: 'Users',
    metadata: {
      'Suspect Claim': 'Elias Reed: "I left at 9:00 PM and went straight home."',
      'Security Observation': 'Officer Danvers: "Saw emergency lights flicker and someone leaving near 11:50 PM."'
    },
    content: `INTERVIEW TRANSCRIPTS:

STATEMENT 1: ELIAS REED (SUSPECT)
"I left the laboratory promptly at 9:00 PM (21:00 IST). I shut my laptop, packed my bag, and went straight to the metro station. I never touched Dr. Vale's computer, and I didn't steal the project files. Whatever happened late that night had nothing to do with me."

STATEMENT 2: OFFICER JAMES DANVERS (NIGHT GUARD)
"Around 11:45 PM (23:45 IST), I noticed the hallway lights flicker near Vault B-04. When I walked up to the door, the deadbolts were locked from the inside. Through the glass, I saw Dr. Vale's workstation monitor glowing with terminal windows. A few minutes later, around 11:50 PM, I caught a glimpse of someone hurrying out the back exit."

DETECTIVE TAKEAWAY:
Reed claims he left at 9:00 PM, but the computer logs prove his account was running until 11:32 PM, and the guard saw someone leaving at 11:50 PM. Reed was not telling the truth about leaving early!`
  },

  // --- LEVEL 4 EVIDENCE ---
  {
    id: 'ev-pcap-summary',
    title: 'Network Traffic Leak Log (Outgoing Data)',
    category: 'Internet Traffic Clue',
    description: 'Router log showing a massive 47.1 MB file sent over the internet to an overseas server.',
    level: 4,
    icon: 'Network',
    metadata: {
      'Source Computer': '192.168.10.45 (Dr. Vale\'s Workstation WS-04)',
      'Destination Server': '203.0.113.88 (Offshore Swiss Server: shadow.vault-relay.ch)',
      'Port Used': '8443 (Encrypted Secure Stream)',
      'File Size Sent': '47.1 MB (Matches the stolen 45.2 MB archive!)',
      'Time of Transfer': '11:40 PM to 11:44 PM IST'
    },
    content: `NETWORK LEAK INVESTIGATION:

THE OUTGOING DATA STREAM:
Right while the USB drive was plugged in and the files were deleted, the laboratory router recorded a large outbound data stream:
- Time: 11:40:15 PM to 11:44:48 PM IST
- From: Dr. Vale's computer (192.168.10.45)
- To: Overseas Swiss IP address 203.0.113.88 (port 8443)
- Total Size: 47.1 MB

DETECTIVE TAKEAWAY:
The size of this network transfer (47.1 MB) matches the stolen research archive! The culprit didn't just walk out with a USB stick; they beamed the entire file over the internet to an overseas Swiss server!`
  },
  {
    id: 'ev-dns-firewall-logs',
    title: 'Firewall and Domain Lookup Records',
    category: 'Network Firewall',
    description: 'Proof of the domain lookup connecting the workstation to the Swiss server.',
    level: 4,
    icon: 'Globe',
    metadata: {
      'Domain Looked Up': 'shadow.vault-relay.ch',
      'Resolved IP Address': '203.0.113.88',
      'Firewall Alert': 'Alert 402: Large Encrypted Outbound Data Stream'
    },
    content: `FIREWALL & DOMAIN AUDIT:

DOMAIN LOOKUP:
At 11:40:12 PM IST, the workstation asked the internet domain server for "shadow.vault-relay.ch", which resolved directly to IP address 203.0.113.88. Two seconds later, the 47 MB transfer began!

DETECTIVE TAKEAWAY:
This confirms that the transmission was deliberately directed to shadow.vault-relay.ch, an offshore server.`
  },
  {
    id: 'ev-integrity-summary',
    title: 'The Complete Case Mystery Solved',
    category: 'Final Case Synthesis',
    description: 'The master summary connecting all physical, digital, and timeline clues.',
    level: 4,
    icon: 'CheckSquare',
    metadata: {
      'Core Rule': 'Locard\'s Principle: "Every action leaves a trace."',
      'Case Status': 'Solved and Ready for Final Report'
    },
    content: `MASTER INVESTIGATION SUMMARY:

THE FULL PICTURE:
1. THE CAMERA: Someone altered the hallway security video (the hash mismatch) to hide their face entering and leaving the room.
2. THE USB DRIVE: At 11:30 PM, an unauthorized 64 GB USB drive was plugged into the workstation.
3. THE LOGIN: Elias Reed lied about leaving at 9:00 PM; his account was active until 11:32 PM. However, at 11:42 PM, Dr. Adrian Vale's account was also used.
4. THE DELETED FILE: The research archive was deleted at 11:42 PM, but we recovered the full 45.2 MB file from unallocated storage, complete with Dr. Vale's secret note.
5. THE NETWORK LEAK: Between 11:40 and 11:44 PM, the entire archive (47.1 MB) was transmitted across the internet to a Swiss server (203.0.113.88 on port 8443).

FINAL DETECTIVE CONCLUSION:
Dr. Vale's note was right: "Every action leaves a trace." The perpetrator thought deleting the file and changing the camera video would cover their tracks. But digital evidence never forgets!`
  }
];

