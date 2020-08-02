import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"
import input from "./input"

const numberInput = multiStyleConfig({
  parts: {
    field: "the input field",
    stepper: "desktop - the increment and decrement button",
    stepperGroup: "desktop - the increment and decrement button group",
  },

  baseStyle: function (props) {
    return {
      field: input.baseStyle?.field,
      stepperGroup: {
        width: "24px",
      },
      stepper: {
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
    }
  },
  sizes: {
    sm: getSize("sm"),
    md: getSize("md"),
    lg: getSize("lg"),
  },
  variants: input.variants,
  defaultProps: input.defaultProps,
})

function getSize(size: "sm" | "md" | "lg") {
  const sizeStyle = input.sizes?.[size]

  const radius = {
    lg: "md",
    md: "md",
    sm: "sm",
  }

  return {
    field: sizeStyle?.field,
    stepper: {
      fontSize: size === "lg" ? "14px" : "10px",
      _first: {
        borderTopRightRadius: radius[size],
      },
      _last: {
        borderBottomRightRadius: radius[size],
        mt: "-1px",
        borderTopWidth: 1,
      },
    },
  }
}

export default numberInput
