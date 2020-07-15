import {
  BaseStyle,
  DefaultProps,
  mode,
  Props,
  Sizes,
  transparentize,
} from "@chakra-ui/theme-tools"

const register = {
  parts: ["container", "icon", "spinner"],
  sizes: ["sm", "md", "lg", "xs"],
  variants: ["solid", "outline", "ghost", "unstyled"],
} as const

const baseStyle: BaseStyle<typeof register> = {
  spinner: {
    fontSize: "1em",
    lineHeight: "normal",
  },
  container: {
    lineHeight: "1.2",
    borderRadius: "md",
    fontWeight: "semibold",
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none",
    },
  },
}

/**
 * Variants Style
 */

function grayGhost(props: Props) {
  return {
    container: {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      },
      _active: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
      },
    },
  }
}

function ghost(props: Props) {
  const { colorScheme: c, theme } = props
  if (c === "gray") return grayGhost(props)

  const darkHover = transparentize(`${c}.200`, 0.12)(theme)
  const darkActive = transparentize(`${c}.200`, 0.24)(theme)

  return {
    container: {
      color: mode(`${c}.500`, `${c}.200`)(props),
      bg: "transparent",
      _hover: {
        bg: mode(`${c}.50`, darkHover)(props),
      },
      _active: {
        bg: mode(`${c}.100`, darkActive)(props),
      },
    },
  }
}

function outline(props: Props) {
  const { colorScheme: c } = props
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props)

  return {
    container: {
      border: "1px solid",
      borderColor: c === "gray" ? borderColor : "currentColor",
      ...ghost(props).container,
    },
  }
}

function graySolid(props: Props) {
  return {
    container: {
      bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
      },
      _active: {
        bg: mode(`gray.300`, `whiteAlpha.400`)(props),
      },
    },
  }
}

function solid(props: Props) {
  const { colorScheme: c } = props

  if (c === "gray") return graySolid(props)

  return {
    container: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      color: mode(`white`, `gray.800`)(props),
      _hover: { bg: mode(`${c}.600`, `${c}.300`)(props) },
      _active: { bg: mode(`${c}.700`, `${c}.400`)(props) },
    },
  }
}

function link(props: Props) {
  const { colorScheme: c } = props
  return {
    container: {
      padding: 0,
      height: "auto",
      lineHeight: "normal",
      color: mode(`${c}.500`, `${c}.200`)(props),
      _hover: {
        textDecoration: "underline",
      },
      _active: {
        color: mode(`${c}.700`, `${c}.500`)(props),
      },
    },
  }
}

const unstyled = {
  container: {
    bg: "none",
    border: 0,
    color: "inherit",
    display: "inline",
    font: "inherit",
    lineHeight: "inherit",
    margin: 0,
    padding: 0,
  },
}

const sizes: Sizes<typeof register> = {
  lg: {
    container: {
      height: 12,
      minWidth: 12,
      fontSize: "lg",
      paddingX: 6,
    },
  },
  md: {
    container: {
      height: 10,
      minWidth: 10,
      fontSize: "md",
      paddingX: 4,
    },
  },
  sm: {
    container: {
      height: 8,
      minWidth: 8,
      fontSize: "sm",
      paddingX: 3,
    },
  },
  xs: {
    container: {
      height: 6,
      minWidth: 6,
      fontSize: "xs",
      paddingX: 2,
    },
  },
}

const defaultProps: DefaultProps<typeof register> = {
  variant: "solid",
  size: "md",
  colorScheme: "gray",
}

const Button = {
  register,
  defaultProps,
  baseStyle,
  sizes,
  variants: {
    unstyled,
    solid,
    ghost,
    link,
    outline,
  },
}

export default Button
