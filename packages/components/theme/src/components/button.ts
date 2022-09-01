import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system"
import { transparentize } from "@chakra-ui/theme-tools"
import { runIfFn } from "../utils/run-if-fn"

const baseStyle = defineStyle({
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
})

const $color = cssVar("button-color")
const $bg = cssVar("button-background")
const $borderColor = cssVar("button-border-color")

const variantGhost = defineStyle((props) => {
  const { colorScheme: c, theme } = props

  if (c === "gray") {
    return {
      [$color.variable]: "inherit",
      _dark: {
        [$color.variable]: "colors.whiteAlpha.900",
      },
      _hover: {
        [$bg.variable]: "colors.gray.100",
        _dark: {
          [$bg.variable]: "colors.whiteAlpha.200",
        },
      },
      _active: {
        [$bg.variable]: "colors.gray.200",
        _dark: {
          [$bg.variable]: "colors.whiteAlpha.300",
        },
      },

      color: $color.reference,
      bg: $bg.reference,
    }
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme)
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

  return {
    _hover: {
      [$bg.variable]: `colors.${c}.50`,
      _dark: {
        [$color.variable]: darkHoverBg,
      },
    },
    _active: {
      [$bg.variable]: `colors.${c}.100`,
      _dark: {
        [$color.variable]: darkActiveBg,
      },
    },

    [$color.variable]: `colors.${c}.600`,
    [$bg.variable]: "transparent",
    _dark: {
      [$color.variable]: `colors.${c}.200`,
    },

    color: $color.reference,
    bg: $bg.reference,
  }
})

const variantOutline = defineStyle((props) => {
  const { colorScheme: c } = props

  const ghostStyles = runIfFn(variantGhost, props)

  return {
    ".chakra-button__group[data-attached] > &:not(:last-of-type)": {
      marginEnd: "-1px",
    },
    border: "1px solid",
    [$borderColor.variable]: "colors.gray.200",
    borderColor: c === "gray" ? $borderColor.reference : "currentColor",

    ...ghostStyles,
    _dark: {
      [$borderColor.variable]: "colors.whiteAlpha.300",
      ...ghostStyles._dark,
    },
  }
})

type AccessibleColor = {
  bg?: string
  color?: string
  hoverBg?: string
  activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600",
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600",
  },
}

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props

  if (c === "gray") {
    return {
      [$bg.variable]: `colors.gray.100`,
      _dark: {
        [$bg.variable]: "colors.whiteAlpha.200",
      },
      _hover: {
        [$bg.variable]: "colors.gray.200",
        _dark: {
          [$bg.variable]: "colors.whiteAlpha.300",
        },
        _disabled: {
          [$bg.variable]: `colors.gray.100`,
          _dark: {
            [$bg.variable]: "colors.whiteAlpha.200",
          },
        },
      },
      _active: {
        [$bg.variable]: "colors.gray.300",
        _dark: {
          [$bg.variable]: "colors.whiteAlpha.400",
        },
      },

      bg: $bg.reference,
    }
  }

  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {}

  return {
    [$bg.variable]: `colors.${bg}`,
    [$color.variable]: color,
    _dark: {
      [$bg.variable]: `colors.${c}.200`,
      [$color.variable]: "colors.gray.800",
    },

    _hover: {
      [$bg.variable]: `colors.${hoverBg}`,
      _dark: {
        [$bg.variable]: `colors.${c}.300`,
      },
      _disabled: {
        [$bg.variable]: `colors.${bg}`,
        _dark: {
          [$color.variable]: `colors.${c}.200`,
        },
      },
    },
    _active: {
      [$bg.variable]: `colors.${activeBg}`,
      _dark: {
        [$color.variable]: `colors.${c}.400`,
      },
    },
    bg: $bg.reference,
    color: $color.reference,
  }
})

const variantLink = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    [$color.variable]: `colors.${c}.500`,
    _dark: {
      [$color.variable]: `colors.${c}.200`,
    },
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },
    _active: {
      [$color.variable]: `colors.${c}.700`,
      _dark: {
        [$color.variable]: `colors.${c}.500`,
      },
    },
    color: $color.reference,
  }
})

const variantUnstyled = defineStyle({
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: "0",
  p: "0",
})

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
}

const sizes = {
  lg: defineStyle({
    h: "12",
    minW: "12",
    fontSize: "lg",
    px: "6",
  }),
  md: defineStyle({
    h: "10",
    minW: "10",
    fontSize: "md",
    px: "4",
  }),
  sm: defineStyle({
    h: "8",
    minW: "8",
    fontSize: "sm",
    px: "3",
  }),
  xs: defineStyle({
    h: "6",
    minW: "6",
    fontSize: "xs",
    px: "2",
  }),
}

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
})
