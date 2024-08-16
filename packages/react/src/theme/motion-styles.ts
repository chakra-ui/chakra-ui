import { defineAnimationStyles } from "../styled-system"

export const animationStyles = defineAnimationStyles({
  "slide-fade-in": {
    value: {
      transformOrigin: "var(--transform-origin)",
      "&[data-placement^=top]": {
        animationName: "slide-from-bottom, fade-in",
      },
      "&[data-placement^=bottom]": {
        animationName: "slide-from-top, fade-in",
      },
      "&[data-placement^=left]": {
        animationName: "slide-from-right, fade-in",
      },
      "&[data-placement^=right]": {
        animationName: "slide-from-left, fade-in",
      },
    },
  },

  "slide-fade-out": {
    value: {
      transformOrigin: "var(--transform-origin)",
      "&[data-placement^=top]": {
        animationName: "slide-to-bottom, fade-out",
      },
      "&[data-placement^=bottom]": {
        animationName: "slide-to-top, fade-out",
      },
      "&[data-placement^=left]": {
        animationName: "slide-to-right, fade-out",
      },
      "&[data-placement^=right]": {
        animationName: "slide-to-left, fade-out",
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
