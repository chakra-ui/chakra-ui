import * as React from "react";
import { theme } from "@chakra-ui/theme";
import createThemeContext from "../../create-theme-context";
import { Global, css } from "@emotion/core";
import { SystemProps } from "../../system";

type ExposedProps = {
  /**
   * The `variant` prop passed to the component
   */
  variant: string;
  /**
   * The `theme` object from context
   */
  theme: object;
  /**
   * The `variantColor` prop passed to the component
   */
  variantColor: string;
  /**
   * The current `colorMode` from context
   */
  colorMode: "light" | "dark";
};

type Style = {
  [k: string]: SystemProps | ((props: ExposedProps) => SystemProps);
};

interface ComponentStyle {
  variant?: Style;
  variantColor?: Style;
  variantSize?: Style;
}

const Button: ComponentStyle = {
  variant: {
    unstyled: {
      userSelect: "inherit",
      bg: "none",
      border: 0,
      color: "inherit",
      display: "inline",
      fontFamily: "inherit",
      lineHeight: "inherit",
      margin: 0,
      padding: 0,
      textAlign: "inherit",
    },
    link: ({ variantColor }) => {
      const _color = {
        light: `${variantColor}.500`,
        dark: `${variantColor}.200`,
      };
      const _activeColor = {
        light: `${variantColor}.700`,
        dark: `${variantColor}.500`,
      };
      return {
        padding: 0,
        height: "auto",
        lineHeight: "normal",
        color: _color["light"],
        _hover: {
          textDecoration: "underline",
        },
        _active: {
          color: _activeColor["light"],
        },
      };
    },
    solid: ({ variantColor }) => {
      const style = {
        light: {
          bg: `${variantColor}.500`,
          color: "white",
          _hover: {
            bg: `${variantColor}.600`,
          },
          _active: {
            bg: `${variantColor}.700`,
          },
        },
        dark: {
          bg: `${variantColor}.200`,
          color: "gray.800",
          _hover: {
            bg: `${variantColor}.300`,
          },
          _active: {
            bg: `${variantColor}.400`,
          },
        },
      };

      return style["light"];
    },
  },
  variantSize: {
    lg: {
      height: 12,
      minWidth: 12,
      fontSize: "lg",
      px: 6,
    },
    md: {
      height: 10,
      minWidth: 10,
      fontSize: "md",
      px: 4,
    },
    sm: {
      height: 8,
      minWidth: 8,
      fontSize: "sm",
      px: 3,
    },
    xs: {
      height: 6,
      minWidth: 6,
      fontSize: "xs",
      px: 2,
    },
  },
};

//////////////////////////////////////////////////////////////////

const [ThemeProvider] = createThemeContext({
  ...theme,
  components: {
    Button,
  },
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
          box-sizing: border-box;
        }
      `}
    />
    {story()}
  </ThemeProvider>
);

export { ThemeProvider };
export default setup;
