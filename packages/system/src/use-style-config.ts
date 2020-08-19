import { SystemStyleObject } from "@chakra-ui/styled-system"
import { filterUndefined, get, merge, runIfFn } from "@chakra-ui/utils"
import { useMemo, useRef } from "react"
import isEqual from "react-fast-compare"
import { useChakra } from "./hooks"

interface ThemingProps {
  variant?: string
  size?: string
}

export function useStyleConfig(
  themeKey: string,
  options: { isMultiPart: true } & ThemingProps,
): Record<string, SystemStyleObject>

export function useStyleConfig(
  themeKey: string,
  options?: { isMultiPart?: boolean } & ThemingProps,
): SystemStyleObject

export function useStyleConfig(themeKey: any, options: any) {
  const { styleConfig: styleConfigProp, ...rest } = options

  const { theme, colorMode } = useChakra()
  const themeStyleConfig = get(theme, `components.${themeKey}`)
  const styleConfig = styleConfigProp || themeStyleConfig

  const mergedProps = merge(
    { theme, colorMode },
    styleConfig?.defaultProps ?? {},
    filterUndefined(rest),
  )

  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */
  type StylesRef = SystemStyleObject | Record<string, SystemStyleObject>
  const stylesRef = useRef<StylesRef>({})

  return useMemo(() => {
    if (styleConfig) {
      const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, mergedProps)

      const variants = runIfFn(
        styleConfig.variants?.[mergedProps.variant] ?? {},
        mergedProps,
      )

      const sizes = runIfFn(
        styleConfig.sizes?.[mergedProps.size] ?? {},
        mergedProps,
      )

      const styles = merge({}, baseStyles, sizes, variants)

      const isStyleEqual = isEqual(stylesRef.current, styles)

      if (!isStyleEqual) {
        stylesRef.current = styles
      }
    }

    return stylesRef.current
  }, [styleConfig, mergedProps])
}
