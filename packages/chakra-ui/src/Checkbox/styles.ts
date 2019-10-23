import { get } from "../theme/colors-utils";
import { Required } from "@chakra-ui/utils";
import { CheckboxOptions } from "./Checkbox";

// TODO: Move all these to theme object
// Under theme.components.Checkbox = {root: "", interaction: ""}
const baseProps = {
  userSelect: "none",
  border: "2px",
  rounded: "md",
  borderColor: "inherit",
  transition: "background-color 120ms, box-shadow 250ms",
};

const interactionProps = ({ color, colorMode }: StyleProp) => {
  const isDarkMode = colorMode === "dark";
  const _color = isDarkMode ? 200 : 500;
  return {
    color: "white",
    _checked: {
      bg: get(color, _color),
      borderColor: get(color, _color),
      color: isDarkMode ? "gray.900" : undefined,
    },
    _checkedAndDisabled: {
      borderColor: isDarkMode ? "transparent" : "gray.200",
      bg: isDarkMode ? "whiteAlpha.300" : "gray.200",
      color: isDarkMode ? "whiteAlpha.500" : "gray.500",
    },
    _disabled: {
      bg: isDarkMode ? "whiteAlpha.100" : "gray.100",
      borderColor: isDarkMode ? "transparent" : "gray.100",
    },
    _focus: {
      boxShadow: "outline",
    },
    _invalid: {
      borderColor: isDarkMode ? "red.300" : "red.500",
    },
  };
};

type RequiredCheckboxOptions = Required<CheckboxOptions>;

interface StyleProp {
  size: RequiredCheckboxOptions["size"];
  color: RequiredCheckboxOptions["variantColor"];
  colorMode: "light" | "dark";
  type?: "radio" | "checkbox";
}

const useCheckboxStyle = (props: StyleProp) => {
  const sizes = {
    lg: 5,
    md: 4,
    sm: props.type === "radio" ? 3 : "auto",
  };

  return {
    ...baseProps,
    ...(props.size && { rounded: "sm" }),
    ...interactionProps(props),
    size: sizes[props.size],
  };
};

export default useCheckboxStyle;
