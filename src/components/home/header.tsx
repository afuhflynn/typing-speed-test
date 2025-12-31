import { useTypingStore } from "../../zustand";

export const Header = () => {
  const { personalBest } = useTypingStore();
  return (
    <header className="w-full h-[39.18px] flex items-center justify-between">
      <>
        <img
          src="/images/logo-large.svg"
          alt="App logo"
          className="hidden md:block"
        />
        <img
          src="/images/logo-small.svg"
          alt="App logo"
          className=" md:hidden"
        />
      </>
      <div className="flex items-center gap-3">
        <img src="/images/Trophy_Icon.svg" alt="Trophy Icon" />
        <div className="flex items-center gap-2 cursor-default">
          <span className="text-neutral-500 text-lg">
            <span className="hidden md:flex">Personal best:</span>{" "}
            <span className="flex md:hidden">Best:</span>{" "}
          </span>
          <span className="text-xl">{personalBest?.wpm ?? 0} WPM</span>
        </div>
      </div>
    </header>
  );
};
