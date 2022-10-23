import { tableAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"

const $fg = cssVar("table-color")
const $bc = cssVar("table-border-color")
const $bg = cssVar("table-background")

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start",
  },
  td: {
    textAlign: "start",
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium",
  },
})

const numericStyles = defineStyle({
  "&[data-is-numeric=true]": {
    textAlign: "end",
  },
})

const variantSimple = definePartsStyle((props) => {
  const { colorScheme: c } = props

  return {
    th: {
      borderBottom: "1px",
      [$fg.variable]: "colors.gray.600",
      [$bc.variable]: `colors.${c}.100`,
      _dark: {
        [$fg.variable]: "colors.gray.400",
        [$bc.variable]: `colors.${c}.700`,
      },
      color: $fg.reference,
      borderColor: $bc.reference,
      ...numericStyles,
    },
    td: {
      borderBottom: "1px",
      [$bc.variable]: `colors.${c}.100`,
      _dark: {
        [$bc.variable]: `colors.${c}.700`,
      },
      borderColor: $bc.reference,
      ...numericStyles,
    },
    caption: {
      [$fg.variable]: "colors.gray.600",
      _dark: {
        [$fg.variable]: "colors.gray.100",
      },
      color: $fg.reference,
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
})

const variantStripe = definePartsStyle((props) => {
  const { colorScheme: c } = props

  return {
    th: {
      [$fg.variable]: "colors.gray.600",
      borderBottom: "1px",
      [$bc.variable]: `colors.${c}.100`,
      _dark: {
        [$fg.variable]: "colors.gray.400",
        [$bc.variable]: `colors.${c}.700`,
      },
      color: $fg.reference,
      borderColor: $bc.reference,
      ...numericStyles,
    },
    td: {
      borderBottom: "1px",
      [$bc.variable]: `colors.${c}.100`,
      _dark: {
        [$bc.variable]: `colors.${c}.700`,
      },
      borderColor: $bc.reference,
      ...numericStyles,
    },
    caption: {
      [$fg.variable]: "colors.gray.600",
      _dark: {
        [$fg.variable]: "colors.gray.100",
      },
      color: $fg.reference,
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            [$bc.variable]: `colors.${c}.100`,
            _dark: {
              [$bc.variable]: `colors.${c}.700`,
            },
            borderColor: $bc.reference,
          },
          td: {
            [$bg.variable]: `colors.${c}.100`,
            _dark: {
              [$bg.variable]: `colors.${c}.700`,
            },
            background: $bg.reference,
          },
        },
      },
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
})

const variants = {
  simple: variantSimple,
  striped: variantStripe,
  unstyled: defineStyle({}),
}

const sizes = {
  sm: definePartsStyle({
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs",
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4",
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs",
    },
  }),
  md: definePartsStyle({
    th: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs",
    },
    td: {
      px: "6",
      py: "4",
      lineHeight: "5",
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm",
    },
  }),
  lg: definePartsStyle({
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm",
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6",
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md",
    },
  }),
}

export const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "simple",
    size: "md",
    colorScheme: "gray",
  },
})
