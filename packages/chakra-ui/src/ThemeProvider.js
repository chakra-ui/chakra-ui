/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ThemeProvider as EmotionProvider } from "emotion-theming";
import { createContext, useContext } from "react";
import theme from "./theme";

const UIModeContext = createContext("light");

export const useUIMode = () => {
  const mode = useContext(UIModeContext);
  if (mode === undefined) {
    throw new Error("useUIMode must be used within a UIModeContext Provider");
  }
  return mode;
};

export const UIModeProvider = UIModeContext.Provider;

const ThemeProvider = ({ mode, theme, children }) => {
  return (
    <EmotionProvider theme={theme}>
      <UIModeContext.Provider value={mode}>{children}</UIModeContext.Provider>
    </EmotionProvider>
  );
};

ThemeProvider.defaultProps = {
  theme
};

export default ThemeProvider;
