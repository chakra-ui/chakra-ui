import { defineSemanticTokens } from "../../styled-system"

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: {
      value: { base: "{colors.white}", _dark: "{colors.gray.900}" },
    },
    subtle: {
      value: { base: "{colors.gray.50}", _dark: "{colors.gray.800}" },
    },
    muted: {
      value: { base: "{colors.gray.100}", _dark: "{colors.gray.700}" },
    },
    accent: {
      value: { base: "{colors.teal.50}", _dark: "{colors.teal.800}" },
    },
    error: {
      value: { base: "{colors.red.50}", _dark: "{colors.red.800}" },
    },
    warning: {
      value: { base: "{colors.orange.50}", _dark: "{colors.orange.800}" },
    },
    success: {
      value: { base: "{colors.green.50}", _dark: "{colors.green.800}" },
    },
    info: {
      value: { base: "{colors.blue.50}", _dark: "{colors.blue.800}" },
    },
  },
  fg: {
    DEFAULT: {
      value: { base: "{colors.gray.800}", _dark: "white" },
    },
    muted: {
      value: { base: "{colors.gray.700}", _dark: "{colors.whiteAlpha.800}" },
    },
    subtle: {
      value: { base: "{colors.gray.500}", _dark: "{colors.whiteAlpha.600}" },
    },
    accent: {
      value: { base: "{colors.teal.600}", _dark: "{colors.teal.300}" },
    },
    error: {
      value: { base: "{colors.red.600}", _dark: "{colors.red.300}" },
    },
    warning: {
      value: { base: "{colors.orange.600}", _dark: "{colors.orange.300}" },
    },
    success: {
      value: { base: "{colors.green.600}", _dark: "{colors.green.300}" },
    },
    info: {
      value: { base: "{colors.blue.600}", _dark: "{colors.blue.300}" },
    },
  },
  border: {
    DEFAULT: {
      value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
    },
    muted: {
      value: { base: "{colors.gray.300}", _dark: "{colors.gray.500}" },
    },
    subtle: {
      value: { base: "{colors.gray.200}", _dark: "{colors.gray.600}" },
    },
    accent: {
      value: { base: "{colors.teal.200}", _dark: "{colors.teal.600}" },
    },
    disabled: {
      value: { base: "{colors.gray.200}", _dark: "{colors.gray.600}" },
    },
    error: {
      value: { base: "{colors.red.200}", _dark: "{colors.red.600}" },
    },
    warning: {
      value: { base: "{colors.orange.200}", _dark: "{colors.orange.600}" },
    },
    success: {
      value: { base: "{colors.green.200}", _dark: "{colors.green.600}" },
    },
    info: {
      value: { base: "{colors.blue.200}", _dark: "{colors.blue.600}" },
    },
  },
})
