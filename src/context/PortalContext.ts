import { createContext, useContext } from "react";

export const PortalContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used within PortalContext.Provider");
  return ctx;
}
