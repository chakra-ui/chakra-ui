import { mode, darken } from "@chakra-ui/theme-tools"

const parts = ["table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption"]

type Dict = Record<string, any>

const baseStyle = (props: Dict) => {
  const { colorScheme, captionSide } = props
  const c = colorScheme || "gray"
  const bgSchemeColor = mode(`${c}.200`, `${c}.800`)(props)
  const bgColor = !colorScheme ? mode(`white`, `black`)(props) : bgSchemeColor
  const color = mode(`${c}.900`, `${c}.100`)(props)
  const colorInverse = mode(`${c}.300`, `${c}.900`)(props)
  const tableBorderWidth = "1px"
  const tableBoderTopWidth = "2px"
  return {
    caption: {
      captionSide,
    },
    tr: {},
    th: {
      verticalAlign: "top",
      borderTopWidth: tableBorderWidth,
      borderTopStyle: "solid",
      borderTopColor: colorInverse,
      borderBottomColor: colorInverse,
    },
    td: {
      verticalAlign: "top",
      borderTopWidth: tableBorderWidth,
      borderTopStyle: "solid",
      borderTopColor: colorInverse,
      borderBottomColor: colorInverse,
    },
    table: {
      w: "full",
      borderCollapse: "collapse",
      mb: 1,
      color,
      borderColor: colorInverse,
      bgColor,
    },
    thead: {
      th: {
        verticalAlign: "bottom",
        borderBottomWidth: tableBoderTopWidth,
        borderTopStyle: "solid",
        borderTopColor: colorInverse,
        borderTopWidth: 0,
      },
    },
    tbody: {
      verticalAlign: "inherit",
      "& + tbody": {
        borderBottomWidth: tableBoderTopWidth,
        borderTopStyle: "solid",
        borderTopColor: colorInverse,
      },
      "tr:nth-of-type(1n)": {
        // raises selector specitifity to the same level the striped-rule has
        _hover: props.isHoverable
          ? {
              bgColor: darken(bgSchemeColor, 8),
            }
          : {},
      },
    },
  }
}

const sizes = {
  sm: {
    td: {
      py: 1,
      px: 1,
    },
    th: {
      py: 1,
      px: 1,
    },
  },
  md: {
    td: {
      py: 3,
      px: 3,
    },
    th: {
      py: 3,
      px: 3,
    },
  },
}

function getStriped(props: Dict) {
  const { colorScheme, stripedOrder } = props

  const c = colorScheme || "gray"
  const bgSchemeColor = mode(`${c}.200`, `${c}.800`)(props)
  const color = mode(`${c}.900`, `${c}.100`)(props)

  return {
    tbody: {
      [`tr:nth-of-type(${stripedOrder})`]: {
        bgColor: darken(bgSchemeColor, 6),
        color,
        _hover: props.isHoverable
          ? {
              bgColor: darken(bgSchemeColor, 12),
            }
          : {},
      },
    },
  }
}

function variantBorderless(props: Dict) {
  return {
    th: {
      borderWidth: 0,
    },
    td: {
      borderWidth: 0,
    },
    table: {},
    thead: {
      th: {
        borderWidth: 0,
      },
      td: {
        borderWidth: 0,
      },
    },
    tbody: {
      "& + tbody": {
        borderWidth: 0,
      },
    },
    tfoot: {},
    tr: {},
  }
}

function variantBordered(props: Dict) {
  const tableBorderWidth = "1px"
  const tableBoderTopWidth = "2px"
  return {
    th: {
      borderWidth: tableBorderWidth,
    },
    td: {
      borderWidth: tableBorderWidth,
    },
    table: {
      borderWidth: tableBorderWidth,
      borderLeftWidth: tableBoderTopWidth,
      borderRightWidth: tableBoderTopWidth,
    },
    thead: {
      th: {
        borderTopWidth: tableBorderWidth,
        borderLeftWidth: tableBorderWidth,
        borderRightWidth: tableBorderWidth,
        borderBottomWidth: tableBoderTopWidth,
      },
      td: {
        borderWidth: tableBorderWidth,
      },
    },
    tbody: {},
    tfoot: {},
    tr: {},
  }
}

function variantNormal(props: Dict) {
  return {
    th: {},
    td: {},
    table: {},
    thead: {},
    tbody: {},
    tfoot: {},
    tr: {},
  }
}

function variantStriped(props: Dict) {
  const normal = variantNormal(props)
  const stripes = getStriped(props)
  return {
    ...normal,
    tbody: {
      ...normal.tbody,
      ...stripes.tbody,
    },
  }
}

function variantBorderedStriped(props: Dict) {
  const normal = variantBordered(props)
  const stripes = getStriped(props)
  return {
    ...normal,
    tbody: {
      ...normal.tbody,
      ...stripes.tbody,
    },
  }
}

function variantBorderlessStriped(props: Dict) {
  const normal = variantBorderless(props)
  const stripes = getStriped(props)
  return {
    ...normal,
    tbody: {
      ...normal.tbody,
      ...stripes.tbody,
    },
  }
}

const variants = {
  normal: variantNormal,
  bordered: variantBordered,
  borderless: variantBorderless,
  striped: variantStriped,
  "bordered-striped": variantBorderedStriped,
  "borderless-striped": variantBorderlessStriped,
}

const defaultProps = {
  size: "md",
  variant: "normal",
  colorScheme: null,
  stripedOrder: "odd",
}

export default {
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
