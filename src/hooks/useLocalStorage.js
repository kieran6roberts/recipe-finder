import { useState } from "react";

const useLocalStorage = (storageKey, initialValue ) => {
  const [ storedValue, setStoredValue ] = useState( () => {
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setValue = value => {
    if (!value) return;

    try {
      const existing = window.localStorage.getItem(storageKey);
      const parsed = JSON.parse(existing);
      console.log(parsed);
      const newArray = parsed.push(value);
      console.log(newArray);
      window.localStorage.setItem(storageKey, JSON.stringify(newArray));
      setStoredValue(value);
    } catch (err) {
      console.error(err);
    }
  };
  return [ storedValue, setValue ];
};

export default useLocalStorage;