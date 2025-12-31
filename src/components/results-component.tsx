import { Link } from "react-router-dom";
import { useTypingStore } from "../zustand";

interface props {
  status: "NEW_PERSONAL_BEST" | "FIRST_TEST" | "RESULTS";
}

export const ResultsComponenet = ({ status }: props) => {
  const { test, resetTest, setTypingState } = useTypingStore();
  const { wpm, accuracy, chars, errors } = test;
  return (
    <div className="flex flex-col items-center w-full md:gap-12 gap-10 relative flex-1">
      {status !== "NEW_PERSONAL_BEST" ? (
        <div className="rounded-full h-36 w-36 bg-green-500/10 flex items-center justify-center">
          <div className="h-25 w-25 rounded-full bg-green-500/20 flex items-center justify-center">
            <img src="/images/icon-completed.svg" alt="Completed Icon" />
          </div>
        </div>
      ) : (
        <img src="/images/icon-new-pb.svg" alt="New Personal Best Icon" />
      )}
      <div className="text-center flex flex-col gap-2.5">
        <h1 className="font-bold! md:text-[40px] text-[24px]">
          {status === "FIRST_TEST"
            ? "Baseline Established!"
            : status === "NEW_PERSONAL_BEST"
            ? "High Score Smashed!"
            : "Test Complete!"}
        </h1>
        <p className="md:text-[20px] text-[16px] text-neutral-400">
          {status === "FIRST_TEST"
            ? "You've set the bar. Now the real challenge begins—time to beat it."
            : status === "NEW_PERSONAL_BEST"
            ? "You’re getting faster. That was incredible typing."
            : "Solid run. Keep pushing to beat your high score."}
        </p>
      </div>
      <div className="flex md:items-center gap-6 flex-col md:flex-row w-full md:justify-center">
        <div className="border rounded-[8px] p-6 border-neutral-700 md:w-1/3! lg:w-70! w-full!">
          <h2 className="flex flex-col items-start gap-3 text-3xl! font-light!">
            <span className="text-neutral-500">WPM: </span>
            <span className="font-extrabold">{wpm}</span>
          </h2>
        </div>
        <div className="border rounded-[8px] p-6 border-neutral-700 md:w-1/3! lg:w-70! w-full!">
          <h2 className="flex flex-col items-start gap-3 text-3xl! font-light!">
            <span className="text-neutral-500">Accuracy: </span>
            <span className={`font-extrabold text-red-500`}>{accuracy}%</span>
          </h2>
        </div>
        <div className="border rounded-[8px] p-6 border-neutral-700 md:w-1/3! lg:w-70! w-full!">
          <h2 className="flex flex-col items-start gap-3 text-3xl! text-neutral-500 font-light!">
            <span className="">Characters </span>
            <span className="flex items-center">
              <span className={`font-extrabold text-green-500`}>{chars}</span> /{" "}
              <span className={`font-extrabold text-red-500`}>{errors}</span>
            </span>
          </h2>
        </div>
      </div>
      <Link to="/" className="decoration-0">
        <button
          className="font-semibold py-5 px-6 rounded-[12px] text-neutral-900 bg-neutral-0 text-xl hover:bg-neutral-0/80 transition-colors duration-75 flex items-center gap-4 md:mt-8! mt-2!"
          onClick={() => {
            resetTest();
            setTypingState("NEW");
          }}
        >
          <span>{status !== "RESULTS" ? "Beat This Score" : "Go Again"}</span>
          <img
            className="invert-1"
            src="/images/icon-undo.svg"
            alt="Restart Icon"
          />
        </button>
      </Link>
      <img
        src="/images/pattern-star-1.svg"
        alt="Star 1 Icon"
        className={`absolute bottom-0 right-0 ${
          status === "NEW_PERSONAL_BEST" ? "hidden" : ""
        }`}
      />
      <img
        src="/images/pattern-star-2.svg"
        alt="Star 2 Icon"
        className={`absolute top-0 left-0 ${
          status === "NEW_PERSONAL_BEST" ? "hidden" : ""
        }`}
      />
      <img
        src="/images/pattern-confetti.svg"
        alt="Confetti Pattern Icon"
        className={`fixed bottom-0 self-center w-full -z-10 md:h-auto h-56 object-fill ${
          status === "NEW_PERSONAL_BEST" ? "" : "hidden"
        }`}
      />
    </div>
  );
};
