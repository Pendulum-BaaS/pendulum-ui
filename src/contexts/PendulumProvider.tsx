import { createContext, useRef } from "react";
import { PendulumClient } from "@pendulum/sdk";
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
    apiUrl: import.meta.env.VITE_API_URL, // handle in PendulumClient if undefined
    eventsUrl: import.meta.env.VITE_EVENTS_URL, // handle in PendulumClient if undefined
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
