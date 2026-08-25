"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

export function usePersistedState(
  key: string,
  fallback: string,
): [string, (v: string) => void] {
  const listeners = useRef(new Set<() => void>()).current;
  const cache = useRef<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const subscribe = useCallback(
    (cb: () => void) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    [listeners],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return fallback;
    if (cache.current === null) {
      cache.current = localStorage.getItem(key) ?? fallback;
    }
    return cache.current;
  }, [key, fallback]);

  const getServerSnapshot = useCallback(() => fallback, [fallback]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (v: string) => {
      cache.current = v;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        localStorage.setItem(key, v);
      }, 400);
      listeners.forEach((l) => l());
    },
    [key, listeners],
  );

  return [value, setValue];
}
