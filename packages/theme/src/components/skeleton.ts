import { keyframes } from "@chakra-ui/system"
import type { SystemStyleFunction } from "@chakra-ui/theme-tools"
import { getColor } from "@chakra-ui/theme-tools"

const fade = (startColor: string, endColor: string) =>
  keyframes({
    from: { borderColor: startColor, background: startColor },
    to: { borderColor: endColor, background: endColor },
  })

const defaultStartColorLight = "gray.100"
const defaultStartColorDark = "gray.800"
const defaultEndColorDark = "gray.600"
const defaultEndColorLight = "gray.400"

const baseStyle: SystemStyleFunction = (props) => {
  const { startColor, endColor, speed, theme } = props

  const startDark = getColor(theme, startColor ?? defaultStartColorDark)
  const endDark = getColor(theme, endColor ?? defaultEndColorDark)
  const startLight = getColor(theme, startColor ?? defaultStartColorLight)
  const endLight = getColor(theme, endColor ?? defaultEndColorLight)

  return {
    opacity: 0.7,
    borderRadius: "2px",
    _light: {
      borderColor: startLight,
      background: endLight,
      animation: `${speed}s linear infinite alternate ${fade(
        startLight,
        endLight,
      )}`,
    },
    _dark: {
      borderColor: startDark,
      background: endDark,
      animation: `${speed}s linear infinite alternate ${fade(
        startDark,
        endDark,
      )}`,
    },
  }
}

export default {
  baseStyle,
}
