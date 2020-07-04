import {
  Props,
  mode,
  ComponentTheme,
  transparentize,
} from "@chakra-ui/theme-tools"

/**
 * Parts:
 * - Container
 * - Icon
 * - Spinner
 */

const grayGhost = (props: Props) => ({
  Container: {
    color: mode(`inherit`, `whiteAlpha.900`)(props),
    _hover: {
      bg: mode(`gray.100`, `whiteAlpha.200`)(props),
    },
    _active: {
      bg: mode(`gray.200`, `whiteAlpha.300`)(props),
    },
  },
})

function ghost(props: Props) {
  const { colorScheme: c, theme } = props
  if (c === "gray") return grayGhost(props)

  const darkHover = transparentize(`${c}.200`, 0.12)(theme)
  const darkActive = transparentize(`${c}.200`, 0.24)(theme)

  return {
    Container: {
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
    Container: {
      border: "1px solid",
      borderColor: c === "gray" ? borderColor : "currentColor",
      ...ghost(props).Container,
    },
  }
}

function graySolid(props: Props) {
  return {
    Container: {
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
    Container: {
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
    Container: {
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

const sizes = {
  lg: {
    Container: {
      height: 12,
      minWidth: 12,
      fontSize: "lg",
      paddingX: 6,
    },
  },
  md: {
    Container: {
      height: 10,
      minWidth: 10,
      fontSize: "md",
      paddingX: 4,
    },
  },
  sm: {
    Container: {
      height: 8,
      minWidth: 8,
      fontSize: "sm",
      paddingX: 3,
    },
  },
  xs: {
    Container: {
      height: 6,
      minWidth: 6,
      fontSize: "xs",
      paddingX: 2,
    },
  },
}

const unstyled = {
  Container: {
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

const Button: ComponentTheme = {
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
  baseStyle: {
    Spinner: {
      fontSize: "1em",
      lineHeight: "normal",
    },
    Container: {
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
  },
  sizes,
  variants: {
    unstyled,
    solid,
    ghost,
    link,
    outline,
  },
}

export const ButtonSizes = {
  lg: "lg",
  sm: "sm",
  md: "md",
  xs: "xs",
}

export const ButtonVariants = {
  solid: "solid",
  subtle: "subtle",
  outline: "outline",
}

export default Button
