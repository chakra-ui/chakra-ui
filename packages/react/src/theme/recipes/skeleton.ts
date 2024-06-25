import { defineRecipe } from "../../styled-system"

export const skeletonRecipe = defineRecipe({
  base: {},

  variants: {
    loaded: {
      true: {
        background: "unset",
        animation: "fade-in var(--fade-duration, 0.1s) ease-out !important",
      },
      false: {
        borderRadius: "sm",
        boxShadow: "none",
        backgroundClip: "padding-box",
        cursor: "default",
        color: "transparent",
        pointerEvents: "none",
        userSelect: "none",
        flexShrink: "0",
        "&::before, &::after, *": {
          visibility: "hidden",
        },
      },
    },
    variant: {
      pulse: {
        background: "bg.emphasized",
        animation: "pulse",
        animationDuration: "var(--duration, 1.2s)",
      },
      shine: {
        "--animate-from": "200%",
        "--animate-to": "-200%",
        "--start-color": "colors.bg.subtle",
        "--end-color": "colors.bg.emphasized",
        backgroundImage:
          "linear-gradient(270deg,var(--start-color),var(--end-color),var(--end-color),var(--start-color))",
        backgroundSize: "400% 100%",
        animation: "bg-position var(--duration, 5s) ease-in-out infinite",
      },
      none: {
        animation: "none",
      },
    },
  },

  defaultVariants: {
    variant: "pulse",
    loaded: false,
  },
})
