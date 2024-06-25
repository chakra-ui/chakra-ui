import { defineMotionStyles } from "../styled-system"

export const motionStyles = defineMotionStyles({
  "slide-fade-in": {
    value: {
      transformOrigin: "var(--transform-origin)",
      "&[data-placement^=top]": {
        animationName: "slide-from-top, fade-in",
      },
      "&[data-placement^=bottom]": {
        animationName: "slide-from-bottom, fade-in",
      },
      "&[data-placement^=left]": {
        animationName: "slide-from-left, fade-in",
      },
      "&[data-placement^=right]": {
        animationName: "slide-from-right, fade-in",
      },
    },
  },

  "slide-fade-out": {
    value: {
      transformOrigin: "var(--transform-origin)",
      "&[data-placement^=top]": {
        animationName: "slide-to-top, fade-out",
      },
      "&[data-placement^=bottom]": {
        animationName: "slide-to-bottom, fade-out",
      },
      "&[data-placement^=left]": {
        animationName: "slide-to-left, fade-out",
      },
      "&[data-placement^=right]": {
        animationName: "slide-to-right, fade-out",
      },
    },
  },

  "scale-fade-in": {
    value: {
      transformOrigin: "var(--transform-origin)",
      animationName: "scale-in, fade-in",
    },
  },

  "scale-fade-out": {
    value: {
      transformOrigin: "var(--transform-origin)",
      animationName: "scale-out, fade-out",
    },
  },
})
