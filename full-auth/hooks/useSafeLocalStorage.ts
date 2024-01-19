import React, { useState } from 'react';

export const useSafeLocalStorage = (key: any, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      try {
        const item = window.localStorage.getItem(key);
        return item ? parseInt(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });
  
    return [storedValue, setStoredValue];
  };
  
