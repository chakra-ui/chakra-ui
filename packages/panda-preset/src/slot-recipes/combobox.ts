import { defineSlotRecipe } from "../def"

export const comboboxSlotRecipe = defineSlotRecipe({
  className: "combobox",
  slots: [
    "root",
    "clearTrigger",
    "content",
    "control",
    "input",
    "item",
    "itemGroup",
    "itemGroupLabel",
    "itemIndicator",
    "itemText",
    "label",
    "list",
    "positioner",
    "trigger",
    "indicatorGroup",
    "empty",
  ],
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
      minH: "var(--combobox-input-height)",
      px: "var(--combobox-input-padding-x)",
      "--input-height": "var(--combobox-input-height)",
      borderRadius: "l2",
      outline: 0,
      userSelect: "none",
      textAlign: "start",
      _placeholderShown: {
        color: "fg.muted",
      },
      _disabled: {
        layerStyle: "disabled",
      },
      "--focus-color": "colors.colorPalette.focusRing",
      "--error-color": "colors.border.error",
      _invalid: {
        focusRingColor: "var(--error-color)",
        borderColor: "var(--error-color)",
      },
    },
    trigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      "--input-height": "var(--combobox-input-height)",
    },
    clearTrigger: {
      color: "fg.muted",
      pointerEvents: "auto",
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
      rounded: "l1",
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
      insetEnd: "0",
      top: "0",
      bottom: "0",
      px: "var(--combobox-input-padding-x)",
      _icon: {
        boxSize: "var(--combobox-indicator-size)",
      },
      "[data-disabled] &": {
        opacity: 0.5,
      },
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
        animationDuration: "0s",
      },
      "&[data-empty]:not(:has([data-scope=combobox][data-part=empty]))": {
        opacity: 0,
      },
    },
    item: {
      position: "relative",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      gap: "2",
      py: "var(--combobox-item-padding-y)",
      px: "var(--combobox-item-padding-x)",
      cursor: "option",
      justifyContent: "space-between",
      flex: "1",
      textAlign: "start",
      borderRadius: "l1",
      _highlighted: {
        bg: "bg.emphasized/60",
      },
      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
      _icon: {
        boxSize: "var(--combobox-indicator-size)",
      },
    },
    empty: {
      py: "var(--combobox-item-padding-y)",
      px: "var(--combobox-item-padding-x)",
    },
    itemText: {
      flex: "1",
    },
    itemGroup: {
      pb: "var(--combobox-item-padding-y)",
      _last: {
        pb: "0",
      },
    },
    itemGroupLabel: {
      fontWeight: "medium",
      py: "var(--combobox-item-padding-y)",
      px: "var(--combobox-item-padding-x)",
    },
  },
  variants: {
    variant: {
      outline: {
        input: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "border",
          focusVisibleRing: "inside",
        },
      },
      subtle: {
        input: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
          focusVisibleRing: "inside",
        },
      },
      flushed: {
        input: {
          bg: "transparent",
          borderBottomWidth: "1px",
          borderBottomColor: "border",
          borderRadius: "0",
          px: "0",
          _focusVisible: {
            borderColor: "var(--focus-color)",
            boxShadow: "0px 1px 0px 0px var(--focus-color)",
          },
        },
        indicatorGroup: {
          px: "0",
        },
      },
    },
    size: {
      xs: {
        root: {
          "--combobox-input-height": "sizes.8",
          "--combobox-input-padding-x": "spacing.2",
          "--combobox-indicator-size": "sizes.3.5",
        },
        input: {
          textStyle: "xs",
        },
        content: {
          "--combobox-item-padding-x": "spacing.1.5",
          "--combobox-item-padding-y": "spacing.1",
          "--combobox-indicator-size": "sizes.3.5",
          p: "1",
          textStyle: "xs",
        },
        trigger: {
          textStyle: "xs",
          gap: "1",
        },
      },
      sm: {
        root: {
          "--combobox-input-height": "sizes.9",
          "--combobox-input-padding-x": "spacing.2.5",
          "--combobox-indicator-size": "sizes.4",
        },
        input: {
          textStyle: "sm",
        },
        content: {
          "--combobox-item-padding-x": "spacing.2",
          "--combobox-item-padding-y": "spacing.1.5",
          "--combobox-indicator-size": "sizes.4",
          p: "1",
          textStyle: "sm",
        },
        trigger: {
          textStyle: "sm",
          gap: "1",
        },
      },
      md: {
        root: {
          "--combobox-input-height": "sizes.10",
          "--combobox-input-padding-x": "spacing.3",
          "--combobox-indicator-size": "sizes.4",
        },
        input: {
          textStyle: "sm",
        },
        content: {
          "--combobox-item-padding-x": "spacing.2",
          "--combobox-item-padding-y": "spacing.1.5",
          "--combobox-indicator-size": "sizes.4",
          p: "1",
          textStyle: "sm",
        },
        itemIndicator: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        trigger: {
          textStyle: "sm",
          gap: "2",
        },
      },
      lg: {
        root: {
          "--combobox-input-height": "sizes.12",
          "--combobox-input-padding-x": "spacing.4",
          "--combobox-indicator-size": "sizes.5",
        },
        input: {
          textStyle: "md",
        },
        content: {
          "--combobox-item-padding-y": "spacing.2",
          "--combobox-item-padding-x": "spacing.3",
          "--combobox-indicator-size": "sizes.5",
          p: "1.5",
          textStyle: "md",
        },
        trigger: {
          textStyle: "md",
          py: "3",
          gap: "2",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
