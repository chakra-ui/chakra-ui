import { SystemStyleObject } from "@chakra-ui/styled-system"
import {
  filterUndefined,
  memoizedGet as get,
  mergeWith,
  omit,
  runIfFn,
} from "@chakra-ui/utils"
import { useMemo, useRef } from "react"
import isEqual from "react-fast-compare"
import { useChakra } from "./hooks"
import { resolveResponsivePropStyles } from "./resolve-responsive-prop-styles"
import { ThemingProps } from "./system.types"

export function useStyleConfig(
  themeKey: string,
  props: ThemingProps,
  opts: { isMultiPart: true },
): Record<string, SystemStyleObject>

export function useStyleConfig(
  themeKey: string,
  props?: ThemingProps,
  opts?: { isMultiPart?: boolean },
): SystemStyleObject

export function useStyleConfig(themeKey: any, props: any = {}, opts: any = {}) {
  const { styleConfig: styleConfigProp, ...rest } = props

  const { theme, colorMode } = useChakra()
  const { breakpoints } = theme
  const themeStyleConfig = get(theme, `components.${themeKey}`)
  const styleConfig = styleConfigProp || themeStyleConfig

  const mergedProps = mergeWith(
    { theme, colorMode },
    styleConfig?.defaultProps ?? {},
    filterUndefined(omit(rest, ["children"])),
  )

  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */
  type StylesRef = SystemStyleObject | Record<string, SystemStyleObject>
  const stylesRef = useRef<StylesRef>({})

  return useMemo(() => {
    if (styleConfig) {
      const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, mergedProps)
      const parts = opts?.isMultiPart ? styleConfig.parts : undefined

      const variantStyles = resolveResponsivePropStyles({
        breakpoints,
        responsiveValue: mergedProps.variant,
        responsiveStyles: styleConfig.variants ?? {},
        props: mergedProps,
        parts,
      })

      const sizeStyles = resolveResponsivePropStyles({
        breakpoints,
        responsiveValue: mergedProps.size,
        responsiveStyles: styleConfig.sizes ?? {},
        parts,
        props: mergedProps,
      })

      const styles = mergeWith({}, baseStyles, sizeStyles, variantStyles)

      const isStyleEqual = isEqual(stylesRef.current, styles)

      if (!isStyleEqual) {
        stylesRef.current = styles
      }
    }

    return stylesRef.current
  }, [breakpoints, styleConfig, mergedProps, opts?.isMultiPart])
}

export function useMultiStyleConfig(themeKey: string, props: any) {
  return useStyleConfig(themeKey, props, { isMultiPart: true })
}
