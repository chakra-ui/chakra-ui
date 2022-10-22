import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"
import { getColor } from "@chakra-ui/theme-tools"

const $bg = cssVar("input-background-color")
const $bc = cssVar("input-border-color")
const $fc = cssVar("input-focus-border-color")
const $ec = cssVar("input-error-border-color")

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
    [$fc.variable]: fc || `colors.blue.500`,
    [$ec.variable]: ec || `colors.red.500`,

    _dark: {
      [$fc.variable]: fc || `colors.blue.300`,
      [$ec.variable]: ec || `colors.red.300`,
    },

    focusBorderColor: $fc.reference,
    errorBorderColor: $ec.reference,
  }
}

const variantOutline = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: "1px solid",
      [$bc.variable]: "inherit",
      bg: "inherit",
      _hover: {
        [$bc.variable]: "colors.gray.300",
        _dark: {
          [$bc.variable]: "colors.whiteAlpha.400",
        },
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        [$bc.variable]: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focusVisible: {
        zIndex: 1,
        [$bc.variable]: getColor(theme, fc),
        boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      border: "1px solid",
      [$bc.variable]: "inherit",
      [$bg.variable]: "colors.gray.100",
      _dark: {
        [$bc.variable]: "colors.whiteAlpha.50",
        [$bg.variable]: "colors.whiteAlpha.300",
      },
    },

    borderColor: $bc.reference,
    bg: $bg.reference,
  }
})

const variantFilled = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: "2px solid",
      [$bc.variable]: "transparent",
      [$bg.variable]: "colors.gray.100",
      _dark: {
        [$bg.variable]: "colors.whiteAlpha.50",
      },
      _hover: {
        [$bg.variable]: "colors.gray.200",
        _dark: {
          [$bg.variable]: "colors.whiteAlpha.100",
        },
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        [$bc.variable]: getColor(theme, ec),
      },
      _focusVisible: {
        [$bg.variable]: "transparent",
        [$bc.variable]: getColor(theme, fc),
      },
    },
    addon: {
      border: "2px solid",
      [$bc.variable]: "transparent",
      [$bg.variable]: "colors.gray.100",
      _dark: {
        [$bg.variable]: "colors.whiteAlpha.50",
      },
    },

    borderColor: $bc.reference,
    bg: $bg.reference,
  }
})

const variantFlushed = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      borderBottom: "1px solid",
      [$bc.variable]: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        [$bc.variable]: getColor(theme, ec),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`,
      },
      _focusVisible: {
        [$bc.variable]: getColor(theme, fc),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      borderBottom: "2px solid",
      [$bc.variable]: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
    },
    borderColor: $bc.reference,
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
