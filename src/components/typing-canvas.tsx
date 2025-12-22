import { Overlay } from "./home/overlay";
import testTexts from "../../data.json";
import { useTypingStore } from "../zustand";
import { useEffect } from "react";
import { generateRandomIndex } from "../utils";

export const TypingCanvas = () => {
  const { test, setText } = useTypingStore();
  const { difficulty, text, input } = test;

  useEffect(() => {
    if (difficulty === "EASY") {
      const index = generateRandomIndex(testTexts.easy.length);
      setText(testTexts.easy[index].text);
    }
    if (difficulty === "MEDIUM") {
      const index = generateRandomIndex(testTexts.medium.length);
      setText(testTexts.medium[index].text);
    }
    if (difficulty === "HARD") {
      const index = generateRandomIndex(testTexts.hard.length);
      setText(testTexts.hard[index].text);
    }
  }, [setText, difficulty]);

  return (
    <div className=" relative w-full h-full">
      {text && text.trim() && <Overlay />}
      <span className={`text-neutral-500 lg:text-5xl md:text-3xl text-xl`}>
        {text}
      </span>
    </div>
  );
};
