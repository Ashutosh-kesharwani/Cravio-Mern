import { createRoot } from "react-dom/client";
import SomethingWentWrong from "./Pages/Errors/SomethingWentWrong.jsx";

import { ErrorBoundary } from "react-error-boundary";

import Root from "./components/Shared/Root/Root.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary FallbackComponent={SomethingWentWrong}>
    <Root />
  </ErrorBoundary>
);
