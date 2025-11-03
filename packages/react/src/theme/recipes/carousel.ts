import { carouselAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const carouselSlotRecipe = defineSlotRecipe({
  className: "carousel",
  slots: carouselAnatomy.keys(),
  base: {
    root: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "2",
    },
    item: {
      minWidth: "0",
      flex: "0 0 auto",
      width: "100%",
    },
    control: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    indicatorGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "3",
    },
    indicator: {
      width: "2.5",
      height: "2.5",
      borderRadius: "full",
      bg: "colorPalette.subtle",
      cursor: "button",
      _current: {
        bg: "colorPalette.solid",
      },
    },
  },
  defaultVariants: {},
})
