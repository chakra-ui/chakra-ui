import { mode } from "@chakra-ui/theme-tools"

const parts = ["wizard", "step", "stepIcon", "connector"]

type Dict = Record<string, any>

const baseStyle = (props: Dict) => {
  return {
    wizard: {
      fontFamily: "heading",
      textAlign: "center",
      width: "100%",
      display: "flex",
      flex: 1,
    },
    step: {
      display: "flex",
      position: "relative",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    stepIcon: {
      width: "40px",
      height: "40px",
      display: "flex",
      borderWidth: "2px",
      borderRadius: "50%",
      alignItems: "center",
      justifyContent: "center",
    },
    connector: {
      flex: 1,
      display: "flex",
      height: "2px",
      mr: 2,
    },
    label: {
      fontWeight: "medium",
      color: mode(`gray.900`, `gray.100`)(props),
      textAlign: "center",
      fontSize: "md",
    },
    description: {
      fontWeight: "lighter",
      color: mode(`gray.800`, `gray.200`)(props),
      textAlign: "center",
      opacity: 0.9,
      fontSize: "sm",
    },
  }
}

// const modifierNumber = {
//   "&[data-is-numeric=true]": {
//     textAlign: "right",
//   },
// }

// const simpleVariant = (props: Dict) => {
//   const { colorScheme: c } = props

//   return {
//     th: {
//       color: mode(`gray.600`, `gray.400`)(props),
//       textTransform: "uppercase",
//       letterSpacing: "wider",
//       fontWeight: "medium",
//       borderBottom: "1px",
//       borderColor: mode(`${c}.100`, `${c}.700`)(props),
//       ...modifierNumber,
//     },
//     td: {
//       borderBottom: "1px",
//       borderColor: mode(`${c}.100`, `${c}.700`)(props),
//       ...modifierNumber,
//     },
//     caption: {
//       fontWeight: "bold",
//       color: mode(`gray.600`, `gray.100`)(props),
//     },
//     tfoot: {
//       tr: {
//         "&:last-of-type": {
//           th: {
//             borderBottomWidth: 0,
//           },
//         },
//       },
//     },
//   }
// }

// const stripedVariant = (props: Dict) => {
//   const { colorScheme: c } = props

//   return {
//     th: {
//       color: mode(`gray.600`, `gray.400`)(props),
//       textTransform: "uppercase",
//       letterSpacing: "wider",
//       fontWeight: "medium",
//       borderBottom: "1px",
//       borderColor: mode(`${c}.100`, `${c}.700`)(props),
//       ...modifierNumber,
//     },
//     td: {
//       borderBottom: "1px",
//       borderColor: mode(`${c}.100`, `${c}.700`)(props),
//       ...modifierNumber,
//     },
//     caption: {
//       fontWeight: "bold",
//       color: mode(`gray.600`, `gray.100`)(props),
//     },
//     tbody: {
//       tr: {
//         "&:nth-of-type(odd)": {
//           "th, td": {
//             borderBottomWidth: "1px",
//             borderColor: mode(`${c}.100`, `${c}.700`)(props),
//           },
//           td: {
//             background: mode(`${c}.100`, `${c}.700`)(props),
//           },
//         },
//       },
//     },
//     tfoot: {
//       tr: {
//         "&:last-of-type": {
//           th: {
//             borderBottomWidth: 0,
//           },
//         },
//       },
//     },
//   }
// }

const variants = {
  // simple: simpleVariant,
  // striped: stripedVariant,
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
  colorScheme: "green",
}

export default {
  parts,
  baseStyle,
  variants,
  sizes,
  defaultProps,
}
