import { multiStyleConfig } from "@chakra-ui/theme-tools"

const accordion = multiStyleConfig({
  parts: {
    container: "the container for a single accordion",
    button: "the accordion trigger",
    panel: "the accordion panel",
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
