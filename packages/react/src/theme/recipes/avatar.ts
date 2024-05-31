import { avatarAnatomy as parts } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const avatarSlotRecipe = defineSlotRecipe({
  slots: parts.keys(),
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
      colorPalette: "gray",
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
          "--avatar-size": "sizes.5",
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
          "--avatar-size": "sizes.12",
          "--avatar-margin": "-0.8rem",
        },
      },
      xl: {
        root: {
          "--avatar-size": "sizes.16",
          "--avatar-margin": "-0.85rem",
        },
      },
      "2xl": {
        root: {
          "--avatar-size": "sizes.24",
          "--avatar-margin": "-1rem",
        },
      },
    },
    variant: {
      solid: {
        root: {
          bg: "colorPalette.600",
          color: "white",
        },
      },
      subtle: {
        root: {
          bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
          color: { base: "colorPalette.800", _dark: "colorPalette.300" },
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
  },
  defaultVariants: {
    size: "md",
    shape: "full",
    variant: "subtle",
    colorPalette: "gray",
  },
})
