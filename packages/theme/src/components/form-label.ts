import { styleConfig } from "@chakra-ui/theme-tools"

const label = styleConfig({
  parts: {
    label: "the form label",
  },
  baseStyle: {
    label: {
      fontSize: "md",
      mr: 3,
      mb: 2,
      fontWeight: "medium",
      transition: "all 0.2s",
      opacity: 1,
      _disabled: {
        opacity: 0.4,
      },
    },
  },
})

export default label
