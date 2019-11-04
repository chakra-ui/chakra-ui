/** @jsx jsx */
import { jsx, ThemeContext } from "@emotion/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import { useContext } from "react";
import { theme as defaultTheme, Theme } from "../theme/base";

interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTheme,
  children,
}) => <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;

export function useTheme() {
  const theme = useContext(ThemeContext as React.Context<Theme>);
  if (theme === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
}

export default ThemeProvider;
