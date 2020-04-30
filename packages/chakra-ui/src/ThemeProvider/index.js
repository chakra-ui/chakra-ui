/** @jsx jsx */
import { jsx, ThemeContext } from "@emotion/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import { useContext } from "react";
import theme from "../theme";

const ThemeProvider = ({ theme, children }) => (
  <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
);

ThemeProvider.defaultProps = {
  theme,
};

const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (theme === undefined || Object.keys(theme).length === 0 ) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export default ThemeProvider;
export { useTheme };
