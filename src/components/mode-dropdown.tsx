import { useRef, useState } from "react";
import { modes } from "../constants";
import { useIsMobile } from "../hooks/use-mobile";
import { useTypingStore } from "../zustand";
import { useDropdownRef } from "../hooks/use-dropdown-ref";

export const ModeDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useDropdownRef(dropdownRef, () => setOpen(false));
  const { test, setMode } = useTypingStore();
  const { mode } = test;
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div
        className="border-neutral-500 capitalize py-1.5 px-2.5 rounded-[10px] border-2 font-semibold cursor-pointer flex items-center justify-center gap-4"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="capitalize text-xl font-light">
          {mode.toLowerCase()}
        </span>
        <img
          src={"/images/icon-down-arrow.svg"}
          alt="drop down arrow icon"
          className={`h-[5.95px] w-[10.02px] ${
            open ? "rotate-180 transition-all duration-75" : ""
          }`}
        />

        {open && (
          <div
            className="rounded-[8px] absolute bg-neutral-800 w-[166.5px] flex flex-col items-start top-13 shadow-xl"
            ref={dropdownRef}
          >
            {modes.map((item, index) => (
              <button
                key={`${item.id}-${index}`}
                onClick={() => setMode(item.id as Mode)}
                className={`capitalize p-4 flex items-center gap-3 font-light`}
              >
                <span
                  className={`rounded-full size-5 border border-neutral-0 ${
                    item.id === mode ? "border-blue-400! border-[6px]" : ""
                  }`}
                />
                <span> {item.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <h4 className="flex flex-col md:flex-row md:items-center md:gap-4 gap-3 px-6 first:pl-0 last:pr-0 border border-y-0  border-x-border first:border-l-0 last:border-r-0">
      <span className="text-neutral-500">Mode: </span>
      <div className="flex gap-3 items-center">
        {modes.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            onClick={() => setMode(item.id as Mode)}
            className={`capitalize border-neutral-500 py-1.5 px-2.5 rounded-[10px] border-2 ${
              item.id === mode ? "text-blue-400 border-blue-400!" : ""
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </h4>
  );
};
