import sizes from "../foundations/sizes"
import { ComponentTheme, mode, Props } from "./utils"
import { stringToColor, isDark } from "@chakra-ui/color"
import { SystemProps } from "@chakra-ui/system"

function getSize(size: string) {
  const inferredSize = sizes[size as keyof typeof sizes]

  const styles: SystemProps = {
    width: size,
    height: size,
    fontSize: `calc(${inferredSize ?? size} / 2.5)`,
  }
  if (size !== "100%") {
    styles["lineHeight"] = inferredSize ?? size
  }

  return {
    Root: styles,
    ExcessLabel: styles,
  }
}

function getRootStyle(props: Props & { name?: string }) {
  const bg = props.name ? stringToColor(props.name) : "gray.400"

  const color = props.name
    ? isDark(bg)(props.theme)
      ? "white"
      : "gray.800"
    : "white"

  const borderColor = mode("white", "gray.800")(props)

  return {
    bg,
    color,
    borderColor,
  }
}

const Avatar: ComponentTheme<{ name?: string }> = {
  defaultProps: {
    size: "md",
  },
  baseStyle: props => ({
    Root: {
      verticalAlign: "top",
      ...getRootStyle(props),
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

export const AvatarTokens = {
  sizes: {
    "2xs": "2xs",
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
    full: "full",
  },
}

export default Avatar
