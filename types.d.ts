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

type TypingState = "TYPING" | "PAUSED" | "NEW" | "COMPLETE";

interface Timer {
  h?: number; // hours
  m: number; // minutes
  s: number; // seconds
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
  personalBest: PersonalBestState;
  typingState: TypingState;
  setTypingState: (typingState: TypingState) => void;
  results: ResultsState;
  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: Mode) => void;
  setTimerValue: (key: string, value: number) => void;
  setText: (text: string) => void;
  setInput: (input: string) => void;
  restartTyping: () => void;
  setWPMValue: (value: number) => void;
  setAccuracyValue: (value: number) => void;
  setCharsValue: (value: number) => void;
  setErrorsValue: (value: number) => void;
  resetTest: () => void;
}
