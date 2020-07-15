import { SystemStyleObject } from "@chakra-ui/system"
import { Dict, UnionStringArray, runIfFn } from "@chakra-ui/utils"
import { TransitionConfig } from "@chakra-ui/transition"

export type GlobalStyles = {
  global?: SystemStyleObject | ((props: Props) => SystemStyleObject)
}

export type JSXElementStyles = {
  [K in keyof JSX.IntrinsicElements]?: SystemStyleObject
}

export { runIfFn }

export type Styles = GlobalStyles & JSXElementStyles

export type ExtendProps<P> = P & Props

export interface Props {
  colorScheme: string
  orientation: "horizontal" | "vertical"
  colorMode: "light" | "dark"
  theme: Dict
}

export type VariantType<E extends Readonly<Dict>> = E["variants"][number]

export type SizeType<E extends Readonly<Dict>> = E["sizes"][number]

type Arr = Readonly<any[]>

type PartsStyle<P extends Arr, V = SystemStyleObject> = {
  [K in UnionStringArray<P>]?: V
}

type PartsInterpolation<E extends Readonly<Dict>, V = SystemStyleObject> =
  | PartsStyle<E["parts"], V>
  | ((props: any) => PartsStyle<E["parts"], V>)

export type TransitionStyle<E extends Readonly<Dict>> = PartsInterpolation<
  E,
  TransitionConfig
>

export type BaseStyle<E extends Readonly<Dict>> = PartsInterpolation<E>

export type Sizes<E extends Readonly<Dict>> = {
  [K in UnionStringArray<E["sizes"]>]?: PartsInterpolation<E>
}

export type Variants<E extends Readonly<Dict>> = {
  [K in UnionStringArray<E["variants"]>]?: PartsInterpolation<E>
}

export type DefaultProps<E extends Readonly<Dict>> = {
  size?: UnionStringArray<E["sizes"]>
  variant?: UnionStringArray<E["variants"]>
  colorScheme?: string
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
