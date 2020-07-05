import { ComponentTheme } from "@chakra-ui/theme-tools"

const Accordion: ComponentTheme = {
  baseStyle: {
    Container: {},
    Item: {
      borderTopWidth: "1px",
      borderColor: "inherit",
      _last: {
        borderBottomWidth: "1px",
      },
    },
    Button: {
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
      paddingX: 4,
      paddingY: 2,
    },
    Panel: {
      paddingTop: 2,
      paddingX: 4,
      paddingBottom: 5,
    },
  },
}

export default Accordion
