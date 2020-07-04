import * as React from "react"
import { Dict, get, runIfFn, merge } from "@chakra-ui/utils"
import { useChakra } from "./hooks"

export function useStyleConfig(themeKey: string, props: Dict) {
  const { styleConfig: styleConfigProp, ...rest } = props

  const { theme, colorMode } = useChakra()
  const realProps = { ...rest, theme, colorMode } as Dict

  const styleConfig = styleConfigProp || get(theme, `components.${themeKey}`)

  return React.useMemo(() => {
    const result = {} as Dict

    if (!styleConfig) return {}

    const baseStyles = runIfFn(styleConfig.baseStyle, realProps)
    const parts = styleConfig.parts || Object.keys(baseStyles)

    const variant = realProps.variant ?? styleConfig.defaultProps?.variant
    const variants = runIfFn(styleConfig.variants?.[variant] ?? {}, realProps)

    const size = realProps.size ?? styleConfig.defaultProps?.size
    const sizes = runIfFn(styleConfig.sizes?.[size] ?? {}, realProps)

    for (const part of parts) {
      result[part] = merge(
        baseStyles[part] ?? {},
        sizes[part] ?? {},
        variants[part] ?? {},
      )
    }

    return result
  }, [realProps, styleConfig])
}

export default useStyleConfig
