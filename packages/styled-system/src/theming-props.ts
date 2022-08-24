import { omit } from "@chakra-ui/object-utils"
import { ThemeTypings } from "./theme.types"
import { ResponsiveValue } from "./utils"

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
