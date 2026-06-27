import { defineSlotRecipe } from "../def"

export const blockquoteSlotRecipe = defineSlotRecipe({
  className: "blockquote",
  slots: ["root", "icon", "content", "caption"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "2",
    },
    caption: {
      textStyle: "sm",
      color: "fg.muted",
    },
    icon: {
      boxSize: "5",
    },
  },
  variants: {
    justify: {
      start: {
        root: {
          alignItems: "flex-start",
          textAlign: "start",
        },
      },
      center: {
        root: {
          alignItems: "center",
          textAlign: "center",
        },
      },
      end: {
        root: {
          alignItems: "flex-end",
          textAlign: "end",
        },
      },
    },
    variant: {
      subtle: {
        root: {
          paddingX: "5",
          borderStartWidth: "4px",
          borderStartColor: "colorPalette.muted",
        },
        icon: {
          color: "colorPalette.fg",
        },
      },
      solid: {
        root: {
          paddingX: "5",
          borderStartWidth: "4px",
          borderStartColor: "colorPalette.solid",
        },
        icon: {
          color: "colorPalette.solid",
        },
      },
      plain: {
        root: {
          paddingX: "5",
        },
        icon: {
          color: "colorPalette.solid",
        },
      },
    },
  },
  defaultVariants: {
    variant: "subtle",
    justify: "start",
  },
})
