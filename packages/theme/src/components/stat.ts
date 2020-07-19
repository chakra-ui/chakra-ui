import { styleConfig } from "@chakra-ui/theme-tools"

const stat = styleConfig({
  parts: {
    label: "the stat label",
    number: "the numeric value of the stat",
    icon: "the stat icon, if used",
    helpText: "the stat description text",
  },

  baseStyle: {
    label: {
      fontWeight: "medium",
    },
    helpText: {
      opacity: 0.8,
      marginBottom: 2,
    },
    number: {
      verticalAlign: "baseline",
      fontWeight: "semibold",
    },
    icon: {
      mr: 1,
      w: "14px",
      h: "14px",
      verticalAlign: "middle",
    },
  },

  sizes: {
    md: {
      label: { fontSize: "sm" },
      helpText: { fontSize: "sm" },
      number: { fontSize: "2xl" },
    },
  },

  defaultProps: {
    size: "md",
  },
})

export default stat
