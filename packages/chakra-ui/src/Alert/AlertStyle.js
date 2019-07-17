/** @jsx jsx */
import { colorEmphasis, get } from "../theme/colors.utils";
import { useTheme, useUIMode } from "../ThemeProvider";

const leftAccent = props => {
  const { color } = props;
  return {
    light: {
      ...subtle(props).light,
      borderLeft: "4px",
      borderColor: get(color, 500)
    },
    dark: {
      ...subtle(props).dark,
      borderLeft: "4px",
      borderColor: get(color, 200)
    }
  };
};

const topAccent = props => {
  const { color } = props;
  return {
    light: {
      ...subtle(props).light,
      borderTop: "4px",
      borderColor: get(color, 500)
    },
    dark: {
      ...subtle(props).dark,
      borderTop: "4px",
      borderColor: get(color, 200)
    }
  };
};

const solid = ({ color }) => {
  return {
    light: { bg: get(color, 500), color: "white" },
    dark: { bg: get(color, 200), color: "gray.900" }
  };
};

const subtle = ({ color, theme: { colors } }) => {
  let darkBg = colors[color][200];
  return {
    light: {
      bg: get(color, 50)
    },
    dark: { bg: colorEmphasis(darkBg, "lowest") }
  };
};

const statusProps = props => {
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
  position: "relative",
  alignItems: "flex-start",
  justifyContent: "space-between",
  overflow: "hidden",
  px: 4,
  py: 3
};

const useAlertStyle = props => {
  const { mode } = useUIMode();
  const theme = useTheme();
  const _props = { ...props, theme };

  return {
    ...baseProps,
    ...statusProps(_props)[mode]
  };
};

export const useIconStyle = ({ variant, color }) => {
  const { mode } = useUIMode();
  if (["left-accent", "top-accent", "subtle"].includes(variant)) {
    let result = {
      light: { color: get(color, 500) },
      dark: { color: get(color, 200) }
    };

    return result[mode];
  }
};

export default useAlertStyle;
