import {
  BaseStyle,
  DefaultProps,
  getColor,
  ink,
  mode,
  Variants,
} from "@chakra-ui/theme-tools"

const register = {
  parts: ["container", "title", "icon"],
  variants: ["subtle", "left-accent", "top-accent", "solid"],
} as const

const baseStyle: BaseStyle<typeof register> = {
  container: {
    paddingX: 4,
    paddingY: 3,
  },
  title: {
    fontWeight: "bold",
    lineHeight: "normal",
  },
  icon: {
    marginRight: 3,
    width: 5,
    height: 5,
  },
}

function getBg(props: any) {
  const { theme: t, colorScheme: c } = props
  const lightBg = getColor(t, `${c}.100`, c)
  const darkBg = ink(`${c}.200`, "lowest")(t)
  return mode(lightBg, darkBg)(props)
}

const variants: Variants<typeof register> = {
  subtle: function (props) {
    const { colorScheme: c } = props
    return {
      container: { bg: getBg(props) },
      icon: { color: mode(`${c}.500`, `${c}.200`)(props) },
    }
  },

  "left-accent": function (props) {
    const { colorScheme: c } = props
    return {
      container: {
        paddingLeft: 3,
        borderLeft: "4px solid",
        borderColor: mode(`${c}.500`, `${c}.200`)(props),
        bg: getBg(props),
      },
      icon: {
        color: mode(`${c}.500`, `${c}.200`)(props),
      },
    }
  },

  "top-accent": function (props) {
    const { colorScheme: c } = props
    return {
      container: {
        paddingTop: 2,
        borderTop: "4px solid",
        borderColor: mode(`${c}.500`, `${c}.200`)(props),
        bg: getBg(props),
      },
      icon: {
        color: mode(`${c}.500`, `${c}.200`)(props),
      },
    }
  },

  solid: function (props) {
    const { colorScheme: c } = props
    return {
      container: {
        bg: mode(`${c}.500`, `${c}.200`)(props),
        color: mode(`white`, `gray.900`)(props),
      },
    }
  },
}

const defaultProps: DefaultProps<typeof register> = {
  variant: "subtle",
}

const Alert = {
  register,
  defaultProps,
  baseStyle,
  variants,
}

export default Alert
