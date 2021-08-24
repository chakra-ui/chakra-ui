import { SystemStyleObject } from "@chakra-ui/system"
import { Dict, runIfFn } from "@chakra-ui/utils"

/* -----------------------------------------------------------------------------
 * Style Configuration definition for components
 * -----------------------------------------------------------------------------*/

export interface StyleConfig {
  baseStyle?: SystemStyleObject
  sizes?: { [size: string]: SystemStyleObject }
  variants?: { [variant: string]: SystemStyleObject }
  defaultProps?: {
    size?: string
    variant?: string
    colorScheme?: string
  }
}

// minimal represenation of the anatomy object
type Anatomy = { __type: string }

export interface MultiStyleConfig<T extends Anatomy = Anatomy> {
  baseStyle?: PartsStyleObject<T>
  sizes?: { [size: string]: PartsStyleObject<T> | PartsStyleFunction<T> }
  variants?: { [variant: string]: PartsStyleObject<T> | PartsStyleFunction<T> }
  defaultProps?: StyleConfig["defaultProps"]
}

/* -----------------------------------------------------------------------------
 * Style Functions used in the theme
   - Single part components: use SystemStyleObject or SystemStyleFunction
   - Multi part components: use PartsStyleObject or PartsStyleFunction
 * -----------------------------------------------------------------------------*/

export type { SystemStyleObject }

export type StyleFunctionProps = {
  colorScheme: string
  colorMode: "light" | "dark"
  orientation?: "horizontal" | "vertical"
  theme: Dict
  [key: string]: any
}

export type SystemStyleFunction = (
  props: StyleFunctionProps,
) => SystemStyleObject

export type SystemStyleInterpolation = SystemStyleObject | SystemStyleFunction

export type PartsStyleObject<T extends Anatomy = Anatomy> = Partial<
  Record<T["__type"], SystemStyleObject>
>

export type PartsStyleFunction<T extends Anatomy = Anatomy> = (
  props: StyleFunctionProps,
) => PartsStyleObject<T>

export type PartsStyleInterpolation<T extends Anatomy = Anatomy> =
  | PartsStyleObject<T>
  | PartsStyleFunction<T>

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

export { runIfFn }

export type Styles = GlobalStyles & JSXElementStyles

export function mode(light: any, dark: any) {
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
