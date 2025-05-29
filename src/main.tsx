import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProcrastinationBuster from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProcrastinationBuster />
  </StrictMode>
);
