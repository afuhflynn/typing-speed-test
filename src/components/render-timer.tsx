import { useCallback, useEffect, useRef } from "react";
import { useTypingStore } from "../zustand";
import { useNavigate } from "react-router-dom";

export const RenderTimer = ({ timer }: { timer: Timer }) => {
  // Stores the timestamp when typing starts (used for WPM)
  const startTimeRef = useRef<number>(0);
  const navigate = useNavigate();

  // Zustand state and setters
  const {
    typingState,
    setTimerValue,
    setWPMValue,
    test,
    setAccuracyValue,
    setErrorsValue,
    setCharsValue,
    personalBest,
    setTestFlags,
    setTypingState,
    setPersonalBest,
  } = useTypingStore();

  // Timer values
  const { m, h, s } = timer;

  // Typing input and reference text
  const { input, text, mode, wpm } = test;

  // Calculates accuracy, error count, and correct characters
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
    const accuracy = Math.round((correctChars / charsToCheck) * 100);

    return { errorCount, accuracy, correctChars };
  }, [input, text]);

  const handleNavigate = useCallback(
    (route: string = "/result") => {
      if (!personalBest.wpm) {
        setTestFlags(true);
        setPersonalBest(wpm);
      } else if (personalBest.wpm < wpm) {
        setTestFlags(false, true);
        setPersonalBest(wpm);
      }

      setTypingState("COMPLETE");
      navigate(route);
    },
    [
      navigate,
      personalBest.wpm,
      setTestFlags,
      wpm,
      setTypingState,
      setPersonalBest,
    ]
  );

  useEffect(() => {
    // Run timer logic every second
    const timerInterval = setTimeout(() => {
      // Stop timer logic if not typing
      if (typingState !== "TYPING") {
        startTimeRef.current = 0;
        return;
      }

      // mode based timer implementation
      if (mode === "PASSAGE" && input.trim() === "") {
        return;
      }

      // Set start time on first typing tick
      if (startTimeRef.current === 0) {
        startTimeRef.current = Date.now();
      }

      if (s < 59) {
        setTimerValue("s", s + 1);
        // check typing states and end the process
        if (mode === "PASSAGE") {
          if (input.trim().length >= text.trim().length) {
            handleNavigate();
          }
        }

        // Update accuracy-related stats
        const { errorCount, accuracy, correctChars } = calculateAccuracy();

        setAccuracyValue(accuracy);
        setErrorsValue(errorCount);
        setCharsValue(correctChars);

        // Calculate WPM
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
        if (mode === "TIMED") handleNavigate();

        // Seconds → minutes rollover
        setTimerValue("s", 0);
        setTimerValue("m", m + 1);
      }

      // Minutes → hours rollover
      if (m === 59 && s === 59) {
        setTimerValue("s", 0);
        setTimerValue("m", 0);
        setTimerValue("h", (h ?? 0) + 1);
      }

      // Reset after 24 hours
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
    mode,
    navigate,
    text,
    handleNavigate,
  ]);

  // Render hh:mm:ss if hours exist
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

  // Default render mm:ss
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
