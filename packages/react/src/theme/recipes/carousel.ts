import { defineSlotRecipe } from "../../styled-system"

export const carouselSlotRecipe = defineSlotRecipe({
  className: "carousel",
  slots: [
    "root",
    "itemGroup",
    "item",
    "control",
    "prevTrigger",
    "nextTrigger",
    "autoplayTrigger",
    "indicatorGroup",
    "indicator",
  ],
  base: {
    root: {
      position: "relative",
      overflow: "hidden",
      "--carousel-spacing": "spacing.4",
    },
    itemGroup: {
      display: "flex",
      transition: "transform 0.3s ease-in-out",
    },
    item: {
      minWidth: "0",
      flex: "0 0 auto",
      width: "full",
    },
    control: {
      position: "absolute",
      top: "50%",
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transform: "translateY(-50%)",
      px: "var(--carousel-spacing)",
      zIndex: 2,
    },
    indicatorGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "2",
      mt: "var(--carousel-spacing)",
    },
    indicator: {
      width: "3",
      height: "3",
      borderRadius: "full",
      bg: "bg.muted",
      cursor: "pointer",
      transition: "all 0.2s",
      "&[data-current]": {
        bg: "fg",
      },
    },
  },
  defaultVariants: {},
})
