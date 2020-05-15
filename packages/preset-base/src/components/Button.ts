import { opacity } from "@chakra-ui/color"
import { Props, mode, ComponentTheme } from "./utils"

const grayGhostStyle = (props: Props) => ({
  color: mode(`inherit`, `whiteAlpha.900`)(props),
  _hover: {
    bg: mode(`gray.100`, `whiteAlpha.200`)(props),
  },
  _active: {
    bg: mode(`gray.200`, `whiteAlpha.300`)(props),
  },
})

function getGhostStyle(props: Props) {
  const { colorScheme: c, theme: t } = props
  if (c === "gray") return grayGhostStyle(props)

  const darkHover = opacity(`${c}.200`, 0.12)(t)
  const darkActive = opacity(`${c}.200`, 0.24)(t)

  return {
    color: mode(`${c}.500`, `${c}.200`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(`${c}.50`, darkHover)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActive)(props),
    },
  }
}

function getOutlineStyle(props: Props) {
  const { colorScheme: c } = props
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props)

  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor",
    ...getGhostStyle(props),
  }
}

const graySolidStyle = (props: Props) => ({
  bg: mode(`gray.100`, `whiteAlpha.200`)(props),
  _hover: {
    bg: mode(`gray.200`, `whiteAlpha.300`)(props),
  },
  _active: {
    bg: mode(`gray.300`, `whiteAlpha.400`)(props),
  },
})

function getSolidStyle(props: Props) {
  const { colorScheme: c } = props

  if (c === "gray") return graySolidStyle(props)

  return {
    bg: mode(`${c}.500`, `${c}.200`)(props),
    color: mode(`white`, `gray.800`)(props),
    _hover: { bg: mode(`${c}.600`, `${c}.300`)(props) },
    _active: { bg: mode(`${c}.700`, `${c}.400`)(props) },
  }
}

function getLinkStyle(props: Props) {
  const { colorScheme: c } = props
  return {
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
  }
}

const sizes = {
  lg: {
    height: 12,
    minWidth: 12,
    fontSize: "lg",
    paddingX: 6,
  },
  md: {
    height: 10,
    minWidth: 10,
    fontSize: "md",
    paddingX: 4,
  },
  sm: {
    height: 8,
    minWidth: 8,
    fontSize: "sm",
    paddingX: 3,
  },
  xs: {
    height: 6,
    minWidth: 6,
    fontSize: "xs",
    paddingX: 2,
  },
}

////////////////////////////////////////////////////////////

const unstyled = {
  bg: "none",
  border: 0,
  color: "inherit",
  display: "inline",
  font: "inherit",
  lineHeight: "inherit",
  margin: 0,
  padding: 0,
}

////////////////////////////////////////////////////////////
const Button: ComponentTheme = {
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
  baseStyle: {
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
  sizes,
  variants: {
    unstyled,
    solid: getSolidStyle,
    ghost: getGhostStyle,
    link: getLinkStyle,
    outline: getOutlineStyle,
  },
}

export const ButtonTokens = {
  sizes: {
    lg: "lg",
    sm: "sm",
    md: "md",
    xs: "xs",
  },
  variants: {
    solid: "solid",
    subtle: "subtle",
    outline: "outline",
  },
}

export default Button
