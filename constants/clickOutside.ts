import { useEffect } from "react";

function clickOutside(refs: any, onClickOutside: () => void) {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event: any) {
      refs.forEach((ref: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside();
        }
      });
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, onClickOutside]);
}

export default clickOutside;
