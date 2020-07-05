import { ComponentTheme } from "@chakra-ui/theme-tools"

const Stat: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: {
    Container: {
      flex: "1",
      paddingRight: 4,
    },
    Label: {
      fontWeight: "medium",
    },
    HelpText: {
      opacity: 0.8,
      marginBottom: 2,
    },
    Number: {
      verticalAlign: "baseline",
      fontWeight: "semibold",
    },
    Icon: {
      mr: 1,
      width: "14px",
      height: "14px",
      verticalAlign: "middle",
    },
  },
  sizes: {
    md: {
      Label: {
        fontSize: "sm",
      },
      HelpText: {
        fontSize: "sm",
      },
      Number: {
        fontSize: "2xl",
      },
    },
  },
}

export const StatSizes = {
  md: "md",
}

export default Stat
