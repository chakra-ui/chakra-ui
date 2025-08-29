import { defineSlotRecipe } from "../def"

export const listboxSlotRecipe = defineSlotRecipe({
  className: "listbox",
  slots: [
    "label",
    "input",
    "item",
    "itemText",
    "itemIndicator",
    "itemGroup",
    "itemGroupLabel",
    "content",
    "root",
    "valueText",
    "empty",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
    },
    content: {
      display: "flex",
      maxH: "96",
      p: "1",
      gap: "1",
      textStyle: "sm",
      outline: "none",
      scrollPadding: "1",
      _horizontal: {
        flexDirection: "row",
        overflowX: "auto",
      },
      _vertical: {
        flexDirection: "column",
        overflowY: "auto",
      },
      "--listbox-item-padding-x": "spacing.2",
      "--listbox-item-padding-y": "spacing.1.5",
    },
    item: {
      position: "relative",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      gap: "2",
      cursor: "pointer",
      justifyContent: "space-between",
      flex: "1",
      textAlign: "start",
      borderRadius: "l1",
      py: "var(--listbox-item-padding-y)",
      px: "var(--listbox-item-padding-x)",
      _highlighted: {
        outline: "2px solid",
        outlineColor: "border.emphasized",
      },
      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
    },
    empty: {
      py: "var(--listbox-item-padding-y)",
      px: "var(--listbox-item-padding-x)",
    },
    itemText: {
      flex: "1",
    },
    itemGroup: {
      mt: "1.5",
      _first: {
        mt: "0",
      },
    },
    itemGroupLabel: {
      py: "1.5",
      px: "2",
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
    itemIndicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      _icon: {
        boxSize: "4",
      },
    },
  },
  variants: {
    variant: {
      subtle: {
        content: {
          bg: "bg.panel",
          borderWidth: "1px",
          borderRadius: "l2",
        },
        item: {
          _hover: {
            bg: "bg.emphasized/60",
          },
          _selected: {
            bg: "bg.muted",
          },
        },
      },
      solid: {
        content: {
          bg: "bg.panel",
          borderWidth: "1px",
          borderRadius: "l2",
        },
        item: {
          _selected: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
          },
        },
      },
      plain: {},
    },
  },
  defaultVariants: {
    variant: "subtle",
  },
})
