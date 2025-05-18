import {
  resolveStyleConfig,
  SystemStyleObject,
  ThemingProps,
} from "@chakra-ui/styled-system"
import { compact, Dict, memoizedGet as get, mergeWith } from "@chakra-ui/utils"
import { isValidElement, useRef } from "react"
import isEqual from "react-fast-compare"
import { useChakra } from "./hooks"

type StylesRef = SystemStyleObject | Record<string, SystemStyleObject>

function omitReactElements(props: Dict) {
  return Object.fromEntries(
    Object.entries(props).filter(([key, value]) => {
      return (
        value !== null &&
        value !== undefined &&
        key !== "children" &&
        !isValidElement(value)
      )
    }),
  )
}

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
    compact(omitReactElements(rest)),
    (obj, src) => (!obj ? src : undefined),
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
