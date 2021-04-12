import defaultTheme, { ChakraTheme, Theme } from "@chakra-ui/theme"
import { isFunction, mergeWith } from "@chakra-ui/utils"

type CloneKey<Target, Key> = Key extends keyof Target ? Target[Key] : unknown

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Represents a loose but specific type for the theme override.
 * It provides autocomplete hints for extending the theme, but leaves room
 * for adding properties.
 */
type DeepThemeExtension<BaseTheme, ThemeType> = {
  [Key in keyof BaseTheme]?: BaseTheme[Key] extends (...args: any[]) => any
    ? DeepThemeExtension<
        DeepPartial<ReturnType<BaseTheme[Key]>>,
        CloneKey<ThemeType, Key>
      >
    : BaseTheme[Key] extends Array<any>
    ? CloneKey<ThemeType, Key>
    : BaseTheme[Key] extends object
    ? DeepThemeExtension<DeepPartial<BaseTheme[Key]>, CloneKey<ThemeType, Key>>
    : CloneKey<ThemeType, Key>
}

export declare type ThemeOverride = DeepPartial<ChakraTheme> &
  DeepThemeExtension<Theme, ChakraTheme>
/**
 * Function to override or customize the Chakra UI theme conveniently
 * @param overrides - Your custom theme object overrides
 * @param baseTheme - theme to customize
 */
export function extendTheme<
  BaseTheme extends ChakraTheme = Theme,
  Overrides extends ThemeOverride = ThemeOverride
>(
  overrides: Overrides,
  baseTheme: BaseTheme = (defaultTheme as unknown) as BaseTheme,
): BaseTheme & Overrides {
  function customizer(
    source: unknown,
    override: unknown,
    key: string,
    object: any,
  ) {
    if (
      (isFunction(source) || isFunction(override)) &&
      Object.prototype.hasOwnProperty.call(object, key)
    ) {
      return (...args: unknown[]) => {
        const sourceValue = isFunction(source) ? source(...args) : source

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
