import { mode } from "@chakra-ui/theme-tools"
import Input from "./input"

const { sizes, defaultProps, variants } = Input

const parts = {
  field: "the select field itself",
  icon: "the select field icon",
}

const baseStyleField = function (props: Record<string, any>) {
  return {
    ...Input.baseStyle?.field,
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option": {
      bg: mode("white", "gray.700")(props),
    },
  }
}

const baseStyleInput = {
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: { opacity: 0.5 },
}

const baseStyle = (props: Record<string, any>) => ({
  field: baseStyleField(props),
  icon: baseStyleInput,
})

export default {
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
