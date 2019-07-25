import { get } from "../theme/colors.utils";

const baseProps = {
  userSelect: "none",
  border: "2px",
  rounded: "md",
  borderColor: "inherit",
  transition: "background-color 120ms, box-shadow 250ms"
};

const interactionProps = ({ color, mode }) => {
  const isDarkMode = mode === "dark";
  const _color = isDarkMode ? 200 : 500;
  return {
    color: "white",
    _checked: {
      bg: get(color, _color),
      borderColor: get(color, _color),
      color: isDarkMode ? "gray.900" : undefined
    },
    _checkedAndDisabled: {
      borderColor: isDarkMode ? "transparent" : "gray.200",
      bg: isDarkMode ? "alpha.300" : "gray.200",
      color: isDarkMode ? "alpha.500" : "gray.500"
    },
    _disabled: {
      bg: isDarkMode ? "alpha.100" : "gray.100",
      borderColor: isDarkMode ? "transparent" : "gray.100"
    },
    _focus: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: isDarkMode ? "red.300" : "red.500"
    }
  };
};

const sizes = {
  lg: 5,
  md: 4,
  sm: 3
};

const checkboxStyles = props => {
  return {
    ...baseProps,
    ...interactionProps(props),
    size: sizes[props.size]
  };
};

export default checkboxStyles;
