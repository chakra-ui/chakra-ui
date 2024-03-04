import { accordionAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const accordionSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    item: {
      borderTopWidth: "1px",
      borderColor: "inherit",
      overflowAnchor: "none",
      _last: {
        borderBottomWidth: "1px",
      },
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      outline: 0,
      transitionProperty: "common",
      transitionDuration: "normal",
      fontSize: "md",
      _focusVisible: {
        boxShadow: "outline",
      },
      _hover: {
        bg: "blackAlpha.50",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      px: "4",
      py: "2",
    },
    content: {
      pt: "2",
      px: "4",
      pb: "5",
    },
    icon: {
      fontSize: "1.25em",
    },
  },
})
