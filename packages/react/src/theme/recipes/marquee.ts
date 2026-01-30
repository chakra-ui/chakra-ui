import { marqueeAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const marqueeSlotRecipe = defineSlotRecipe({
  className: "chakra-marquee",
  slots: marqueeAnatomy.keys(),
  base: {
    root: {
      position: "relative",
      width: "100%",
      "--marquee-edge-color": "colors.bg",
      "--marquee-edge-size": "20%",
      "&[data-paused]": {
        animationPlayState: "paused !important",
        "& *": {
          animationPlayState: "paused !important",
        },
      },
    },
    viewport: {
      overflow: "hidden",
      display: "flex",
      width: "100%",
      height: "100%",
    },
    content: {
      display: "flex",
      minWidth: "max-content",
      animationTimingFunction: "linear",
      animationFillMode: "forwards",
      animationDuration: "var(--marquee-duration)",
      animationDelay: "var(--marquee-delay)",
      animationIterationCount: "var(--marquee-loop-count)",
      _motionReduce: {
        animation: "none !important",
      },
      "&[data-side='start'], &[data-side='end']": {
        animationName: "marqueeX",
      },
      "&[data-side='top'], &[data-side='bottom']": {
        animationName: "marqueeY",
      },
      "&[data-reverse]": {
        animationDirection: "reverse",
      },
      "&[data-orientation='horizontal']": {
        flexDirection: "row",
      },
      "&[data-orientation='vertical']": {
        flexDirection: "column",
      },
    },
    edge: {
      position: "absolute",
      zIndex: "1",
      pointerEvents: "none",

      "&[data-side='start']": {
        width: "var(--marquee-edge-size)",
        insetY: "0",
        insetInlineStart: "0",
        background:
          "linear-gradient(to right, var(--marquee-edge-color, white), transparent)",
        _rtl: {
          background:
            "linear-gradient(to left, var(--marquee-edge-color, white), transparent)",
        },
      },
      "&[data-side='end']": {
        width: "var(--marquee-edge-size)",
        insetY: "0",
        insetInlineEnd: "0",
        background:
          "linear-gradient(to left, var(--marquee-edge-color, white), transparent)",
        _rtl: {
          background:
            "linear-gradient(to right, var(--marquee-edge-color, white), transparent)",
        },
      },
      "&[data-side='top']": {
        height: "var(--marquee-edge-size)",
        insetX: "0",
        top: "0",
        background:
          "linear-gradient(to bottom, var(--marquee-edge-color, white), transparent)",
      },
      "&[data-side='bottom']": {
        height: "var(--marquee-edge-size)",
        insetX: "0",
        bottom: "0",
        background:
          "linear-gradient(to top, var(--marquee-edge-color, white), transparent)",
      },
    },
  },
})
