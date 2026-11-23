// CRIMINAL CASE: THE DIGITAL EVIDENCE FILES: Core Types

export interface GameState {
  currentLevel: number;
  unlockedLevels: number[];
  completedLevels: number[];
  totalScore: number;
  levelScores: Record<number, number>;
  hintsRevealed: Record<number, number[]>; // level -> hint indices
  hintsDeducted: Record<number, number[]>; // hints already deducted
  incorrectAttempts: Record<string, number>; // challengeId -> count
  discoveredEvidence: string[];
  challengeResults: Record<string, ChallengeResult>;
  boardConnections: BoardConnection[];
  reportData: ReportData | null;
  settings: GameSettings;
  currentScreen: Screen;
  activeChallenge: string | null;
  totoMessages: TotoMessage[];
  terminalHistory: TerminalEntry[];
  investigatorRank: string;
  firstAttemptCorrect: Record<string, boolean>;
}

export type Screen =
  | 'main-menu'
  | 'investigation'
  | 'level-briefing'
  | 'level-complete'
  | 'help-library'
  | 'case-board'
  | 'settings'
  | 'final-report';

export interface ChallengeResult {
  challengeId: string;
  completed: boolean;
  score: number;
  attempts: number;
  selectedAnswers?: string[];
  textAnswer?: string;
  timestamp: number;
}

export interface BoardConnection {
  from: string;
  to: string;
  label?: string;
}

export interface ReportData {
  incidentSummary: string;
  evidenceExamined: string[];
  hashObservations: string;
  timeline: string;
  fileSystemFindings: string;
  networkFindings: string;
  connections: string;
  alternativeHypotheses: string;
  limitations: string;
  conclusion: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'x-large';
  theme: 'beige' | 'sepia';
}

export interface TotoMessage {
  id: string;
  text: string;
  type: 'hint' | 'feedback' | 'tip';
  level: number;
  timestamp: number;
}

export interface TerminalEntry {
  id: string;
  command: string;
  output: string;
  level: number;
  timestamp: number;
}

export interface LevelData {
  id: number;
  title: string;
  subtitle: string;
  difficulty: string;
  briefing: string[];
  totoIntro: string;
  objectives: string[];
  evidence: EvidenceItem[];
  challenges: Challenge[];
  hints: Hint[];
  storyReveal: string[];
  totoReveal: string;
  learningTakeaway: string;
  nextLevelPreview: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  metadata?: Record<string, string>;
  level: number;
  icon: string;
}

export interface Challenge {
  id: string;
  title: string;
  type: ChallengeType;
  description: string;
  instruction: string;
  data: any;
  validation: ValidationRule;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  bonusChallenge?: boolean;
  order: number;
}

export type ChallengeType =
  | 'multi-select'
  | 'single-select'
  | 'ordering'
  | 'hash-compare'
  | 'form-fill'
  | 'terminal'
  | 'file-identify'
  | 'timestamp-convert'
  | 'log-filter'
  | 'network-filter'
  | 'correlation'
  | 'report';

export interface ValidationRule {
  type: 'exact' | 'includes-all' | 'includes-any' | 'order' | 'form' | 'custom';
  answer: any;
  minCorrect?: number;
}

export interface Hint {
  level: number;
  index: number;
  text: string;
  type: 'nudge' | 'method' | 'specific';
}

export interface HelpArticle {
  id: string;
  title: string;
  category: string;
  explanation: string;
  whyItMatters: string;
  whenUsed: string;
  example: string;
  commonMistakes: string[];
  relatedLevels: number[];
  commands?: CommandReference[];
}

export interface CommandReference {
  command: string;
  description: string;
  usage: string;
  example: string;
  output: string;
}
