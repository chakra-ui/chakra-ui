import { avatarAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const avatarSlotRecipe = defineSlotRecipe({
  slots: avatarAnatomy.keys(),
  className: "chakra-avatar",
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "medium",
      position: "relative",
      verticalAlign: "top",
      flexShrink: 0,
      userSelect: "none",
      width: "var(--avatar-size)",
      height: "var(--avatar-size)",
      "--avatar-font-size": "calc(var(--avatar-size) / 2.5)",
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
      xs: {
        root: {
          "--avatar-size": "sizes.4",
          "--avatar-margin": "-0.45rem",
        },
      },
      sm: {
        root: {
          "--avatar-size": "sizes.6",
          "--avatar-margin": "-0.5rem",
        },
      },
      md: {
        root: {
          "--avatar-size": "sizes.8",
          "--avatar-margin": "-0.65rem",
        },
      },
      lg: {
        root: {
          "--avatar-size": "sizes.10",
          "--avatar-margin": "-0.8rem",
        },
      },
      xl: {
        root: {
          "--avatar-size": "sizes.14",
          "--avatar-margin": "-0.85rem",
        },
      },
      "2xl": {
        root: {
          "--avatar-size": "sizes.20",
          "--avatar-margin": "-1rem",
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
          bg: "colorPalette.subtle",
          color: "colorPalette.fg",
        },
      },
      outline: {
        root: {
          bg: "bg",
          color: "fg",
          borderWidth: "1px",
        },
      },
    },

    shape: {
      square: {},
      rounded: {
        root: { "--avatar-radius": "radii.md" },
      },
      full: {
        root: { "--avatar-radius": "radii.full" },
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
