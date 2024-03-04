import { defineSemanticTokens } from "../../styled-system"

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: { value: { base: "{colors.white}", _dark: "{colors.gray.800}" } },
    subtle: { value: { base: "{colors.gray.50}", _dark: "{colors.gray.700}" } },
    muted: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.600}" } },
    disabled: {},
    accent: {},
    error: {},
    warning: {},
    success: {},
    info: {},
  },
  fg: {
    DEFAULT: { value: { base: "{colors.gray.800}", _dark: "white" } },
    subtle: {
      value: { base: "{colors.gray.700}", _dark: "{colors.whiteAlpha.800}" },
    },
    muted: {
      value: { base: "{colors.gray.600}", _dark: "{colors.whiteAlpha.700}" },
    },
    disabled: {},
    accent: {},
    error: {},
    warning: {},
    success: {},
    info: {},
  },
  accent: {
    DEFAULT: {},
    emphasis: {},
  },
  border: {
    DEFAULT: {},
    muted: {},
    subtle: {},
    accent: {},
    disabled: {},
    outline: {},
    error: {},
    warning: {},
    success: {},
    info: {},
  },
})
