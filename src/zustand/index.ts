import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTypingStore = create<StoreState>()(
  persist(
    (set, get) => ({
      test: {
        text: "",
        input: "",
        prevWords: "",

        timer: {
          m: 0,
          s: 0,
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
      setPrevWords(value) {
        const { test } = get();
        set({
          test: {
            ...test,
            prevWords: value,
          },
        });
      },

      setTimerValue(key, value) {
        const { test } = get();
        set({
          test: {
            ...test,
            timer: {
              ...test.timer,
              [key]: value,
            },
          },
        });
      },
      setText(text) {
        const { test } = get();
        set({
          test: {
            ...test,
            text,
          },
        });
      },
      setInput(input) {
        const { test } = get();
        set({
          test: {
            ...test,
            input,
          },
        });
      },
      typingState: "NEW",

      setTypingState(typingState) {
        set({ typingState });
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

      restartTyping() {
        const { test } = get();

        set({
          test: {
            ...test,
            input: "",
            prevWords: "",
            timer: {
              m: 0,
              s: 0,
            },
            wpm: 0,
            accuracy: 0,
            errors: 0,
            chars: 0,
            mode: "TIMED",
            difficulty: "HARD",
          },
        });
      },
    }),
    {
      name: "typing-speed-test",
      partialize: (state) => {
        const { settings, personalBest, results, typingState } = state;
        console.log({ typingState });
        return { settings, personalBest, results };
      },
    }
  )
);
