import { tableOfContentsAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tableOfContentsSlotRecipe = defineSlotRecipe({
  className: "chakra-table-of-contents",
  slots: tableOfContentsAnatomy.keys(),
  base: {
    root: {
      colorPalette: "gray",
      width: "full",
    },
    title: {
      color: "fg",
      fontWeight: "semibold",
      letterSpacing: "tight",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      listStyle: "none",
      margin: "0",
      padding: "0",
    },
    item: {
      position: "relative",
      paddingInlineStart:
        "calc(var(--table-of-contents-depth, 0) * var(--table-of-contents-indent))",
    },
    link: {
      alignItems: "center",
      borderRadius: "l1",
      color: "fg.muted",
      display: "flex",
      focusRing: "outside",
      fontWeight: "medium",
      outline: "0",
      textDecoration: "none",
      transitionDuration: "fast",
      transitionProperty: "background, color, border-color",
      _hover: { bg: "bg.muted", color: "fg" },
      _current: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
        fontWeight: "semibold",
      },
    },
  },
  variants: {
    variant: {
      plain: {},
      line: {
        list: {
          borderInlineStartWidth: "1px",
          borderColor: "border",
        },
        link: {
          marginInlineStart: "-1px",
          borderInlineStartWidth: "1px",
          borderColor: "transparent",
          borderRadius: "0",
          _current: {
            bg: "colorPalette.subtle",
            borderColor: "colorPalette.solid",
          },
        },
      },
    },
    size: {
      sm: {
        root: { "--table-of-contents-indent": "spacing.3" },
        title: { textStyle: "xs", marginBottom: "2" },
        list: { gap: "0.5" },
        link: { minHeight: "7", paddingInline: "2.5", textStyle: "xs" },
      },
      md: {
        root: { "--table-of-contents-indent": "spacing.4" },
        title: { textStyle: "sm", marginBottom: "3" },
        list: { gap: "1" },
        link: { minHeight: "9", paddingInline: "3", textStyle: "sm" },
      },
    },
  },
  defaultVariants: {
    variant: "plain",
    size: "md",
  },
})
