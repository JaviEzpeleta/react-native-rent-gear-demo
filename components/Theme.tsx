import React from "react";
import { ThemeProvider, DefaultTheme } from "styled-components/native";

declare module "styled-components" {
  export interface DefaultTheme {
    main: string;
    grayText: string;
    grayTextOnWhite: string;
    blackText: string;
    blackTextLighter: string;
    primary: string;
    primaryLighter: string;
    primaryLighter2: string;
    darkIcon: string;
    grayForLines: string;
    appBackground: string;
    boxShadow: string;
    boxShadowStronger: string;
    tagBackground: string;
    profileCardBackground: string;
    profileCardText: string;
  }
}

const theme: DefaultTheme = {
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
};

const Theme: React.StatelessComponent<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
