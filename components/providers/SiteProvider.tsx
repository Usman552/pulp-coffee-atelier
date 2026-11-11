"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ReserveModal } from "@/components/ui/ReserveModal";

export type ReservePrefill = { note?: string };

type SiteState = {
  introDone: boolean;
  completeIntro: () => void;
  reserveOpen: boolean;
  reservePrefill: ReservePrefill;
  openReserve: (prefill?: ReservePrefill) => void;
  closeReserve: () => void;
  indexOpen: boolean;
  setIndexOpen: (open: boolean) => void;
};

const SiteContext = createContext<SiteState | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reservePrefill, setReservePrefill] = useState<ReservePrefill>({});
  const [indexOpen, setIndexOpen] = useState(false);

  const completeIntro = useCallback(() => setIntroDone(true), []);
  const openReserve = useCallback((prefill: ReservePrefill = {}) => {
    setIndexOpen(false);
    setReservePrefill(prefill);
    setReserveOpen(true);
  }, []);
  const closeReserve = useCallback(() => setReserveOpen(false), []);

  const value = useMemo(
    () => ({
      introDone,
      completeIntro,
      reserveOpen,
      reservePrefill,
      openReserve,
      closeReserve,
      indexOpen,
      setIndexOpen,
    }),
    [introDone, completeIntro, reserveOpen, reservePrefill, openReserve, closeReserve, indexOpen],
  );

  return (
    <SiteContext.Provider value={value}>
      {children}
      <ReserveModal />
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}
