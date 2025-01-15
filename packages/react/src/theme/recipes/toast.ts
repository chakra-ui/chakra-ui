import { toastAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const toastSlotRecipe = defineSlotRecipe({
  slots: toastAnatomy.keys(),
  className: "chakra-toast",
  base: {
    root: {
      width: "full",
      display: "flex",
      alignItems: "flex-start",
      position: "relative",
      gap: "3",
      py: "4",
      ps: "4",
      pe: "6",
      borderRadius: "l2",
      translate: "var(--x) var(--y)",
      scale: "var(--scale)",
      zIndex: "var(--z-index)",
      height: "var(--height)",
      opacity: "var(--opacity)",
      willChange: "translate, opacity, scale",
      transition:
        "translate 400ms, scale 400ms, opacity 400ms, height 400ms, box-shadow 200ms",
      transitionTimingFunction: "cubic-bezier(0.21, 1.02, 0.73, 1)",
      _closed: {
        transition: "translate 400ms, scale 400ms, opacity 200ms",
        transitionTimingFunction: "cubic-bezier(0.06, 0.71, 0.55, 1)",
      },
      bg: "bg.panel",
      color: "fg",
      boxShadow: "xl",
      "--toast-trigger-bg": "colors.bg.muted",
      "&[data-type=warning]": {
        bg: "orange.solid",
        color: "orange.contrast",
        "--toast-trigger-bg": "{white/10}",
        "--toast-border-color": "{white/40}",
      },
      "&[data-type=success]": {
        bg: "green.solid",
        color: "green.contrast",
        "--toast-trigger-bg": "{white/10}",
        "--toast-border-color": "{white/40}",
      },
      "&[data-type=error]": {
        bg: "red.solid",
        color: "red.contrast",
        "--toast-trigger-bg": "{white/10}",
        "--toast-border-color": "{white/40}",
      },
    },
    title: {
      fontWeight: "medium",
      textStyle: "sm",
      marginEnd: "2",
    },
    description: {
      display: "inline",
      textStyle: "sm",
      opacity: "0.8",
    },
    indicator: {
      flexShrink: "0",
      boxSize: "5",
    },
    actionTrigger: {
      textStyle: "sm",
      fontWeight: "medium",
      height: "8",
      px: "3",
      borderRadius: "l2",
      alignSelf: "center",
      borderWidth: "1px",
      borderColor: "var(--toast-border-color, inherit)",
      transition: "background 200ms",
      _hover: {
        bg: "var(--toast-trigger-bg)",
      },
    },
    closeTrigger: {
      position: "absolute",
      top: "1",
      insetEnd: "1",
      padding: "1",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "{currentColor/60}",
      borderRadius: "l2",
      textStyle: "md",
      transition: "background 200ms",
      _icon: {
        boxSize: "1em",
      },
    },
  },
})
