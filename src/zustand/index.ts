import { create } from "zustand";
// import { persist } from "zustand/middleware";

export const useTypingStore = create<StoreState>()(
  (set, get) => ({
    test: {
      text: "",
      input: "",

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
  })
  // persist(

  //   {
  //     name: "typing-speed-test",
  //     partialize: (state) => {
  //       const { typingState, ...persistedState } = state;
  //       console.log(typingState);
  //       return persistedState;
  //     },
  //   }
  // )
);
