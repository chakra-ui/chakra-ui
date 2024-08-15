import { defineSemanticTokens } from "../../styled-system"

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: {
      value: { base: "{colors.white}", _dark: "{colors.black}" },
    },
    muted: {
      value: { base: "{colors.gray.100}", _dark: "{colors.gray.900}" },
    },
    emphasized: {
      value: { base: "{colors.gray.200}", _dark: "{colors.gray.800}" },
    },
    inverted: {
      value: { base: "{colors.black}", _dark: "{colors.white}" },
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
      value: { base: "{colors.black}", _dark: "{colors.gray.50}" },
    },
    muted: {
      value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
    },
    disabled: {
      value: { base: "{colors.gray.400}", _dark: "{colors.whiteAlpha.500}" },
    },
    inverted: {
      value: { base: "{colors.gray.50}", _dark: "{colors.black}" },
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
      value: { base: "{colors.gray.200}", _dark: "{colors.gray.800}" },
    },
    muted: {
      value: { base: "{colors.gray.100}", _dark: "{colors.gray.900}" },
    },
    emphasized: {
      value: { base: "{colors.gray.300}", _dark: "{colors.gray.700}" },
    },
    disabled: {
      value: { base: "{colors.gray.50}", _dark: "{colors.gray.950}" },
    },
    inverted: {
      value: { base: "{colors.gray.700}", _dark: "{colors.gray.200}" },
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
  focusRing: {
    value: { base: "{colors.blue.600}", _dark: "{colors.blue.500}" },
  },
})
