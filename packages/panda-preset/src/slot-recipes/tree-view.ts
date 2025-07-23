import { defineSlotRecipe } from "../def"

export const treeViewSlotRecipe = defineSlotRecipe({
  slots: [
    "branch",
    "branchContent",
    "branchControl",
    "branchIndentGuide",
    "branchIndicator",
    "branchText",
    "branchTrigger",
    "item",
    "itemIndicator",
    "itemText",
    "label",
    "nodeCheckbox",
    "root",
    "tree",
  ],
  className: "tree-view",
  base: {
    root: {
      width: "full",
      display: "flex",
      flexDirection: "column",
      gap: "2",
    },
    tree: {
      display: "flex",
      flexDirection: "column",
      "--tree-item-gap": "spacing.2",
      _icon: {
        boxSize: "var(--tree-icon-size)",
      },
    },
    label: {
      fontWeight: "medium",
      textStyle: "sm",
    },
    branch: {
      position: "relative",
    },
    branchContent: {
      position: "relative",
    },
    branchIndentGuide: {
      height: "100%",
      width: "1px",
      bg: "border",
      position: "absolute",
      "--tree-depth": "calc(var(--depth) - 1)",
      "--tree-indentation-offset":
        "calc(var(--tree-indentation) * var(--tree-depth))",
      "--tree-offset":
        "calc(var(--tree-padding-inline) + var(--tree-indentation-offset))",
      "--tree-icon-offset": "calc(var(--tree-icon-size) * 0.5 * var(--depth))",
      insetInlineStart: "calc(var(--tree-offset) + var(--tree-icon-offset))",
      zIndex: "1",
    },
    branchIndicator: {
      color: "fg.muted",
      transformOrigin: "center",
      transitionDuration: "normal",
      transitionProperty: "transform",
      transitionTimingFunction: "default",
      _open: {
        transform: "rotate(90deg)",
      },
    },
    branchTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
    branchControl: {
      display: "flex",
      alignItems: "center",
      gap: "var(--tree-item-gap)",
      rounded: "l2",
      userSelect: "none",
      position: "relative",
      "--tree-depth": "calc(var(--depth) - 1)",
      "--tree-indentation-offset":
        "calc(var(--tree-indentation) * var(--tree-depth))",
      "--tree-icon-offset":
        "calc(var(--tree-icon-size) * var(--tree-depth) * 0.5)",
      "--tree-offset":
        "calc(var(--tree-padding-inline) + var(--tree-indentation-offset) + var(--tree-icon-offset))",
      ps: "var(--tree-offset)",
      pe: "var(--tree-padding-inline)",
      py: "var(--tree-padding-block)",
      focusVisibleRing: "inside",
      focusRingColor: "border.emphasized",
      focusRingWidth: "2px",
      "&:hover, &:focus-visible": {
        bg: "bg.muted",
      },
      _disabled: {
        layerStyle: "disabled",
      },
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: "var(--tree-item-gap)",
      rounded: "l2",
      userSelect: "none",
      position: "relative",
      "--tree-depth": "calc(var(--depth) - 1)",
      "--tree-indentation-offset":
        "calc(var(--tree-indentation) * var(--tree-depth))",
      "--tree-icon-offset":
        "calc(var(--tree-icon-size) * var(--tree-depth) * 0.5)",
      "--tree-offset":
        "calc(var(--tree-padding-inline) + var(--tree-indentation-offset) + var(--tree-icon-offset))",
      ps: "var(--tree-offset)",
      pe: "var(--tree-padding-inline)",
      py: "var(--tree-padding-block)",
      focusVisibleRing: "inside",
      focusRingColor: "border.emphasized",
      focusRingWidth: "2px",
      "&:hover, &:focus-visible": {
        bg: "bg.muted",
      },
      _disabled: {
        layerStyle: "disabled",
      },
    },
    itemText: {
      flex: "1",
    },
    branchText: {
      flex: "1",
    },
    nodeCheckbox: {
      display: "inline-flex",
    },
  },
  variants: {
    size: {
      md: {
        tree: {
          textStyle: "sm",
          "--tree-indentation": "spacing.4",
          "--tree-padding-inline": "spacing.3",
          "--tree-padding-block": "spacing.1.5",
          "--tree-icon-size": "spacing.4",
        },
      },
      sm: {
        tree: {
          textStyle: "sm",
          "--tree-indentation": "spacing.4",
          "--tree-padding-inline": "spacing.3",
          "--tree-padding-block": "spacing.1",
          "--tree-icon-size": "spacing.3",
        },
      },
      xs: {
        tree: {
          textStyle: "xs",
          "--tree-indentation": "spacing.4",
          "--tree-padding-inline": "spacing.2",
          "--tree-padding-block": "spacing.1",
          "--tree-icon-size": "spacing.3",
        },
      },
    },
    variant: {
      subtle: {
        branchControl: {
          _selected: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
          },
        },
        item: {
          _selected: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
          },
        },
      },
      solid: {
        branchControl: {
          _selected: {
            layerStyle: "fill.solid",
          },
        },
        item: {
          _selected: {
            layerStyle: "fill.solid",
          },
        },
      },
    },
    animateContent: {
      true: {
        branchContent: {
          _open: {
            animationName: "expand-height, fade-in",
            animationDuration: "moderate",
          },
          _closed: {
            animationName: "collapse-height, fade-out",
            animationDuration: "moderate",
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "subtle",
  },
})
