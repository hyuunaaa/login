import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {

  const [debounceValuce, SetDebounceValue] = useState(value);

  useEffect(() => {

    const handler = setTimeout(() => {
      SetDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };

  },[value, delay]);

  return debounceValuce;

};