import defaultTheme, { Theme } from "@chakra-ui/theme"
import { isFunction, mergeWith } from "@chakra-ui/utils"
import { ColorHues } from "@chakra-ui/theme/dist/types/foundations/colors"
import { ChakraTheme } from "@chakra-ui/styled-system"

type ThemeExtensionTypeHints = {
  colors: Record<string, Partial<ColorHues> | Record<string, string> | string> // typehints for color definitions
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
        : Partial<ThemeObject[Key]>) // allow function or object
} &
  Partial<TypeHints> &
  Record<string, any> // escape hatch

export type ThemeOverride = DeepThemeExtension<Theme, ThemeExtensionTypeHints>

/**
 * Function to override or customize the Chakra UI theme conveniently
 * @param overrides - Your custom theme object overrides
 * @param baseTheme - theme to customize
 */
export function extendTheme<Override extends ThemeOverride>(
  overrides: Override,
  baseTheme: Partial<ChakraTheme> = defaultTheme,
): Partial<ChakraTheme> & Override {
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

  return mergeWith({}, baseTheme, overrides, customizer)
}
