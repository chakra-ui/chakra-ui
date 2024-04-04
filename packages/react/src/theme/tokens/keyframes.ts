import { defineKeyframes } from "../../styled-system"

export const keyframes = defineKeyframes({
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "bg-position": {
    from: { backgroundPosition: "var(--animate-from, 1rem) 0" },
    to: { backgroundPosition: "var(--animate-to, 0) 0" },
  },
  position: {
    from: {
      insetInlineStart: "var(--animate-from-x)",
      insetBlockStart: "var(--animate-from-y)",
    },
    to: {
      insetInlineStart: "var(--animate-to-x)",
      insetBlockStart: "var(--animate-to-y)",
    },
  },
  pulse: {
    "50%": { opacity: "0.5" },
  },
  "fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "fade-out": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  "scale-fade": {
    from: { opacity: 0, scale: "var(--scale-from, 0.95)" },
    to: { opacity: 1, scale: "var(--scale-to, 1)" },
  },
  "slide-fade": {
    from: {
      opacity: 0,
      translate: "var(--offset-x, 0) var(--offset-y, 8px)",
    },
    to: {
      opacity: 1,
      translate: "0 0",
    },
  },
  "slide-left": {
    from: { translate: "-100% 0" },
    to: { translate: "0 0" },
  },
  "slide-right": {
    from: { translate: "100% 0" },
    to: { translate: "0 0" },
  },
  "slide-up": {
    from: { translate: "0 -100%" },
    to: { translate: "0 0" },
  },
  "slide-down": {
    from: { translate: "0 100%" },
    to: { translate: "0 0" },
  },
  enter: {
    from: {
      opacity: "var(--enter-opacity, 1)",
      transform:
        "translate3d(var(--enter-translate-x, 0), var(--enter-translate-y, 0), 0) scale3d(var(--enter-scale, 1), var(--enter-scale, 1), var(--enter-scale, 1)) rotate(var(--enter-rotate, 0))",
    },
  },
  exit: {
    to: {
      opacity: "var(--exit-opacity, 1)",
      transform:
        "translate3d(var(--exit-translate-x, 0), var(--exit-translate-y, 0), 0) scale3d(var(--exit-scale, 1), var(--exit-scale, 1), var(--exit-scale, 1)) rotate(var(--exit-rotate, 0))",
    },
  },
})
