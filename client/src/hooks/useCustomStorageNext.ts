"use client";
import { useState, useEffect } from "react";

const useCustomStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(() => {
    // Ensure that code only runs in the browser
    if (typeof window !== "undefined") {
      return localStorage.getItem(key) || initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    // Ensure that code only runs in the browser
    if (typeof window !== "undefined") {
      // Save content to localStorage
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Ensure that code only runs in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value); // Save content before unloading
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [key, value]);

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      // Ensure that code only runs in the browser
      if (typeof window !== "undefined") {
        if (event.key === key && !event.newValue) {
          // Re-save the content if it's deleted
          localStorage.setItem(key, value);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageEvent);

      return () => {
        window.removeEventListener("storage", handleStorageEvent);
      };
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export default useCustomStorage;
