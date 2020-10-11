import { useColorMode } from "@chakra-ui/color-mode"
import { SystemStyleObject } from "@chakra-ui/styled-system"
import {
  Dict,
  filterUndefined,
  memoizedGet as get,
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

export function useToken(
  scale: string,
  token: StringOrNumber,
  fallback?: StringOrNumber,
) {
  const theme = useTheme()
  const path = `${scale}.${token}`
  return get(theme, path, fallback ?? token)
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

export function useProps(themeKey: string, props: Dict, isMultiPart?: boolean) {
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
        for (const part of styleConfig.parts) {
          styles[part] = styles[part] ?? {}
        }
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
