import { defineSlotRecipe } from "../../styled-system"

export const dataListSlotRecipe = defineSlotRecipe({
  slots: ["root", "item", "itemLabel", "itemValue"],
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
          fontSize: "xs",
        },
      },
      md: {
        root: {
          gap: "4",
        },
        item: {
          fontSize: "sm",
        },
      },
      lg: {
        root: {
          gap: "5",
        },
        item: {
          fontSize: "md",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    orientation: "vertical",
  },
})
