import { SystemProps, ThemingProps, SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"

type Style = SystemStyleObject | SystemProps

export type StyleObject = Style | { [component: string]: Style }

export type GlobalStyles = {
  global?: SystemProps | ((props: Props) => SystemProps)
}

export type JSXElementStyles = {
  [K in keyof JSX.IntrinsicElements]?: SystemProps
}

export type Styles = GlobalStyles & JSXElementStyles

export interface Props<T = Dict> {
  colorScheme: string
  orientation: "horizontal" | "vertical"
  colorMode: "light" | "dark"
  theme: T
}

/**
 * The component style can either be a style object or  a function that returns a
 * style object.
 */
type ComponentStyle<P, T> =
  | StyleObject
  | ((props: Props<T> & Required<P>) => StyleObject)

export interface ComponentTheme<P = {}, T = Dict> {
  /**
   * The default props to apply to the component
   */
  defaultProps?: P & {
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
  baseStyle?: ComponentStyle<P & ThemingProps, T>
  /**
   * The component's visual style variants
   */
  variants?: {
    [variant: string]: ComponentStyle<P, T> | string
  }
  /**
   * The component's size variations
   */
  sizes?: {
    [size: string]: ComponentStyle<P, T> | string
  }
}

export function mode<T>(light: T, dark: T) {
  return (props: Props) => (props.colorMode === "light" ? light : dark)
}

export function orientation<T = string>(horizontal: T, vertical: T) {
  return (props: Props) =>
    props.orientation === "horizontal" ? horizontal : vertical
}

export function orient<T>(options: {
  orientation?: "vertical" | "horizontal"
  vertical: T
  horizontal: T
}) {
  const { orientation, vertical, horizontal } = options
  if (!orientation) return {}
  return orientation === "vertical" ? vertical : horizontal
}

/**
 * Copies the styles from a component sizes or variants to another component
 * under a speicifed key.
 *
 * @param source The component theme object to copy
 * @param component The component string to copy to
 */
export function copy(source: any, component: string) {
  const result = {} as any

  for (const k in source) {
    const value = source[k]
    if (typeof value === "function") {
      result[k] = (props: any) => ({ [component]: value(props) })
    } else {
      result[k] = { [component]: value }
    }
  }

  return result
}
