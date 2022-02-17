import { tableAnatomy as parts } from "@chakra-ui/anatomy"

import "@chakra-ui/theme-tools"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"

const baseStyle: PartsStyleObject<typeof parts> = {
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
}

const numericStyles: SystemStyleObject = {
  "&[data-is-numeric=true]": {
    textAlign: "end",
  },
}

const variantSimple: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  return {
    th: {
      borderBottom: "1px",
      ...numericStyles,

      _light: {
        color: "gray.600",
        borderColor: `${c}.100`,
      },

      _dark: {
        color: "gray.400",
        borderColor: `${c}.700`,
      },
    },
    td: {
      borderBottom: "1px",
      ...numericStyles,

      _light: {
        borderColor: `${c}.100`,
      },

      _dark: {
        borderColor: `${c}.700`,
      },
    },
    caption: {
      _light: {
        color: "gray.600",
      },

      _dark: {
        color: "gray.100",
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
}

const variantStripe: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  return {
    th: {
      borderBottom: "1px",
      ...numericStyles,

      _light: {
        color: "gray.600",
        borderColor: `${c}.100`,
      },

      _dark: {
        color: "gray.400",
        borderColor: `${c}.700`,
      },
    },
    td: {
      borderBottom: "1px",
      ...numericStyles,

      _light: {
        borderColor: `${c}.100`,
      },

      _dark: {
        borderColor: `${c}.700`,
      },
    },
    caption: {
      _light: {
        color: "gray.600",
      },

      _dark: {
        color: "gray.100",
      },
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",

            _light: {
              borderColor: `${c}.100`,
            },

            _dark: {
              borderColor: `${c}.700`,
            },
          },
          td: {
            _light: {
              background: `${c}.100`,
            },

            _dark: {
              background: `${c}.700`,
            },
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
}

const variants = {
  simple: variantSimple,
  striped: variantStripe,
  unstyled: {},
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
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
  },
  md: {
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
  },
  lg: {
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
  },
}

const defaultProps = {
  variant: "simple",
  size: "md",
  colorScheme: "gray",
}

export default {
  parts: parts.keys,
  baseStyle,
  variants,
  sizes,
  defaultProps,
}
