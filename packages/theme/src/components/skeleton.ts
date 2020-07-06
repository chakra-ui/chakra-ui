import { keyframes } from "@chakra-ui/system"
import { BaseStyle, getColor, mode } from "@chakra-ui/theme-tools"

const register = {
  parts: ["skeleton"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  const {
    startColor = mode("gray.100", "gray.800")(props),
    endColor = mode("gray.400", "gray.600")(props),
    speed,
    theme,
  } = props

  const start = getColor(theme, startColor)
  const end = getColor(theme, endColor)

  return {
    skeleton: {
      opacity: 0.7,
      borderRadius: "2px",
      borderColor: start,
      background: end,
      animation: `${speed}s linear infinite alternate ${frame(start, end)}`,
    },
  }
}

const skeleton = {
  register,
  baseStyle,
}

export default skeleton

export function frame(startColor: string, endColor: string) {
  return keyframes({
    from: { borderColor: startColor, background: startColor },
    to: { borderColor: endColor, background: endColor },
  })
}
