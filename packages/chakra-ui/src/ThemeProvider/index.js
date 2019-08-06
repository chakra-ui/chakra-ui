/** @jsx jsx */
import { jsx, ThemeContext } from "@emotion/core";
import Emotion from "emotion-theming";
import { useContext } from "react";
import theme from "../theme";

const ThemeProvider = ({ theme, children }) => (
  <Emotion.ThemeProvider theme={theme}>{children}</Emotion.ThemeProvider>
);

ThemeProvider.defaultProps = {
  theme,
};

const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export default ThemeProvider;
export { useTheme };
