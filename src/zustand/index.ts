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
      setWPMValue(value) {
        const { test } = get();
        set({
          test: {
            ...test,
            wpm: value,
          },
        });
      },
      setAccuracyValue(value) {
        const { test } = get();
        set({
          test: {
            ...test,
            accuracy: value,
          },
        });
      },
      setCharsValue(value) {
        const { test } = get();
        set({
          test: {
            ...test,
            chars: value,
          },
        });
      },
      setErrorsValue(value) {
        const { test } = get();
        set({
          test: {
            ...test,
            errors: value,
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
        // If input is shorter than the test text, reset the test
        if (input.length <= test.text.length) {
          set({
            test: {
              ...test,
              input,
            },
          });
          return;
        }
        set({
          test: {
            ...test,
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
        // @ts-expect-error: I don't want to do anything with this valud
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { settings, personalBest, results, typingState } = state;
        return { settings, personalBest, results };
      },
    }
  )
);
