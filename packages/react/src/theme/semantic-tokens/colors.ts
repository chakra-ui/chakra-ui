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
      value: { base: "{colors.gray.100}", _dark: "{colors.gray.800}" },
    },
    emphasized: {
      value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
    },
    inverted: {
      value: { base: "{colors.gray.900}", _dark: "white" },
    },
    panel: {
      value: { base: "{colors.white}", _dark: "{colors.gray.900}" },
    },
    error: {
      value: { base: "{colors.red.50}", _dark: "{colors.red.950}" },
    },
    warning: {
      value: { base: "{colors.orange.50}", _dark: "{colors.orange.950}" },
    },
    success: {
      value: { base: "{colors.green.50}", _dark: "{colors.green.950}" },
    },
    info: {
      value: { base: "{colors.blue.50}", _dark: "{colors.blue.950}" },
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
    disabled: {
      value: { base: "{colors.gray.400}", _dark: "{colors.whiteAlpha.500}" },
    },
    inverted: {
      value: { base: "white", _dark: "{colors.gray.800}" },
    },
    error: {
      value: { base: "{colors.red.700}", _dark: "{colors.red.400}" },
    },
    warning: {
      value: { base: "{colors.orange.700}", _dark: "{colors.orange.400}" },
    },
    success: {
      value: { base: "{colors.green.700}", _dark: "{colors.green.400}" },
    },
    info: {
      value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
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
    emphasized: {
      value: { base: "{colors.gray.400}", _dark: "{colors.gray.500}" },
    },
    disabled: {
      value: { base: "{colors.gray.200}", _dark: "{colors.gray.600}" },
    },
    error: {
      value: { base: "{colors.red.500}", _dark: "{colors.red.400}" },
    },
    warning: {
      value: { base: "{colors.orange.500}", _dark: "{colors.orange.400}" },
    },
    success: {
      value: { base: "{colors.green.500}", _dark: "{colors.green.400}" },
    },
    info: {
      value: { base: "{colors.blue.500}", _dark: "{colors.blue.400}" },
    },
  },
})
