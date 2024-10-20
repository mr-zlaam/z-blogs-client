"use client";
import { useCallback, useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return { isLoading, startLoading, stopLoading };
};
