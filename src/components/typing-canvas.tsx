import { Overlay } from "./home/overlay";
import testTexts from "../../data.json";
import { useTypingStore } from "../zustand";
import { useEffect, useRef } from "react";
import { generateRandomIndex } from "../utils";

const RenderChars = ({ input, text }: { input: string; text: string }) => {
  return (
    <>
      {text.split("").map((char, i) => {
        let colorClass = "text-neutral-500"; // Default: not typed yet

        if (input[i] && input[i].trim() !== "") {
          // Character has been typed
          if (text[i] !== input[i]) {
            colorClass = "text-red-500 underline"; // Wrong character
          } else {
            colorClass = "text-green-500"; // Correct character
          }
        }

        return (
          <span key={i} className={colorClass}>
            {input[i] ? input[i] : char}
          </span>
        );
      })}
    </>
  );
};

export const TypingCanvas = () => {
  const { test, setText, setInput, typingState } = useTypingStore();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
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

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [typingState]);

  return (
    <div className="relative w-full flex-1 py-0">
      {text && text.trim() && <Overlay />}

      <span
        className={` lg:text-5xl md:text-3xl md::text-[40px] text-[32px] leading-18 transition-all duration-100`}
      >
        <RenderChars input={input} text={text} />
      </span>
      <textarea
        ref={inputRef}
        spellCheck={false}
        className="absolute h-full w-full z-10 resize-none bg-transparent border-none outline-none focus-visible:outline-none top-0 bottom-0 left-0 text-transparent caret-neutral-500 lg:text-5xl md:text-3xl md::text-[40px] text-[32px] leading-18 transition-all duration-100"
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
