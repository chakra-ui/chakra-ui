import { ModifierStyleProps } from "./types"
import { get } from "@chakra-ui/utils"

type DefaultModifiers = Omit<ModifierStyleProps, "theme">

/**
 * Get the theming default props of a component from the theme
 */
export function getComponentDefaults(theme: any, themeKey: string) {
  return get(theme, `components.${themeKey}.defaultProps`) as
    | DefaultModifiers
    | undefined
}
