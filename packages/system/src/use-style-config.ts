import * as React from "react"
import { Dict, get, runIfFn, merge, filterUndefined } from "@chakra-ui/utils"
import { useChakra } from "./hooks"
import { SystemStyleObject } from "@chakra-ui/styled-system"

interface BaseStyleConfig {
  defaultProps?: Dict
  baseStyle?: Dict
  register?: { parts?: string[] }
  variants?: Dict
  sizes?: Dict
}

type StyleConfig = BaseStyleConfig | undefined

export function useStyleConfig(themeKey: string, props: Dict) {
  const { styleConfig: styleConfigProp, ...rest } = props

  const { theme, colorMode } = useChakra()

  const themeStyleConfig = get(theme, `components.${themeKey}`)
  const styleConfig = (styleConfigProp || themeStyleConfig) as StyleConfig

  const propsWithDefault = merge(
    {},
    styleConfig?.defaultProps ?? {},
    filterUndefined(rest),
  )

  const allProps = {
    ...propsWithDefault,
    theme,
    colorMode,
  } as Dict

  const partsStyleRef = React.useRef<Dict<SystemStyleObject>>({})

  return React.useMemo(() => {
    if (styleConfig) {
      const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, allProps)
      const parts = styleConfig.register?.parts || Object.keys(baseStyles)

      const variants = runIfFn(
        styleConfig.variants?.[allProps.variant] ?? {},
        allProps,
      )

      const sizes = runIfFn(styleConfig.sizes?.[allProps.size] ?? {}, allProps)

      const partsStyle = {} as Dict<SystemStyleObject>

      for (const part of parts) {
        partsStyle[part] = merge(
          {},
          baseStyles?.[part] ?? {},
          sizes?.[part] ?? {},
          variants?.[part] ?? {},
        )
      }

      const prevStyleString = JSON.stringify(partsStyleRef.current)
      const nextStyleString = JSON.stringify(partsStyle)

      if (nextStyleString !== prevStyleString) {
        partsStyleRef.current = partsStyle
      }
    }

    return partsStyleRef.current
  }, [allProps, styleConfig])
}

export default useStyleConfig
