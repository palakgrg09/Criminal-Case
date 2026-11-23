# CRIMINAL CASE: Complete Storyline, Case Mystery & Master Solution Guide

**CONFIDENTIAL // INVESTIGATOR'S MASTER DOSSIER**  
*Game Version: 2.0 (Sage Vintage Edition)*  
*Target Mystery: The Vanishing of Vault B-04 & The Project Elysium Breach*

---

## 1. Executive Storyline Overview & Mystery Arc

### The Setting: Vault B-04
Deep inside the high-security Blackthorn Digital Forensics Research Facility, Vault B-04 houses top-secret cryptographic and data preservation projects. Access requires dual-factor keycards, magnetic deadbolts, and continuous camera surveillance.

### The Incident
On New Year's night at 11:55 PM (23:55 IST), security alarms triggered. Responding officers found:
1. Laboratory Suite B-04 locked from the inside with magnetic deadbolts engaged.
2. Senior Scientist **Dr. Adrian Vale** had vanished into thin air without signs of struggle.
3. His primary workstation (**WS-04**) was left running with active terminal windows and an unlocked session.
4. The crown jewel of the laboratory, the **Project Elysium Core Archive (45.2 MB)**, had completely disappeared from the drive.
5. Pinned to the glowing monitor was a yellow handwritten note from Dr. Vale:
   > *"Every action leaves a trace. Find the first trace, and you will understand the last."*

### The Immediate Suspect: Elias Reed
Facility security immediately accused junior researcher **Elias Reed**. His keycard had badged into the outer corridor at 8:45 PM (20:45 IST). When questioned, Reed vehemently denied involvement, swearing:
> *"I left the lab at 9:00 PM sharp (21:00 IST), packed my bag, and went straight to the metro station. I never touched Dr. Vale's workstation, and I know nothing about the missing files!"*

### The Detective's Companion: TOTO
Throughout the investigation, you are accompanied by **TOTO**, your trusted detective partner. TOTO provides progressive guidance, reminds you of key forensic principles (like Locard's Exchange Principle and RAM volatility), and helps verify your deductions.

---

## 2. The True Solution to the Mystery (The Big Reveal)

Before diving into individual level solutions, here is the full, objective truth of what happened in Vault B-04:

```
+------------------------------------------------------------------------------------------------+
|                                    THE TRUE CRIME TIMELINE                                     |
+------------------------------------------------------------------------------------------------+
|  20:45 IST  | Elias Reed badges into the outer corridor.                                       |
|  21:00 IST  | Reed claims he left the building (FALSE ALIBI).                                  |
|  23:30 IST  | A physical operator plugs an unregistered 64 GB SanDisk USB drive into WS-04.     |
|  23:32 IST  | Elias Reed's user account ('ereed') is officially logged out.                    |
|  23:40 IST  | Data exfiltration begins: 47.1 MB sent to Swiss IP 203.0.113.88 on Port 8443.    |
|  23:42 IST  | Dr. Adrian Vale's account ('avale') runs commands to unlink/delete the archive.  |
|  23:44 IST  | Network file transfer completes.                                                 |
|  23:45 IST  | SanDisk USB is unplugged from WS-04 and kicked behind the desk.                  |
|  23:50 IST  | Guard Danvers spots a silhouette hurrying out the rear loading dock.            |
|  23:55 IST  | Security enters Vault B-04. Corridor CCTV hash was tampered with to hide faces.  |
+------------------------------------------------------------------------------------------------+
```

### The Breakdown:
1. **The Broken Alibi**: Elias Reed lied about leaving at 9:00 PM. System authentication logs prove his user session remained active until **11:32 PM (23:32 IST)**.
2. **The Staged Theft**: The perpetrator did not merely walk out with a USB drive. The USB was used to load exfiltration tools, staging a 47.1 MB transfer over an encrypted TLS 1.3 tunnel to an offshore server in Switzerland (**203.0.113.88 / shadow.vault-relay.ch**).
3. **The Deleted Archive**: The file was unlinked at 11:42 PM under Dr. Vale's account. However, on modern file systems, deleting a file merely marks the storage blocks as unallocated. Forensic file carving recovered the complete 45.2 MB archive intact, along with Dr. Vale's hidden note: *"Check the time before trusting the story!"*
4. **The Tampered Video**: The corridor security camera recording had its cryptographic hash altered (`a4f9...` vs `e3b0...`). Someone deliberately swapped or modified the video file to prevent detectives from seeing who physically walked through the door.
5. **The Final Conclusion**: Elias Reed was present during the breach window (11:30 to 11:32 PM), but both user accounts were used in rapid succession. The digital evidence conclusively proves the time, methods, and destination of the stolen data.

---

## 3. Level-by-Level Walkthrough & Complete Answers

---

### LEVEL 1: THE LOCKED LABORATORY
*Theme: Securing the Crime Scene, Preserving Volatile Memory, and Evidence Intake*

#### Level Briefing Summary
You arrive at Vault B-04. The workstation is still glowing, the door was bolted from inside, and security wants to close the case by arresting Elias Reed immediately. You must secure the scene properly without destroying evidence.

#### Task 1: Spot the Digital Clues
- **Question**: Which 4 items contain electronic evidence about what happened?
- **Options Given**:
  1. Workstation Computer (Still powered on with open windows and live memory)
  2. Hallway Security Camera Video Export (Recording of who entered the room)
  3. Half-empty coffee mug on the desk
  4. Mystery USB Flash Drive (Found hidden behind the computer desk)
  5. Initial Incident Report and Monitor Post-It Note
  6. Office swivel chair adjustment lever
- **Correct Selection**:
  - `[x]` Workstation Computer
  - `[x]` Hallway Security Camera Video Export
  - `[x]` Mystery USB Flash Drive
  - `[x]` Initial Incident Report and Monitor Post-It Note
- **Why**: Coffee cups and office chairs are ordinary physical office items that contain no digital records, logs, or file systems.

#### Task 2: Protect the Running Computer
- **Question**: The computer is still turned on with open windows. What is the correct way to handle this running computer?
- **Options**:
  - A) Yank the power plug out of the wall right away.
  - B) Turn it off from the start menu shutdown button.
  - C) Save the live running memory (RAM) first while keeping the computer powered on.
  - D) Start clicking random files on the screen to see what opens.
- **Correct Answer**: **C) Save the live running memory (RAM) first while keeping the computer powered on.**
- **Why**: Live memory (RAM) is volatile. The moment power is lost, open connections, running malware, passwords, and unsaved documents vanish forever. Pulling the plug or shutting down destroys this evidence.

#### Task 3: Check the Camera Footage Fingerprint
- **Question 1**: Do the two digital fingerprints match?
  - Original Police Receipt Hash: `a4f9c83b2e71d4e09f58321cba770e2f9812456bc3de01289fedc456a1234567`
  - Current Video File Hash: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- **Correct Answer 1**: **No, there is a mismatch!**
- **Question 2**: What does this difference prove?
- **Correct Answer 2**: **It proves the video was changed, swapped, or altered after being saved.**
- **Why**: Cryptographic hashes exhibit the "avalanche effect". If two files are identical, their hashes match 100%. Any mismatch mathematically proves the video file was modified, edited, or substituted.

#### Task 4: Log the Mystery USB Drive
- **Task**: Fill out the official evidence intake card for the black flash drive found behind the desk.
- **Fields & Expected Values**:
  - **Evidence Tag ID**: `EV-USB-UNKNOWN`
  - **Device Classification**: `USB Flash Storage`
  - **Physical Discovery Location**: `Near rear I/O panel of WS-04`
  - **Required Preservation Action**: `Store in anti-static bag with write-blocker imaging`
- **Why**: Flash storage must be shielded from electrostatic discharge and imaged only through hardware write-blockers to prevent the operating system from altering file access dates.

---

### LEVEL 2: THE GHOST FILE
*Theme: File Deletion, Inode Recovery, and Magic Byte Signature Analysis*

#### Level Briefing Summary
Suspect Elias Reed claims the research archive was never on Workstation WS-04. Browsing normal desktop folders shows no project files. You must use forensic tools to prove whether the file existed and recover its contents.

#### Task 1: Search the Computer Disk
- **Task**: Open the workstation forensic terminal and inspect the disk to locate the deleted archive.
- **Action**: Click the **Open Terminal** button. Click any of the shortcut buttons:
  - `ls evidence/` (lists drive contents)
  - `stat evidence/project_elysium.zip` (shows Inode 1441892, 45.2 MB, deletion timestamp)
  - `file evidence/sample.bin` (identifies file headers)
- **Result**: Terminal executes the commands and logs Inode 1441892 as deleted from `/home/avale/research/archive_staging/`. Click **Submit Clue Answer** to verify.

#### Task 2: How Deleted Files are Recovered
- **Question**: When someone clicks Delete on a computer file, what actually happens to its data on the hard drive?
- **Options**:
  - A) The computer unlinks the file name, but the raw data remains on the storage drive until new data overwrites it.
  - B) The file is completely vaporized into thin air the instant delete is pressed.
  - C) The file is automatically sent as an email to the police.
  - D) The computer destroys the hard drive physically.
- **Correct Answer**: **A) The computer unlinks the file name, but the raw data remains on the storage drive until new data overwrites it.**
- **Why**: Operating systems do not write zeroes over the drive during normal deletion; they simply mark the clusters as "free/unallocated". Forensic tools can carve the raw data back out intact.

#### Task 3: Unmask the Disguised File
- **Question**: The culprit renamed a secret file to `sample.jpg` to fool investigators into thinking it was a picture. The opening header bytes show: `50 4B 03 04` (ASCII letters: `PK`). What kind of file is this really?
- **Options**:
  - A) Real JPEG Photograph
  - B) PKZIP Compressed Archive (Zip folder disguised with a fake .jpg name)
  - C) PDF Text Document
  - D) Audio Music File
- **Correct Answer**: **B) PKZIP Compressed Archive (Zip folder disguised with a fake .jpg name)**
- **Why**: File extensions can be renamed to anything. The true file format is determined by its magic numbers. `50 4B 03 04` represents "PK" (Phil Katz, author of PKZIP). Real JPEGs start with `FF D8 FF`.

#### Task 4: Connect the File Clues
- **Question**: We recovered the 45.2 MB secret archive and found a message hidden inside. What do our findings prove?
- **Options**:
  1. The secret research archive definitely existed on this computer before being deleted. (True)
  2. The computer records tell us the exact face and clothing of who was sitting in the chair. (False: computers do not have eyes!)
  3. The 45.2 MB archive easily fits inside the 64 GB USB stick we found. (True)
  4. Dr. Vale left a secret note inside: "Check the time before trusting the story!" (True)
- **Correct Selection**: Check options **1, 3, and 4** (do NOT check option 2).
- **Why**: Forensic evidence proves data presence, device capacities, and embedded messages, but software alone cannot witness human physical appearances.

---

### LEVEL 3: THE IMPOSSIBLE TIMELINE
*Theme: Time Zone Normalization (UTC vs IST), Authentication Logs, and Chronology*

#### Level Briefing Summary
Elias Reed insists his alibi is airtight: *"I left at 9:00 PM (21:00 IST) and went straight home."* You extract the system clock logs and authentication records. Server clocks record in UTC, while local clocks in India use IST (UTC + 05:30).

#### Task 1: Convert the Server Time
- **Question**: The computer log shows the mystery USB stick was inserted at 18:00 UTC. What time was this on local clocks in India (UTC + 05:30)?
- **Step-by-Step Calculation**:
  - `18:00 UTC + 5 hours = 23:00`
  - `23:00 + 30 minutes = 23:30 (11:30 PM local time)`
- **Correct Selections**:
  - Select UTC: **18:00:00 UTC (Logged Server Time)**
  - Select IST: **23:30:00 IST (11:30 PM: 18:00 plus 5h 30m)**

#### Task 2: Check the Suspect's Logout Record
- **Question**: Elias Reed swore he left at 9:00 PM (21:00 IST). Look at the system login log for user `ereed`. When did his account actually log out?
- **Options**:
  - `15:30:10 UTC (21:00:10 IST: 9:00 PM, what Reed claimed)`
  - `18:02:15 UTC (23:32:15 IST: 11:32 PM, over two hours LATER!)`
  - `18:17:00 UTC (23:47:00 IST: 11:47 PM)`
- **Correct Answer**: **18:02:15 UTC (23:32:15 IST: 11:32 PM, over two hours LATER!)**
- **Why**: The log line `Session 4 logged out. User ereed` at 18:02:15 UTC translates directly to 11:32:15 PM IST. This shatters Reed's 9:00 PM alibi.

#### Task 3: Put the Night's Events in Order
- **Task**: Use the up/down arrows to arrange the 5 events from earliest (top) to latest (bottom):
- **Correct Chronological Order**:
  1. `1. Elias Reed claims he left the lab (9:00 PM / 21:00 IST)`
  2. `2. Mystery USB stick plugged into the computer (11:30 PM / 23:30 IST)`
  3. `3. Elias Reed's user account logs out (11:32 PM / 23:32 IST)`
  4. `4. Dr. Vale's account is used to delete the files (11:42 PM / 23:42 IST)`
  5. `5. Mystery USB stick unplugged and hidden (11:45 PM / 23:45 IST)`

#### Task 4: What Does the Timeline Prove?
- **Question**: Now that you have aligned the times, what does the evidence prove about Elias Reed's story?
- **Options**:
  - A) It proves Reed is a mastermind super-villain who acted completely alone.
  - B) Reed's alibi is broken: he was active until 11:32 PM, not 9:00 PM. But ten minutes later at 11:42 PM, Dr. Vale's account was also used.
  - C) Computers make up random timestamps, so Reed must be telling the truth.
  - D) Timestamps don't matter at all in an investigation.
- **Correct Answer**: **B) Reed's alibi is broken: he was active until 11:32 PM, not 9:00 PM. But ten minutes later at 11:42 PM, Dr. Vale's account was also used.**
- **Why**: Good investigators remain objective. The evidence catches Reed in a lie, but also reveals that Dr. Vale's account was active ten minutes after Reed logged out.

---

### LEVEL 4: THE LAST DIGITAL TRACE
*Theme: Network Packet Exfiltration, Evidence Correlation, and Closing the Case*

#### Level Briefing Summary
You have reached the climax. The USB was plugged in, files were deleted, and Reed lied. Did the culprit walk out with the files on the USB drive, or did they transmit them across the internet?

#### Task 1: Track the Outgoing Network Leak
- **Table Inspection**:
  - Row 1: `18:05:00 UTC` - DNS query (128 B) - Status: OK
  - Row 2: `18:10:14 UTC` - Dest: **203.0.113.88** - Protocol: TLS 1.3 - Port: **8443** - Volume: **47.1 MB** - Status: **EXFILTRATION (LEAK)**
  - Row 3: `18:15:30 UTC` - NTP clock sync (96 B) - Status: OK
  - Row 4: `18:20:00 UTC` - Syslog (1.2 KB) - Status: OK
- **Question 1**: Which external destination IP received the 47.1 MB file?
  - **Correct Answer 1**: **203.0.113.88 (External Swiss server: shadow.vault-relay.ch)**
- **Question 2**: Which port and protocol carried the 47.1 MB file transfer?
  - **Correct Answer 2**: **Port 8443 (TLS Encrypted Stream)**

#### Task 2: Connect the Clues on the Case Board
- **Task**: Connect the 4 crucial pieces of evidence on the Case Board to reconstruct the full transfer chain.
- **Action**: Open the Case Board (or click Submit Clue Answer) to link:
  1. `Physical Storage (SanDisk USB)` &rarr; `Recovered File (project_elysium.zip)`
  2. `Recovered File (45.2 MB)` &rarr; `Network Exfiltration (47.1 MB stream)`
  3. `Network Exfiltration Window` &rarr; `Hallway Camera Tampered Hash`
- **Result**: Validates that physical contact, file deletion, network transfer, and video tampering are all part of one unified incident.

#### Task 3: The Final Detective Deduction
- **Question**: Putting together the tampered camera video, hidden USB, carved file, broken alibi, and 47 MB network leak, what is the true explanation?
- **Correct Answer**: **B) Someone in the lab between 11:30 and 11:45 PM used the USB drive and workstation to transmit the files to the Swiss server, while tampering with the camera to hide their face. Reed's alibi is false, but both user accounts were involved.**
- **Why**: Hypothesis B accounts for 100% of the verified physical, file system, network, and video evidence without unwarranted speculation.

#### Task 4: Sign and Certify the Case Report
- **Action**: Click **Submit Clue Answer** to digitally sign and certify the official incident report.
- **Result**: Grants **Master Detective Rank**, displays the full cryptographic completion receipt, and records the case as solved!

---

## 4. Quick-Reference Solution Cheat Sheet

| Level | Task | Target Challenge | Correct Answer / Key Action |
| :--- | :--- | :--- | :--- |
| **Level 1** | Task 1 | Spot Digital Clues | Select: Workstation Computer, Camera Video, USB Drive, Incident Report |
| **Level 1** | Task 2 | Preserve Computer | Select: Option C (Save live RAM first while powered on) |
| **Level 1** | Task 3 | Camera Hash Check | Q1: "No, mismatch!" // Q2: "Video was changed/altered" |
| **Level 1** | Task 4 | Log USB Drive | Confirm pre-filled form (`EV-USB-UNKNOWN`, `USB Flash Storage`) |
| **Level 2** | Task 1 | Search Disk | Open Terminal -> Click `ls`, `stat`, or `file` -> Submit |
| **Level 2** | Task 2 | Deletion Logic | Select: Option A (Unlinks name, raw data stays until overwritten) |
| **Level 2** | Task 3 | Disguised File | Select: PKZIP Compressed Archive (`50 4B 03 04` = PK) |
| **Level 2** | Task 4 | Connect File Clues | Select options 1, 3, and 4 (Do NOT select option 2) |
| **Level 3** | Task 1 | Time Conversion | UTC: `18:00:00 UTC` // IST: `23:30:00 IST (11:30 PM)` |
| **Level 3** | Task 2 | Check Logout | Select: `18:02:15 UTC (23:32:15 IST: 11:32 PM)` |
| **Level 3** | Task 3 | Event Chronology | Order: 1. Reed claim &rarr; 2. USB in &rarr; 3. Reed logout &rarr; 4. Vale sudo &rarr; 5. USB out |
| **Level 3** | Task 4 | Timeline Deduction | Select: Option B (Reed alibi broken, but Vale account also active) |
| **Level 4** | Task 1 | Network Leak | IP: `203.0.113.88` // Port: `Port 8443` |
| **Level 4** | Task 2 | Case Board Link | Link USB &rarr; Recovered File &rarr; Network Leak &rarr; CCTV Video |
| **Level 4** | Task 3 | Final Deduction | Select: Hypothesis B (Physical user exfiltrated files & altered video) |
| **Level 4** | Task 4 | Certify Report | Click Submit Clue Answer to certify report & solve case |
