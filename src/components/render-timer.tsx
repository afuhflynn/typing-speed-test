import { useEffect } from "react";
import { useTypingStore } from "../zustand";

export const RenderTimer = ({ timer }: { timer: Timer }) => {
  const { typingState, setTimerValue } = useTypingStore();
  const { m, h, s } = timer;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typingState !== "TYPING") return;
      if (s < 60) {
        setTimerValue("s", s + 1);
      }
      if (s === 60) {
        setTimerValue("s", 0);
        setTimerValue("m", m + 1);
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
  }, [typingState, s, setTimerValue, h, m]);
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
