import { useEffect, useRef, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300): T | undefined {
  const [debounceValue, setDebounceValue] = useState<T | undefined>(value);
  const timerRef = useRef(0);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [value, delay]);

  return debounceValue;
}
