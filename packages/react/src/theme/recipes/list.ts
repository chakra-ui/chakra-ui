import { listAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const listSlotRecipe = defineSlotRecipe({
  className: "chakra-list",
  slots: listAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
    },
    item: {
      whiteSpace: "normal",
    },
    icon: {
      marginEnd: "2",
      display: "inline",
      verticalAlign: "text-bottom",
    },
  },

  variants: {
    variant: {
      marker: {
        root: {
          listStyleType: "disc",
        },
        item: {
          display: "list-item",
          _marker: {
            color: "fg.disabled",
          },
        },
      },

      plain: {
        item: {
          alignItems: "flex-start",
          display: "inline-flex",
          "&:has(svg)": {
            alignItems: "center",
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: "plain",
  },
})
