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
  const clientRef = useRef<PendulumClient>(new PendulumClient());

  return (
    <PendulumContext.Provider
      value={{ client: clientRef.current, isConnected: true }}
    >
      {children}
    </PendulumContext.Provider>
  );
}

export { PendulumContext, PendulumProvider };
