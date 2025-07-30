import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { PendulumProvider } from "./contexts/PendulumProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PendulumProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PendulumProvider>
  </StrictMode>,
);
