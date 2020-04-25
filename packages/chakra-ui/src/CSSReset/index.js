/** @jsx jsx */
import { jsx, Global, css } from "@emotion/core";
import { useColorMode } from "../ColorModeProvider";
import preflight from "./preflight";

const defaultConfig = theme => ({
  light: {
    color: theme.colors.gray[800],
    bg: undefined,
    borderColor: theme.colors.gray[200],
    placeholderColor: theme.colors.gray[400],
  },
  dark: {
    color: theme.colors.whiteAlpha[900],
    bg: theme.colors.gray[800],
    borderColor: theme.colors.whiteAlpha[300],
    placeholderColor: theme.colors.whiteAlpha[400],
  },
});

const CSSReset = ({ config }) => {
  const { colorMode } = useColorMode();

  const configCSS = theme => {
    const _defaultConfig = defaultConfig(theme);

    const _config = config
      ? config(theme, _defaultConfig)
      : defaultConfig(theme);

    const { color, bg, borderColor, placeholderColor } = _config[colorMode];
    const { lineHeights } = theme
    const lineHeight = lineHeights && lineHeights.base ? lineHeights.base : 1.5

    return css`
      html {
        line-height: ${lineHeight};
        color: ${color};
        background-color: ${bg};
      }

      /**
      * Allow adding a border to an element by just adding a border-width.
      */

      *,
      *::before,
      *::after {
        border-width: 0;
        border-style: solid;
        border-color: ${borderColor};
      }

      input:-ms-input-placeholder,
      textarea:-ms-input-placeholder {
        color: ${placeholderColor};
      }

      input::-ms-input-placeholder,
      textarea::-ms-input-placeholder {
        color: ${placeholderColor};
      }

      input::placeholder,
      textarea::placeholder {
        color: ${placeholderColor};
      }
    `;
  };

  return <Global styles={theme => css([preflight(theme), configCSS(theme)])} />;
};

export default CSSReset;
