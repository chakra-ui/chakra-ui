import { getColor } from "@chakra-ui/color"
import { ComponentTheme, mode } from "./utils"

function getOutlineStyle(props: any) {
  const { focusBorderColor: fc, errorBorderColor: ec, theme: t } = props
  return {
    border: "1px solid",
    borderColor: mode("inherit", "whiteAlpha.50")(props),
    bg: mode("white", "whiteAlpha.100")(props),
    _hover: {
      borderColor: mode("gray.300", "whiteAlpha.200")(props),
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
      boxShadow: `0 0 0 1px ${getColor(t, fc)}`,
    },
    _invalid: {
      borderColor: getColor(t, ec),
      boxShadow: `0 0 0 1px ${getColor(t, ec)}`,
    },
  }
}

function getFilledStyle(props: any) {
  const { theme: t, focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    border: "2px solid",
    borderColor: "transparent",
    bg: mode("gray.100", "whiteAlpha.50")(props),
    _hover: {
      bg: mode("gray.200", "whiteAlpha.100")(props),
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      bg: "transparent",
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  }
}

function getFlushedStyle(props: any) {
  const { focusBorderColor: fc, errorBorderColor: ec, theme: t } = props
  return {
    borderBottom: "2px solid",
    borderColor: "inherit",
    borderRadius: 0,
    paddingX: 0,
    bg: "transparent",
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  }
}

const unstyled = {
  bg: "transparent",
  paddingX: 0,
  height: "auto",
}

const sizes = {
  lg: {
    fontSize: "lg",
    paddingX: 4,
    height: 12,
    borderRadius: "md",
  },
  md: {
    fontSize: "md",
    paddingX: 4,
    height: 10,
    borderRadius: "md",
  },
  sm: {
    fontSize: "sm",
    paddingX: 3,
    height: 8,
    borderRadius: "sm",
  },
}

const Input: ComponentTheme = {
  defaultProps: {
    size: "md",
    variant: "outline",
  },
  sizes,
  variants: {
    outline: getOutlineStyle,
    filled: getFilledStyle,
    flushed: getFlushedStyle,
    unstyled,
  },
}

export default Input
