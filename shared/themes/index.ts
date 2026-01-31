import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeColors = {
  background: string;
  secondaryBackground: string;
  text: string;
  secondaryText: string;
  lightText: string;
  primary: string;
  error: string;
};
