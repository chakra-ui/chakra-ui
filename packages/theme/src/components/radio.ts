import { BaseStyle, runIfFn, Sizes } from "@chakra-ui/theme-tools"
import checkbox from "./checkbox"

const register = {
  parts: ["control", "label"],
  sizes: checkbox.register.sizes,
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  const { label, control } = runIfFn(checkbox.baseStyle, props)
  return {
    label,
    control: {
      ...control,
      borderRadius: "full",
      _checked: {
        ...control?.["_checked"],
        _before: {
          content: `""`,
          display: "inline-block",
          position: "relative",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          bg: "currentColor",
        },
      },
    },
  }
}

const sizes: Sizes<typeof register> = {
  ...checkbox.sizes,
  sm: {
    control: { width: 3, height: 3 },
  },
}

const defaultProps = checkbox.defaultProps

const radio = {
  register,
  defaultProps,
  baseStyle,
  sizes,
}

export default radio
