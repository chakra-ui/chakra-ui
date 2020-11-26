import defaultTheme, { Theme, ColorHues } from "@chakra-ui/theme"
import { isFunction, mergeWith } from "@chakra-ui/utils"

type ThemeExtensionTypeHints = {
  colors: Record<string, Partial<ColorHues> | string> // typehints for color definitions
}

/**
 * Represents a loose but specific type for the theme override.
 * It provides autocomplete hints for extending the theme, but leaves room
 * for adding properties.
 */
type DeepThemeExtension<ThemeObject, TypeHints> = {
  [Key in keyof ThemeObject]?:
    | Omit<DeepThemeExtension<ThemeObject[Key], TypeHints>, keyof TypeHints> // recursive type clone
    | (ThemeObject[Key] extends (...args: any[]) => any
        ? Partial<ReturnType<ThemeObject[Key]>>
        : ThemeObject[Key]) // allow function or object
    | Record<string, any> // escape hatch
} &
  Partial<TypeHints>

export type ThemeOverride = DeepThemeExtension<Theme, ThemeExtensionTypeHints>

/**
 * Function to override or customize the Chakra UI theme conveniently
 * @param overrides - Your custom theme object overrides
 */
export function extendTheme<T extends ThemeOverride>(overrides: T) {
  function customizer(source: unknown, override: unknown) {
    if (isFunction(source)) {
      return (...args: unknown[]) => {
        const sourceValue = source(...args)

        const overrideValue = isFunction(override)
          ? override(...args)
          : override

        return mergeWith({}, sourceValue, overrideValue, customizer)
      }
    }

    // fallback to default behaviour
    return undefined
  }

  return mergeWith({}, defaultTheme, overrides, customizer)
}
