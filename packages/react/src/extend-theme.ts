import defaultTheme, {
  ChakraTheme,
  isChakraTheme,
  Theme,
} from "@chakra-ui/theme"
import { Dict, isFunction, mergeWith, warn } from "@chakra-ui/utils"

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

export declare type ThemeOverride<BaseTheme = Theme> = DeepPartial<ChakraTheme> &
  DeepThemeExtension<BaseTheme, ChakraTheme> &
  Dict

export type ThemeExtension<Override extends ThemeOverride = ThemeOverride> = (
  themeOverride: Override,
) => Override

export type BaseThemeWithExtensions<
  BaseTheme extends ChakraTheme,
  Extensions extends readonly [...any]
> = Extensions extends [infer L, ...infer R]
  ? L extends (...args: any[]) => any
    ? ReturnType<L> & BaseThemeWithExtensions<BaseTheme, R>
    : L & BaseThemeWithExtensions<BaseTheme, R>
  : BaseTheme & Extensions
/**
 * Function to override or customize the Chakra UI theme conveniently.
 * First extension overrides the baseTheme and following extensions override the preceding extensions.
 *
 * @example with only overrides:
 * import { extendTheme } from '@chakra-ui/react'
 *
 * const customTheme = extendTheme({
 *   colors: {
 *     brand: {
 *       500: "#b4d455",
 *     },
 *   },
 * })
 *
 *
 * @example with extension:
 * import { theme, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
 *
 * const customTheme = extendTheme(
 *   {
 *     colors: {
 *       brand: {
 *         500: "#b4d455",
 *       },
 *     },
 *   },
 *   withDefaultColorScheme({ colorScheme: "red" }),
 *   theme,
 * )
 */
export function extendTheme<
  BaseTheme extends ChakraTheme = Theme,
  Extensions extends (
    | BaseTheme
    | ThemeOverride<BaseTheme>
    | ThemeExtension<ThemeOverride<BaseTheme>>
  )[] = (ThemeOverride<BaseTheme> | ThemeExtension<ThemeOverride<BaseTheme>>)[]
>(
  ...extensions: [...Extensions]
): BaseThemeWithExtensions<BaseTheme, Extensions> {
  const overrides = [...extensions]
    .slice(0, extensions.length - (extensions.length > 1 ? 1 : 0))
    .reverse()

  const baseTheme =
    extensions.length > 1 ? extensions[extensions.length - 1] : defaultTheme

  if (!isChakraTheme(baseTheme) || !overrides.length) {
    warn(
      `Last parameter needs to be a valid \`ChakraTheme\`. Please check your extendTheme function call from @chakra-ui/react.`,
    )
  }

  return compose(
    ...overrides.map(
      (extension) => (
        prevTheme: BaseThemeWithExtensions<BaseTheme, Extensions>,
      ) =>
        isFunction(extension)
          ? (extension as any)(prevTheme)
          : mergeThemeOverride(prevTheme, extension),
    ),
  )(baseTheme as BaseThemeWithExtensions<BaseTheme, Extensions>)
}

export function mergeThemeOverride<BaseTheme extends ChakraTheme = ChakraTheme>(
  ...overrides: ThemeOverride<BaseTheme>[]
): ThemeOverride<BaseTheme> {
  return mergeWith({}, ...overrides, mergeThemeCustomizer)
}

export function compose<R>(...fns: Array<(a: R) => R>) {
  return fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)))
}

function mergeThemeCustomizer(
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

      const overrideValue = isFunction(override) ? override(...args) : override

      return mergeWith({}, sourceValue, overrideValue, mergeThemeCustomizer)
    }
  }

  // fallback to default behaviour
  return undefined
}
