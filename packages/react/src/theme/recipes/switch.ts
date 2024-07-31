import { anatomy } from "@ark-ui/anatomy/switch"
import { defineSlotRecipe } from "../../styled-system"

export const switchSlotRecipe = defineSlotRecipe({
  slots: anatomy.keys(),
  base: {
    root: {
      display: "inline-flex",
      gap: "2.5",
      alignItems: "center",
      position: "relative",
      verticalAlign: "middle",
      "--switch-diff": "calc(var(--switch-width) - var(--switch-height))",
      "--switch-x": {
        base: "var(--switch-diff)",
        _rtl: "calc(var(--switch-diff) * -1)",
      },
      colorPalette: "gray",
    },

    label: {
      lineHeight: "1",
      userSelect: "none",
      fontSize: "sm",
      fontWeight: "medium",
      _disabled: {
        opacity: "0.5",
      },
    },

    control: {
      display: "inline-flex",
      gap: "0.5rem",
      flexShrink: 0,
      justifyContent: "flex-start",
      cursor: "pointer",
      borderRadius: "full",
      position: "relative",
      width: "var(--switch-width)",
      height: "var(--switch-height)",
      transitionProperty: "common",
      transitionDuration: "fast",
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
    },

    thumb: {
      bg: "white",
      transitionProperty: "translate",
      transitionDuration: "fast",
      borderRadius: "inherit",
      _checked: {
        translate: "var(--switch-x) 0",
      },
    },
  },

  variants: {
    variant: {
      solid: {
        control: {
          borderRadius: "full",
          bg: { base: "gray.300", _dark: "whiteAlpha.400" },
          _checked: {
            bg: "colorPalette.600",
          },
          _focus: {
            outline: "2px solid",
            outlineColor: "colorPalette.500",
            outlineOffset: "2px",
          },
        },
        thumb: {
          width: "var(--switch-height)",
          height: "var(--switch-height)",
          scale: "0.8",
          boxShadow: "sm",
        },
      },

      outline: {
        control: {
          borderRadius: "full",
          shadowColor: "border",
          boxShadow: "0 0 0 1px var(--shadow-color)",
          bg: { base: "gray.100", _dark: "whiteAlpha.400" },
          _checked: {
            shadowColor: {
              base: "colorPalette.300",
              _dark: "colorPalette.200/60",
            },
            bg: { base: "colorPalette.200", _dark: "colorPalette.400/40" },
          },
          _focus: {
            outline: "2px solid",
            outlineColor: "colorPalette.500",
            outlineOffset: "2px",
          },
        },
        thumb: {
          bg: "bg",
          width: "var(--switch-height)",
          height: "var(--switch-height)",
          boxShadow: "0 0 0 1px var(--shadow-color)",
          shadowColor: "border",
          _checked: {
            boxShadow:
              "inset 0 0 0 1px var(--shadow-color), 0 0 0 1px var(--shadow-color)",
            shadowColor: {
              base: "colorPalette.500",
              _dark: "colorPalette.200/60",
            },
          },
        },
      },

      raised: {
        control: {
          borderRadius: "full",
          height: "calc(var(--switch-height) / 2)",
          bg: { base: "gray.100", _dark: "whiteAlpha.400" },
          boxShadow: "inset",
          _checked: {
            bg: { base: "colorPalette.300", _dark: "colorPalette.400/30" },
          },
        },
        thumb: {
          width: "var(--switch-height)",
          height: "var(--switch-height)",
          position: "relative",
          top: "calc(var(--switch-height) * -0.25)",
          bg: "white",
          boxShadow: "xs",
          _checked: {
            bg: { base: "colorPalette.700", _dark: "colorPalette.500" },
          },
          _focus: {
            outline: "2px solid",
            outlineColor: "colorPalette.500",
            outlineOffset: "2px",
          },
        },
      },
    },

    size: {
      xs: {
        root: {
          "--switch-width": "sizes.5",
          "--switch-height": "sizes.3",
        },
      },
      sm: {
        root: {
          "--switch-width": "sizes.7",
          "--switch-height": "sizes.4",
        },
      },
      md: {
        root: {
          "--switch-width": "sizes.9",
          "--switch-height": "sizes.5",
        },
      },
      lg: {
        root: {
          "--switch-width": "sizes.10",
          "--switch-height": "sizes.6",
        },
      },
    },
  },

  defaultVariants: {
    variant: "solid",
    size: "md",
    colorPalette: "gray",
  },
})
