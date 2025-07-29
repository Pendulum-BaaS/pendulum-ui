import { createContext, useRef } from "react";
import { PendulumClient } from "../../../pendulum-sdk/src/pendulumClient";
import type { PendulumContextType } from "../types/types";
import type { ReactNode } from "react";

const PendulumContext = createContext<PendulumContextType>(
  {} as PendulumContextType,
);

const config = {
  apiUrl: "http://localhost:3000",
  eventsUrl: "http://localhost:8080/events",
};

function PendulumProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<PendulumClient>(new PendulumClient(config));

  return (
    <PendulumContext.Provider
      value={{ client: clientRef.current, isConnected: true }}
    >
      {children}
    </PendulumContext.Provider>
  );
}

export { PendulumContext, PendulumProvider };
