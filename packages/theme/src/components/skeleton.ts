import { getColor, mode } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const baseStyle = (props: ThemeComponentProps) => {
  const defaultStartColor = mode("gray.100", "gray.800")(props)
  const defaultEndColor = mode("gray.400", "gray.600")(props)

  const {
    startColor = defaultStartColor,
    endColor = defaultEndColor,
    speed,
    theme,
    _serializer,
  } = props

  const start = getColor(theme, startColor)
  const end = getColor(theme, endColor)

  const fade = _serializer.keyframes({
    from: { borderColor: startColor, background: startColor },
    to: { borderColor: endColor, background: endColor },
  })

  return {
    opacity: 0.7,
    borderRadius: "2px",
    borderColor: start,
    background: end,
    animation: `${speed}s linear infinite alternate ${fade}`,
  }
}

export default {
  baseStyle,
}
