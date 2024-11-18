import { defineRecipe } from "../../styled-system"

export const colorSwatchRecipe = defineRecipe({
  className: "color-swatch",
  base: {
    boxSize: "var(--swatch-size)",
    shadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
    "--checker-size": "8px",
    "--checker-bg": "colors.bg",
    "--checker-fg": "colors.bg.emphasized",
    background:
      "linear-gradient(var(--color), var(--color)), repeating-conic-gradient(var(--checker-fg) 0%, var(--checker-fg) 25%, var(--checker-bg) 0%, var(--checker-bg) 50%) 0% 50% / var(--checker-size) var(--checker-size) !important",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
  },

  variants: {
    size: {
      "2xs": { "--swatch-size": "sizes.3.5" },
      xs: { "--swatch-size": "sizes.4" },
      sm: { "--swatch-size": "sizes.4.5" },
      md: { "--swatch-size": "sizes.5" },
      lg: { "--swatch-size": "sizes.6" },
      xl: { "--swatch-size": "sizes.7" },
      "2xl": { "--swatch-size": "sizes.8" },
      inherit: { "--swatch-size": "inherit" },
      full: { "--swatch-size": "100%" },
    },

    shape: {
      square: { borderRadius: "none" },
      circle: { borderRadius: "full" },
      rounded: { borderRadius: "l1" },
    },
  },

  defaultVariants: {
    size: "md",
    shape: "rounded",
  },
})
