import { keyframes } from "@chakra-ui/system"
import { getColor, mode, styleConfig } from "@chakra-ui/theme-tools"

export function fade(startColor: string, endColor: string) {
  return keyframes({
    from: { borderColor: startColor, background: startColor },
    to: { borderColor: endColor, background: endColor },
  })
}

// @ts-ignore
const baseStyle = function (props) {
  const defaultStartColor = mode("gray.100", "gray.800")(props)
  const defaultEndColor = mode("gray.400", "gray.600")(props)

  const {
    startColor = defaultStartColor,
    endColor = defaultEndColor,
    speed,
    theme,
  } = props

  const start = getColor(theme, startColor)
  const end = getColor(theme, endColor)

  return {
    opacity: 0.7,
    borderRadius: "2px",
    borderColor: start,
    background: end,
    animation: `${speed}s linear infinite alternate ${fade(start, end)}`,
  }
}

const skeleton = styleConfig({
  baseStyle,
})

export const skeletonStyles = {
  baseStyle,
}

export default skeleton
