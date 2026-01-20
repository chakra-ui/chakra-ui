import { marqueeAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const marqueeSlotRecipe = defineSlotRecipe({
  className: "chakra-marquee",
  slots: marqueeAnatomy.keys(),
  base: {
    root: {
      position: "relative",
      // width: "100%",
      // maxWidth: "100%",
    },
    viewport: {
      overflow: "hidden",
      display: "flex",
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
    },
    edge: {
      position: "absolute",
      zIndex: 10,
      pointerEvents: "none",
    },
  },
  variants: {
    orientation: {
      horizontal: {
        content: { flexDirection: "row" },
      },
      vertical: {
        content: { flexDirection: "column" },
      },
    },
    side: {
      start: {
        content: { animationName: "marqueeX" },
        edge: {
          width: "10%",
          background: "linear-gradient(to right, white, transparent)",
          _rtl: {
            background: "linear-gradient(to left, white, transparent)",
          },
        },
      },
      end: {
        content: { animationName: "marqueeX" },
        edge: {
          width: "10%",
          background: "linear-gradient(to left, white, transparent)",
          _rtl: {
            background: "linear-gradient(to right, white, transparent)",
          },
        },
      },

      top: {
        content: { animationName: "marqueeY" },
        edge: {
          height: "20%",
          background: "linear-gradient(to bottom, white, transparent)",
        },
      },
      bottom: {
        content: { animationName: "marqueeY" },
        edge: {
          height: "20%",
          background: "linear-gradient(to top, white, transparent)",
        },
      },
    },
    reverse: {
      true: {
        content: { animationDirection: "reverse" },
      },
    },
    paused: {
      true: {
        // CSS applies this to Root and Children (*).
        // Applying to both here ensures coverage.
        root: { animationPlayState: "paused !important" },
        content: { animationPlayState: "paused !important" },
      },
    },
    // 'rtl' variant removed in favor of _rtl selector in 'side' variant
    // to match [dir='rtl'] CSS logic.
  },
  defaultVariants: {
    orientation: "horizontal",
    side: "start",
  },
})
