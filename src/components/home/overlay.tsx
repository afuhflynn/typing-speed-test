import { useTypingStore } from "../../zustand";

export const Overlay = () => {
  const { setTypingState, typingState } = useTypingStore();

  if (typingState === "TYPING") {
    return null;
  }
  if (typingState === "PAUSED") {
    return (
      <div className="absolute h-full flex flex-col items-center justify-center gap-5 w-full backdrop-blur-sm bg-neutral-900/60 cursor-text top-0 bottom-0">
        <button
          className="font-semibold py-4 px-6 rounded-[12px] bg-blue-600 text-xl hover:bg-blue-600/93"
          onClick={() => setTypingState("TYPING")}
        >
          Resume
        </button>
        <span className="text-xl font-semibold">You can resume later.</span>
      </div>
    );
  }
  return (
    <div className="absolute h-full flex flex-col items-center justify-center gap-5 w-full backdrop-blur-sm bg-neutral-900/60 cursor-text top-0 bottom-0">
      <button
        className="font-semibold py-4 px-6 rounded-[12px] bg-blue-600 text-xl hover:bg-blue-600/93"
        onClick={() => setTypingState("TYPING")}
      >
        Start Typing Test
      </button>
      <span className="text-xl font-semibold">
        Or click the text and start typing
      </span>
    </div>
  );
};
