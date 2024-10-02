import { selectAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const selectSlotRecipe = defineSlotRecipe({
  className: "chakra-select",
  slots: selectAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "full",
      minH: "var(--select-trigger-height)",
      px: "var(--select-trigger-padding-x)",
      userSelect: "none",
      textAlign: "start",
      _placeholderShown: {
        color: "fg.subtle",
      },
      _disabled: {
        layerStyle: "disabled",
      },
      _invalid: {
        borderColor: "border.error",
      },
      focusVisibleRing: "outside",
    },
    indicatorGroup: {
      display: "flex",
      alignItems: "center",
      gap: "1",
      pos: "absolute",
      right: "0",
      top: "0",
      bottom: "0",
      px: "var(--select-trigger-padding-x)",
      pointerEvents: "none",
    },
    indicator: {
      display: "flex",
      color: { base: "fg.muted", _invalid: "fg.error" },
      _icon: {
        width: "4",
        height: "4",
      },
    },
    content: {
      background: "bg.panel",
      display: "flex",
      flexDirection: "column",
      zIndex: "dropdown",
      outline: 0,
      maxH: "96",
      overflowY: "auto",
      boxShadow: "md",
      _open: {
        animationStyle: "slide-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        animationStyle: "slide-fade-out",
        animationDuration: "fastest",
      },
    },
    item: {
      position: "relative",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      gap: "2",
      cursor: "option",
      justifyContent: "space-between",
      flex: "1",
      textAlign: "start",
      _highlighted: {
        bg: { _light: "bg.subtle", _dark: "bg.emphasized" },
      },
      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
      _icon: {
        width: "4",
        height: "4",
      },
    },
    control: {
      pos: "relative",
    },
    itemText: {
      flex: "1",
    },
    itemGroupLabel: {
      py: "1",
      fontWeight: "medium",
    },
    label: {
      fontWeight: "medium",
      userSelect: "none",
      textStyle: "sm",
      _disabled: {
        layerStyle: "disabled",
      },
    },
    valueText: {
      lineClamp: "1",
      maxW: "80%",
    },
  },

  variants: {
    variant: {
      outline: {
        trigger: {
          borderWidth: "1px",
          borderColor: "inherit",
          bg: "bg",
          _expanded: {
            bg: "colorPalette.muted",
          },
        },
      },
      filled: {
        trigger: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.subtle",
        },
      },
    },

    size: {
      xs: {
        root: {
          "--select-trigger-height": "sizes.6",
          "--select-trigger-padding-x": "spacing.2",
        },
        trigger: {
          textStyle: "xs",
          rounded: "sm",
          gap: "1",
        },
        item: {
          py: "1",
          px: "2",
          rounded: "sm",
        },
        itemGroupLabel: {
          py: "1",
          px: "2",
        },
        content: {
          p: "1",
          rounded: "sm",
          minW: "8rem",
          textStyle: "xs",
        },
      },

      sm: {
        root: {
          "--select-trigger-height": "sizes.8",
          "--select-trigger-padding-x": "spacing.3",
        },
        content: {
          p: "1",
          rounded: "sm",
          minW: "12rem",
          textStyle: "sm",
        },
        trigger: {
          textStyle: "sm",
          rounded: "sm",
          gap: "1",
        },
        item: {
          py: "1",
          px: "2",
          rounded: "sm",
        },
        itemGroupLabel: {
          py: "1",
          px: "2",
        },
      },

      md: {
        root: {
          "--select-trigger-height": "sizes.10",
          "--select-trigger-padding-x": "spacing.3",
        },
        content: {
          p: "1",
          rounded: "md",
          minW: "12rem",
          textStyle: "sm",
        },
        item: {
          py: "1.5",
          px: "2",
          rounded: "sm",
        },
        itemIndicator: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        itemGroupLabel: {
          py: "1.5",
          px: "2",
        },
        trigger: {
          textStyle: "sm",
          rounded: "md",
          gap: "2",
        },
      },

      lg: {
        root: {
          "--select-trigger-height": "sizes.12",
          "--select-trigger-padding-x": "spacing.4",
        },
        content: {
          p: "2",
          rounded: "lg",
          textStyle: "md",
        },
        item: {
          py: "2",
          px: "3",
          rounded: "md",
        },
        itemGroupLabel: {
          py: "2",
          px: "3",
        },
        trigger: {
          textStyle: "md",
          py: "3",
          rounded: "md",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
