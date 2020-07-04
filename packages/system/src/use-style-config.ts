import * as React from "react"
import { Dict, get, runIfFn, merge } from "@chakra-ui/utils"
import { useChakra } from "./hooks"
import { SystemStyleObject } from "@chakra-ui/css"

export function useStyleConfig(themeKey: string, props: Dict) {
  const { styleConfig: styleConfigProp, ...rest } = props

  const { theme, colorMode } = useChakra()
  const styleConfig = styleConfigProp || get(theme, `components.${themeKey}`)

  const allProps = {
    ...merge(rest, styleConfig.defaultProps ?? {}),
    theme,
    colorMode,
  } as Dict

  return React.useMemo(() => {
    const result = {} as Dict<SystemStyleObject>

    if (!styleConfig) return {}

    const baseStyles = runIfFn(styleConfig.baseStyle, allProps)
    const parts = styleConfig.parts || Object.keys(baseStyles)

    const variants = runIfFn(
      styleConfig.variants?.[allProps.variant] ?? {},
      allProps,
    )

    const sizes = runIfFn(styleConfig.sizes?.[allProps.size] ?? {}, allProps)

    for (const part of parts) {
      result[part] = merge.all([
        baseStyles[part] ?? {},
        sizes[part] ?? {},
        variants[part] ?? {},
      ])
    }

    return result
  }, [allProps, styleConfig])
}

export default useStyleConfig
