import { BaseStyle, mode, MotionStyle, scaleFade } from "@chakra-ui/theme-tools"

const register = {
  parts: ["content", "header", "body", "footer"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    content: {
      bg: mode("white", "gray.700")(props),
      border: "1px solid",
      borderColor: "inherit",
      borderRadius: "md",
      boxShadow: "sm",
      width: "100%",
      maxWidth: "xs",
      zIndex: "1",
      _focus: {
        outline: 0,
        boxShadow: "outline",
      },
    },
    header: {
      paddingX: 3,
      paddingY: 2,
      borderBottomWidth: "1px",
    },
    body: {
      paddingX: 3,
      paddingY: 2,
    },
    footer: {
      paddingX: 3,
      paddingY: 2,
      borderTopWidth: "1px",
    },
  }
}

const motion: MotionStyle<typeof register> = {
  content: scaleFade,
}

const popover = {
  register,
  baseStyle,
  motion,
}

export default popover
