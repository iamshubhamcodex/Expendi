import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useLocalStorage = <T>(key: string, delay = 200) => {
  const [valueToStore, setValueToStore] = useState<T | undefined>();

  const debouncedValue = useDebounce(valueToStore, delay);

  const setItem = useCallback(
    function (value: T) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    },
    [key]
  );
  function getItem(): T | undefined {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
    }
  }
  const removeItem = useCallback(
    function () {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.log(error);
      }
    },
    [key]
  );
  function storeItem(value: T) {
    setValueToStore(value);
  }
  useEffect(() => {
    if (debouncedValue) setItem(debouncedValue);
    // else removeItem();
  }, [debouncedValue, setItem, removeItem]);

  return { setItem: storeItem, getItem, removeItem } as const;
};

export default useLocalStorage;
