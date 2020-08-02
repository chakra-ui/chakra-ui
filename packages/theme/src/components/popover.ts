import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"

const popover = multiStyleConfig({
  parts: {
    content: "the popover's content wrapper",
    header: "the popover heading",
    body: "the popover main content",
    footer: "the action footers for popover",
  },

  baseStyle: function (props) {
    return {
      content: {
        bg: mode("white", "gray.700")(props),
        border: "1px solid",
        borderColor: "inherit",
        borderRadius: "md",
        boxShadow: "sm",
        w: "100%",
        maxW: "xs",
        zIndex: "1",
        _focus: {
          outline: 0,
          boxShadow: "outline",
        },
      },
      header: {
        px: 3,
        py: 2,
        borderBottomWidth: "1px",
      },
      body: {
        px: 3,
        py: 2,
      },
      footer: {
        px: 3,
        py: 2,
        borderTopWidth: "1px",
      },
    }
  },
})

export default popover
