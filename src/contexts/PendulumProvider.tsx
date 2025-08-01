import { createContext, useRef } from "react";
import { PendulumClient } from "../../../pendulum-sdk/src/pendulumClient";
import type { ReactNode } from "react";

type PendulumContextType = {
  client: PendulumClient;
  isConnected: boolean;
};

const PendulumContext = createContext<PendulumContextType>(
  {} as PendulumContextType,
);

function PendulumProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<PendulumClient>(new PendulumClient({
    appUrl: import.meta.env.VITE_API_URL || "/pendulum",
    eventsUrl: import.meta.env.VITE_EVENTS_URL || "/pendulum-events",
    permissionsUrl: import.meta.env.VITE_PERMISSIONS_URL || "/pendulum/permissions",
  }));

  return (
    <PendulumContext.Provider
      value={{ client: clientRef.current, isConnected: true }}
    >
      {children}
    </PendulumContext.Provider>
  );
}

export { PendulumContext, PendulumProvider };
