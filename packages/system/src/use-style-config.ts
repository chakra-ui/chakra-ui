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
    const baseStyles = runIfFn(styleConfig.baseStyle, realProps)
    const parts = styleConfig.parts || Object.keys(baseStyles)

    const variant = realProps.variant ?? styleConfig.defaultProps?.variant
    const variants = styleConfig.variants?.[variant] ?? {}

    const size = realProps.size ?? styleConfig.defaultProps?.size
    const sizes = styleConfig.sizes?.[size] ?? {}

    for (const part of parts) {
      const baseStyle = baseStyles[part] ?? {}
      const sizeStyle = runIfFn(sizes, realProps)[part] ?? {}
      const variantStyle = runIfFn(variants, realProps)[part] ?? {}
      result[part] = merge(baseStyle, sizeStyle, variantStyle)
    }

    return result
  }, [realProps, styleConfig])
}

export default useStyleConfig
