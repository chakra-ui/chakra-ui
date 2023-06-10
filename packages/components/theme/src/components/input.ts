import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { getColorVar, mode } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
})

const size = {
  lg: defineStyle({
    fontSize: "lg",
    px: "4",
    h: "12",
    borderRadius: "md",
  }),
  md: defineStyle({
    fontSize: "md",
    px: "4",
    h: "10",
    borderRadius: "md",
  }),
  sm: defineStyle({
    fontSize: "sm",
    px: "3",
    h: "8",
    borderRadius: "sm",
  }),
  xs: defineStyle({
    fontSize: "xs",
    px: "2",
    h: "6",
    borderRadius: "sm",
  }),
}

const sizes = {
  lg: definePartsStyle({
    field: size.lg,
    addon: size.lg,
  }),
  md: definePartsStyle({
    field: size.md,
    addon: size.md,
  }),
  sm: definePartsStyle({
    field: size.sm,
    addon: size.sm,
  }),
  xs: definePartsStyle({
    field: size.xs,
    addon: size.xs,
  }),
}

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  }
}

const variantOutline = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColorVar(theme, ec),
        boxShadow: `0 0 0 1px ${getColorVar(theme, ec)}`,
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColorVar(theme, fc),
        boxShadow: `0 0 0 1px ${getColorVar(theme, fc)}`,
      },
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props),
    },
  }
})

const variantFilled = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColorVar(theme, ec),
      },
      _focusVisible: {
        bg: "transparent",
        borderColor: getColorVar(theme, fc),
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
    },
  }
})

const variantFlushed = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColorVar(theme, ec),
        boxShadow: `0px 1px 0px 0px ${getColorVar(theme, ec)}`,
      },
      _focusVisible: {
        borderColor: getColorVar(theme, fc),
        boxShadow: `0px 1px 0px 0px ${getColorVar(theme, fc)}`,
      },
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
    },
  }
})

const variantUnstyled = definePartsStyle({
  field: {
    bg: "transparent",
    px: "0",
    height: "auto",
  },
  addon: {
    bg: "transparent",
    px: "0",
    height: "auto",
  },
})

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled,
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
})
