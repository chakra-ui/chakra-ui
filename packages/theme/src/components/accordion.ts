import { styleConfig } from "@chakra-ui/theme-tools"

const accordion = styleConfig({
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
      _focus: { boxShadow: "outline" },
      _hover: { bg: "blackAlpha.50" },
      _disabled: { opacity: 0.4, cursor: "not-allowed" },
      paddingX: 4,
      paddingY: 2,
    },
    panel: {
      paddingTop: 2,
      paddingX: 4,
      paddingBottom: 5,
    },
  },
})

export default accordion
