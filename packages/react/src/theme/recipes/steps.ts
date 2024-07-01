import { stepsAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const stepsSlotRecipe = defineSlotRecipe({
  slots: stepsAnatomy.keys(),
  base: {
    root: {
      colorPalette: "gray",
      display: "flex",
      gap: "4",
    },
    list: {
      display: "flex",
      justifyContent: "space-between",
      "--steps-gutter": "spacing.3",
    },
    title: {
      fontWeight: "medium",
    },
    description: {
      color: "fg.subtle",
    },
    separator: {
      bg: "border",
      flex: "1",
    },
    indicator: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      borderRadius: "full",
      fontWeight: "medium",
      width: "var(--steps-size)",
      height: "var(--steps-size)",
      "& svg": {
        flexShrink: 0,
        width: "var(--steps-icon-size)",
        height: "var(--steps-icon-size)",
      },
    },
    item: {
      position: "relative",
      display: "flex",
      flex: "1 0 0",
      "&:last-of-type": {
        flex: "initial",
        "& [data-part=separator]": {
          display: "none",
        },
      },
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      gap: "3",
      textAlign: "start",
      focusRing: "extend",
      borderRadius: "md",
    },
    content: {
      focusRing: "extend",
    },
  },

  variants: {
    orientation: {
      vertical: {
        root: {
          flexDirection: "row",
          height: "100%",
        },
        list: {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        separator: {
          position: "absolute",
          width: "2px",
          height: "100%",
          maxHeight: "calc(100% - var(--steps-size) - var(--steps-gutter) * 2)",
          top: "calc(var(--steps-size) + var(--steps-gutter))",
          insetStart: "calc(var(--steps-size) / 2 - 1px)",
        },
        item: {
          alignItems: "flex-start",
        },
      },
      horizontal: {
        root: {
          flexDirection: "column",
          width: "100%",
        },
        list: {
          flexDirection: "row",
          alignItems: "center",
        },
        separator: {
          width: "100%",
          height: "2px",
          marginX: "var(--steps-gutter)",
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
            borderWidth: "2px",
          },
          _current: {
            bg: "bg.muted",
            borderWidth: "2px",
            borderColor: "colorPalette.600",
            color: { base: "colorPalette.700", _dark: "colorPalette.200" },
          },
          _complete: {
            bg: "colorPalette.600",
            borderColor: "colorPalette.600",
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
        list: {
          "--steps-size": "sizes.6",
          "--steps-icon-size": "sizes.4",
          fontSize: "xs",
        },
        title: { fontSize: "sm" },
      },
      md: {
        list: {
          "--steps-size": "sizes.8",
          "--steps-icon-size": "sizes.4",
          fontSize: "xs",
        },
        title: { fontSize: "sm" },
      },
      lg: {
        list: {
          "--steps-size": "sizes.10",
          "--steps-icon-size": "sizes.4",
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
            borderColor: { base: "gray.800", _dark: "gray.200" },
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
