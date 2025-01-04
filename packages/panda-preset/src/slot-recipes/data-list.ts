import { defineSlotRecipe } from "../def"

export const dataListSlotRecipe = defineSlotRecipe({
  slots: ["root", "item", "itemLabel", "itemValue"],
  className: "data-list",
  base: {
    itemLabel: {
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
          gap: "3",
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
    variant: {
      subtle: {
        itemLabel: {
          color: "fg.muted",
        },
      },
      bold: {
        itemLabel: {
          fontWeight: "medium",
        },
        itemValue: {
          color: "fg.muted",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "vertical",
    variant: "subtle",
  },
})
