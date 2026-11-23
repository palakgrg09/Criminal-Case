import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  GameState,
  Screen,
  TotoMessage,
  TerminalEntry,
  BoardConnection,
  ReportData,
  GameSettings,
  ChallengeResult
} from '../types/game';
import { LEVELS } from '../data/levelsData';
import { executeSimulatedCommand } from '../data/terminalData';

const STORAGE_KEY = 'criminal_case_save_v2';

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  reducedMotion: false,
  fontSize: 'normal',
  theme: 'beige'
};

const INITIAL_BOARD_CONNECTIONS: BoardConnection[] = [
  { from: 'ev-incident-report', to: 'ev-cctv-export', label: 'Initial Scene Link' }
];

const INITIAL_STATE: GameState = {
  currentLevel: 1,
  unlockedLevels: [1],
  completedLevels: [],
  totalScore: 0,
  levelScores: { 1: 0, 2: 0, 3: 0, 4: 0 },
  hintsRevealed: { 1: [], 2: [], 3: [], 4: [] },
  hintsDeducted: { 1: [], 2: [], 3: [], 4: [] },
  incorrectAttempts: {},
  discoveredEvidence: ['ev-incident-report', 'ev-cctv-export', 'ev-workstation-ws04', 'ev-usb-inventory', 'ev-chain-of-custody'],
  challengeResults: {},
  boardConnections: INITIAL_BOARD_CONNECTIONS,
  reportData: null,
  settings: DEFAULT_SETTINGS,
  currentScreen: 'main-menu',
  activeChallenge: 'l1-c1',
  totoMessages: [
    {
      id: 'init-msg',
      text: "Welcome to Criminal Case, Detective! I'm TOTO, your partner. Whenever you need a hint, just click 'Ask TOTO'!",
      type: 'tip',
      level: 1,
      timestamp: Date.now()
    }
  ],
  terminalHistory: [
    {
      id: 'term-welcome',
      command: 'help',
      output: "Blackthorn Forensics Terminal v2.5 // Case #BT-0881\nClick shortcuts below to run forensic commands without typing!",
      level: 1,
      timestamp: Date.now()
    }
  ],
  investigatorRank: 'Rookie Detective',
  firstAttemptCorrect: {}
};

interface GameContextType {
  gameState: GameState;
  setScreen: (screen: Screen) => void;
  startLevel: (levelId: number) => void;
  submitChallenge: (challengeId: string, answer: any) => { success: boolean; feedback: string };
  revealHint: (levelId: number, hintIndex: number) => void;
  executeTerminal: (command: string) => void;
  addBoardConnection: (from: string, to: string, label?: string) => void;
  removeBoardConnection: (from: string, to: string) => void;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  saveReport: (report: ReportData) => void;
  resetGame: () => void;
  calculateRank: (score: number) => string;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved state:', e);
    }
    return INITIAL_STATE;
  });

  // Automatically persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.warn('Failed to save state to localStorage:', e);
    }
  }, [gameState]);

  const calculateRank = (score: number): string => {
    if (score >= 300) return 'Master Detective';
    if (score >= 200) return 'Lead Investigator';
    if (score >= 100) return 'Crime Analyst';
    return 'Rookie Detective';
  };

  const setScreen = (screen: Screen) => {
    setGameState(prev => ({ ...prev, currentScreen: screen }));
  };

  const startLevel = (levelId: number) => {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    // Discover evidence for this level
    const newEvidenceIds = level.evidence.map(e => e.id);

    setGameState(prev => {
      const allEvidence = Array.from(new Set([...prev.discoveredEvidence, ...newEvidenceIds]));
      const firstChallenge = level.challenges[0]?.id || null;

      const welcomeMsg: TotoMessage = {
        id: `toto-lvl-${levelId}-${Date.now()}`,
        text: level.totoIntro,
        type: 'tip',
        level: levelId,
        timestamp: Date.now()
      };

      return {
        ...prev,
        currentLevel: levelId,
        activeChallenge: firstChallenge,
        currentScreen: 'investigation',
        discoveredEvidence: allEvidence,
        totoMessages: [...prev.totoMessages, welcomeMsg]
      };
    });
  };

  const revealHint = (levelId: number, hintIndex: number) => {
    setGameState(prev => {
      const currentLevelHints = prev.hintsRevealed[levelId] || [];
      if (currentLevelHints.includes(hintIndex)) {
        return prev; // already revealed, no deduction
      }

      const level = LEVELS.find(l => l.id === levelId);
      const hint = level?.hints[hintIndex];
      if (!hint) return prev;

      const alreadyDeducted = (prev.hintsDeducted[levelId] || []).includes(hintIndex);
      const pointsToDeduct = alreadyDeducted ? 0 : 10;

      const currentLvlScore = prev.levelScores[levelId] || 0;
      const newLvlScore = Math.max(0, currentLvlScore - pointsToDeduct);
      const newTotalScore = Math.max(0, prev.totalScore - pointsToDeduct);

      const hintMsg: TotoMessage = {
        id: `hint-${levelId}-${hintIndex}-${Date.now()}`,
        text: `[TOTO'S CLUE ${hintIndex + 1}/3]: ${hint.text}`,
        type: 'hint',
        level: levelId,
        timestamp: Date.now()
      };

      return {
        ...prev,
        totalScore: newTotalScore,
        levelScores: {
          ...prev.levelScores,
          [levelId]: newLvlScore
        },
        hintsRevealed: {
          ...prev.hintsRevealed,
          [levelId]: [...currentLevelHints, hintIndex]
        },
        hintsDeducted: {
          ...prev.hintsDeducted,
          [levelId]: alreadyDeducted ? prev.hintsDeducted[levelId] : [...(prev.hintsDeducted[levelId] || []), hintIndex]
        },
        investigatorRank: calculateRank(newTotalScore),
        totoMessages: [...prev.totoMessages, hintMsg]
      };
    });
  };

  const submitChallenge = (challengeId: string, answer: any): { success: boolean; feedback: string } => {
    const currentLevel = LEVELS.find(l => l.id === gameState.currentLevel);
    if (!currentLevel) return { success: false, feedback: 'Level not found.' };

    const challenge = currentLevel.challenges.find(c => c.id === challengeId);
    if (!challenge) return { success: false, feedback: 'Challenge not found.' };

    let isCorrect = false;

    // Challenge validation
    switch (challenge.type) {
      case 'multi-select': {
        const expected = (challenge.validation.answer as string[]).slice().sort();
        const given = (Array.isArray(answer) ? answer : []).slice().sort();
        isCorrect = JSON.stringify(expected) === JSON.stringify(given);
        break;
      }
      case 'single-select': {
        isCorrect = answer === challenge.validation.answer;
        break;
      }
      case 'hash-compare': {
        const expected = challenge.validation.answer;
        isCorrect =
          answer &&
          answer['hash-match'] === expected['hash-match'] &&
          answer['hash-implication'] === expected['hash-implication'];
        break;
      }
      case 'form-fill': {
        const expected = challenge.validation.answer;
        isCorrect =
          answer &&
          answer.evidenceId?.trim().toUpperCase() === expected.evidenceId.toUpperCase() &&
          answer.itemType === expected.itemType &&
          answer.integrityAction === expected.integrityAction;
        break;
      }
      case 'terminal': {
        isCorrect = true;
        break;
      }
      case 'file-identify': {
        isCorrect = answer === challenge.validation.answer;
        break;
      }
      case 'timestamp-convert': {
        const expected = challenge.validation.answer;
        isCorrect = answer && answer.utc === expected.utc && answer.ist === expected.ist;
        break;
      }
      case 'log-filter': {
        isCorrect = answer === challenge.validation.answer;
        break;
      }
      case 'ordering': {
        const expected = challenge.validation.answer as string[];
        isCorrect = Array.isArray(answer) && JSON.stringify(answer) === JSON.stringify(expected);
        break;
      }
      case 'network-filter': {
        const expected = challenge.validation.answer;
        isCorrect =
          answer &&
          answer['target-ip'] === expected['target-ip'] &&
          answer['target-proto'] === expected['target-proto'];
        break;
      }
      case 'correlation': {
        isCorrect = true;
        break;
      }
      case 'report': {
        isCorrect = true;
        break;
      }
      default:
        isCorrect = true;
    }

    const previousAttempts = gameState.incorrectAttempts[challengeId] || 0;
    const isFirstAttempt = previousAttempts === 0 && !gameState.challengeResults[challengeId]?.completed;

    if (isCorrect) {
      let pointsAwarded = 25;
      if (challenge.bonusChallenge) pointsAwarded += 15;
      if (isFirstAttempt) pointsAwarded += 10;

      setGameState(prev => {
        const newLvlScore = (prev.levelScores[prev.currentLevel] || 0) + pointsAwarded;
        const newTotalScore = prev.totalScore + pointsAwarded;

        const updatedResults: Record<string, ChallengeResult> = {
          ...prev.challengeResults,
          [challengeId]: {
            challengeId,
            completed: true,
            score: pointsAwarded,
            attempts: previousAttempts + 1,
            selectedAnswers: Array.isArray(answer) ? answer : [String(answer)],
            timestamp: Date.now()
          }
        };

        const allChallengesDone = currentLevel.challenges.every(c =>
          c.id === challengeId ? true : updatedResults[c.id]?.completed
        );

        let nextUnlocked = [...prev.unlockedLevels];
        let nextCompleted = [...prev.completedLevels];
        let nextScreen = prev.currentScreen;
        let bonusLevelCompletePoints = 0;

        if (allChallengesDone && !prev.completedLevels.includes(prev.currentLevel)) {
          nextCompleted.push(prev.currentLevel);
          bonusLevelCompletePoints = 100;

          if (prev.currentLevel < 4 && !nextUnlocked.includes(prev.currentLevel + 1)) {
            nextUnlocked.push(prev.currentLevel + 1);
          }
          nextScreen = 'level-complete';
        }

        const finalTotal = newTotalScore + bonusLevelCompletePoints;

        const currentIndex = currentLevel.challenges.findIndex(c => c.id === challengeId);
        const nextChallenge = currentLevel.challenges[currentIndex + 1]?.id || challengeId;

        const feedbackMsg: TotoMessage = {
          id: `feed-correct-${Date.now()}`,
          text: `🐾 [SOLVED]: ${challenge.feedbackCorrect}`,
          type: 'feedback',
          level: prev.currentLevel,
          timestamp: Date.now()
        };

        return {
          ...prev,
          totalScore: finalTotal,
          levelScores: {
            ...prev.levelScores,
            [prev.currentLevel]: newLvlScore + bonusLevelCompletePoints
          },
          challengeResults: updatedResults,
          completedLevels: nextCompleted,
          unlockedLevels: nextUnlocked,
          currentScreen: nextScreen,
          activeChallenge: nextChallenge,
          investigatorRank: calculateRank(finalTotal),
          totoMessages: [...prev.totoMessages, feedbackMsg],
          firstAttemptCorrect: {
            ...prev.firstAttemptCorrect,
            [challengeId]: isFirstAttempt
          }
        };
      });

      return { success: true, feedback: challenge.feedbackCorrect };
    } else {
      setGameState(prev => {
        const curLvlScore = prev.levelScores[prev.currentLevel] || 0;
        const newLvlScore = Math.max(0, curLvlScore - 5);
        const newTotalScore = Math.max(0, prev.totalScore - 5);

        const feedbackMsg: TotoMessage = {
          id: `feed-incorrect-${Date.now()}`,
          text: `🐾 [TRY AGAIN]: ${challenge.feedbackIncorrect}`,
          type: 'feedback',
          level: prev.currentLevel,
          timestamp: Date.now()
        };

        return {
          ...prev,
          totalScore: newTotalScore,
          levelScores: {
            ...prev.levelScores,
            [prev.currentLevel]: newLvlScore
          },
          incorrectAttempts: {
            ...prev.incorrectAttempts,
            [challengeId]: previousAttempts + 1
          },
          investigatorRank: calculateRank(newTotalScore),
          totoMessages: [...prev.totoMessages, feedbackMsg]
        };
      });

      return { success: false, feedback: challenge.feedbackIncorrect };
    }
  };

  const executeTerminal = (command: string) => {
    const response = executeSimulatedCommand(command, gameState.currentLevel);

    if (response.output === '__CLEAR__') {
      setGameState(prev => ({ ...prev, terminalHistory: [] }));
      return;
    }

    const newEntry: TerminalEntry = {
      id: `term-${Date.now()}`,
      command,
      output: response.output,
      level: gameState.currentLevel,
      timestamp: Date.now()
    };

    setGameState(prev => {
      let newEvidence = [...prev.discoveredEvidence];
      if (command.includes('project_elysium') || command.includes('recover') || command.includes('1441892')) {
        if (!newEvidence.includes('ev-deleted-catalog')) newEvidence.push('ev-deleted-catalog');
      }

      return {
        ...prev,
        terminalHistory: [...prev.terminalHistory, newEntry],
        discoveredEvidence: newEvidence
      };
    });
  };

  const addBoardConnection = (from: string, to: string, label?: string) => {
    setGameState(prev => {
      const exists = prev.boardConnections.some(
        c => (c.from === from && c.to === to) || (c.from === to && c.to === from)
      );
      if (exists) return prev;
      return {
        ...prev,
        boardConnections: [...prev.boardConnections, { from, to, label: label || 'Investigative Link' }]
      };
    });
  };

  const removeBoardConnection = (from: string, to: string) => {
    setGameState(prev => ({
      ...prev,
      boardConnections: prev.boardConnections.filter(
        c => !(c.from === from && c.to === to) && !(c.from === to && c.to === from)
      )
    }));
  };

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const saveReport = (report: ReportData) => {
    setGameState(prev => ({
      ...prev,
      reportData: report
    }));
  };

  const resetGame = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setGameState(INITIAL_STATE);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setScreen,
        startLevel,
        submitChallenge,
        revealHint,
        executeTerminal,
        addBoardConnection,
        removeBoardConnection,
        updateSettings,
        saveReport,
        resetGame,
        calculateRank
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}
