import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";
import ErrorBoundary from "./providers/error-boundary/ErrorBoundary.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Could not find root element with id 'root'");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
