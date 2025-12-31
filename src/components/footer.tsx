export const FooterSection = () => {
  return (
    <div className="flex w-full border border-x-0 border-b-0 border-t-border lg:pt-8 pt-6 items-end justify-center">
      <button
        className="font-semibold py-5 px-6 rounded-[12px] bg-neutral-800 text-xl hover:bg-neutral-800/80 transition-colors duration-75 flex items-center gap-4"
        // onClick={() => setTypingState("NEW")}
      >
        <span>Restart Test</span>
        <img src="/images/icon-restart.svg" alt="Restart Icon" />
      </button>
    </div>
  );
};
