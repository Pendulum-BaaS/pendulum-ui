import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { PendulumProvider } from "./contexts/PendulumProvider.tsx";
import { LogsProvider } from "./contexts/LogsProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <PendulumProvider>
    <LogsProvider>
      <BrowserRouter basename="/admin">
        <App />
      </BrowserRouter>
    </LogsProvider>
  </PendulumProvider>,
);
