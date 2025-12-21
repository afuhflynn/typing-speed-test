type Difficulty = "EASY" | "MEDIUM" | "HARD";
type Mode = "TIMED" | "PASSAGE";

interface TestState {
  text: string;
  input: string;
  timer: Timer;
  wpm: number;
  accuracy: number;
  errors: number;
  chars: number;
  mode: Mode;
  difficulty: Difficulty;
}

type TypingState = "TYPING" | "PAUSED" | "NEW";

interface Timer {
  h?: number; // hours
  m: number; // minutes
  s: number; // seconds
}

interface SettingsState {
  mode: Mode;
  difficulty: Difficulty;
}

interface PersonalBestState {
  wpm: number;
}

interface ResultsState {
  wpm: number;
  accuracy: number;
  chars: number;
}

interface StoreState {
  test: TestState;
  settings: SettingsState;
  personalBest: PersonalBestState;
  typingState: TypingState;
  setTypingState: (typingState: TypingState) => void;
  results: ResultsState;
  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: Mode) => void;
}
