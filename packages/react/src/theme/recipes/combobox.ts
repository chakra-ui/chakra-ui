import { comboboxAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const comboboxSlotRecipe = defineSlotRecipe({
  className: "chakra-combobox",
  slots: comboboxAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
    },
    label: {
      fontWeight: "medium",
      userSelect: "none",
      textStyle: "sm",
      _disabled: {
        layerStyle: "disabled",
      },
    },
    input: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "bg.panel",
      width: "full",
      minH: "var(--chakra-sizes-8)",
      px: "var(--combobox-input-padding-x)",
      borderRadius: "l2",
      outline: 0,
      userSelect: "none",
      textAlign: "start",
      focusVisibleRing: "inside",
      borderWidth: "1px",
      _placeholderShown: {
        color: "fg.muted",
      },
      _disabled: {
        layerStyle: "disabled",
      },
      _focusVisible: {
        borderColor: "border",
        outlineColor: "border",
      },
      _invalid: {
        borderColor: "border.error",
      },
    },
    trigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      "--input-height": "var(--combobox-input-height)",
      _icon: {
        boxSize: "4",
      },
    },
    clearTrigger: {
      color: "fg.muted",
      pointerEvents: "auto",
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
      rounded: "l1",
      _icon: {
        boxSize: "4",
      },
    },
    control: {
      pos: "relative",
    },

    indicatorGroup: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1",
      pos: "absolute",
      right: "0",
      top: "0",
      bottom: "0",
      px: "var(--combobox-input-padding-x)",
    },

    content: {
      background: "bg.panel",
      display: "flex",
      flexDirection: "column",
      zIndex: "dropdown",
      borderRadius: "l2",
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
      borderRadius: "l1",
      _highlighted: {
        bg: { _light: "bg.muted", _dark: "bg.emphasized" },
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
    itemText: {
      flex: "1",
    },
    itemGroup: {
      _first: { mt: "0" },
    },
    itemGroupLabel: {
      py: "1",
      fontWeight: "medium",
    },
  },

  variants: {
    variant: {
      outline: {
        input: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "border",
          _expanded: {
            borderColor: "border.emphasized",
          },
        },
      },

      subtle: {
        input: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
        },
      },
    },

    size: {
      xs: {
        root: {
          "--combobox-input-height": "sizes.8",
          "--combobox-input-padding-x": "spacing.2",
        },
        content: {
          p: "1",
          gap: "1",
          textStyle: "xs",
        },
        trigger: {
          textStyle: "xs",
          gap: "1",
        },
        item: {
          py: "1",
          px: "2",
        },
        itemGroupLabel: {
          py: "1",
          px: "2",
        },
        indicator: {
          _icon: {
            width: "3.5",
            height: "3.5",
          },
        },
      },

      sm: {
        root: {
          "--combobox-input-height": "sizes.9",
          "--combobox-input-padding-x": "spacing.2.5",
        },
        content: {
          p: "1",
          textStyle: "sm",
        },
        trigger: {
          textStyle: "sm",
          gap: "1",
        },
        indicator: {
          _icon: {
            width: "4",
            height: "4",
          },
        },
        item: {
          py: "1",
          px: "1.5",
        },
        itemGroup: {
          mt: "1",
        },
        itemGroupLabel: {
          py: "1",
          px: "1.5",
        },
      },

      md: {
        root: {
          "--combobox-input-height": "sizes.10",
          "--combobox-input-padding-x": "spacing.3",
        },
        content: {
          p: "1",
          textStyle: "sm",
        },
        itemGroup: {
          mt: "1.5",
        },
        item: {
          py: "1.5",
          px: "2",
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
          gap: "2",
        },
        indicator: {
          _icon: {
            width: "4",
            height: "4",
          },
        },
      },

      lg: {
        root: {
          "--combobox-input-height": "sizes.12",
          "--combobox-input-padding-x": "spacing.4",
        },
        content: {
          p: "1.5",
          textStyle: "md",
        },
        itemGroup: {
          mt: "2",
        },
        item: {
          py: "2",
          px: "3",
        },
        itemGroupLabel: {
          py: "2",
          px: "3",
        },
        trigger: {
          textStyle: "md",
          py: "3",
          gap: "2",
        },
        indicator: {
          _icon: {
            width: "5",
            height: "5",
          },
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
