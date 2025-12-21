import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTypingStore = create<StoreState>()(
  persist(
    (set, get) => ({
      test: {
        text: "",
        input: "",
        timer: {
          m: 0,
          s: 60,
        },
        wpm: 0,
        accuracy: 0,
        errors: 0,
        chars: 0,
        mode: "TIMED",
        difficulty: "HARD",
      },
      settings: {
        mode: "TIMED",
        difficulty: "HARD",
      },
      personalBest: {
        wpm: 0,
      },
      results: {
        wpm: 0,
        accuracy: 0,
        chars: 0,
      },
      setDifficulty(difficulty) {
        const { test } = get();
        set({
          test: {
            ...test,
            difficulty,
          },
        });
      },
      setMode(mode) {
        const { test } = get();
        set({
          test: {
            ...test,
            mode,
          },
        });
      },
    }),
    {
      name: "typing-speed-test",
    }
  )
);
