import { ComponentTheme, mode } from "./utils"

function getSizeStyle(size: "sm" | "md" | "lg") {
  return {
    Stepper: {
      fontSize: size === "lg" ? "14px" : "10px",
      _first: {
        borderTopRightRadius: size === "lg" ? 3 : 1,
      },
      _last: {
        borderBottomRightRadius: size === "lg" ? 3 : 1,
        marginTop: "-1px",
        borderTopWidth: 1,
      },
    },
  }
}

const NumberInput: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: props => ({
    StepperGroup: {
      width: "24px",
      margin: "1px",
      position: "absolute",
      right: "0px",
      height: "calc(100% - 2px)",
    },
    Stepper: {
      borderLeft: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.300")(props),
      color: mode("inherit", "whiteAlpha.800")(props),
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props),
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  }),
  sizes: {
    sm: getSizeStyle("sm"),
    md: getSizeStyle("md"),
    lg: getSizeStyle("lg"),
  },
}

export const NumberInputTokens = {
  sizes: {
    sm: "sm",
    md: "md",
    lg: "lg",
  },
}

export default NumberInput
