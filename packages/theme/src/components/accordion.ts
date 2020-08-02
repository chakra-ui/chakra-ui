import { multiStyleConfig } from "@chakra-ui/theme-tools"

const accordion = multiStyleConfig({
  parts: {
    container: "the container for an accordion item",
    button: "the trigger for an accordion item",
    panel: "the panel for an accordion item",
  },
  baseStyle: {
    container: {
      borderTopWidth: "1px",
      borderColor: "inherit",
      _last: {
        borderBottomWidth: "1px",
      },
    },
    button: {
      fontSize: "1rem",
      _focus: {
        boxShadow: "outline",
      },
      _hover: {
        bg: "blackAlpha.50",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      px: 4,
      py: 2,
    },
    panel: {
      pt: 2,
      px: 4,
      pb: 5,
    },
  },
})

export default accordion
