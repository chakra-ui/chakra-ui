import { tabsAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"
import { getColor } from "@chakra-ui/theme-tools"

const $fg = cssVar("tabs-color")
const $bg = cssVar("tabs-bg")
const $border = cssVar("tabs-border-color")

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleRoot = defineStyle((props) => {
  const { orientation } = props
  return {
    position: "relative",
    display: orientation === "vertical" ? "flex" : "block",
  }
})

const baseStyleContentGroup = defineStyle({
  width: "100%",
})

const baseStyleTrigger = defineStyle((props) => {
  const { isFitted } = props

  return {
    outline: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: isFitted ? 1 : undefined,
    transitionProperty: "common",
    transitionDuration: "normal",
    _focusVisible: {
      zIndex: 1,
      boxShadow: "outline",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.4,
    },
  }
})

const baseStyleList = defineStyle((props) => {
  const { align = "start", orientation } = props

  const alignments: Record<string, string> = {
    end: "flex-end",
    center: "center",
    start: "flex-start",
  }

  return {
    display: "flex",
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row",
  }
})

const baseStyleContent = defineStyle({
  p: 4,
  outline: "0",
})

const baseStyle = definePartsStyle((props) => ({
  root: baseStyleRoot(props),
  trigger: baseStyleTrigger(props),
  list: baseStyleList(props),
  content: baseStyleContent,
  contentGroup: baseStyleContentGroup,
}))

const sizes = {
  sm: definePartsStyle({
    trigger: {
      py: 1,
      px: 4,
      fontSize: "sm",
    },
  }),
  md: definePartsStyle({
    trigger: {
      fontSize: "md",
      py: 2,
      px: 4,
    },
  }),
  lg: definePartsStyle({
    trigger: {
      fontSize: "lg",
      py: 3,
      px: 4,
    },
  }),
}

const variantLine = definePartsStyle((props) => {
  const { colorScheme: c, orientation } = props
  const isVertical = orientation === "vertical"
  const borderProp = isVertical ? "borderStart" : "borderBottom"
  const marginProp = isVertical ? "marginStart" : "marginBottom"

  return {
    list: {
      [borderProp]: "2px solid",
      borderColor: "inherit",
    },
    trigger: {
      [borderProp]: "2px solid",
      borderColor: "transparent",
      [marginProp]: "-2px",
      _selected: {
        [$fg.variable]: `colors.${c}.600`,
        _dark: {
          [$fg.variable]: `colors.${c}.300`,
        },
        borderColor: "currentColor",
      },
      _active: {
        [$bg.variable]: "colors.gray.200",
        _dark: {
          [$bg.variable]: "colors.whiteAlpha.300",
        },
      },
      _disabled: {
        _active: { bg: "none" },
      },
      color: $fg.reference,
      bg: $bg.reference,
    },
  }
})

const variantEnclosed = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    trigger: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      [$border.variable]: "transparent",
      _selected: {
        [$fg.variable]: `colors.${c}.600`,
        [$border.variable]: `colors.white`,
        _dark: {
          [$fg.variable]: `colors.${c}.300`,
          [$border.variable]: `colors.gray.800`,
        },
        borderColor: "inherit",
        borderBottomColor: $border.reference,
      },
      color: $fg.reference,
    },
    list: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  }
})

const variantEnclosedColored = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    trigger: {
      border: "1px solid",
      borderColor: "inherit",
      [$bg.variable]: "colors.gray.50",
      _dark: {
        [$bg.variable]: "colors.whiteAlpha.50",
      },
      mb: "-1px",
      _notLast: {
        marginEnd: "-1px",
      },
      _selected: {
        [$bg.variable]: "colors.white",
        [$fg.variable]: `colors.${c}.600`,
        _dark: {
          [$bg.variable]: "colors.gray.800",
          [$fg.variable]: `colors.${c}.300`,
        },
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent",
      },
      color: $fg.reference,
      bg: $bg.reference,
    },
    list: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  }
})

const variantSoftRounded = definePartsStyle((props) => {
  const { colorScheme: c, theme } = props
  return {
    trigger: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme, `${c}.700`),
        bg: getColor(theme, `${c}.100`),
      },
    },
  }
})

const variantSolidRounded = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    trigger: {
      borderRadius: "full",
      fontWeight: "semibold",
      [$fg.variable]: "colors.gray.600",
      _dark: {
        [$fg.variable]: "inherit",
      },
      _selected: {
        [$fg.variable]: "colors.white",
        [$bg.variable]: `colors.${c}.600`,
        _dark: {
          [$fg.variable]: "colors.gray.800",
          [$bg.variable]: `colors.${c}.300`,
        },
      },
      color: $fg.reference,
      bg: $bg.reference,
    },
  }
})

const variantUnstyled = definePartsStyle({})

const variants = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled,
}

export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "line",
    colorScheme: "blue",
  },
})
