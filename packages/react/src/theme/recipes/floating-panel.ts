import { floatingPanelAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

const iconButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "sm",
  w: "5",
  h: "5",
  color: "fg.muted",
  _hover: { bg: "bg.muted", color: "fg" },
  _focusVisible: {
    outlineWidth: "2px",
    outlineStyle: "solid",
    outlineColor: "colorPalette.focusRing",
    outlineOffset: "2px",
  },
}

const edge = (inset: object, size: object, cursor: string) => ({
  position: "absolute" as const,
  zIndex: "1",
  ...inset,
  ...size,
  cursor,
})

export const floatingPanelSlotRecipe = defineSlotRecipe({
  slots: floatingPanelAnatomy.keys(),
  className: "chakra-floating-panel",
  base: {
    positioner: {
      position: "fixed",
      zIndex: "popover",
      userSelect: "none",
      // smDown: {
      //   insetX: "0",
      //   bottom: "0",
      //   top: "auto",
      //   width: "100dvw!",
      // },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      bg: "bg.panel",
      borderWidth: "1px",
      borderRadius: "l2",
      boxShadow: "lg",
      overflow: "hidden",
      outline: 0,
      minW: "xs",
      minH: "12",
      position: "relative",
      _open: {
        animationName: "scale-in, fade-in",
        animationDuration: "moderate",
      },
      // _closed: {
      //   animationName: "fade-out",
      //   animationDuration: "faster",
      // },
      // smDown: {
      //   width: "100dvw!",
      //   height: "auto!",
      //   maxH: "70dvh",
      //   borderBottomRadius: "0",
      //   borderTopRadius: "l2",
      // },
    },
    control: {
      smDown: { display: "none" },
    },
    dragTrigger: {
      flex: "1",
      display: "flex",
      alignItems: "center",
      gap: "2",
      minW: "0",
      cursor: "grab",
      _active: { cursor: "grabbing" },
      smDown: { cursor: "default" },
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      px: "3",
      py: "2",
      borderBottomWidth: "1px",
      bg: "bg.subtle",
      flex: "none",
    },
    title: {
      fontWeight: "semibold",
      textStyle: "sm",
      flex: "1",
      truncate: true,
    },
    body: {
      flex: "1",
      overflow: "auto",
      p: "3",
      textStyle: "sm",
      "[data-minimized] &": { display: "none" },
    },
    resizeTrigger: {
      position: "absolute",
      zIndex: "1",
      "[data-minimized] &": { display: "none" },
      '&[data-axis="n"]': edge(
        { top: 0, left: 0, right: 0 },
        { h: "2" },
        "n-resize",
      ),
      '&[data-axis="s"]': edge(
        { bottom: 0, left: 0, right: 0 },
        { h: "2" },
        "s-resize",
      ),
      '&[data-axis="e"]': edge(
        { top: 0, right: 0, bottom: 0 },
        { w: "2" },
        "e-resize",
      ),
      '&[data-axis="w"]': edge(
        { top: 0, left: 0, bottom: 0 },
        { w: "2" },
        "w-resize",
      ),
      '&[data-axis="ne"]': edge(
        { top: 0, right: 0 },
        { w: "3", h: "3" },
        "ne-resize",
      ),
      '&[data-axis="nw"]': edge(
        { top: 0, left: 0 },
        { w: "3", h: "3" },
        "nw-resize",
      ),
      '&[data-axis="se"]': edge(
        { bottom: 0, right: 0 },
        { w: "3", h: "3" },
        "se-resize",
      ),
      '&[data-axis="sw"]': edge(
        { bottom: 0, left: 0 },
        { w: "3", h: "3" },
        "sw-resize",
      ),
    },
    stageTrigger: {
      ...iconButton,
      // restore (stage="default"): only visible when minimized or maximized
      '&[data-stage="default"]': {
        display: "none",
        "[data-minimized] &": { display: "inline-flex" },
        "[data-maximized] &": { display: "inline-flex" },
      },
      // minimize: hidden when already minimized
      '&[data-stage="minimized"]': {
        "[data-minimized] &": { display: "none" },
      },
      // maximize: hidden when already maximized
      '&[data-stage="maximized"]': {
        "[data-maximized] &": { display: "none" },
      },
    },
    closeTrigger: iconButton,
  },
})
