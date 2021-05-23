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
      display: "flex",
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

const sizes = {
  sm: {
    stepIcon: {
      width: "32px",
      height: "32px",
      borderWidth: "1px",
    },
    icon: {
      width: "16px",
      height: "16px",
    },
    label: {
      fontWeight: "medium",
      textAlign: "center",
      fontSize: "sm",
    },
    description: {
      fontWeight: "medium",
      textAlign: "center",
      fontSize: "xs",
    },
  },
  md: {
    stepIcon: {
      width: "40px",
      height: "40px",
      borderWidth: "2px",
    },
    icon: {
      width: "20px",
      height: "20px",
    },
    label: {
      fontWeight: "medium",
      textAlign: "center",
      fontSize: "md",
    },
    description: {
      fontWeight: "medium",
      textAlign: "center",
      fontSize: "sm",
    },
  },
  lg: {
    stepIcon: {
      width: "56px",
      height: "56px",
      borderWidth: "2px",
    },
    icon: {
      width: "24px",
      height: "24px",
    },
    label: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "lg",
    },
    description: {
      fontWeight: "lighter",
      textAlign: "center",
      fontSize: "md",
    },
  },
}

const defaultProps = {
  variant: "unstyled",
  size: "md",
  colorScheme: "green",
}

export default {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}
