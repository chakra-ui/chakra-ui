import { defineKeyframes } from "../../styled-system"

export const keyframes = defineKeyframes({
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  pulse: {
    "50%": { opacity: ".5" },
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
})
