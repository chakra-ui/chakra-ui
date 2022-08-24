import { omit } from "@chakra-ui/object-utils"
import { SystemStyleObject } from "./system.types"
import { ThemeTypings } from "./theme.types"
import { ResponsiveValue } from "./utils"

/* -----------------------------------------------------------------------------
 * Style Functions used in the theme
   - Single part components: use SystemStyleObject or SystemStyleFunction
   - Multi part components: use PartsStyleObject or PartsStyleFunction
 * -----------------------------------------------------------------------------*/

export interface StyleConfig {
  baseStyle?: SystemStyleObject | SystemStyleFunction
  sizes?: { [size: string]: SystemStyleObject | SystemStyleFunction }
  variants?: { [variant: string]: SystemStyleObject | SystemStyleFunction }
  defaultProps?: {
    size?: string
    variant?: string
    colorScheme?: string
  }
}

export interface MultiStyleConfig<T extends Anatomy = Anatomy> {
  baseStyle?: PartsStyleObject<T> | PartsStyleFunction<T>
  sizes?: { [size: string]: PartsStyleObject<T> | PartsStyleFunction<T> }
  variants?: { [variant: string]: PartsStyleObject<T> | PartsStyleFunction<T> }
  defaultProps?: StyleConfig["defaultProps"]
}

export type StyleFunctionProps = {
  colorScheme: string
  colorMode: "light" | "dark"
  orientation?: "horizontal" | "vertical"
  theme: Record<string, any>
  [key: string]: any
}

export type SystemStyleFunction = (
  props: StyleFunctionProps,
) => SystemStyleObject

export type SystemStyleInterpolation = SystemStyleObject | SystemStyleFunction

// minimal representation of the anatomy object
type Anatomy = { __type: string }

export type PartsStyleObject<T extends Anatomy = Anatomy> = Partial<
  Record<T["__type"], SystemStyleObject>
>

export type PartsStyleFunction<T extends Anatomy = Anatomy> = (
  props: StyleFunctionProps,
) => PartsStyleObject<T>

export type PartsStyleInterpolation<T extends Anatomy = Anatomy> =
  | PartsStyleObject<T>
  | PartsStyleFunction<T>

export interface ThemingProps<ThemeComponent extends string = any> {
  variant?: ResponsiveValue<
    ThemeComponent extends keyof ThemeTypings["components"]
      ? ThemeTypings["components"][ThemeComponent]["variants"]
      : string
  >
  size?: ResponsiveValue<
    ThemeComponent extends keyof ThemeTypings["components"]
      ? ThemeTypings["components"][ThemeComponent]["sizes"]
      : string
  >
  colorScheme?: ThemeTypings["colorSchemes"]
  orientation?: "vertical" | "horizontal"
  styleConfig?: Record<string, any>
}

export function omitThemingProps<T extends ThemingProps>(props: T) {
  return omit(props, ["styleConfig", "size", "variant", "colorScheme"])
}
