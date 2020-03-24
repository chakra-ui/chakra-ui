import { ComponentTheme, mode } from "./utils"
import { SystemProps } from "@chakra-ui/system"

function getSizeStyle(size: "sm" | "md" | "lg"): SystemProps {
  return {
    fontSize: size === "sm" ? "11px" : "15px",
    _first: {
      borderTopRightRadius: size === "sm" ? 1 : 3,
    },
    _last: {
      borderBottomRightRadius: size === "sm" ? 1 : 3,
      mt: "-1px",
      borderTopWidth: 1,
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
    sm: {
      Stepper: getSizeStyle("sm"),
    },
    md: {
      Stepper: getSizeStyle("md"),
    },
    lg: {
      Stepper: getSizeStyle("lg"),
    },
  },
}

export default NumberInput
