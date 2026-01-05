import { Overlay } from "./home/overlay";
import testTexts from "../../data.json";
import { useTypingStore } from "../zustand";
import { useEffect, useRef } from "react";
import { generateRandomIndex } from "../utils";

const RenderChars = ({ input, text }: { input: string; text: string }) => {
  const caretIndex = input.length;

  return (
    <>
      {text.split("").map((char, i) => {
        let className = "text-neutral-500 relative";

        if (input[i]) {
          if (input[i] !== char) {
            className = "text-red-500 underline";
          } else {
            className = "text-green-500";
          }
        }

        const showCaret = i === caretIndex && !input[i];

        return (
          <span
            key={i}
            className={`${className} ${showCaret ? "caret-highlight" : ""}`}
          >
            {input[i] && input[i] !== char ? input[i] : char}
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
    <div className="relative w-full flex-1 py-0 overflow-hidden">
      {text && text.trim() && <Overlay />}

      <span
        className={` lg:text-5xl md:text-3xl md::text-[40px] text-[32px] leading-18 transition-all duration-100 relative w-full h-auto`}
      >
        <RenderChars input={input} text={text} />
      </span>
      <textarea
        ref={inputRef}
        spellCheck={false}
        className="absolute h-auto w-full z-10 resize-none bg-transparent border-none outline-none focus-visible:outline-none top-0 bottom-0 left-0 text-transparent lg:text-5xl md:text-3xl md::text-[40px] text-[32px] leading-18 transition-all duration-100 caret-transparent"
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
