import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import ToggleColorMode from "./styles/themes/Theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>
);
