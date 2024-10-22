import { defineRecipe } from "../../styled-system"

export const skipNavLinkRecipe = defineRecipe({
  className: "chakra-skip-nav",
  base: {
    display: "inline-flex",
    bg: "bg.panel",
    padding: "2.5",
    borderRadius: "l2",
    fontWeight: "semibold",
    focusVisibleRing: "outside",
    textStyle: "sm",

    // visually hidden
    userSelect: "none",
    border: "0",
    height: "1px",
    width: "1px",
    margin: "-1px",
    outline: "0",
    overflow: "hidden",
    position: "absolute",
    clip: "rect(0 0 0 0)",

    _focusVisible: {
      clip: "auto",
      width: "auto",
      height: "auto",
      position: "fixed",
      top: "6",
      insetStart: "6",
    },
  },
})
