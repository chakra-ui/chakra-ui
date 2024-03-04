import { defineSemanticTokens } from "../../styled-system"

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: {},
    canvas: {},
    subtle: {},
    muted: {},
    emphasis: {},
    disabled: {},
    accent: {},
    error: {},
    warning: {},
    success: {},
    info: {},
  },
  fg: {
    DEFAULT: {},
    muted: {},
    subtle: {},
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
