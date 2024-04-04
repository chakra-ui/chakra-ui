import { defineRecipe } from "../../styled-system"

export const skeletonRecipe = defineRecipe({
  base: {},
  variants: {
    isLoaded: {
      true: {
        animation: "fade-in var(--fade-duration, 0.3s) ease-out !important",
      },
      false: {
        background: "bg.muted",
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
        animation: "pulse var(--duration, 2s) infinite",
      },
      shine: {
        "--animate-from": "200%",
        "--animate-to": "-200%",
        backgroundImage:
          "linear-gradient(90deg, {colors.blackAlpha.300}, {colors.blackAlpha.50}, {colors.blackAlpha.300})",
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
    isLoaded: false,
  },
})
