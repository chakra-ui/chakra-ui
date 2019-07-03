/** @jsx jsx */
import { jsx, ThemeContext, Global, css } from "@emotion/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import { useContext, createContext } from "react";
import useDarkMode from "use-dark-mode";
import theme from "./theme";

///////////////////////////////////////////////////

const UIModeContext = createContext();

const UIModeProvider = ({ value: overideValue, children }) => {
  const { value, ...rest } = useDarkMode(false);
  const mode = value ? "light" : "dark";

  const childContext = overideValue
    ? { mode: overideValue }
    : { mode, ...rest };
  return (
    <UIModeContext.Provider value={childContext}>
      {children}
    </UIModeContext.Provider>
  );
};

const DarkMode = props => <UIModeProvider value="dark" {...props} />;

const useUIMode = () => {
  const context = useContext(UIModeContext);
  if (context === undefined) {
    throw new Error("useUIMode must be used within a UIModeProvider");
  }
  return context;
};

///////////////////////////////////////////////////

const ThemeProvider = ({ theme, children }) => {
  const { mode } = useUIMode();
  return (
    <EmotionThemeProvider theme={theme}>
      <div>
        {mode === "dark" && (
          <Global
            styles={theme =>
              css`
                body {
                  background-color: #121212;
                }
              `
            }
          />
        )}
        {children}
      </div>
    </EmotionThemeProvider>
  );
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

export { ThemeProvider, UIModeProvider, useTheme, useUIMode, DarkMode };
