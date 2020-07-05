import { SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"

export type GlobalStyles = {
  global?: SystemStyleObject | ((props: Props) => SystemStyleObject)
}

export type JSXElementStyles = {
  [K in keyof JSX.IntrinsicElements]?: SystemStyleObject
}

export type Styles = GlobalStyles & JSXElementStyles

export type ExtendProps<P> = P & Props

export interface Props {
  colorScheme: string
  orientation: "horizontal" | "vertical"
  colorMode: "light" | "dark"
  theme: Dict
}

/**
 * The component style can either be a style object or  a function that returns a
 * style object.
 */
export type PartsStyleObject<P = {}> =
  | { [component: string]: SystemStyleObject }
  | ((props: Props & Required<P>) => { [component: string]: SystemStyleObject })

export type DefaultProps<P = {}> = P & {
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

export type Variants<P = {}> = {
  [variant: string]: PartsStyleObject<P>
}

export type Sizes<P = {}> = {
  [size: string]: PartsStyleObject<P>
}

export type BaseStyle<P> = PartsStyleObject<P>

export type Parts = string[]

export interface ComponentTheme<P = {}> {
  /**
   * The default props to apply to the component
   */
  defaultProps?: DefaultProps<P>
  /**
   * The initial styles to be applied to the component
   */
  baseStyle?: BaseStyle<P>
  /**
   * The component's visual style variants
   */
  variants?: Variants<P>
  /**
   * The component's size variations
   */
  sizes?: Sizes<P>
  /**
   * The parts the component has or can have
   */
  parts?: Parts
}

export function mode(light: any, dark: any) {
  return (props: any) => (props.colorMode === "light" ? light : dark)
}

export function orientation(horizontal: any, vertical: any) {
  return (props: any) =>
    props.orientation === "horizontal" ? horizontal : vertical
}

export function orient(options: {
  orientation?: "vertical" | "horizontal"
  vertical: any
  horizontal: any
}) {
  const { orientation, vertical, horizontal } = options
  if (!orientation) return {}
  return orientation === "vertical" ? vertical : horizontal
}
