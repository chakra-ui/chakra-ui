import { Theme } from "../foundations"
import { SystemProps, ThemingProps } from "@chakra-ui/system"

export type StyleProps = SystemProps | { [component: string]: SystemProps }

/**
 * The component style can either be a style object or  a function that returns a
 * style object.
 */
export type ComponentStyle<CustomProps = {}> =
  | StyleProps
  | ((props: Props & Required<CustomProps>) => StyleProps)

export interface ComponentTheme<CustomProps = {}> {
  /**
   * The default props to apply to the component
   */
  defaultProps?: CustomProps & {
    /**
     * The default variant to use (in variants)
     */
    variant?: string
    /**
     * The default color scheme to use (if variants are defined as functions)
     */
    colorScheme?: string
    /**
     * The default size to use (in sizes)
     */
    size?: string
  }
  /**
   * The initial styles to be applied to the component
   */
  baseStyle?: ComponentStyle<CustomProps & ThemingProps>
  /**
   * The component's visual style variants
   */
  variants?: {
    [variant: string]: ComponentStyle<CustomProps> | string
  }
  /**
   * The component's size variations
   */
  sizes?: {
    [size: string]: ComponentStyle<CustomProps> | string
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

type GlobalStyles = { global?: SystemProps | ((props: Props) => SystemProps) }

type ElementStyles = {
  [K in keyof JSX.IntrinsicElements]?: SystemProps
}

export type Styles = ElementStyles & GlobalStyles

export function getOrientationStyle<T>(options: {
  orientation?: "vertical" | "horizontal"
  vertical: T
  horizontal: T
}) {
  const { orientation, vertical, horizontal } = options
  if (!orientation) return {}
  return orientation === "vertical" ? vertical : horizontal
}
