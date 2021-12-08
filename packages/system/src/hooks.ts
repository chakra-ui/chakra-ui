import { useColorMode } from "@chakra-ui/color-mode"
import { SystemStyleObject } from "@chakra-ui/styled-system"
import {
  Dict,
  filterUndefined,
  mergeWith,
  runIfFn,
  StringOrNumber,
} from "@chakra-ui/utils"
import { useMemo, useRef } from "react"
import isEqual from "react-fast-compare"
import { useTheme } from "./providers"
import { ThemingProps } from "./system.types"
import { omitThemingProps } from "./system.utils"

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
  const theme = useTheme()

  if (Array.isArray(token)) {
    let fallbackArr: T[] = []
    if (fallback) {
      fallbackArr = Array.isArray(fallback) ? fallback : [fallback]
    }

    return token.map((token, index) => {
      if (scale === "breakpoints") {
        return resolveBreakpointValue(theme, token, fallbackArr[index] ?? token)
      }
      const path = `${scale}.${token}`
      return resolveTokenValue(theme, path, fallbackArr[index] ?? token)
    })
  }

  if (scale === "breakpoints") {
    return resolveBreakpointValue(theme, token, fallback)
  }

  const path = `${scale}.${token}`
  return resolveTokenValue(theme, path, fallback)
}

export function useProps<P extends ThemingProps>(
  themeKey: string,
  props: P,
  isMulti: true,
): {
  styles: Record<string, SystemStyleObject>
  props: Omit<P, keyof ThemingProps>
}

export function useProps<P extends ThemingProps>(
  themeKey: string,
  props?: P,
  isMulti?: boolean,
): {
  styles: SystemStyleObject
  props: Omit<P, keyof ThemingProps>
}

export function useProps(themeKey: string, props: Dict) {
  const { theme, colorMode } = useChakra()

  const styleConfig = (props.styleConfig || theme.components?.[themeKey]) as
    | Dict
    | undefined

  const defaultProps = styleConfig?.defaultProps ?? {}
  const propsWithDefault = { ...defaultProps, ...filterUndefined(props) }

  const stylesRef = useRef<Dict>({})

  const mergedProps = mergeWith({}, propsWithDefault, { theme, colorMode })

  const memoizedStyles = useMemo(() => {
    if (styleConfig) {
      const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, mergedProps)

      const variants = runIfFn(
        styleConfig.variants?.[mergedProps.variant as string] ?? {},
        mergedProps,
      )

      const sizes = runIfFn(
        styleConfig.sizes?.[mergedProps.size as string] ?? {},
        mergedProps,
      )

      const styles = mergeWith(baseStyles, sizes, variants)

      if (styleConfig.parts) {
        styleConfig.parts.forEach((part: string) => {
          styles[part] = styles[part] ?? {}
        })
      }

      const isStyleEqual = isEqual(stylesRef.current, styles)

      if (!isStyleEqual) {
        stylesRef.current = styles
      }
    }

    return stylesRef.current
  }, [styleConfig, mergedProps])

  return {
    styles: memoizedStyles,
    props: omitThemingProps(propsWithDefault),
  }
}
