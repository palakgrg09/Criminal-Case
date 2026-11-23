# CRIMINAL CASE: The Digital Evidence Files

<div align="center">

```
   _____ _____  _____ __  __ _____ _   _          _        _____           _____ ______ 
  / ____|  __ \|_   _|  \/  |_   _| \ | |   /\   | |      / ____|   /\    / ____|  ____|
 | |    | |__) | | | | \  / | | | |  \| |  /  \  | |     | |       /  \  | (___ | |__   
 | |    |  _  /  | | | |\/| | | | | . ` | / /\ \ | |     | |      / /\ \  \___ \|  __|  
 | |____| | \ \ _| |_| |  | |_| |_| |\  |/ ____ \| |____ | |____ / ____ \ ____) | |____ 
  \_____|_|  \_\_____|_|  |_|_____|_| \_/_/    \_\______| \_____/_/    \_\_____/|______|
```

**An Interactive, Story-Driven Digital Forensics Detective Game**

[![React](https://img.shields.io/badge/React-19.3.1-blue.svg?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.5-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

*Investigate a locked-room cyber mystery, preserve volatile memory, carve deleted archives, normalize timestamps, inspect network exfiltration streams, and uncover the truth with your partner TOTO.*

[Play Game Demo](#quick-start) • [Case Storyline & Walkthrough](STORYLINE_AND_SOLUTIONS.md) • [Tech Stack & Architecture](TECH_STACK_AND_ARCHITECTURE.md)

</div>

---

## The Mystery: The Vanishing of Vault B-04

Late on New Year's night at 11:55 PM (23:55 IST), alarms sounded inside the high-security research wing of Blackthorn Labs. 

When security officers reached **Vault B-04**, they discovered:
- The reinforced steel door was bolted from the inside.
- Senior scientist **Dr. Adrian Vale** had vanished into thin air.
- His primary computer workstation (**WS-04**) was left powered on in an active session.
- The laboratory's crown jewel, the encrypted **Project Elysium Core Archive (45.2 MB)**, had disappeared from the storage drive.
- Pinned to the glowing monitor was a yellow note in Dr. Vale's handwriting:
  > *"Every action leaves a trace. Find the first trace, and you will understand the last."*

Security immediately blamed junior assistant **Elias Reed**, whose access badge logged into the outer corridor earlier that evening. Reed insists he left the building at 9:00 PM and knows nothing about the breach.

Together with your detective partner **TOTO**, your mission is to step into Vault B-04, collect real digital clues, operate forensic workstation tools, reconstruct the timeline, and close the case!

---

## Key Features

### 1. Authentic Digital Forensics Methodology
- **Locard's Exchange Principle**: Physical interactions invariably leave electronic traces across file systems, kernel logs, and network sockets.
- **Order of Volatility (RFC 3227)**: Learn why pulling the plug or shutting down a running computer destroys live RAM and temporary evidence.
- **Cryptographic Hash Verification (SHA-256)**: Mathematically verify video and file integrity to detect tampering and frame manipulation.
- **Deleted File Recovery & Inodes**: Discover how operating systems delete files by unlinking directory pointers while raw data remains in unallocated blocks.
- **Magic Byte Signature Inspection**: Unmask deceptive files where archives are disguised behind innocent `.jpg` photo extensions using `50 4B 03 04` (`PK`) headers.
- **Timezone Normalization (UTC vs IST)**: Convert Coordinated Universal Time server logs to local Indian Standard Time (UTC+05:30) to test suspect alibis.
- **Network Packet Analysis (PCAP)**: Analyze external IP destinations, port numbers, and data transfer volumes to trace data exfiltration leaks.

### 2. Interactive Detective Workstation
- **Virtual Forensic Terminal**: Complete with simulated Linux file systems, directory navigation, file carving commands (`ls`, `cat`, `stat`, `file`, `recover`), and 1-click shortcut buttons for zero typing friction.
- **Visual Investigation Board**: Pin and link evidence cards on a vintage corkboard with real-time vector red connecting strings.
- **Interactive Forensic Tools Suite**:
  - Live SHA-256 hash generator
  - Bi-directional Unix Epoch / UTC / IST timestamp converter
  - Hexadecimal magic byte file signature inspector
  - Searchable network traffic packet filter
- **Partner TOTO**: A supportive companion providing 3-tier progressive clues (Gentle Nudge &rarr; Investigative Method &rarr; Direct Guidance) and a beginner-friendly detective survival guide.
- **14-Chapter Field Reference Manual**: Searchable illustrated guide covering digital forensic science, legal guidelines (Daubert/Frye standards), and chain of custody rules (ISO/IEC 27037).

### 3. Tactile Vintage Scrapbook Aesthetic
- Bespoke **Sage Green** (`#879477`), **Forest Olive** (`#515B3A`), **Antique Beige** (`#E5D5B7`), and **Old Ivory** (`#F3E9D2`) palette.
- Handcrafted illustrated SVG vintage stickers (Detective emblem, camera with starburst flash, miniature crime scene newspapers, vintage typewriter, brass magnifying glass).
- Clean, accessible buttons with zero confusing subtitles or generic gaming tropes.

### 4. Stateful Scoring & Rank Progression
- Dynamic scoring with penalty mitigation for incorrect attempts.
- Rank elevation across 5 detective tiers:
  1. **Rookie Sleuth** (0 to 200 PTS)
  2. **Field Investigator** (201 to 450 PTS)
  3. **Senior Detective** (451 to 700 PTS)
  4. **Lead Forensic Examiner** (701 to 900 PTS)
  5. **Master Detective** (901+ PTS)
- Automatic browser LocalStorage persistence (`criminal_case_save_v2`).

---

## Case Structure: The 4 Investigation Levels

```
+---------------------------------------------------------------------------------------------------+
| LEVEL 1: THE LOCKED LABORATORY                                                                    |
| Goal: Secure the crime scene, preserve live RAM, check camera hashes, and log the foreign USB.    |
+---------------------------------------------------------------------------------------------------+
| LEVEL 2: THE GHOST FILE                                                                           |
| Goal: Search the hard drive, carve deleted inodes, unmask disguised archives, and find the note.  |
+---------------------------------------------------------------------------------------------------+
| LEVEL 3: THE IMPOSSIBLE TIMELINE                                                                  |
| Goal: Normalize UTC to IST (+5h 30m), audit user session logs, reconstruct chronology, bust alibi.|
+---------------------------------------------------------------------------------------------------+
| LEVEL 4: THE LAST DIGITAL TRACE                                                                   |
| Goal: Track 47.1 MB outbound network leak to Swiss server, link Case Board, and certify report.   |
+---------------------------------------------------------------------------------------------------+
```

---

## Tech Stack & Architecture

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Functional components, custom hooks, Context API |
| **Language** | [TypeScript 7](https://www.typescriptlang.org/) | Strict typing, robust type guards, zero `any` leaks |
| **Bundler** | [Vite 8](https://vitejs.dev/) | Lightning-fast HMR and ESM build pipeline |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | `@tailwindcss/vite` integration, custom paper design tokens |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, accessible SVG iconography |
| **Persistence** | Web Storage API | Auto-saving state to browser `localStorage` |

For an in-depth code architecture breakdown, see [TECH_STACK_AND_ARCHITECTURE.md](TECH_STACK_AND_ARCHITECTURE.md).

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18.0 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation & Launch

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/criminal-case.git
   cd criminal-case
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## Directory Organization

```
Criminal_Case/
├── index.html                    # Root HTML entry point
├── package.json                  # Scripts and dependencies
├── vite.config.ts                # Vite configuration with Tailwind CSS v4
├── tsconfig.json                 # TypeScript compiler configuration
├── STORYLINE_AND_SOLUTIONS.md    # Master storyline & complete solution walkthrough
├── TECH_STACK_AND_ARCHITECTURE.md# System architecture & technical documentation
└── src/
    ├── main.tsx                  # Application bootstrap
    ├── App.tsx                   # Master screen coordinator and modal host
    ├── types/
    │   └── game.ts               # Type definitions for GameState, Levels, Challenges, Evidence
    ├── context/
    │   └── GameStateContext.tsx  # Centralized state store, evaluation engine & storage sync
    ├── data/
    │   ├── levelsData.ts         # 4 levels, 16 challenges, validation rules, hints, and reveals
    │   ├── evidenceData.ts       # 11 realistic forensic evidence items and technical metadata
    │   ├── terminalData.ts       # Virtual terminal filesystem, simulated commands and binaries
    │   └── helpArticlesData.ts   # 14 forensic field manual reference articles
    └── components/
        ├── layout/               # Header, rank badge, score ticker, quick nav
        ├── menu/                 # Main menu hero scrapbook screen
        ├── investigation/        # Primary investigation screen and evidence drawer
        ├── level/                # Polymorphic challenge renderer and briefing/victory modals
        ├── board/                # Interactive corkboard pinboard with dynamic SVG red threads
        ├── evidence/             # Deep inspection evidence modal
        ├── hints/                # Partner TOTO hint drawer with 3-tier progressive unlock
        ├── terminal/             # Forensic terminal emulator with 1-click shortcut buttons
        ├── tools/                # Forensic tools modal (Hashes, Epoch time, Hex signatures, PCAP)
        ├── report/               # Final case report signing and cryptographic certification
        └── common/               # Handcrafted vintage SVG stickers and accessible modal shells
```

---

## Project Documentation

Detailed documentation files are included directly in the repository:

- **[STORYLINE_AND_SOLUTIONS.md](STORYLINE_AND_SOLUTIONS.md)**: Contains the complete narrative arc, the true crime timeline, detailed walkthroughs for all 16 tasks, and a quick-lookup solution cheat sheet.
- **[TECH_STACK_AND_ARCHITECTURE.md](TECH_STACK_AND_ARCHITECTURE.md)**: In-depth technical guide covering component design, polymorphic rendering, custom SVG sticker algorithms, the evaluation engine, and curriculum alignment.

---

## Educational Use

This project was built for university computer science departments, cybersecurity bootcamps, and digital forensics workshops. It introduces practical investigative principles in a gamified environment where every deduction is supported by authentic data traces.

Teachers and workshop hosts can use [STORYLINE_AND_SOLUTIONS.md](STORYLINE_AND_SOLUTIONS.md) as an instructor answer key.

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with care for aspiring digital forensic detectives. Remember: <b>Every action leaves a trace.</b></sub>
</div>
