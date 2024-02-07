
import { useEffect, useRef } from "react";

const useAfterMount = (callback: () => void) => {
  const firstRender = useRef(true);
  const callbackRef = useRef(callback);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else callbackRef.current();

  }, []);

  useEffect(()=>{
    callbackRef.current = callback;
  },[callback])
};

export default useAfterMount;
