import { Theme } from "../foundations"
import { SystemProps, ThemingProps } from "@chakra-ui/system"

export type StyleProps = SystemProps | { [Component: string]: SystemProps }

export type ComponentStyle<P = {}> =
  | StyleProps
  | ((props: Props & P) => StyleProps)

export interface ComponentTheme<P = {}> {
  defaultProps?: {
    variant?: string
    colorScheme?: string
    size?: string
  }
  baseStyle?: ComponentStyle<P & ThemingProps>
  variants?: {
    [Variant: string]: ComponentStyle<P> | string
  }
  sizes?: {
    [Size: string]: ComponentStyle<P> | string
  }
}

export interface Props {
  colorScheme: string
  orientation: "horizontal" | "vertical"
  colorMode: "light" | "dark"
  theme: Theme
}

export function mode<T = string>(light: T, dark: T) {
  return (props: Props) => (props.colorMode === "light" ? light : dark)
}

export function orientation<T = string>(horizontal: T, vertical: T) {
  return (props: Props) =>
    props.orientation === "horizontal" ? horizontal : vertical
}

export function getOrientationStyle<T>(options: {
  orientation?: "vertical" | "horizontal"
  vertical: T
  horizontal: T
}) {
  const { orientation, vertical, horizontal } = options
  if (!orientation) return {}
  return orientation === "vertical" ? vertical : horizontal
}
