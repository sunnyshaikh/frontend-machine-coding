import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay = 300): T => {
  const [val, setVal] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVal(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return val;
};
