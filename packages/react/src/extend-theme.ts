import defaultTheme, {
  ChakraTheme,
  isChakraTheme,
  Theme,
} from "@chakra-ui/theme"
import {
  AnyFunction,
  Dict,
  isFunction,
  mergeWith,
  pipe,
} from "@chakra-ui/utils"

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

export declare type ThemeOverride<
  BaseTheme = Theme
> = DeepPartial<ChakraTheme> & DeepThemeExtension<BaseTheme, ChakraTheme> & Dict

export type ThemeExtension<Override extends ThemeOverride = ThemeOverride> = (
  themeOverride: Override,
) => Override

export type BaseThemeWithExtensions<
  BaseTheme extends ChakraTheme,
  Extensions extends readonly [...any]
> = BaseTheme &
  (Extensions extends [infer L, ...infer R]
    ? L extends AnyFunction
      ? ReturnType<L> & BaseThemeWithExtensions<BaseTheme, R>
      : L & BaseThemeWithExtensions<BaseTheme, R>
    : Extensions)
/**
 * Function to override or customize the Chakra UI theme conveniently.
 * First extension overrides the baseTheme and following extensions override the preceding extensions.
 *
 * @example:
 * import { theme as baseTheme, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
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
 *   baseTheme // optional
 * )
 */
export function extendTheme<
  BaseTheme extends ChakraTheme = Theme,
  Extensions extends (
    | BaseTheme
    | ThemeOverride<BaseTheme>
    | ThemeExtension<ThemeOverride<BaseTheme>>
  )[] = (ThemeOverride<BaseTheme> | ThemeExtension<ThemeOverride<BaseTheme>>)[]
>(...extensions: [...Extensions]) {
  let overrides = [...extensions]
  let baseTheme = extensions[extensions.length - 1]

  if (
    isChakraTheme(baseTheme) &&
    // this ensures backward compatibility
    // previously only `extendTheme(override, baseTheme?)` was allowed
    overrides.length > 1
  ) {
    overrides = overrides.slice(0, overrides.length - 1)
  } else {
    baseTheme = (defaultTheme as unknown) as BaseTheme
  }

  return pipe(
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

function mergeThemeCustomizer(
  source: unknown,
  override: unknown,
  key: string,
  object: any,
) {
  // (backward compat) how the parts array should be merged
  // The new Anatomy class returns an iterator instead of an array
  // we need to convert it to an array using `Array.from`
  if (key === "parts") {
    //@ts-ignore
    const _source = Array.from(source ?? []) as string[]
    //@ts-ignore
    const _override = Array.from(override ?? []) as string[]
    const merged = _source.concat(_override)
    // remove duplicates
    return Array.from(new Set(merged))
  }

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
