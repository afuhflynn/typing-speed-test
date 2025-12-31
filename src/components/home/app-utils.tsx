import { useTypingStore } from "../../zustand";
import { DifficultyDropdown } from "../difficulty-dropdown";
import { ModeDropdown } from "../mode-dropdown";
import { RenderTimer } from "../render-timer";

export const AppUtils = () => {
  const { test, typingState } = useTypingStore();
  const { wpm, accuracy, timer } = test;
  return (
    <section className="w-full flex lg:items-center lg:justify-between flex-col lg:flex-row gap-6 lg:gap-0 border border-x-0 border-t-0 border-b-border pb-8">
      <div className="flex items-center ">
        <div className="px-6 first:pl-0 last:pr-0 border border-y-0  border-x-border first:border-l-0 last:border-r-0">
          <h2 className="flex flex-col md:flex-row items-center md:gap-4 gap-3 text-2xl! md:text-3xl!">
            <span className="text-neutral-500">WPM: </span>
            <span className="font-extrabold">{wpm}</span>
          </h2>
        </div>
        <div className="px-6 first:pl-0 last:pr-0 border border-y-0  border-x-border first:border-l-0 last:border-r-0">
          <h2 className="flex flex-col md:flex-row items-center md:gap-4 gap-3 text-2xl! md:text-3xl!">
            <span className="text-neutral-500">Accuracy: </span>
            <span
              className={`font-extrabold ${
                typingState === "TYPING" ? "text-red-500" : ""
              }`}
            >
              {accuracy}%
            </span>
          </h2>
        </div>
        <div className="px-6 first:pl-0 last:pr-0 border border-y-0  border-x-border first:border-l-0 last:border-r-0">
          <h2 className="flex flex-col md:flex-row md:items-center md:gap-4 gap-3 text-2xl! md:text-3xl! items-end">
            <span className="text-neutral-500 flex md:flex-row md:items-center flex-col">
              Time:
            </span>
            <RenderTimer timer={timer} />
          </h2>
        </div>
      </div>
      <div className="md:flex md:items-center grid grid-cols-2 gap-4 md:gap-0 relative">
        <DifficultyDropdown />
        <ModeDropdown />
      </div>
    </section>
  );
};
