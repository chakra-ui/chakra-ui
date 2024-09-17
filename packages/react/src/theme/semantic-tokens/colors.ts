import { defineSemanticTokens } from "../../styled-system"

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    DEFAULT: {
      value: { _light: "{colors.white}", _dark: "{colors.black}" },
    },
    muted: {
      value: { _light: "{colors.gray.50}", _dark: "{colors.gray.950}" },
    },
    subtle: {
      value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
    },
    emphasized: {
      value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
    },
    inverted: {
      value: { _light: "{colors.black}", _dark: "{colors.white}" },
    },
    panel: {
      value: { _light: "{colors.white}", _dark: "{colors.gray.950}" },
    },
    error: {
      value: { _light: "{colors.red.50}", _dark: "{colors.red.950}" },
    },
    warning: {
      value: { _light: "{colors.orange.50}", _dark: "{colors.orange.950}" },
    },
    success: {
      value: { _light: "{colors.green.50}", _dark: "{colors.green.950}" },
    },
    info: {
      value: { _light: "{colors.blue.50}", _dark: "{colors.blue.950}" },
    },
  },
  fg: {
    DEFAULT: {
      value: { _light: "{colors.black}", _dark: "{colors.gray.50}" },
    },
    subtle: {
      value: { _light: "{colors.gray.600}", _dark: "{colors.gray.400}" },
    },
    muted: {
      value: { _light: "{colors.gray.400}", _dark: "{colors.gray.500}" },
    },
    inverted: {
      value: { _light: "{colors.gray.50}", _dark: "{colors.black}" },
    },
    error: {
      value: { _light: "{colors.red.500}", _dark: "{colors.red.400}" },
    },
    warning: {
      value: { _light: "{colors.orange.600}", _dark: "{colors.orange.300}" },
    },
    success: {
      value: { _light: "{colors.green.600}", _dark: "{colors.green.300}" },
    },
    info: {
      value: { _light: "{colors.blue.600}", _dark: "{colors.blue.300}" },
    },
  },
  border: {
    DEFAULT: {
      value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
    },
    subtle: {
      value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
    },
    muted: {
      value: { _light: "{colors.gray.50}", _dark: "{colors.gray.950}" },
    },
    emphasized: {
      value: { _light: "{colors.gray.300}", _dark: "{colors.gray.700}" },
    },
    inverted: {
      value: { _light: "{colors.gray.800}", _dark: "{colors.gray.200}" },
    },
    error: {
      value: { _light: "{colors.red.500}", _dark: "{colors.red.400}" },
    },
    warning: {
      value: { _light: "{colors.orange.500}", _dark: "{colors.orange.400}" },
    },
    success: {
      value: { _light: "{colors.green.500}", _dark: "{colors.green.400}" },
    },
    info: {
      value: { _light: "{colors.blue.500}", _dark: "{colors.blue.400}" },
    },
  },
  focusRing: {
    value: { _light: "{colors.blue.600/50}", _dark: "{colors.blue.500/50}" },
  },

  accent: {
    contrast: {
      value: { _light: "{colors.white}", _dark: "{colors.black}" },
    },
    fg: {
      value: { _light: "{colors.gray.800}", _dark: "{colors.gray.200}" },
    },
    muted: {
      value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
    },
    subtle: {
      value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
    },
    emphasized: {
      value: { _light: "{colors.gray.300}", _dark: "{colors.gray.700}" },
    },
    solid: {
      value: { _light: "{colors.gray.900}", _dark: "{colors.white}" },
    },
  },

  gray: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.gray.900}", _dark: "{colors.gray.200}" },
    },
    muted: {
      value: { _light: "{colors.gray.50}", _dark: "{colors.gray.950}" },
    },
    subtle: {
      value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
    },
    emphasized: {
      value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
    },
    solid: {
      value: { _light: "{colors.gray.900}", _dark: "{colors.gray.200}" },
    },
  },

  red: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.red.700}", _dark: "{colors.red.300}" },
    },
    muted: {
      value: { _light: "{colors.red.50}", _dark: "{colors.red.950}" },
    },
    subtle: {
      value: { _light: "{colors.red.100}", _dark: "{colors.red.900}" },
    },
    emphasized: {
      value: { _light: "{colors.red.200}", _dark: "{colors.red.800}" },
    },
    solid: {
      value: { _light: "{colors.red.600}", _dark: "{colors.red.600}" },
    },
  },

  orange: {
    contrast: {
      value: { _light: "white", _dark: "black" },
    },
    fg: {
      value: { _light: "{colors.orange.700}", _dark: "{colors.orange.300}" },
    },
    muted: {
      value: { _light: "{colors.orange.50}", _dark: "{colors.orange.950}" },
    },
    subtle: {
      value: { _light: "{colors.orange.100}", _dark: "{colors.orange.900}" },
    },
    emphasized: {
      value: { _light: "{colors.orange.200}", _dark: "{colors.orange.800}" },
    },
    solid: {
      value: { _light: "{colors.orange.600}", _dark: "{colors.orange.500}" },
    },
  },

  green: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.green.700}", _dark: "{colors.green.300}" },
    },
    muted: {
      value: { _light: "{colors.green.50}", _dark: "{colors.green.950}" },
    },
    subtle: {
      value: { _light: "{colors.green.100}", _dark: "{colors.green.900}" },
    },
    emphasized: {
      value: { _light: "{colors.green.200}", _dark: "{colors.green.800}" },
    },
    solid: {
      value: { _light: "{colors.green.600}", _dark: "{colors.green.600}" },
    },
  },

  blue: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.blue.700}", _dark: "{colors.blue.300}" },
    },
    muted: {
      value: { _light: "{colors.blue.50}", _dark: "{colors.blue.950}" },
    },
    subtle: {
      value: { _light: "{colors.blue.100}", _dark: "{colors.blue.900}" },
    },
    emphasized: {
      value: { _light: "{colors.blue.200}", _dark: "{colors.blue.800}" },
    },
    solid: {
      value: { _light: "{colors.blue.600}", _dark: "{colors.blue.600}" },
    },
  },

  yellow: {
    contrast: {
      value: { _light: "black", _dark: "black" },
    },
    fg: {
      value: { _light: "{colors.yellow.700}", _dark: "{colors.yellow.300}" },
    },
    muted: {
      value: { _light: "{colors.yellow.50}", _dark: "{colors.yellow.950}" },
    },
    subtle: {
      value: { _light: "{colors.yellow.100}", _dark: "{colors.yellow.900}" },
    },
    emphasized: {
      value: { _light: "{colors.yellow.200}", _dark: "{colors.yellow.800}" },
    },
    solid: {
      value: { _light: "{colors.yellow.300}", _dark: "{colors.yellow.300}" },
    },
  },

  teal: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.teal.700}", _dark: "{colors.teal.300}" },
    },
    muted: {
      value: { _light: "{colors.teal.50}", _dark: "{colors.teal.950}" },
    },
    subtle: {
      value: { _light: "{colors.teal.100}", _dark: "{colors.teal.900}" },
    },
    emphasized: {
      value: { _light: "{colors.teal.200}", _dark: "{colors.teal.800}" },
    },
    solid: {
      value: { _light: "{colors.teal.600}", _dark: "{colors.teal.600}" },
    },
  },

  purple: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.purple.700}", _dark: "{colors.purple.300}" },
    },
    muted: {
      value: { _light: "{colors.purple.50}", _dark: "{colors.purple.950}" },
    },
    subtle: {
      value: { _light: "{colors.purple.100}", _dark: "{colors.purple.900}" },
    },
    emphasized: {
      value: { _light: "{colors.purple.200}", _dark: "{colors.purple.800}" },
    },
    solid: {
      value: { _light: "{colors.purple.600}", _dark: "{colors.purple.600}" },
    },
  },

  pink: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.pink.700}", _dark: "{colors.pink.300}" },
    },
    muted: {
      value: { _light: "{colors.pink.50}", _dark: "{colors.pink.950}" },
    },
    subtle: {
      value: { _light: "{colors.pink.100}", _dark: "{colors.pink.900}" },
    },
    emphasized: {
      value: { _light: "{colors.pink.200}", _dark: "{colors.pink.800}" },
    },
    solid: {
      value: { _light: "{colors.pink.600}", _dark: "{colors.pink.600}" },
    },
  },

  cyan: {
    contrast: {
      value: { _light: "white", _dark: "white" },
    },
    fg: {
      value: { _light: "{colors.cyan.700}", _dark: "{colors.cyan.300}" },
    },
    muted: {
      value: { _light: "{colors.cyan.50}", _dark: "{colors.cyan.950}" },
    },
    subtle: {
      value: { _light: "{colors.cyan.100}", _dark: "{colors.cyan.900}" },
    },
    emphasized: {
      value: { _light: "{colors.cyan.200}", _dark: "{colors.cyan.800}" },
    },
    solid: {
      value: { _light: "{colors.cyan.600}", _dark: "{colors.cyan.600}" },
    },
  },
})
