import { tabsAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tabsSlotRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  className: "chakra-tabs",
  base: {
    root: {
      position: "relative",
      colorPalette: "gray",
    },
    trigger: {
      outline: 0,
      display: "flex",
      alignItems: "center",
      fontWeight: "medium",
      position: "relative",
      gap: "2",
      _focusVisible: {
        zIndex: 1,
        outline: "2px solid",
        outlineColor: "focusRing",
      },
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
    list: {
      display: "flex",
      position: "relative",
      isolation: "isolate",
      "--tabs-indicator-shadow": "shadows.xs",
      "--tabs-indicator-bg": "colors.bg",
    },
    content: {
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "focusRing",
      },
    },
    indicator: {
      width: "var(--width)",
      height: "var(--height)",
      borderRadius: "var(--tabs-indicator-radius)",
      bg: "var(--tabs-indicator-bg)",
      shadow: "var(--tabs-indicator-shadow)",
      zIndex: -1,
    },
  },

  variants: {
    orientation: {
      vertical: {
        root: {
          display: "flex",
        },
        content: {
          height: "100%",
          ms: "2",
        },
        list: {
          flexDirection: "column",
        },
      },
      horizontal: {
        root: {
          display: "block",
        },
        content: {
          width: "100%",
          mt: "2",
        },
        list: {
          flexDirection: "row",
        },
      },
    },
    fitted: {
      true: {
        trigger: {
          flex: 1,
          textAlign: "center",
          justifyContent: "center",
        },
      },
    },
    justify: {
      start: {
        list: {
          justifyContent: "flex-start",
        },
      },
      center: {
        list: {
          justifyContent: "center",
        },
      },
      end: {
        list: {
          justifyContent: "flex-end",
        },
      },
    },

    size: {
      sm: {
        root: {
          "--tabs-trigger-radius": "radii.sm",
          "--tabs-indicator-radius": "radii.sm",
        },
        trigger: {
          py: "1",
          px: "3",
          textStyle: "sm",
        },
      },
      md: {
        root: {
          "--tabs-trigger-radius": "radii.sm",
          "--tabs-indicator-radius": "radii.sm",
        },
        trigger: {
          py: "1.5",
          px: "4",
          textStyle: "sm",
        },
      },
      lg: {
        root: {
          "--tabs-trigger-radius": "radii.sm",
          "--tabs-indicator-radius": "radii.sm",
        },
        trigger: {
          py: "2",
          px: "5",
          textStyle: "md",
        },
      },
    },

    variant: {
      line: {
        list: {
          borderColor: "border",
        },
        trigger: {
          color: "fg",
          _selected: {
            color: "fg.muted",
          },
          _disabled: {
            _active: { bg: "initial" },
          },
        },
      },

      soft: {
        trigger: {
          borderRadius: "var(--tabs-trigger-radius)",
          color: "fg.muted",
          _selected: {
            bg: { base: "colorPalette.100", _dark: "colorPalette.950" },
            color: "fg",
          },
        },
      },

      enclosed: {
        list: {
          bg: "bg.muted",
          padding: "1",
          borderRadius: "md",
        },
        trigger: {
          flex: "1",
          justifyContent: "center",
          color: "fg.muted",
          borderRadius: "var(--tabs-trigger-radius)",
          _selected: {
            bg: "bg",
            color: "fg",
            shadow: "xs",
          },
        },
      },

      outline: {
        list: {
          "--line-thickness": "1px",
          "--line-offset": "calc(var(--line-thickness) * -1)",
          borderColor: "inherit",
          _before: {
            content: '""',
            position: "absolute",
          },
        },
        trigger: {
          color: "fg",
          borderWidth: "1px",
          borderColor: "transparent",
          _selected: {
            bg: "bg",
            color: { base: "colorPalette.600", _dark: "colorPalette.300" },
          },
        },
      },

      plain: {
        trigger: {
          borderRadius: "var(--tabs-trigger-radius)",
          "&[data-selected][data-ssr]": {
            bg: "var(--tabs-indicator-bg)",
            shadow: "var(--tabs-indicator-shadow)",
            borderRadius: "var(--tabs-indicator-radius)",
          },
        },
      },
    },
  },

  compoundVariants: [
    // line + horizontal
    {
      orientation: "horizontal",
      variant: "line",
      css: {
        list: { borderBottomWidth: "1px" },
        trigger: {
          _selected: {
            layerStyle: "indicator.bottom",
            "--indicator-offset-y": "-1px",
          },
        },
      },
    },
    // line + vertical
    {
      orientation: "vertical",
      variant: "line",
      css: {
        list: { borderEndWidth: "1px" },
        trigger: {
          _selected: {
            layerStyle: "indicator.end",
            "--indicator-offset-x": "-1px",
          },
        },
      },
    },
    // outline + horizontal
    {
      orientation: "horizontal",
      variant: "outline",
      css: {
        list: {
          _before: {
            bottom: "var(--line-offset)",
            width: "100%",
            borderBottomWidth: "var(--line-thickness)",
            borderBottomColor: "border",
          },
        },
        trigger: {
          borderTopRadius: "var(--tabs-trigger-radius)",
          marginBottom: "var(--line-offset)",
          marginEnd: { _notLast: "var(--line-offset)" },
          _selected: {
            borderColor: "inherit",
            borderBottomColor: "transparent",
          },
        },
      },
    },
    // outline + vertical
    {
      orientation: "vertical",
      variant: "outline",
      css: {
        list: {
          _before: {
            insetInline: "var(--line-offset)",
            height: "100%",
            borderEndWidth: "var(--line-thickness)",
            borderEndColor: "border",
          },
        },
        trigger: {
          borderStartRadius: "var(--tabs-trigger-radius)",
          marginEnd: "var(--line-offset)",
          marginBottom: { _notLast: "var(--line-offset)" },
          _selected: {
            borderColor: "inherit",
            borderEndColor: "transparent",
          },
        },
      },
    },
    {
      variant: "soft",
      colorPalette: "gray",
      css: {
        trigger: {
          _selected: {
            bg: { base: "gray.100", _dark: "gray.800" },
            color: { base: "gray.700", _dark: "gray.300" },
          },
        },
      },
    },
  ],

  defaultVariants: {
    size: "md",
    variant: "line",
    orientation: "horizontal",
    colorPalette: "gray",
  },
})
