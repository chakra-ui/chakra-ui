import { tabsAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tabsSlotRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  className: "chakra-tabs",
  base: {
    root: {
      position: "relative",

      _horizontal: {
        display: "block",
      },
      _vertical: {
        display: "flex",
      },
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
      display: "inline-flex",
      position: "relative",
      isolation: "isolate",
      "--tabs-indicator-shadow": "shadows.xs",
      "--tabs-indicator-bg": "colors.bg",
      _horizontal: {
        flexDirection: "row",
      },
      _vertical: {
        flexDirection: "column",
      },
    },
    content: {
      mt: "var(--tabs-gap-y)",
      ms: "var(--tabs-gap-x)",
      width: "var(--tabs-width)",
      height: "var(--tabs-height)",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "focusRing",
      },
      _horizontal: {
        "--tabs-width": "100%",
        "--tabs-gap-y": "spacing.2",
      },
      _vertical: {
        "--tabs-height": "100%",
        "--tabs-gap-x": "spacing.2",
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
    fitted: {
      true: {
        list: {
          display: "flex",
        },
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
          _horizontal: {
            borderBottomWidth: "1px",
          },
          _vertical: {
            borderEndWidth: "1px",
          },
        },
        trigger: {
          color: "fg.subtle",
          _disabled: {
            _active: { bg: "initial" },
          },
          _selected: {
            color: "fg",
            _horizontal: {
              layerStyle: "indicator.bottom",
              "--indicator-offset-y": "-1px",
              "--indicator-color": "colors.colorPalette.solid",
            },
            _vertical: {
              layerStyle: "indicator.end",
              "--indicator-offset-x": "-1px",
            },
          },
        },
      },

      subtle: {
        trigger: {
          borderRadius: "var(--tabs-trigger-radius)",
          color: "fg.subtle",
          _selected: {
            bg: "colorPalette.muted",
            color: "colorPalette.fg",
          },
        },
      },

      enclosed: {
        list: {
          bg: "bg.subtle",
          padding: "1",
          borderRadius: "md",
        },
        trigger: {
          justifyContent: "center",
          color: "fg.subtle",
          borderRadius: "var(--tabs-trigger-radius)",
          _selected: {
            bg: "bg",
            color: "colorPalette.fg",
            shadow: "xs",
          },
        },
      },

      outline: {
        list: {
          "--line-thickness": "1px",
          "--line-offset": "calc(var(--line-thickness) * -1)",
          borderColor: "border",
          _horizontal: {
            _before: {
              content: '""',
              position: "absolute",
              bottom: "var(--line-offset)",
              width: "100%",
              borderBottomWidth: "var(--line-thickness)",
              borderBottomColor: "border",
            },
          },
          _vertical: {
            _before: {
              content: '""',
              position: "absolute",
              insetInline: "var(--line-offset)",
              height: "100%",
              borderEndWidth: "var(--line-thickness)",
              borderEndColor: "border",
            },
          },
        },
        trigger: {
          color: "fg.subtle",
          borderWidth: "1px",
          borderColor: "transparent",
          _selected: {
            bg: "bg",
            color: "colorPalette.fg",
          },
          _horizontal: {
            borderTopRadius: "var(--tabs-trigger-radius)",
            marginBottom: "var(--line-offset)",
            marginEnd: { _notLast: "var(--line-offset)" },
            _selected: {
              borderColor: "border",
              borderBottomColor: "transparent",
            },
          },
          _vertical: {
            borderStartRadius: "var(--tabs-trigger-radius)",
            marginEnd: "var(--line-offset)",
            marginBottom: { _notLast: "var(--line-offset)" },
            _selected: {
              borderColor: "border",
              borderEndColor: "transparent",
            },
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

  defaultVariants: {
    size: "md",
    variant: "line",
  },
})
