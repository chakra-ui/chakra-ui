import { defineSlotRecipe } from "../def"

export const listSlotRecipe = defineSlotRecipe({
  className: "list",
  slots: ["root", "item", "indicator"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--list-gap)",
      "& :where(ul, ol)": {
        marginTop: "var(--list-gap)",
      },
    },
    item: {
      whiteSpace: "normal",
      display: "list-item",
    },
    indicator: {
      marginEnd: "2",
      minHeight: "1lh",
      flexShrink: 0,
      display: "inline-block",
      verticalAlign: "middle",
    },
  },
  variants: {
    variant: {
      marker: {
        root: {
          listStyle: "revert",
          listStylePosition: "inside",
        },
        item: {
          _marker: {
            color: "fg.subtle",
          },
        },
      },
      plain: {
        item: {
          alignItems: "flex-start",
          display: "inline-flex",
        },
      },
    },
    align: {
      center: {
        item: {
          alignItems: "center",
        },
      },
      start: {
        item: {
          alignItems: "flex-start",
        },
      },
      end: {
        item: {
          alignItems: "flex-end",
        },
      },
    },
  },
  defaultVariants: {
    variant: "marker",
  },
})
