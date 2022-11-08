import { useColorMode } from "@chakra-ui/color-mode"
import { Dict, StringOrNumber } from "@chakra-ui/utils"
import { useTheme } from "./use-theme"

export function useChakra<T extends Dict = Dict>() {
  const colorModeResult = useColorMode()
  const theme = useTheme() as T
  return { ...colorModeResult, theme }
}

function getBreakpointValue<T extends StringOrNumber>(
  theme: Dict,
  value: T,
  fallback: any,
) {
  if (value == null) return value
  const getValue = (val: T) => theme.__breakpoints?.asArray?.[val]
  return getValue(value) ?? getValue(fallback) ?? fallback
}

function getTokenValue<T extends StringOrNumber>(
  theme: Dict,
  value: T,
  fallback: any,
) {
  if (value == null) return value
  const getValue = (val: T) => theme.__cssMap?.[val]?.value
  return getValue(value) ?? getValue(fallback) ?? fallback
}

/**
 * `useToken` is a custom hook used to resolve design tokens from the theme.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-token
 */
export function useToken<T extends StringOrNumber | StringOrNumber[]>(
  scale: string,
  token: T,
  fallback?: T,
) {
  const theme = useTheme()
  return getToken(scale, token, fallback)(theme)
}

export function getToken<T extends StringOrNumber | StringOrNumber[]>(
  scale: string,
  token: T,
  fallback?: T,
): (theme: Dict) => T {
  const _token = Array.isArray(token) ? token : [token]
  const _fallback = Array.isArray(fallback) ? fallback : [fallback]
  return (theme: Dict<any>) => {
    const fallbackArr = _fallback.filter(Boolean) as T[]
    const result = _token.map((token, index) => {
      if (scale === "breakpoints") {
        return getBreakpointValue(theme, token, fallbackArr[index] ?? token)
      }
      const path = `${scale}.${token}`
      return getTokenValue(theme, path, fallbackArr[index] ?? token)
    })
    return Array.isArray(token) ? result : result[0]
  }
}
