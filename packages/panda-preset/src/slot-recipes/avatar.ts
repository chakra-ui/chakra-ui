import { defineSlotRecipe } from "../def"

export const avatarSlotRecipe = defineSlotRecipe({
  slots: ["root", "image", "fallback"],
  className: "avatar",
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "medium",
      position: "relative",
      verticalAlign: "top",
      flexShrink: "0",
      userSelect: "none",
      width: "var(--avatar-size)",
      height: "var(--avatar-size)",
      fontSize: "var(--avatar-font-size)",
      borderRadius: "var(--avatar-radius)",
      "&[data-group-item]": {
        borderWidth: "2px",
        borderColor: "bg",
      },
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "var(--avatar-radius)",
    },
    fallback: {
      lineHeight: "1",
      textTransform: "uppercase",
      fontWeight: "medium",
      fontSize: "var(--avatar-font-size)",
      borderRadius: "var(--avatar-radius)",
    },
  },
  variants: {
    size: {
      full: {
        root: {
          "--avatar-size": "100%",
          "--avatar-font-size": "100%",
        },
      },
      "2xs": {
        root: {
          "--avatar-font-size": "fontSizes.2xs",
          "--avatar-size": "sizes.6",
        },
      },
      xs: {
        root: {
          "--avatar-font-size": "fontSizes.xs",
          "--avatar-size": "sizes.8",
        },
      },
      sm: {
        root: {
          "--avatar-font-size": "fontSizes.sm",
          "--avatar-size": "sizes.9",
        },
      },
      md: {
        root: {
          "--avatar-font-size": "fontSizes.md",
          "--avatar-size": "sizes.10",
        },
      },
      lg: {
        root: {
          "--avatar-font-size": "fontSizes.md",
          "--avatar-size": "sizes.11",
        },
      },
      xl: {
        root: {
          "--avatar-font-size": "fontSizes.lg",
          "--avatar-size": "sizes.12",
        },
      },
      "2xl": {
        root: {
          "--avatar-font-size": "fontSizes.xl",
          "--avatar-size": "sizes.16",
        },
      },
    },
    variant: {
      solid: {
        root: {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
        },
      },
      subtle: {
        root: {
          bg: "colorPalette.muted",
          color: "colorPalette.fg",
        },
      },
      outline: {
        root: {
          color: "colorPalette.fg",
          borderWidth: "1px",
          borderColor: "colorPalette.muted",
        },
      },
    },
    shape: {
      square: {},
      rounded: {
        root: {
          "--avatar-radius": "radii.l3",
        },
      },
      full: {
        root: {
          "--avatar-radius": "radii.full",
        },
      },
    },
    borderless: {
      true: {
        root: {
          "&[data-group-item]": {
            borderWidth: "0px",
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    shape: "full",
    variant: "subtle",
  },
})
