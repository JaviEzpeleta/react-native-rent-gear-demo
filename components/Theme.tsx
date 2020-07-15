import React from "react";
import { ThemeProvider } from "styled-components/native";

const theme = {
  main: "mediumseagreen",
  grayText: "#9e9ba9",
  grayTextOnWhite: "#a29fac",
  blackText: "#3f455b",
  blackTextLighter: "#3f455bc9",
  primary: "#ff5667",
  primaryLighter: "#fb9fac",
  primaryLighter2: "#fef1f1",
  darkIcon: "#3e445a",
  grayForLines: "#e1e1e1",
  appBackground: "#f9f9f9",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.06)",
  boxShadowStronger: "0 5px 15px rgba(0, 0, 0, 0.12)",
  tagBackground: "#f1f1f1",
  profileCardBackground: "#39415b",
  profileCardText: "#6b7086",
  // tagBackground: "#f5f5f6",
  // appBackground: "#9c9c9c",
};

const Theme: React.StatelessComponent<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
