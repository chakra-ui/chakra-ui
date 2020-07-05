import sizes from "../foundations/sizes"
import {
  randomColor,
  isDark,
  ComponentTheme,
  mode,
  Props,
} from "@chakra-ui/theme-tools"
import { SystemProps } from "@chakra-ui/system"

function getSize(size: string) {
  const themeSize = sizes[size as keyof typeof sizes]

  const styles: SystemProps = {
    width: size,
    height: size,
    fontSize: `calc(${themeSize ?? size} / 2.5)`,
  }

  if (size !== "100%") {
    styles.lineHeight = themeSize ?? size
  }

  return {
    Container: styles,
    ExcessLabel: styles,
  }
}

function getContainerStyle(props: Props & { name?: string }) {
  const { name, theme: t } = props

  const bg = name ? randomColor({ string: name }) : "gray.400"
  const isBgDark = isDark(bg)(t)

  const color = name ? (isBgDark ? "white" : "gray.800") : "white"
  const borderColor = mode("white", "gray.800")(props)

  return {
    bg,
    color,
    borderColor,
  }
}

type AvatarProps = { name?: string }

const Avatar: ComponentTheme<AvatarProps> = {
  defaultProps: {
    size: "md",
  },
  baseStyle: (props) => ({
    Container: {
      verticalAlign: "top",
      ...getContainerStyle(props),
    },
    Badge: {
      transform: "translate(25%, 25%)",
      borderRadius: "full",
      border: "0.2em solid",
      borderColor: mode("white", "gray.800")(props),
    },
    ExcessLabel: {
      bg: mode("gray.200", "whiteAlpha.400")(props),
    },
  }),
  sizes: {
    "2xs": getSize("4"),
    xs: getSize("6"),
    sm: getSize("8"),
    md: getSize("12"),
    lg: getSize("16"),
    xl: getSize("24"),
    "2xl": getSize("32"),
    full: getSize("100%"),
  },
}

export const AvatarSizes = {
  "2xs": "2xs",
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  full: "full",
}

export default Avatar
