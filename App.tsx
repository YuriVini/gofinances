import React from "react";
import theme from "./src/global/styles/theme";
import { ThemeProvider } from "styled-components";
import { Dashboard } from "./src/screens/Dashboard";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
