import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"

const menu = multiStyleConfig({
  parts: {
    item: "the menu item button",
    command: "the menu item command",
    list: "the menu items wrapper",
    button: "the menu list trigger",
    groupTitle: "the menu group title",
  },
  baseStyle: function (props) {
    return {
      list: {
        bg: mode(`#fff`, `gray.700`)(props),
        boxShadow: mode(`sm`, `dark-lg`)(props),
        color: "inherit",
        minW: "3xs",
        py: "2",
        zIndex: 1,
        borderRadius: "md",
        borderWidth: "1px",
      },

      item: {
        py: "0.4rem",
        paddingX: "0.8rem",
        transition: "background 50ms ease-in 0s",
        _focus: {
          bg: mode(`gray.100`, `whiteAlpha.100`)(props),
        },
        _active: {
          bg: mode(`gray.200`, `whiteAlpha.200`)(props),
        },
        _expanded: {
          bg: mode(`gray.100`, `whiteAlpha.100`)(props),
        },
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
        },
      },
      groupTitle: {
        marginX: 4,
        marginY: 2,
        fontWeight: "semibold",
        fontSize: "sm",
      },
      command: {
        opacity: 0.6,
      },
    }
  },
})

export default menu
