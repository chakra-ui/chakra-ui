import { getColor, mode, transparentize } from "@chakra-ui/theme-tools"

function getBg(props: Record<string, any>) {
  const { theme, colorScheme: c } = props
  const lightBg = getColor(theme, `${c}.100`, c)
  const darkBg = transparentize(`${c}.200`, 0.16)(theme)
  return mode(lightBg, darkBg)(props)
}

const parts = {
  container: "the alert container",
  title: "the alert title",
  icon: "the alert icon",
}

const baseStyleContainer = {
  px: 4,
  py: 3,
}

const baseStyleTitle = {
  fontWeight: "bold",
  lineHeight: "normal",
}

const baseStyleIcon = {
  mr: 3,
  w: 5,
  h: 5,
}

const baseStyle = {
  container: baseStyleContainer,
  title: baseStyleTitle,
  icon: baseStyleIcon,
}

const defaultProps = {
  variant: "subtle",
}

const variantSubtle = function (props: Record<string, any>) {
  const { colorScheme: c } = props
  return {
    container: { bg: getBg(props) },
    icon: { color: mode(`${c}.500`, `${c}.200`)(props) },
  }
}

const variantLeftAccent = function (props: Record<string, any>) {
  const { colorScheme: c } = props
  return {
    container: {
      pl: 3,
      borderLeft: "4px solid",
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      bg: getBg(props),
    },
    icon: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

const variantTopAccent = function (props: Record<string, any>) {
  const { colorScheme: c } = props
  return {
    container: {
      pt: 2,
      borderTop: "4px solid",
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      bg: getBg(props),
    },
    icon: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

const variantSolid = function (props: Record<string, any>) {
  const { colorScheme: c } = props
  return {
    container: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      color: mode(`white`, `gray.900`)(props),
    },
  }
}

const variants = {
  subtle: variantSubtle,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid,
}

export default {
  parts,
  baseStyle,
  variants,
  defaultProps,
}
