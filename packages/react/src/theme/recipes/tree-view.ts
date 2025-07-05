import { treeViewAnatomy } from "../../anatomy"
import { defineSlotRecipe, defineStyle } from "../../styled-system"

const baseItemStyle = defineStyle({
  display: "flex",
  alignItems: "center",
  gap: "var(--tree-item-gap)",
  rounded: "l2",
  userSelect: "none",
  position: "relative",
  "--tree-depth": "calc(var(--depth) - 1)",
  "--tree-inset":
    "calc(var(--tree-padding-inline) + var(--tree-indentation) * var(--tree-depth))",
  ps: "var(--tree-inset)",
  pe: "var(--tree-padding-inline)",
  py: "var(--tree-padding-block)",
  focusVisibleRing: "inside",
  focusRingColor: "border.emphasized",
  focusRingWidth: "2px",
  "&:hover, &:focus-visible": {
    layerStyle: "fill.subtle",
  },
  _disabled: {
    layerStyle: "disabled",
  },
})

const baseTextStyle = defineStyle({
  flex: "1",
})

const subtleVariantStyle = defineStyle({
  _selected: {
    bg: "colorPalette.subtle",
  },
})

const surfaceVariantStyle = defineStyle({
  _selected: {
    layerStyle: "fill.surface",
  },
})

const solidVariantStyle = defineStyle({
  _selected: {
    layerStyle: "fill.solid",
  },
})

export const treeViewSlotRecipe = defineSlotRecipe({
  slots: treeViewAnatomy.keys(),
  className: "chakra-tree-view",
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
      overflow: "hidden",
      transitionProperty: "padding-bottom",
      transitionDuration: "normal",
      transitionTimingFunction: "default",
    },
    branchBody: {
      p: "2px",
    },
    branchIndentGuide: {
      height: "100%",
      width: "1px",
      bg: "border",
      position: "absolute",
      "--tree-depth": "calc(var(--depth) - 1)",
      "--tree-inset":
        "calc(var(--tree-padding-inline) + var(--tree-indentation) * var(--tree-depth))",
      insetInlineStart:
        "calc(var(--tree-inset) + calc(var(--tree-icon-size) * 0.5))",
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
    branchControl: baseItemStyle,
    item: baseItemStyle,
    itemText: baseTextStyle,
    branchText: baseTextStyle,
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
        branchControl: subtleVariantStyle,
        item: subtleVariantStyle,
      },
      solid: {
        branchControl: solidVariantStyle,
        item: solidVariantStyle,
      },
      surface: {
        branchControl: surfaceVariantStyle,
        item: surfaceVariantStyle,
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
