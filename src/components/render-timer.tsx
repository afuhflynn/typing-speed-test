import { useCallback, useEffect, useRef } from "react";
import { useTypingStore } from "../zustand";

export const RenderTimer = ({ timer }: { timer: Timer }) => {
  const startTimeRef = useRef<number>(0);
  const {
    typingState,
    setTimerValue,
    setWPMValue,
    test,
    setAccuracyValue,
    setErrorsValue,
    setCharsValue,
  } = useTypingStore();
  const { m, h, s } = timer;
  const { input, text } = test;

  const calculateAccuracy = useCallback(() => {
    if (input.length === 0) {
      return { errorCount: 0, accuracy: 0, correctChars: 0 };
    }

    let errorCount = 0;
    const charsToCheck = Math.min(input.length, text.length);

    for (let i = 0; i < charsToCheck; i++) {
      if (input[i] !== text[i]) errorCount++;
    }

    const correctChars = charsToCheck - errorCount;
    // Calculate accuracy based on characters typed so far
    const accuracy = Math.round((correctChars / charsToCheck) * 100);

    return { errorCount, accuracy, correctChars };
  }, [input, text]);

  useEffect(() => {
    const timerInterval = setTimeout(() => {
      if (typingState !== "TYPING") {
        startTimeRef.current = 0;
        return;
      }

      // Set start time on first tick when typing
      if (startTimeRef.current === 0) {
        startTimeRef.current = Date.now();
      }

      if (s < 59) {
        setTimerValue("s", s + 1);

        // Calculate accuracy every second
        const { errorCount, accuracy, correctChars } = calculateAccuracy();
        setAccuracyValue(accuracy);
        setErrorsValue(errorCount);
        setCharsValue(correctChars);

        // Calculate WPM every second if we have a start time
        if (startTimeRef.current > 0 && input.length > 0) {
          const currentTime = Date.now();
          const timeTakenInMinutes =
            (currentTime - startTimeRef.current) / 60000;
          const wordCount = input
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0).length;
          const wpm =
            timeTakenInMinutes > 0
              ? Math.round(wordCount / timeTakenInMinutes)
              : 0;
          setWPMValue(wpm);
        }
      } else if (s === 59) {
        setTimerValue("s", 0);
        setTimerValue("m", m + 1);
      }

      if (m === 59 && s === 59) {
        setTimerValue("s", 0);
        setTimerValue("m", 0);
        setTimerValue("h", (h ?? 0) + 1);
      }

      if (h === 23 && m === 59 && s === 59) {
        setTimerValue("s", 0);
        setTimerValue("m", 0);
        setTimerValue("h", 0);
      }
    }, 1000);

    return () => {
      clearTimeout(timerInterval);
    };
  }, [
    typingState,
    s,
    m,
    h,
    setTimerValue,
    input,
    setWPMValue,
    calculateAccuracy,
    setAccuracyValue,
    setCharsValue,
    setErrorsValue,
  ]);

  if (h) {
    return (
      <span
        className={`flex items-center font-extrabold ${
          typingState === "TYPING" ? "text-yellow-400" : ""
        }`}
      >
        {h < 10 ? `0${h}` : h} : {m < 10 ? `0${m}` : m} : {s < 10 ? `0${s}` : s}
      </span>
    );
  }

  return (
    <span
      className={`flex items-center font-extrabold ${
        typingState === "TYPING" ? "text-yellow-400" : ""
      }`}
    >
      {m < 10 ? `0${m}` : m} : {s < 10 ? `0${s}` : s}
    </span>
  );
};
