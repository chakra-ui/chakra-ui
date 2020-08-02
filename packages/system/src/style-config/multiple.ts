import * as React from "react"
import { Dict, get, runIfFn, merge, filterUndefined } from "@chakra-ui/utils"
import { useChakra } from "../hooks"
import { SystemStyleObject } from "@chakra-ui/styled-system"
import isEqual from "react-fast-compare"

interface MultiStyleConfig {
  parts: Dict<string>
  defaultProps?: Dict
  baseStyle?: Dict
  variants?: Dict
  sizes?: Dict
}

type StyleConfig = MultiStyleConfig | undefined

export function useMultiStyleConfig(themeKey: string, props: Dict) {
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
      const parts = Object.keys(styleConfig.parts) || Object.keys(baseStyles)

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

      const isStyleEqual = isEqual(partsStyleRef.current, partsStyle)

      if (!isStyleEqual) {
        partsStyleRef.current = partsStyle
      }
    }

    return partsStyleRef.current
  }, [allProps, styleConfig])
}

export default useMultiStyleConfig
