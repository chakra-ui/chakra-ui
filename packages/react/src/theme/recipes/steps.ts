import { stepsAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const stepsSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      display: "flex",
      justifyContent: "space-between",
      gap: "4",
      colorPalette: "gray",
    },
    title: {
      fontWeight: "semibold",
    },
    description: {
      color: "fg.subtle",
    },
    separator: {
      bg: "border",
      flex: "1",
    },
    icon: {
      flexShrink: 0,
      width: "var(--steps-icon-size)",
      height: "var(--steps-icon-size)",
    },
    indicator: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      borderRadius: "full",
      fontWeight: "semibold",
      width: "var(--steps-size)",
      height: "var(--steps-size)",
    },
    item: {
      flexShrink: 0,
      position: "relative",
      display: "flex",
      gap: "2",
      flex: "1",
    },
  },
  variants: {
    orientation: {
      vertical: {
        root: {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        separator: {
          width: "1px",
          position: "absolute",
          height: "100%",
          maxHeight: "calc(100% - var(--steps-size) - 8px)",
          top: "calc(var(--steps-size) + 4px)",
          insetStart: "calc(var(--steps-size) / 2 - 1px)",
        },
        item: {
          "&:last-of-type": {
            flex: "initial",
          },
        },
      },
      horizontal: {
        root: {
          flexDirection: "row",
          alignItems: "center",
        },
        separator: {
          width: "100%",
          height: "2px",
          marginStart: "2",
        },
        item: {
          alignItems: "center",
        },
      },
    },
    variant: {
      solid: {
        indicator: {
          _incomplete: {
            borderWidth: "1px",
          },
          _current: {
            borderWidth: "1px",
            borderColor: {
              base: "colorPalette.200",
              _dark: "colorPalette.300/20",
            },
            color: { base: "colorPalette.700", _dark: "colorPalette.200" },
          },
          _complete: {
            bg: "colorPalette.600",
            color: "white",
          },
        },
        separator: {
          _complete: {
            bg: "colorPalette.600",
          },
        },
      },
      subtle: {
        indicator: {
          _incomplete: {
            bg: "bg.muted",
          },
          _current: {
            bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
            color: { base: "colorPalette.800", _dark: "colorPalette.200" },
          },
          _complete: {
            bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
            color: { base: "colorPalette.800", _dark: "colorPalette.200" },
          },
        },
        separator: {
          _complete: {
            bg: "colorPalette.400",
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          "--steps-size": "sizes.6",
          "--steps-icon-size": "sizes.4",
          fontSize: "xs",
        },
        title: { fontSize: "sm" },
      },
      md: {
        root: {
          "--steps-size": "sizes.8",
          "--steps-icon-size": "sizes.5",
          fontSize: "xs",
        },
        title: { fontSize: "sm" },
      },
      lg: {
        root: {
          "--steps-size": "sizes.10",
          "--steps-icon-size": "sizes.6",
          fontSize: "sm",
        },
        title: { fontSize: "md" },
      },
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      colorPalette: "gray",
      css: {
        indicator: {
          _complete: {
            bg: { base: "gray.800", _dark: "gray.200" },
            color: { base: "white", _dark: "gray.800" },
          },
        },
        separator: {
          _complete: {
            bg: { base: "gray.800", _dark: "gray.200" },
          },
        },
      },
    },
    {
      variant: "subtle",
      colorPalette: "gray",
      css: {
        indicator: {
          _complete: {
            bg: { base: "gray.200", _dark: "gray.300/20" },
          },
        },
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "solid",
    orientation: "horizontal",
    colorPalette: "gray",
  },
})
