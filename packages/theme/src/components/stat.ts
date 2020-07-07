import { ComponentTheme } from "@chakra-ui/theme-tools/src"

const Stat: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: {
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
  },
  /**
   * Only one size specified but you can add more,
   * and style each part.
   */
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
