import { mode } from "@chakra-ui/theme-tools"
import input from "./input"

const { sizes, defaultProps, variants } = input

const parts = {
  field: "the select field itself",
  icon: "the select field icon",
}

function baseStyleField(props: Record<string, any>) {
  return {
    ...input.baseStyle.field,
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

const select = {
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}

export default select
