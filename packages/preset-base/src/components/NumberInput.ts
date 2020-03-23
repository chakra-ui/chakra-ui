import { ComponentTheme, getModeColor as color } from "./utils"
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
  baseStyle: (props: any) => ({
    StepperGroup: {
      width: "24px",
      margin: "1px",
      position: "absolute",
      right: "0px",
      height: "calc(100% - 2px)",
    },
    Stepper: {
      borderLeft: "1px solid",
      borderColor: color(props, "inherit", "whiteAlpha.300"),
      color: color(props, "inherit", "whiteAlpha.800"),
      _active: {
        bg: color(props, "gray.200", "whiteAlpha.300"),
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
