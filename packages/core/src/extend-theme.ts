import defaultTheme, { Theme } from "@chakra-ui/theme"
import { isFunction, mergeWith } from "@chakra-ui/utils"

export function extendTheme<T extends Theme | Record<string, any>>(
  overrides: T,
) {
  function customizer(sourceThunk: unknown, overrideThunk: unknown) {
    if (isFunction(sourceThunk)) {
      return (...args: unknown[]) => {
        const sourceValue = sourceThunk(...args)

        const overrideValue = isFunction(overrideThunk)
          ? overrideThunk(...args)
          : overrideThunk

        return mergeWith({}, sourceValue, overrideValue, customizer)
      }
    }

    // fallback to default behavior
    return undefined
  }

  return mergeWith({}, defaultTheme, overrides, customizer)
}
