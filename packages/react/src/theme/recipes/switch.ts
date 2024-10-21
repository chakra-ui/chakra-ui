import { switchAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const switchSlotRecipe = defineSlotRecipe({
  slots: switchAnatomy.keys(),
  className: "chakra-switch",
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

    indicator: {
      position: "absolute",
      height: "var(--switch-height)",
      width: "var(--switch-height)",
      fontSize: "var(--switch-indicator-font-size)",
      fontWeight: "medium",
      flexShrink: 0,
      userSelect: "none",
      display: "grid",
      placeContent: "center",
      transition: "inset-inline-start 0.12s ease",
      insetInlineStart: "calc(var(--switch-x) - 2px)",
      _checked: {
        insetInlineStart: "2px",
      },
    },

    control: {
      display: "inline-flex",
      gap: "0.5rem",
      flexShrink: 0,
      justifyContent: "flex-start",
      cursor: "switch",
      borderRadius: "full",
      position: "relative",
      width: "var(--switch-width)",
      height: "var(--switch-height)",
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
      _invalid: {
        outline: "2px solid",
        outlineColor: "border.error",
        outlineOffset: "2px",
      },
    },

    thumb: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
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
          bg: "bg.emphasized",
          focusVisibleRing: "outside",
          _checked: {
            bg: "colorPalette.solid",
          },
        },
        thumb: {
          bg: "white",
          width: "var(--switch-height)",
          height: "var(--switch-height)",
          scale: "0.8",
          boxShadow: "sm",
          _checked: {
            bg: "colorPalette.contrast",
          },
        },
      },

      raised: {
        control: {
          borderRadius: "full",
          height: "calc(var(--switch-height) / 2)",
          bg: "bg.muted",
          boxShadow: "inset",
          _checked: {
            bg: "colorPalette.solid/60",
          },
        },
        thumb: {
          width: "var(--switch-height)",
          height: "var(--switch-height)",
          position: "relative",
          top: "calc(var(--switch-height) * -0.25)",
          bg: "white",
          boxShadow: "xs",
          focusVisibleRing: "outside",
          _checked: {
            bg: "colorPalette.solid",
          },
        },
      },
    },

    size: {
      xs: {
        root: {
          "--switch-width": "sizes.6",
          "--switch-height": "sizes.3",
          "--switch-indicator-font-size": "fontSizes.xs",
        },
      },
      sm: {
        root: {
          "--switch-width": "sizes.8",
          "--switch-height": "sizes.4",
          "--switch-indicator-font-size": "fontSizes.xs",
        },
      },
      md: {
        root: {
          "--switch-width": "sizes.10",
          "--switch-height": "sizes.5",
          "--switch-indicator-font-size": "fontSizes.sm",
        },
      },
      lg: {
        root: {
          "--switch-width": "sizes.12",
          "--switch-height": "sizes.6",
          "--switch-indicator-font-size": "fontSizes.md",
        },
      },
    },
  },

  defaultVariants: {
    variant: "solid",
    size: "md",
  },
})
