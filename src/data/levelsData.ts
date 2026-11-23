import { LevelData } from '../types/game';
import { INITIAL_EVIDENCE } from './evidenceData';

export const LEVELS: LevelData[] = [
  // ==========================================
  // LEVEL 1: THE LOCKED LABORATORY
  // ==========================================
  {
    id: 1,
    title: 'Level 1: The Locked Laboratory',
    subtitle: 'Preserving the Crime Scene and Spotting the First Clues',
    difficulty: 'Beginner',
    briefing: [
      "Late at night, chief scientist Dr. Adrian Vale vanished from inside his locked laboratory office.",
      "His computer was still powered on, and the top-secret research archive had disappeared!",
      "Security officers immediately blamed his young assistant, Elias Reed, because Reed had badged into the hallway earlier that evening.",
      "Reed claims he went home early at 9:00 PM and knows nothing about the disappearance.",
      "However, pinned to the computer monitor was a yellow note in Dr. Vale's handwriting: 'Every action leaves a trace. Find the first trace, and you will understand the last.'",
      "As lead detective, your mission is to examine the crime scene, preserve the live computer without losing its memory, check the security camera video, and uncover the real clues."
    ],
    totoIntro: "Welcome to Criminal Case, Detective! I'm TOTO, your partner. Don't worry, we'll solve this together step by step! Every action leaves a digital trace. Let's look around the room and examine our first clues!",
    objectives: [
      "Spot the 4 genuine digital clues from the crime scene.",
      "Decide how to preserve the running computer without erasing its live memory.",
      "Check if the security camera footage was altered or tampered with.",
      "Log the mystery USB drive found hidden behind the desk."
    ],
    evidence: INITIAL_EVIDENCE.filter(e => e.level === 1),
    challenges: [
      {
        id: 'l1-c1',
        title: 'Task 1: Spot the Digital Clues',
        type: 'multi-select',
        order: 1,
        description: 'Look across the laboratory crime scene. Which 4 items contain electronic evidence about what happened?',
        instruction: 'Select the 4 genuine digital evidence items (skip everyday physical items like coffee cups).',
        data: {
          options: [
            { id: 'opt-ws04', label: 'Workstation Computer (Still powered on with open windows and live memory)', correct: true },
            { id: 'opt-cctv', label: 'Hallway Security Camera Video Export (Recording of who entered the room)', correct: true },
            { id: 'opt-coffee', label: 'Half-empty coffee mug on the desk (ordinary kitchen trash)', correct: false },
            { id: 'opt-usb', label: 'Mystery USB Flash Drive (Found hidden behind the computer desk)', correct: true },
            { id: 'opt-report', label: 'Initial Incident Report and Monitor Post-It Note', correct: true },
            { id: 'opt-chair', label: 'Office swivel chair adjustment lever', correct: false }
          ]
        },
        validation: {
          type: 'exact',
          answer: ['opt-ws04', 'opt-cctv', 'opt-usb', 'opt-report']
        },
        feedbackCorrect: 'Great eye, Detective! You collected the running computer, the hallway security video, the hidden USB drive, and the incident report.',
        feedbackIncorrect: 'Look closely: we need items that store digital data, programs, or official records. Ordinary items like coffee mugs and chairs are not digital evidence.'
      },
      {
        id: 'l1-c2',
        title: 'Task 2: Protect the Running Computer',
        type: 'single-select',
        order: 2,
        description: 'The computer is still turned on with open windows. The computer\'s live memory (RAM) holds active programs and unsaved work. If power is lost, live memory disappears instantly!',
        instruction: 'What is the correct way to handle this running computer?',
        data: {
          options: [
            {
              id: 'opt-pull-plug',
              label: 'A) Yank the power plug out of the wall right away.',
              explanation: 'Wrong: Pulling the plug cuts power and instantly erases all live memory (RAM) and open programs!'
            },
            {
              id: 'opt-reboot',
              label: 'B) Turn it off from the start menu shutdown button.',
              explanation: 'Wrong: Shutting down normally runs shutdown scripts that overwrite files and change access times!'
            },
            {
              id: 'opt-ram-first',
              label: 'C) Save the live running memory (RAM) first while keeping the computer powered on.',
              explanation: 'Correct! Saving live memory (RAM) first keeps active passwords, open connections, and running clues safe before shutting anything down.'
            },
            {
              id: 'opt-browse',
              label: 'D) Start clicking random files on the screen to see what opens.',
              explanation: 'Wrong: Clicking around opens files, updates file dates, and contaminates the digital crime scene!'
            }
          ]
        },
        validation: {
          type: 'exact',
          answer: 'opt-ram-first'
        },
        feedbackCorrect: 'Spot on! Live memory (RAM) is temporary and vanishes if power is cut. Always capture live memory first while the computer stays on!',
        feedbackIncorrect: 'Remember: if you pull the plug or turn off the computer, temporary data in RAM vanishes forever. Live memory must be saved first while the machine stays on.'
      },
      {
        id: 'l1-c3',
        title: 'Task 3: Check the Camera Footage Fingerprint',
        type: 'hash-compare',
        order: 3,
        description: 'Every digital file has a unique fingerprint called a hash. If two files are identical, their fingerprints match. If anyone edited or altered the video, the fingerprint changes completely.',
        instruction: 'Compare the registered fingerprint from the police receipt with the current video fingerprint.',
        data: {
          recordedHash: 'a4f9c83b2e71d4e09f58321cba770e2f9812456bc3de01289fedc456a1234567',
          observedHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          questions: [
            {
              id: 'hash-match',
              prompt: 'Do the two digital fingerprints match?',
              options: [
                { id: 'yes', label: 'Yes, they match identically.' },
                { id: 'no', label: 'No, there is a mismatch!' }
              ],
              correctAnswer: 'no'
            },
            {
              id: 'hash-implication',
              prompt: 'What does this difference prove?',
              options: [
                { id: 'tamper-proven', label: 'It proves Elias Reed is guilty all by himself.' },
                { id: 'corrupt-or-altered', label: 'It proves the video was changed, swapped, or altered after being saved.' },
                { id: 'ignore', label: 'It is a harmless computer glitch, so ignore it.' }
              ],
              correctAnswer: 'corrupt-or-altered'
            }
          ]
        },
        validation: {
          type: 'exact',
          answer: { 'hash-match': 'no', 'hash-implication': 'corrupt-or-altered' }
        },
        feedbackCorrect: 'Sharp deduction! The fingerprints do not match. That proves someone modified or swapped the security camera footage to hide who was in the hallway!',
        feedbackIncorrect: 'Look closely at the two strings of letters and numbers: they start with completely different characters (a4f9 vs e3b0). That means the file was altered!'
      },
      {
        id: 'l1-c4',
        title: 'Task 4: Log the Mystery USB Drive',
        type: 'form-fill',
        order: 4,
        description: 'You found an unauthorized 64GB USB flash drive hidden behind the computer desk. Log it into the official evidence registry.',
        instruction: 'Review and confirm the pre-filled evidence card fields below to protect the chain of custody.',
        data: {
          fields: [
            { id: 'evidenceId', label: 'Evidence Item Tag ID', placeholder: 'Keep default: EV-USB-UNKNOWN', expected: 'EV-USB-UNKNOWN' },
            { id: 'itemType', label: 'Device Classification', options: ['USB Flash Storage', 'Optical Media', 'Magnetic Tape', 'Mobile SIM'], expected: 'USB Flash Storage' },
            { id: 'collectionLocation', label: 'Physical Discovery Location', placeholder: 'Near rear I/O panel of WS-04', expected: 'Near rear I/O panel of WS-04' },
            { id: 'integrityAction', label: 'Required Preservation Action', options: ['Store in anti-static bag with write-blocker imaging', 'Plug into personal laptop to view contents', 'Wipe partition table'], expected: 'Store in anti-static bag with write-blocker imaging' }
          ]
        },
        validation: {
          type: 'form',
          answer: {
            evidenceId: 'EV-USB-UNKNOWN',
            itemType: 'USB Flash Storage',
            collectionLocation: 'Near rear I/O panel of WS-04',
            integrityAction: 'Store in anti-static bag with write-blocker imaging'
          }
        },
        feedbackCorrect: 'Evidence logged and secured! Always tag foreign flash drives and store them safely without plugging them into random personal laptops.',
        feedbackIncorrect: 'Please verify the fields: Tag ID is EV-USB-UNKNOWN, type is USB Flash Storage, location is Near rear I/O panel of WS-04, and preservation is Store in anti-static bag with write-blocker imaging.'
      }
    ],
    hints: [
      {
        level: 1,
        index: 0,
        type: 'nudge',
        text: 'Nudge: Digital clues include the running computer, the security camera recording, the mystery USB drive, and the incident report.'
      },
      {
        level: 1,
        index: 1,
        type: 'method',
        text: 'Method: Live computer memory (RAM) is lost if power is disconnected. In Task 3, compare the first few letters of each fingerprint: they are completely different.'
      },
      {
        level: 1,
        index: 2,
        type: 'specific',
        text: 'Specific Guidance: For Task 2, save live RAM first. For Task 3, select No, then choose that the video was altered. For Task 4, keep the pre-filled evidence values.'
      }
    ],
    storyReveal: [
      "The initial security team claimed this was an open-and-shut case: Elias Reed walked in and stole the files.",
      "However, your fingerprint check revealed the security camera footage was altered or replaced!",
      "And wedged behind the computer, you impounded an unregistered 64GB USB drive that does not belong to the laboratory.",
      "Dr. Vale's note was right: 'Find the first trace, and you will understand the last.'"
    ],
    totoReveal: "Good job, Detective! The camera video fingerprint doesn't match, and someone hid a secret USB drive behind the desk. Let's inspect the computer disk next!",
    learningTakeaway: "Locard's Exchange Principle teaches that every contact leaves a trace. Digital forensics begins by preserving live memory, verifying file integrity with hashes, and keeping an airtight evidence log.",
    nextLevelPreview: "Level 2: The Ghost File: Use the workstation terminal to inspect the drive, recover deleted files, and uncover hidden data."
  },

  // ==========================================
  // LEVEL 2: THE GHOST FILE
  // ==========================================
  {
    id: 2,
    title: 'Level 2: The Ghost File',
    subtitle: 'Recovering Hidden and Deleted Files',
    difficulty: 'Intermediate',
    briefing: [
      "Now you inspect the computer hard drive from Workstation WS-04.",
      "Under questioning, the suspect Elias Reed insisted: 'I never touched the research archive! The files were never on that computer!'",
      "When you browse the regular desktop folders, the project archive seems completely missing.",
      "However, on a computer, clicking 'Delete' doesn't destroy a file right away. The computer simply hides the file name, while the actual data still waits in the background until new files overwrite it!",
      "Use your forensic workstation tools to search the drive, recover the deleted file, and discover what was hidden inside."
    ],
    totoIntro: "Detective, 'deleted' files don't just vanish into thin air! They linger in unallocated storage until overwritten. Let's use our workstation tools to recover the missing project files!",
    objectives: [
      "Use the workstation terminal to search the drive and inspect hidden files.",
      "Understand how deleted files are recovered from storage.",
      "Unmask a secret file that was disguised with a fake picture extension.",
      "Connect the recovered file clues with the mystery USB stick."
    ],
    evidence: INITIAL_EVIDENCE.filter(e => e.level <= 2),
    challenges: [
      {
        id: 'l2-c1',
        title: 'Task 1: Search the Computer Disk',
        type: 'terminal',
        order: 1,
        description: 'Open the forensic terminal. Click the quick command buttons below (or type them) to search the disk and inspect the deleted archive.',
        instruction: 'Click "Open Terminal", then click the quick command shortcut buttons to inspect the files.',
        data: {
          requiredCommands: ['ls', 'stat', 'file'],
          targetInode: '1441892',
          targetFilename: 'project_elysium.zip'
        },
        validation: {
          type: 'custom',
          answer: 'terminal-inspected'
        },
        feedbackCorrect: 'Terminal search complete! You found the deleted file record (Inode 1441892) and inspected the disk files.',
        feedbackIncorrect: 'Try running the shortcut commands in the terminal: click `ls evidence/`, `stat evidence/project_elysium.zip`, and `file evidence/sample.bin`.'
      },
      {
        id: 'l2-c2',
        title: 'Task 2: How Deleted Files are Recovered',
        type: 'single-select',
        order: 2,
        description: 'When someone clicks Delete on a computer file, what actually happens to its data on the hard drive?',
        instruction: 'Choose the correct explanation of how file deletion works.',
        data: {
          options: [
            {
              id: 'opt-icat',
              label: 'A) The computer unlinks the file name, but the raw data remains on the storage drive until new data overwrites it.',
              explanation: 'Correct! In modern computers, deleting a file just marks its storage space as free. Forensic tools can recover the raw file data directly!'
            },
            {
              id: 'opt-rm',
              label: 'B) The file is completely vaporized into thin air the instant delete is pressed.',
              explanation: 'Wrong: Solid-state drives and hard drives do not physically erase magnetic or electrical states immediately.'
            },
            {
              id: 'opt-grep-only',
              label: 'C) The file is automatically sent as an email to the police.',
              explanation: 'Wrong: Standard operating systems do not email deleted files to authorities.'
            },
            {
              id: 'opt-format',
              label: 'D) The computer destroys the hard drive physically.',
              explanation: 'Wrong: Normal file deletion causes zero physical damage to the hardware.'
            }
          ]
        },
        validation: {
          type: 'exact',
          answer: 'opt-icat'
        },
        feedbackCorrect: 'Spot on! Deleting a file simply removes its directory pointer. The raw data remains until overwritten and can be extracted with forensic tools.',
        feedbackIncorrect: 'Remember: clicking delete does not wipe the storage blocks immediately. The data sits on the disk and can be carved back out!'
      },
      {
        id: 'l2-c3',
        title: 'Task 3: Unmask the Disguised File',
        type: 'file-identify',
        order: 3,
        description: 'The culprit renamed a secret file to sample.jpg so it would look like an innocent picture. But looking inside at the file\'s raw header bytes reveals: 50 4B 03 04 (Letters: PK).',
        instruction: 'What kind of file is this really? (Remember: "PK" stands for PKZIP archives).',
        data: {
          hexDump: '50 4B 03 04 14 00 00 00 08 00 5C 8E 7A 59 12 34 ... (ASCII: PK..........)',
          options: [
            { id: 'jpeg', label: 'Real JPEG Photograph' },
            { id: 'zip', label: 'PKZIP Compressed Archive (Zip folder disguised with a fake .jpg name)' },
            { id: 'pdf', label: 'PDF Text Document' },
            { id: 'elf', label: 'Audio Music File' }
          ]
        },
        validation: {
          type: 'exact',
          answer: 'zip'
        },
        feedbackCorrect: 'Great catch! The header bytes `50 4B 03 04` stand for PKZIP. The file was a secret compressed ZIP archive disguised with a fake photo extension!',
        feedbackIncorrect: 'Check the letters: `50 4B` spells `PK` in ASCII, which is the universal signature for PKZIP archives (created by Phil Katz). Real photos start with `FF D8 FF`.'
      },
      {
        id: 'l2-c4',
        title: 'Task 4: Connect the File Clues',
        type: 'multi-select',
        order: 4,
        description: 'We recovered the 45.2 MB secret archive and found a message hidden inside. What do our findings prove?',
        instruction: 'Select all deductions that are true based strictly on the clues.',
        data: {
          options: [
            { id: 'corr-existed', label: 'The secret research archive definitely existed on this computer before being deleted.', correct: true },
            { id: 'corr-whodunit', label: 'The computer records tell us the exact face and clothing of who was sitting in the chair.', correct: false },
            { id: 'corr-usb-capacity', label: 'The 45.2 MB archive easily fits inside the 64 GB USB stick we found.', correct: true },
            { id: 'corr-note-clue', label: 'Dr. Vale left a secret note inside: "Check the time before trusting the story!"', correct: true }
          ]
        },
        validation: {
          type: 'exact',
          answer: ['corr-existed', 'corr-usb-capacity', 'corr-note-clue']
        },
        feedbackCorrect: 'Brilliant deduction! The files definitely existed on the drive, they fit on the USB stick, and Dr. Vale left a note. But computer files cannot see human faces!',
        feedbackIncorrect: 'Remember: computers record actions and file data, not human faces or clothing. Uncheck the option claiming the computer proves who was sitting in the chair.'
      }
    ],
    hints: [
      {
        level: 2,
        index: 0,
        type: 'nudge',
        text: 'Nudge: In the terminal, click the shortcut buttons to inspect the files. In Task 3, remember that 50 4B spells PK for PKZIP.'
      },
      {
        level: 2,
        index: 1,
        type: 'method',
        text: 'Method: Deleted files remain on disk until overwritten (Option A). A file starting with PK is a ZIP archive.'
      },
      {
        level: 2,
        index: 2,
        type: 'specific',
        text: 'Specific Guidance: Task 1: Click terminal buttons. Task 2: Option A. Task 3: ZIP Archive. Task 4: Select options 1, 3, and 4 (do NOT select option 2).'
      }
    ],
    storyReveal: [
      "Recovering the deleted file proves the suspect was lying: the project files DID exist on this computer!",
      "Hidden inside the recovered file was a message from Dr. Vale himself:",
      "'Check the time before trusting the story.'",
      "The file was deleted at late hours. But when exactly was it deleted? We need to look at the clocks and logs!"
    ],
    totoReveal: "Aha! We recovered the missing archive and found Dr. Vale's secret note: 'Check the time before trusting the story!' Now let's check the clocks and logs!",
    learningTakeaway: "Deleting a file only unlinks its shortcut; the raw data remains in unallocated storage until overwritten. File extensions can be faked, but the internal header bytes reveal the true file type.",
    nextLevelPreview: "Level 3: The Impossible Timeline: Align server clocks, check login records, and test Elias Reed's alibi."
  },

  // ==========================================
  // LEVEL 3: THE IMPOSSIBLE TIMELINE
  // ==========================================
  {
    id: 3,
    title: 'Level 3: The Impossible Timeline',
    subtitle: 'Checking Timestamps and Clock Records',
    difficulty: 'Intermediate',
    briefing: [
      "The suspect Elias Reed claimed: 'I left the laboratory at 9:00 PM (21:00) and went straight home. I wasn't even in the building when the files disappeared!'",
      "To test his alibi, we extracted the computer's clock records and login logs.",
      "However, computer servers record time in universal UTC, while the lab clocks use local Indian Standard Time (IST, which is 5 hours and 30 minutes ahead).",
      "Let's align the clocks, check the login records, and test if the suspect was telling the truth."
    ],
    totoIntro: "Time tells no lies, Detective! Server logs use universal UTC time, while local clocks are in IST. Just add 5 hours and 30 minutes to UTC to see local time. Let's crack his alibi!",
    objectives: [
      "Convert the server time to local time (add 5 hours 30 mins).",
      "Check what time the suspect's user account actually logged out.",
      "Arrange the night's events in order from start to finish.",
      "Evaluate what the timeline reveals about the suspect's story."
    ],
    evidence: INITIAL_EVIDENCE.filter(e => e.level <= 3),
    challenges: [
      {
        id: 'l3-c1',
        title: 'Task 1: Convert the Server Time',
        type: 'timestamp-convert',
        order: 1,
        description: 'The computer log shows the mystery USB stick was plugged in at 18:00 UTC. What time was this on local clocks in India (UTC + 05:30)?',
        instruction: 'Add 5 hours and 30 minutes to 18:00 UTC to find the matching local time.',
        data: {
          unixTimestamp: 1735754400,
          workedExample: 'Easy Math: 18:00 + 5 hours = 23:00. Adding 30 minutes gives 23:30 (11:30 PM local time).',
          optionsUTC: [
            { id: '16:00', label: '16:00:00 UTC' },
            { id: '18:00', label: '18:00:00 UTC (Logged Server Time)' },
            { id: '20:00', label: '20:00:00 UTC' }
          ],
          optionsIST: [
            { id: '21:30', label: '21:30:00 IST (9:30 PM)' },
            { id: '23:30', label: '23:30:00 IST (11:30 PM: 18:00 plus 5h 30m)' },
            { id: '01:30', label: '01:30:00 IST (1:30 AM next day)' }
          ]
        },
        validation: {
          type: 'exact',
          answer: { utc: '18:00', ist: '23:30' }
        },
        feedbackCorrect: 'Exact calculation! 18:00 UTC plus 5 hours and 30 minutes equals 23:30 IST (11:30 PM local time).',
        feedbackIncorrect: 'Simple math check: start at 18:00 UTC. Add 5 hours to get 23:00. Add 30 minutes to get 23:30 IST.'
      },
      {
        id: 'l3-c2',
        title: 'Task 2: Check the Suspect\'s Logout Record',
        type: 'log-filter',
        order: 2,
        description: 'Elias Reed swore he left at 9:00 PM (21:00 IST). Look at the system login log for user "ereed". When did his account actually log out?',
        instruction: 'Find the official logout record in the log.',
        data: {
          filterField: 'username',
          users: ['ereed', 'avale', 'root'],
          question: 'At what time does the log show `Session 4 logged out. User ereed`?',
          options: [
            { id: 'time-1530', label: '15:30:10 UTC (21:00:10 IST: 9:00 PM, what Reed claimed)' },
            { id: 'time-1802', label: '18:02:15 UTC (23:32:15 IST: 11:32 PM, over two hours LATER!)' },
            { id: 'time-1817', label: '18:17:00 UTC (23:47:00 IST: 11:47 PM)' }
          ]
        },
        validation: {
          type: 'exact',
          answer: 'time-1802'
        },
        feedbackCorrect: 'Log entry verified! The system log proves Reed\'s account was active until 23:32 IST (11:32 PM), directly busting his 9:00 PM alibi!',
        feedbackIncorrect: 'Look for the line showing `Session 4 logged out. User ereed` at 18:02:15 UTC (23:32:15 IST).'
      },
      {
        id: 'l3-c3',
        title: 'Task 3: Put the Night\'s Events in Order',
        type: 'ordering',
        order: 3,
        description: 'Use the arrows to arrange the events from earliest (top) to latest (bottom):',
        instruction: 'Arrange the 5 events into the correct chronological timeline from 9:00 PM to 11:45 PM.',
        data: {
          events: [
            { id: 'ev-reed-claim', text: '1. Elias Reed claims he left the lab (9:00 PM / 21:00 IST)', orderKey: 1 },
            { id: 'ev-usb-insert', text: '2. Mystery USB stick plugged into the computer (11:30 PM / 23:30 IST)', orderKey: 2 },
            { id: 'ev-reed-logout', text: '3. Elias Reed\'s user account logs out (11:32 PM / 23:32 IST)', orderKey: 3 },
            { id: 'ev-vale-sudo', text: '4. Dr. Vale\'s account is used to delete the files (11:42 PM / 23:42 IST)', orderKey: 4 },
            { id: 'ev-usb-remove', text: '5. Mystery USB stick unplugged and hidden (11:45 PM / 23:45 IST)', orderKey: 5 }
          ]
        },
        validation: {
          type: 'order',
          answer: ['ev-reed-claim', 'ev-usb-insert', 'ev-reed-logout', 'ev-vale-sudo', 'ev-usb-remove']
        },
        feedbackCorrect: 'Timeline reconstructed! Looking at the true sequence, the computer was actively used and files were deleted between 11:30 PM and 11:45 PM.',
        feedbackIncorrect: 'Check the hours: 21:00 (claimed departure) -> 23:30 (USB plugged in) -> 23:32 (Reed logout) -> 23:42 (Vale account activity) -> 23:45 (USB unplugged).'
      },
      {
        id: 'l3-c4',
        title: 'Task 4: What Does the Timeline Prove?',
        type: 'single-select',
        order: 4,
        description: 'Now that you have aligned the times, what does the evidence prove about Elias Reed\'s story?',
        instruction: 'Select the conclusion that fits the verified facts.',
        data: {
          options: [
            {
              id: 'opt-proof-guilt',
              label: 'A) It proves Reed is a mastermind super-villain who acted completely alone.',
              explanation: 'Overstated: Logs show computer commands, but cannot explain why Dr. Vale\'s account was used ten minutes later.'
            },
            {
              id: 'opt-contradiction',
              label: 'B) Reed\'s alibi is broken: he was active until 11:32 PM, not 9:00 PM. But ten minutes later at 11:42 PM, Dr. Vale\'s account was also used.',
              explanation: 'Accurate and defensible! It proves Reed lied about his departure, while objectively noting that Dr. Vale\'s account was also used.'
            },
            {
              id: 'opt-reed-innocent',
              label: 'C) Computers make up random timestamps, so Reed must be telling the truth.',
              explanation: 'Flawed: System clocks and kernel authentication logs are exact and deterministic.'
            },
            {
              id: 'opt-insufficient',
              label: 'D) Timestamps don\'t matter at all in an investigation.',
              explanation: 'Flawed: Timestamps are essential to proving who was where and when.'
            }
          ]
        },
        validation: {
          type: 'exact',
          answer: 'opt-contradiction'
        },
        feedbackCorrect: 'Exact detective deduction! Reed\'s alibi is broken, but subsequent activity under Dr. Vale\'s account shows there is more to the story.',
        feedbackIncorrect: 'Look at the verified facts: Reed lied about leaving at 9:00 PM, but someone also used Dr. Vale\'s account at 11:42 PM. Choose Option B.'
      }
    ],
    hints: [
      {
        level: 3,
        index: 0,
        type: 'nudge',
        text: 'Nudge: Remember that Indian Standard Time (IST) is 5 hours and 30 minutes ahead of UTC. 18:00 UTC = 23:30 IST.'
      },
      {
        level: 3,
        index: 1,
        type: 'method',
        text: 'Method: In Task 2, find 18:02:15 UTC (which is 23:32 IST). In Task 3, arrange the events in chronological time order.'
      },
      {
        level: 3,
        index: 2,
        type: 'specific',
        text: 'Specific Guidance: Task 1: Select 18:00 UTC and 23:30 IST. Task 2: Select 18:02 (23:32 IST). Task 4: Select Option B.'
      }
    ],
    storyReveal: [
      "Reed's alibi is completely shattered: his account was active until 11:32 PM, right as the mystery USB drive was plugged in!",
      "Yet the mystery deepens: at 23:42 IST, ten minutes after Reed's account logged out, Dr. Adrian Vale's own account was used to delete the archive.",
      "Where did the stolen files go? Did someone walk out with them, or beam them across the internet?",
      "To find out, we must inspect the network cables and traffic logs!"
    ],
    totoReveal: "The timeline caught the lie! Reed claimed he left at 9:00 PM, but his account logged out at 11:32 PM. Now let's check who communicated across the network!",
    learningTakeaway: "Timestamps are the backbone of timeline reconstruction. Always normalize time zones (UTC vs local time). A timestamp proves WHEN an action occurred, which can confirm or bust an alibi.",
    nextLevelPreview: "Level 4: The Last Digital Trace: Inspect network traffic, connect the clues on the Case Board, and close the case."
  },

  // ==========================================
  // LEVEL 4: THE LAST DIGITAL TRACE
  // ==========================================
  {
    id: 4,
    title: 'Level 4: The Last Digital Trace',
    subtitle: 'Tracking the Network Leak and Closing the Case',
    difficulty: 'Advanced',
    briefing: [
      "We have reached the climax of the case!",
      "We know the mystery USB drive was inserted, the files were deleted, and Reed lied about leaving early.",
      "Right as the USB drive was unplugged, the laboratory router detected a large outgoing file transfer.",
      "Did the culprit carry the files out on the flash drive, or did they transmit them to a remote server across the internet?",
      "Inspect the network traffic, connect the clues on the Case Board, and write the official report to solve the mystery of Dr. Adrian Vale's disappearance!"
    ],
    totoIntro: "We are at the finish line, Detective! Track down the 47 MB network leak, link all your clues on the Case Board, and uncover the full truth!",
    objectives: [
      "Identify the external server that received the stolen 47 MB archive.",
      "Connect the clues on the visual Case Board.",
      "Determine the true explanation of what took place in Vault B-04.",
      "Sign and certify the final case report."
    ],
    evidence: INITIAL_EVIDENCE,
    challenges: [
      {
        id: 'l4-c1',
        title: 'Task 1: Track the Outgoing Network Leak',
        type: 'network-filter',
        order: 1,
        description: 'Look at the table of outgoing internet traffic from the workstation. One connection sent a massive 47.1 MB file out of the building!',
        instruction: 'Identify the external destination IP address and port that received the 47.1 MB data stream.',
        data: {
          sessions: [
            { id: 'sess-1', time: '18:05:00 UTC', src: '192.168.10.45', dst: '192.168.10.1', proto: 'DNS (UDP)', port: '53', bytes: '128 B', status: 'OK' },
            { id: 'sess-2', time: '18:10:14 UTC', src: '192.168.10.45', dst: '203.0.113.88', proto: 'TLS 1.3 (TCP)', port: '8443', bytes: '47.1 MB', status: 'EXFILTRATION (LEAK)' },
            { id: 'sess-3', time: '18:15:30 UTC', src: '192.168.10.45', dst: '172.16.0.12', proto: 'NTP (UDP)', port: '123', bytes: '96 B', status: 'OK' },
            { id: 'sess-4', time: '18:20:00 UTC', src: '192.168.10.45', dst: '192.168.10.254', proto: 'Syslog (UDP)', port: '514', bytes: '1.2 KB', status: 'OK' }
          ],
          questions: [
            {
              id: 'target-ip',
              prompt: 'Which external destination IP received the 47.1 MB file?',
              options: [
                { id: '192.168.10.1', label: '192.168.10.1 (Local office router)' },
                { id: '203.0.113.88', label: '203.0.113.88 (External Swiss server: shadow.vault-relay.ch)' },
                { id: '172.16.0.12', label: '172.16.0.12 (Internal clock server)' }
              ],
              correctAnswer: '203.0.113.88'
            },
            {
              id: 'target-proto',
              prompt: 'Which port and protocol carried the 47.1 MB file transfer?',
              options: [
                { id: 'port-53', label: 'Port 53 (DNS / Normal web lookups)' },
                { id: 'port-8443', label: 'Port 8443 (TLS Encrypted Stream)' },
                { id: 'port-123', label: 'Port 123 (Clock sync)' }
              ],
              correctAnswer: 'port-8443'
            }
          ]
        },
        validation: {
          type: 'exact',
          answer: { 'target-ip': '203.0.113.88', 'target-proto': 'port-8443' }
        },
        feedbackCorrect: 'Leak spotted! The 47.1 MB payload matches the carved archive size. It was transmitted to external Swiss IP 203.0.113.88 on encrypted port 8443!',
        feedbackIncorrect: 'Look at the table: find the row with volume `47.1 MB` marked as `EXFILTRATION (LEAK)`. Destination is 203.0.113.88 on port 8443.'
      },
      {
        id: 'l4-c2',
        title: 'Task 2: Connect the Clues on the Case Board',
        type: 'correlation',
        order: 2,
        description: 'Connect the 4 crucial pieces of evidence on your Investigation Board to reconstruct the full transfer chain.',
        instruction: 'Establish the core evidentiary relationships on the Case Board connecting the USB drive, deleted file, network leak, and tampered video.',
        data: {
          targetConnections: [
            { from: 'ev-usb-inventory', to: 'ev-deleted-catalog', label: 'Physical Storage to File Carving' },
            { from: 'ev-deleted-catalog', to: 'ev-pcap-summary', label: 'Carved 45.2MB Archive to 47.1MB Network Exfiltration' },
            { from: 'ev-pcap-summary', to: 'ev-cctv-export', label: 'Exfiltration Window to CCTV Hash Discrepancy' }
          ]
        },
        validation: {
          type: 'exact',
          answer: 'board-correlated'
        },
        feedbackCorrect: 'Magnificent correlation! You linked the physical USB drive -> recovered deleted file -> network leak -> altered camera video. Every contact left an indisputable trace!',
        feedbackIncorrect: 'Connect the key clues on the Case Board: the unregistered USB drive, the recovered deleted file, the network packet capture, and the hallway camera video.'
      },
      {
        id: 'l4-c3',
        title: 'Task 3: The Final Detective Deduction',
        type: 'single-select',
        order: 3,
        description: 'Putting together the tampered camera video, the hidden USB drive, the carved file, the broken alibi, and the 47 MB network leak, what is the true explanation?',
        instruction: 'Choose the deduction supported by the evidence.',
        data: {
          options: [
            {
              id: 'hyp-1',
              label: 'A) Elias Reed acted completely alone and carried the files in his pocket on the USB drive.',
              explanation: 'Flawed: Ignores the network transfer to the Swiss server and Dr. Vale\'s account being used at 11:42 PM!'
            },
            {
              id: 'hyp-2',
              label: 'B) Someone in the lab between 11:30 and 11:45 PM used the USB drive and workstation to transmit the files to the Swiss server, while tampering with the camera to hide their face. Reed\'s alibi is false, but both user accounts were involved.',
              explanation: 'Correct! This fits every single verified fact: the broken alibi, the USB insertion, the deleted file, the network transfer, and the tampered camera video.'
            },
            {
              id: 'hyp-3',
              label: 'C) The files disappeared due to bad weather and computer glitches.',
              explanation: 'Absurd: Does not explain deliberate file deletion, network transfers, or altered hashes.'
            }
          ]
        },
        validation: {
          type: 'exact',
          answer: 'hyp-2'
        },
        feedbackCorrect: 'Masterful deduction! The digital evidence proves what happened and when, while acknowledging that camera tampering hid the perpetrator\'s physical face.',
        feedbackIncorrect: 'Look at the total evidence: Reed lied about leaving early, but the files were beamed out to a Swiss server, and the camera video was altered. Choose Hypothesis B.'
      },
      {
        id: 'l4-c4',
        title: 'Task 4: Sign and Certify the Case Report',
        type: 'report',
        order: 4,
        description: 'Review your completed investigation summary and add your signature to solve the case.',
        instruction: 'Click Submit Clue Answer to certify the official incident report and achieve Master Detective rank.',
        data: {
          sections: [
            'Executive Incident Summary',
            'Evidence Analyzed & Integrity Assessment',
            'Timeline Reconstruction & Normalization',
            'Locard\'s Exchange Principle Correlation',
            'Defensible Conclusions & Recommendations'
          ]
        },
        validation: {
          type: 'exact',
          answer: 'report-signed'
        },
        feedbackCorrect: 'Case Report approved and certified! Your findings have been archived with full cryptographic hashing. You have successfully solved the mystery of The Last Digital Trace!',
        feedbackIncorrect: 'Please review and confirm all required sections of the final case report before signing off.'
      }
    ],
    hints: [
      {
        level: 4,
        index: 0,
        type: 'nudge',
        text: 'Nudge: Check the network traffic table for the 47.1 MB transfer on port 8443.'
      },
      {
        level: 4,
        index: 1,
        type: 'method',
        text: 'Method: The destination IP is 203.0.113.88. On the Case Board, link the USB to the carved file, the file to the network leak, and the leak to the camera video.'
      },
      {
        level: 4,
        index: 2,
        type: 'specific',
        text: 'Specific Guidance: Target IP is 203.0.113.88, port 8443. For Task 3, select Hypothesis B, which gives the complete explanation.'
      }
    ],
    storyReveal: [
      "The comprehensive forensic investigation has solved the mystery of Blackthorn Vault B-04:",
      "At 23:30 IST, an unauthorized physical operator inserted the SanDisk USB into WS-04, logged out Reed's abandoned session, and accessed Dr. Vale's console.",
      "Between 23:40 and 23:44 IST, the 45.2 MB Project Elysium archive was exfiltrated across an encrypted TLS tunnel to an offshore server (203.0.113.88).",
      "The perpetrator then unlinked the inode and modified the CCTV export hash in an attempt to hide the transfer and frame Elias Reed.",
      "Thanks to Locard's Exchange Principle, every digital contact left an indelible footprint in unallocated blocks, kernel logs, and network packets.",
      "Dr. Vale's parting words have been proven true: 'Every action leaves a trace. Find the first trace, and you will understand the last.'"
    ],
    totoReveal: "Case Closed, Master Detective! You proved that every physical and digital action leaves a trace. The evidence revealed the truth, fair and square!",
    learningTakeaway: "Locard's Exchange Principle is the bedrock of modern digital forensics. Every network handshake, inode update, and peripheral connection leaves digital material behind. The forensic investigator's duty is to scientifically discover, verify, and correlate these traces to seek the truth without bias.",
    nextLevelPreview: "Case Closed: Master Detective Rank achieved! Review your full Case Report, Case Board connections, or explore the Forensic Help Library."
  }
];

