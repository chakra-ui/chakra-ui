/** @jsx jsx */
import { jsx, ThemeContext } from "@emotion/core";
import { ThemeProvider as EThemeProvider } from "emotion-theming";
import { createContext, useContext, useState } from "react";
import useDarkMode from "use-dark-mode";
import theme from "../theme";

// This context handles the color mode (light or dark) of the UI

const UIModeContext = createContext();

const UIModeProvider = ({ value: overideValue, children }) => {
  const [manualMode, setManualMode] = useState(overideValue);

  const manualToggle = () => {
    if (manualMode === "light") {
      setManualMode("dark");
    }

    if (manualMode === "dark") {
      setManualMode("light");
    }
  };

  const { value, toggle } = useDarkMode(false);
  const mode = value ? "light" : "dark";

  const childContext = overideValue
    ? { mode: manualMode, toggle: manualToggle }
    : { mode, toggle };

  return (
    <UIModeContext.Provider value={childContext}>
      {children}
    </UIModeContext.Provider>
  );
};

const DarkMode = props => <UIModeProvider value="dark" {...props} />;
const LightMode = props => <UIModeProvider value="light" {...props} />;

const useUIMode = () => {
  const context = useContext(UIModeContext);
  if (context === undefined) {
    throw new Error("useUIMode must be used within a UIModeProvider");
  }
  return context;
};

const ThemeProvider = ({ theme, children }) => {
  return <EThemeProvider theme={theme}>{children}</EThemeProvider>;
};

ThemeProvider.defaultProps = {
  theme
};

const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export default ThemeProvider;

export { UIModeProvider, useTheme, useUIMode, DarkMode, LightMode };
