import { defineRecipe } from "../../styled-system"

export const closeButtonRecipe = defineRecipe({
  base: {
    outline: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "var(--size)",
    height: "var(--size)",
    borderRadius: "md",
    transitionProperty: "common",
    transitionDuration: "normal",
    boxShadow: { _disabled: "none", _focusVisible: "outline" },
    opacity: { _disabled: 0.4 },
    cursor: { _disabled: "not-allowed" },
    bg: "var(--bg)",
    _hover: {
      "--bg": { base: "colors.blackAlpha.100", _dark: "colors.whiteAlpha.100" },
    },
    _active: {
      "--bg": { base: "colors.blackAlpha.200", _dark: "colors.whiteAlpha.200" },
    },
  },
  variants: {
    size: {
      lg: {
        "--size": "sizes.10",
        fontSize: "md",
      },
      md: {
        "--size": "sizes.8",
        fontSize: "xs",
      },
      sm: {
        "--size": "sizes.6",
        fontSize: "2xs",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
