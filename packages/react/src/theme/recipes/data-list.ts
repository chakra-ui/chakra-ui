import { dataListAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const dataListSlotRecipe = defineSlotRecipe({
  slots: dataListAnatomy.keys(),
  className: "chakra-data-list",
  base: {
    itemLabel: {
      color: "fg.subtle",
      display: "flex",
      alignItems: "center",
      gap: "1",
    },
    itemValue: {
      display: "flex",
      minWidth: "0",
      flex: "1",
    },
  },
  variants: {
    orientation: {
      horizontal: {
        root: {
          display: "flex",
          flexDirection: "column",
        },
        item: {
          display: "inline-flex",
          alignItems: "center",
          gap: "4",
        },
        itemLabel: {
          minWidth: "120px",
        },
      },
      vertical: {
        root: {
          display: "flex",
          flexDirection: "column",
        },
        item: {
          display: "flex",
          flexDirection: "column",
          gap: "1",
        },
      },
    },
    size: {
      sm: {
        root: {
          gap: "2",
        },
        item: {
          textStyle: "xs",
        },
      },
      md: {
        root: {
          gap: "4",
        },
        item: {
          textStyle: "sm",
        },
      },
      lg: {
        root: {
          gap: "5",
        },
        item: {
          textStyle: "md",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    orientation: "vertical",
  },
})
