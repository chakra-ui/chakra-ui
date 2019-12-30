import * as React from "react";
import { theme } from "@chakra-ui/theme";
import createThemeContext from "../../create-theme-context";
import { Global, css } from "@emotion/core";

const [ThemeProvider] = createThemeContext({
  ...theme,
  styles: {
    h1: {
      fontSize: 40,
      margin: 30,
      color: "green.200",
    },
    h2: {
      fontSize: "2xl",
      margin: 10,
      color: "red.500",
    },
  },
});

const setup = (story: () => any) => (
  <ThemeProvider>
    <Global
      styles={css`
        * {
          font-family: "system-ui";
        }
      `}
    />
    {story()}
  </ThemeProvider>
);

export { ThemeProvider };
export default setup;
