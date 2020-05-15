import { ComponentTheme } from "./utils"

const Stat: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: {
    Label: { fontWeight: "medium" },
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
   * Only one size specifed but you can add more,
   * and style each part.
   */
  sizes: {
    md: {
      Label: { fontSize: "sm" },
      HelpText: { fontSize: "sm" },
      Number: { fontSize: "2xl" },
    },
  },
}

export const StatTokens = {
  sizes: {
    md: "md",
  },
}

export default Stat
