import { BaseStyle, mode } from "@chakra-ui/theme-tools"
import { MotionConfig } from "@chakra-ui/transition"

const register = {
  parts: ["arrow", "container"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    container: {
      paddingX: "8px",
      paddingY: "2px",
      bg: mode(`gray.700`, `gray.300`)(props),
      color: mode(`whiteAlpha.900`, `gray.900`)(props),
      borderRadius: "sm",
      fontWeight: "medium",
      pointerEvents: "none",
      fontSize: "sm",
      boxShadow: "md",
      maxWidth: "320px",
    },
  }
}

const motion: Record<string, MotionConfig> = {
  container: {
    timeout: 120,
    transition: {
      easing: "ease-in-out",
      duration: "120ms",
      property: "common",
    },
    enter: {
      from: { opacity: 0.01, transform: `scale(0.9)` },
      to: { opacity: 1, transform: `scale(1)` },
    },
    exit: {
      from: { opacity: 1, transform: `scale(1)` },
      to: { opacity: 0.01, transform: `scale(0.9)` },
    },
  },
}

const tooltip = {
  register,
  baseStyle,
  motion,
}

export default tooltip
