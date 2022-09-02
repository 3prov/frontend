import { useEffect, useRef } from "react";

const useUnload = (handler: (e: BeforeUnloadEvent) => void) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleBeforeunload: (e: BeforeUnloadEvent) => void = evt => {
      let returnValue;

      if (typeof handlerRef.current === "function") {
        returnValue = handlerRef.current(evt);
      }

      if (evt.defaultPrevented) {
        evt.returnValue = "";
      }

      if (typeof returnValue === "string") {
        evt.returnValue = returnValue;
        return returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeunload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
    };
  }, []);
};

export default useUnload;