/** @jsx jsx */
import { colorEmphasis, generateStripe } from "../theme/colors-utils";
import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";

const leftAccent = props => {
  const { color } = props;
  return {
    light: {
      pl: 3,
      ...subtle(props).light,
      borderLeft: "4px",
      borderColor: `${color}.500`,
    },
    dark: {
      pl: 3,
      ...subtle(props).dark,
      borderLeft: "4px",
      borderColor: `${color}.200`,
    },
  };
};

const topAccent = props => {
  const { color } = props;
  return {
    light: {
      pt: 2,
      ...subtle(props).light,
      borderTop: "4px",
      borderColor: `${color}.500`,
    },
    dark: {
      pt: 2,
      ...subtle(props).dark,
      borderTop: "4px",
      borderColor: `${color}.200`,
    },
  };
};

const solid = ({ color }) => {
  return {
    light: { bg: `${color}.500`, color: "white" },
    dark: { bg: `${color}.200`, color: "gray.900" },
  };
};

const subtle = ({ color, theme: { colors } }) => {
  let darkBg = colors[color] && colors[color][200];
  return {
    light: {
      bg: `${color}.100`,
    },
    dark: { bg: colorEmphasis(darkBg, "lowest") },
  };
};

const statusStyleProps = props => {
  switch (props.variant) {
    case "solid":
      return solid(props);
    case "subtle":
      return subtle(props);
    case "top-accent":
      return topAccent(props);
    case "left-accent":
      return leftAccent(props);
    default:
      return {};
  }
};

const baseProps = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  pl: 4,
  pr: 4,
  pt: 3,
  pb: 3,
};

const useAlertStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const _props = { ...props, theme };

  return {
    ...baseProps,
    ...statusStyleProps(_props)[colorMode],
  };
};

export const useIconStyle = ({ variant, color }) => {
  const { colorMode } = useColorMode();
  if (["left-accent", "top-accent", "subtle"].includes(variant)) {
    let result = {
      light: { color: `${color}.500` },
      dark: { color: `${color}.200` },
    };

    return result[colorMode];
  }
};

export default useAlertStyle;
