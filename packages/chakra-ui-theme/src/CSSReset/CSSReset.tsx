/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";
import { useColorMode } from "../ColorModeProvider";
import { Theme } from "../theme";
import preflight from "./preflight";

interface ConfigOptions {
  color: string;
  bg?: string;
  borderColor: string;
  placeholderColor: string;
}

type ConfigReturnType = { light: ConfigOptions; dark: ConfigOptions };

export type CSSResetProps = {
  config?: (theme: Theme, defaultConfig?: ConfigReturnType) => ConfigReturnType;
};

const defaultConfig = (theme: Theme): ConfigReturnType => ({
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

const CSSReset = function CSSReset({ config }: CSSResetProps) {
  const { colorMode } = useColorMode();

  const configCSS = (theme: Theme) => {
    const _defaultConfig = defaultConfig(theme);

    const _config: { [k: string]: ConfigOptions } = config
      ? config(theme, _defaultConfig)
      : defaultConfig(theme);

    const { color, bg, borderColor, placeholderColor } = _config[colorMode];

    return css`
      html {
        line-height: 1.5;
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

  return <Global styles={theme => css([preflight, configCSS(theme)])} />;
} as React.FC<CSSResetProps>;

export default CSSReset;
