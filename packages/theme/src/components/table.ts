import { mode } from "@chakra-ui/theme-tools"

const parts = ["table", "thead", "tbody", "tr", "th", "td", "caption"]

type Dict = Record<string, any>

const baseStyle = () => ({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  thead: {},
  tfoot: {},
  tbody: {},
  tr: {},
  th: {
    fontFamily: "heading",
    textAlign: "left",
  },
  td: {
    textAlign: "left",
  },
  caption: {
    fontFamily: "heading",
    textAlign: "center",
  },
})

const modifierNumber = {
  "&[data-is-numeric=true]": {
    textAlign: "right",
  },
}

const simpleVariant = (props: Dict) => {
  const { colorScheme: c } = props

  return {
    th: {
      color: mode(`gray.600`, `gray.400`)(props),
      textTransform: "uppercase",
      letterSpacing: "wider",
      fontWeight: "medium",
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...modifierNumber,
    },
    td: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...modifierNumber,
    },
    caption: {
      fontWeight: "bold",
      color: mode(`gray.600`, `gray.100`)(props),
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0,
          },
        },
      },
    },
  }
}

const stripedVariant = (props: Dict) => {
  const { colorScheme: c } = props

  return {
    th: {
      color: mode(`gray.600`, `gray.400`)(props),
      textTransform: "uppercase",
      letterSpacing: "wider",
      fontWeight: "medium",
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...modifierNumber,
    },
    td: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...modifierNumber,
    },
    caption: {
      fontWeight: "bold",
      color: mode(`gray.600`, `gray.100`)(props),
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: mode(`${c}.100`, `${c}.700`)(props),
          },
          td: {
            background: mode(`${c}.100`, `${c}.700`)(props),
          },
        },
      },
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0,
          },
        },
      },
    },
  }
}

const variants = {
  simple: simpleVariant,
  striped: stripedVariant,
  unstyled: {},
}

const sizes = {
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
  parts,
  baseStyle,
  variants,
  sizes,
  defaultProps,
}
