import { useEffect } from "react";

interface Listener<T extends CallableFunction> {
  addListener(callback: T): void;
  removeListener(callback: T): void;
}

export const useListener = (
  listener: Listener<typeof handler>,
  handler: <T>(...args: T[]) => void,
  { execOnInit }: { execOnInit?: boolean } = { execOnInit: false },
) => {
  useEffect(() => {
    if (execOnInit) handler();

    listener.addListener(handler);

    return () => listener.removeListener(handler);
  }, [execOnInit, handler, listener]);
};
