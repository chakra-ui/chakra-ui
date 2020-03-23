import { Theme } from "../foundations"
import { getColor } from "@chakra-ui/color"
import { SystemProps, ThemingProps } from "@chakra-ui/styled"

export type StyleProps = SystemProps | { [Component: string]: SystemProps }

export type ComponentStyle<P = {}> =
  | StyleProps
  | ((props: Props & P) => StyleProps)

export interface ComponentTheme<P = {}> {
  baseStyle?: ComponentStyle<P & ThemingProps>
  variant?: { __default?: string } & {
    [Variant: string]: ComponentStyle<P> | string
  }
  variantSize?: { __default?: string } & {
    [Size: string]: ComponentStyle<P> | string
  }
}

export interface Props {
  variantColor: string
  orientation: "horizontal" | "vertical"
  colorMode: "light" | "dark"
  theme: Theme
}

export function getModeValue(props: any, lightValue: any, darkValue: any) {
  if (props.colorMode === "light") return lightValue
  if (props.colorMode === "dark") return darkValue
  return undefined
}

export function getModeColor(props: any, lightValue: any, darkValue: any): any {
  if (props.colorMode === "light") {
    return typeof lightValue === "function"
      ? lightValue
      : getColor(props.theme, lightValue, props.variantColor)
  }
  if (props.colorMode === "dark") {
    return typeof darkValue === "function"
      ? darkValue
      : getColor(props.theme, darkValue, props.variantColor)
  }
  return undefined
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
