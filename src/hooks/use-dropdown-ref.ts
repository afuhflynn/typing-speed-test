import React, { useEffect } from "react";

export const useDropdownRef = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      if (ref && ref.current) {
        if (ref.current.contains(e.target)) {
          callback();
        }
      }
    };
    document.documentElement.addEventListener("click", handleClick);

    return () => {
      document.documentElement.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
};
