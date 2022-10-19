import {
  resolveStyleConfig,
  SystemStyleObject,
  ThemingProps,
} from "@chakra-ui/styled-system"
import { mergeThemeOverride } from "@chakra-ui/theme-utils"
import {
  Dict,
  filterUndefined,
  memoizedGet as get,
  mergeWith,
  omit,
} from "@chakra-ui/utils"
import { useRef } from "react"
import isEqual from "react-fast-compare"
import { useChakra } from "./hooks"

type StylesRef = SystemStyleObject | Record<string, SystemStyleObject>

function useStyleConfigImpl(
  themeKey: string | null,
  props: ThemingProps & Dict = {},
) {
  const { styleConfig: styleConfigProp, ...rest } = props

  const { theme, colorMode } = useChakra()

  const themeStyleConfig = themeKey
    ? get(theme, `components.${themeKey}`)
    : undefined

  const styleConfig = styleConfigProp || themeStyleConfig

  const mergedProps = mergeWith(
    { theme, colorMode },
    styleConfig?.defaultProps ?? {},
    filterUndefined(omit(rest, ["children"])),
  )

  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */
  const stylesRef = useRef<StylesRef>({})

  if (styleConfig) {
    const getStyles = resolveStyleConfig(styleConfig)
    const styles = getStyles(mergedProps)

    const isStyleEqual = isEqual(stylesRef.current, styles)

    if (!isStyleEqual) {
      stylesRef.current = styles
    }
  }

  return stylesRef.current
}

export function useStyleConfig(
  themeKey: string,
  props: ThemingProps & Dict = {},
) {
  return useStyleConfigImpl(themeKey, props) as SystemStyleObject
}

export function useMultiStyleConfig(
  themeKey: string,
  props: ThemingProps & Dict = {},
) {
  return useStyleConfigImpl(themeKey, props) as Record<
    string,
    SystemStyleObject
  >
}

type MultipartStyles = Record<string, SystemStyleObject>

export function useComponentStyles__unstable(
  themeKey: string,
  props: ThemingProps & { baseConfig: any },
) {
  const { baseConfig, ...restProps } = props
  const { theme } = useChakra()

  const overrides = theme.components?.[themeKey]

  const styleConfig = overrides
    ? mergeThemeOverride(overrides, baseConfig)
    : baseConfig

  return useStyleConfigImpl(null, {
    ...restProps,
    styleConfig,
  }) as MultipartStyles
}
