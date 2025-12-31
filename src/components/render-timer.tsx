import { useEffect, useState } from "react";
import { useTypingStore } from "../zustand";

export const RenderTimer = ({ timer }: { timer: Timer }) => {
  const [startTime, setStartTime] = useState(0);
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

  const calculateAccuracy = () => {
    let errorCount = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] !== text[i]) errorCount++;
    }

    const correctChars = text.length - errorCount; // get total number of correct chars from the total
    const accuracy = Math.round(correctChars / text.length / 100); // calculate percentage accuracy

    return { errorCount, accuracy, correctChars };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typingState !== "TYPING") return;
      setStartTime(Date.now());
      if (s < 60) {
        setTimerValue("s", s + 1);
        const { errorCount, accuracy, correctChars } = calculateAccuracy();
        setAccuracyValue(accuracy);
        setErrorsValue(errorCount);
        setCharsValue(correctChars);
      }
      if (s === 60) {
        setTimerValue("s", 0);
        setTimerValue("m", m + 1);

        // calculate wpm
        const endTime = Date.now(); // get current time
        // calculate time taken
        const timeTaken = endTime - startTime;
        const wpm = Math.round(input.split(" ").length / timeTaken); // caculate words per minute
        setWPMValue(wpm);
      }
      if (m === 60 && s == 60) {
        setTimerValue("s", 0);
        setTimerValue("m", m + 1);
        setTimerValue("h", h ?? 0 + 1);
      }
      if (m === 60 && s == 60 && h === 24) {
        setTimerValue("s", 0);
        setTimerValue("m", 0);
        setTimerValue("h", 0);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [typingState, s, setTimerValue, h, m, input, setWPMValue, startTime]);
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
