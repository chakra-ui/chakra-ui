import { alertAnatomy as parts } from "@chakra-ui/anatomy"
import { getColor, transparentize } from "@chakra-ui/theme-tools"
import type {
  PartsStyleObject,
  PartsStyleFunction,
  StyleFunctionProps,
} from "@chakra-ui/theme-tools"

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {
    px: 4,
    py: 3,
  },
  title: {
    fontWeight: "bold",
    lineHeight: 6,
    marginEnd: 2,
  },
  description: {
    lineHeight: 6,
  },
  icon: {
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 6,
  },
}

function getBg(props: StyleFunctionProps, mode: "dark" | "light"): string {
  const { theme, colorScheme: c } = props
  if (mode === "dark") {
    return transparentize(`${c}.200`, 0.16)(theme)
  }
  return getColor(theme, `${c}.100`, c)
}

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: {
      _light: {
        bg: getBg(props, "light"),
      },
      _dark: {
        bg: getBg(props, "dark"),
      },
    },
    icon: {
      _light: {
        color: `${c}.500`,
      },

      _dark: {
        color: `${c}.200`,
      },
    },
  }
}

const variantLeftAccent: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: {
      paddingStart: 3,
      borderStartWidth: "4px",

      _light: {
        bg: getBg(props, "light"),
        borderStartColor: `${c}.500`,
      },

      _dark: {
        bg: getBg(props, "dark"),
        borderStartColor: `${c}.200`,
      },
    },
    icon: {
      _light: {
        color: `${c}.500`,
      },

      _dark: {
        color: `${c}.200`,
      },
    },
  }
}

const variantTopAccent: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: {
      pt: 2,
      borderTopWidth: "4px",

      _light: {
        bg: getBg(props, "light"),
        borderTopColor: `${c}.500`,
      },

      _dark: {
        bg: getBg(props, "dark"),
        borderTopColor: `${c}.200`,
      },
    },
    icon: {
      _light: {
        color: `${c}.500`,
      },

      _dark: {
        color: `${c}.200`,
      },
    },
  }
}

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: {
      _light: {
        bg: `${c}.500`,
        color: `white`,
      },
      _dark: {
        bg: `${c}.200`,
        color: `gray.900`,
      },
    },
  }
}

const variants = {
  subtle: variantSubtle,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid,
}

const defaultProps = {
  variant: "subtle",
  colorScheme: "blue",
}

export default {
  parts: parts.keys,
  baseStyle,
  variants,
  defaultProps,
}
