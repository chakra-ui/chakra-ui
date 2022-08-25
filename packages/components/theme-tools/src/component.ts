import type {
  SystemStyleObject,
  StyleFunctionProps,
  SystemStyleInterpolation,
} from "@chakra-ui/styled-system"

export type {
  StyleConfig,
  MultiStyleConfig,
  SystemStyleObject,
  // StyleFunctionProps,
  SystemStyleFunction,
  SystemStyleInterpolation,
  PartsStyleObject,
  PartsStyleFunction,
  PartsStyleInterpolation,
} from "@chakra-ui/styled-system"

/* -----------------------------------------------------------------------------
 * Global Style object definitions
 * -----------------------------------------------------------------------------*/

export type GlobalStyleProps = StyleFunctionProps

export type GlobalStyles = {
  global?: SystemStyleInterpolation
}

export type JSXElementStyles = {
  [K in keyof JSX.IntrinsicElements]?: SystemStyleObject
}

export type Styles = GlobalStyles & JSXElementStyles

export function mode<T>(light: T, dark: T) {
  return (props: Record<string, any> | StyleFunctionProps) =>
    props.colorMode === "dark" ? dark : light
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

export type { StyleFunctionProps }
