import { defineSlotRecipe } from "../../styled-system"

export const actionBarSlotRecipe = defineSlotRecipe({
  slots: ["positioner", "content", "separator", "selectionTrigger"],
  base: {
    positioner: {
      position: "fixed",
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
      insetInline: "0",
      top: "unset",
      bottom: "calc(env(safe-area-inset-bottom) + 20px)",
    },

    content: {
      bg: "bg.panel",
      shadow: "md",
      display: "flex",
      alignItems: "center",
      gap: "3",
      borderRadius: "md",
      paddingY: "2",
      paddingStart: "4",
      paddingEnd: "4",
      pointerEvents: "auto",

      _open: {
        animation: "enter 0.2s {easings.out}",
        "--enter-opacity": "0",
        "--enter-translate-y": "100%",
      },

      _closed: {
        animation: "exit 0.1s {easings.in}",
        "--exit-opacity": "0",
        "--exit-translate-y": "100%",
      },
    },

    separator: {
      width: "1px",
      height: "5",
      bg: "border",
    },

    selectionTrigger: {
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
      fontSize: "sm",
      paddingX: "4",
      paddingY: "1",
      borderRadius: "md",
      borderWidth: "1px",
      borderStyle: "dashed",
    },
  },
})
