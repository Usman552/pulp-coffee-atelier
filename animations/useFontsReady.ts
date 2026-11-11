"use client";

import { useEffect, useState } from "react";

/** True once web fonts have settled (or after a short safety timeout), so text can be split accurately. */
export function useFontsReady(timeout = 2500) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const done = () => alive && setReady(true);
    const t = setTimeout(done, timeout);
    (document.fonts?.ready ?? Promise.resolve()).then(done);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [timeout]);
  return ready;
}
