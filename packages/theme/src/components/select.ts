import { multiStyleConfig, mode } from "@chakra-ui/theme-tools"
import { inputStyles } from "./input"

const { sizes, defaultProps, variants } = inputStyles

const parts = {
  field: "the select field itself",
  icon: "the select field icon",
}

const baseStyleField = function (props: Record<string, any>) {
  return {
    ...inputStyles.baseStyle?.field,
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

const select = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps,
})

export const selectStyles = {
  parts,
  baseStyle,
  variants,
  defaultProps,
}

export default select
