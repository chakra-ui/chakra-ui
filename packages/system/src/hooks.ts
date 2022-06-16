import { useColorMode } from "@chakra-ui/color-mode"
import { Dict, StringOrNumber } from "@chakra-ui/utils"
import { useTheme } from "./providers"

export function useChakra<T extends Dict = Dict>() {
  const colorModeResult = useColorMode()
  const theme = useTheme() as T
  return { ...colorModeResult, theme }
}

const resolveBreakpointValue = <T extends StringOrNumber>(
  theme: Dict,
  tokenValue: T,
  fallbackValue: any,
) => {
  if (tokenValue === null) return tokenValue
  const getValue = (val: T) => theme.__breakpoints?.asArray?.[val]
  return getValue(tokenValue) ?? getValue(fallbackValue) ?? fallbackValue
}

// inspired from ./css.ts : resolveTokenValue
const resolveTokenValue = <T extends StringOrNumber>(
  theme: Dict,
  tokenValue: T,
  fallbackValue: any,
) => {
  if (tokenValue == null) return tokenValue
  const getValue = (val: T) => theme.__cssMap?.[val]?.value
  return getValue(tokenValue) ?? getValue(fallbackValue) ?? fallbackValue
}

export function useToken<T extends StringOrNumber>(
  scale: string,
  token: T | T[],
  fallback?: T | T[],
) {
  return getToken(scale, token, fallback)(useTheme())
}

export function getToken<T extends StringOrNumber>(
  scale: string,
  token: T | T[],
  fallback?: T | T[],
) {
  const _token = Array.isArray(token) ? token : [token]
  const _fallback = Array.isArray(fallback) ? fallback : [fallback]
  return (theme: Dict<any>) => {
    const fallbackArr = _fallback.filter(Boolean) as T[]
    return _token.map((token, index) => {
      if (scale === "breakpoints") {
        return resolveBreakpointValue(theme, token, fallbackArr[index] ?? token)
      }
      const path = `${scale}.${token}`
      return resolveTokenValue(theme, path, fallbackArr[index] ?? token)
    })
  }
}
