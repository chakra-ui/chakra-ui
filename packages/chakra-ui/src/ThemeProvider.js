/** @jsx jsx */
import { jsx, ThemeContext, Global, css } from "@emotion/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import { useContext } from "react";
import useDarkMode from "use-dark-mode";
import theme from "./theme";

export const useUIMode = () => {
  const { value, ...rest } = useDarkMode(false);
  const mode = value ? "light" : "dark";
  return { mode, ...rest };
};

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
                  background-color: ${theme.colors.gray[800]};
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

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export default ThemeProvider;
