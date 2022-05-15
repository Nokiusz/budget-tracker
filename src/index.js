import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ContextProvider } from "./context/Context";

import "./css/index.css"

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme="light" insertionPoint="styles-insertion-point">
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThemeSwitcherProvider>
  </React.StrictMode>
);
