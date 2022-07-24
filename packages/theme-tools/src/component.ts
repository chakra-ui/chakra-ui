import {
  StyleFunctionProps,
  SystemStyleInterpolation,
  SystemStyleObject,
} from "@chakra-ui/styled-system"
import { Dict } from "@chakra-ui/utils"

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
  return (props: Dict | StyleFunctionProps) =>
    props.colorMode === "dark" ? dark : light
}

export function orient(options: {
  orientation?: "vertical" | "horizontal"
  vertical: SystemStyleObject
  horizontal: SystemStyleObject
}) {
  const { orientation, vertical, horizontal } = options
  if (!orientation) return {}
  return orientation === "vertical" ? vertical : horizontal
}
