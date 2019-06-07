/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ThemeProvider as EmotionProvider } from "emotion-theming";
import theme from "./theme";

const ThemeProvider = ({ theme, children }) => {
  return <EmotionProvider theme={theme}>{children}</EmotionProvider>;
};

ThemeProvider.defaultProps = {
  theme
};

export default ThemeProvider;
