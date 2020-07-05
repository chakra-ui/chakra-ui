import { SystemStyleObject } from "@chakra-ui/system"
import { Dict, UnionStringArray } from "@chakra-ui/utils"

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

type Arr = Readonly<any[]>

export type PartsStyle<P extends Arr> = {
  [K in UnionStringArray<P>]?: SystemStyleObject
}

export type Interpolation<P extends Arr> =
  | PartsStyle<P>
  | ((props: any) => PartsStyle<P>)

export type PartsModifierFn<P1 extends Arr, P2 extends Arr> = {
  [K in UnionStringArray<P1>]?: (props: any) => PartsStyle<P2>
}

export type BaseStyle<E extends Readonly<Dict>> = Interpolation<E["parts"]>

export type Sizes<E extends Readonly<Dict>> = {
  [K in UnionStringArray<E["sizes"]>]?: Interpolation<E["parts"]>
}

export type Variants<E extends Readonly<Dict>> = {
  [K in UnionStringArray<E["variants"]>]?: Interpolation<E["parts"]>
}

export type DefaultProps<E extends Readonly<Dict>> = {
  size?: UnionStringArray<E["sizes"]>
  variant?: UnionStringArray<E["variants"]>
  colorScheme?: string
}

export interface ComponentTheme<P = {}> {
  /**
   * The default props to apply to the component
   */
  defaultProps?: any
  /**
   * The initial styles to be applied to the component
   */
  baseStyle?: any
  /**
   * The component's visual style variants
   */
  variants?: any
  /**
   * The component's size variations
   */
  sizes?: any
  /**
   * The parts the component has or can have
   */
  parts?: any
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
