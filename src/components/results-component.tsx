import { useTypingStore } from "../zustand";

interface props {
  status: "NEW_PERSONAL_BEST" | "FIRST_TEST" | "RESULTS";
}

export const ResultsComponenet = ({ status }: props) => {
  const { test } = useTypingStore();
  const { wpm, accuracy, chars } = test;
  return (
    <div className="flex flex-col items-center w-full md:gap-12 gap-10">
      <div className="rounded-full h-36 w-36 bg-green-500/10 flex items-center justify-center">
        <div className="h-25 w-25 rounded-full bg-green-500/20 flex items-center justify-center">
          <img src="/images/icon-completed.svg" alt="Restart Icon" />
        </div>
      </div>
      <div className="text-center flex flex-col gap-2.5">
        <h1 className="font-bold! md:text-[40px] text-[24px]">
          Baseline Established!
        </h1>
        <p className="md:text-[20px] text-[16px] text-neutral-400">
          You&apos;ve set the bar. Now the real challenge begins—time to beat
          it.
        </p>
      </div>
      <div className="flex md:items-center gap-6 flex-col md:flex-row w-full md:justify-center">
        <div className="border rounded-[8px] p-6 border-neutral-700 md:w-1/3! lg:w-70! w-full!">
          <h2 className="flex flex-col items-start gap-3 text-3xl! font-light!">
            <span className="text-neutral-500">WPM: </span>
            <span className="font-extrabold">{85}</span>
          </h2>
        </div>
        <div className="border rounded-[8px] p-6 border-neutral-700 md:w-1/3! lg:w-70! w-full!">
          <h2 className="flex flex-col items-start gap-3 text-3xl! font-light!">
            <span className="text-neutral-500">Accuracy: </span>
            <span className={`font-extrabold text-red-500`}>{90}%</span>
          </h2>
        </div>
        <div className="border rounded-[8px] p-6 border-neutral-700 md:w-1/3! lg:w-70! w-full!">
          <h2 className="flex flex-col items-start gap-3 text-3xl! text-neutral-500 font-light!">
            <span className="">Characters </span>
            <span className="flex items-center">
              <span className={`font-extrabold text-green-500`}>{120}</span> /{" "}
              <span className={`font-extrabold text-red-500`}>5</span>
            </span>
          </h2>
        </div>
      </div>
      <button
        className="font-semibold py-5 px-6 rounded-[12px] text-neutral-900 bg-neutral-0 text-xl hover:bg-neutral-0/80 transition-colors duration-75 flex items-center gap-4"
        // onClick={restartTyping}
      >
        <span>Beat This Score</span>
        <img
          className="invert-1"
          src="/images/icon-undo.svg"
          alt="Restart Icon"
        />
      </button>
    </div>
  );
};
