import { marqueeAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const marqueeSlotRecipe = defineSlotRecipe({
  className: "chakra-marquee",
  slots: marqueeAnatomy.keys(),
  base: {
    root: {
      position: "relative",
      width: "100%",
      maxWidth: "100%",
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
      "@media (prefers-reduced-motion: reduce)": {
        animation: "none !important",
      },
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
      zIndex: 10,
      pointerEvents: "none",
      "&[data-side='start']": {
        width: "20%",
        insetY: "0",
        insetInlineStart: "0",
        background:
          "linear-gradient(to right, var(--chakra-colors-bg, white), transparent)",
        _rtl: {
          background:
            "linear-gradient(to left, var(--chakra-colors-bg, white), transparent)",
        },
      },
      "&[data-side='end']": {
        width: "20%",
        insetY: "0",
        insetInlineEnd: "0",
        background:
          "linear-gradient(to left, var(--chakra-colors-bg, white), transparent)",
        _rtl: {
          background:
            "linear-gradient(to right, var(--chakra-colors-bg, white), transparent)",
        },
      },
      "&[data-side='top']": {
        height: "20%",
        insetX: "0",
        top: "0",
        background:
          "linear-gradient(to bottom, var(--chakra-colors-bg, white), transparent)",
      },
      "&[data-side='bottom']": {
        height: "20%",
        insetX: "0",
        bottom: "0",
        background:
          "linear-gradient(to top, var(--chakra-colors-bg, white), transparent)",
      },
    },
  },
  variants: {
    pauseOnInteraction: {
      true: {
        content: {
          _hover: {
            animationPlayState: "paused",
          },
          _focus: {
            animationPlayState: "paused",
          },
          _focusVisible: {
            animationPlayState: "paused",
          },
        },
      },
    },
  },
  defaultVariants: {
    pauseOnInteraction: false,
  },
})
