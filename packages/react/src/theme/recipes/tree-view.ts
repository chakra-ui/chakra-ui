import { treeViewAnatomy } from "@ark-ui/react/tree-view"
import { defineSlotRecipe } from "../../styled-system"

export const treeViewSlotRecipe = defineSlotRecipe({
  slots: treeViewAnatomy.keys(),
  className: "chakra-tree-view",
  base: {
    root: {
      width: "full",
      color: "fg.default",
    },
    branchContent: {
      position: "relative",
      overflow: "hidden",
      transitionProperty: "padding-bottom",
      transitionDuration: "normal",
      transitionTimingFunction: "default",
    },
    branchIndentGuide: {
      height: "100%",
      width: "1px",
      bg: "border.default",
      position: "absolute",
      left: "calc((var(--depth) - 1) * 29px)",
      "&[data-depth='1']": {
        left: "3",
      },
    },
    branchControl: {
      alignItems: "center",
      borderRadius: "l2",
      display: "flex",
      gap: "1.5",
      ps: "calc((var(--depth) - 1) * 22px)",
      py: "1.5",
      cursor: "pointer",
      userSelect: "none",
      "&[data-depth='1']": {
        ps: "1",
      },
      _hover: {
        background: "gray.a2",
        color: "fg.default",
      },
      _selected: {
        color: "colorPalette.default!",
      },
    },
    branchIndicator: {
      color: "colorPalette.default",
      transformOrigin: "center",
      transitionDuration: "normal",
      transitionProperty: "transform",
      transitionTimingFunction: "default",

      _open: {
        transform: "rotate(90deg)",
      },
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      borderRadius: "l2",
      cursor: "pointer",
      position: "relative",
      ps: "calc(((var(--depth) - 1) * 22px) + 22px)",
      py: "1.5",
      "&[data-depth='1']": {
        ps: "6",
        color: "fg.default",
      },
      _hover: {
        background: "gray.a2",
        color: "fg.default",
      },
      _selected: {
        color: "colorPalette.default!",
      },
    },
    itemText: {
      display: "flex",
      alignItems: "center",
      gap: "2",
    },
    branchText: {
      display: "flex",
      alignItems: "center",
      gap: "2",
    },
    itemIndicator: {
      _icon: {
        width: "3",
        height: "3",
      },
    },
    tree: {
      display: "flex",
      flexDirection: "column",
      textStyle: "sm",
      _icon: {
        width: "4",
        height: "4",
      },
    },
  },
})
