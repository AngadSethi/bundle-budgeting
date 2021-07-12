import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { createDarkTheme, createLightTheme, ThemeProvider } from "baseui";

const engine = new Styletron();

const lightTheme = createLightTheme({
  primaryFontFamily: "Proxima Nova",
});

const darkTheme = createDarkTheme({
  primaryFontFamily: "Proxima Nova",
});

ReactDOM.render(
  <StyletronProvider value={engine}>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </StyletronProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
