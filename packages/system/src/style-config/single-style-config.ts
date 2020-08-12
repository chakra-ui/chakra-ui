import * as React from "react"
import { Dict, get, runIfFn, merge, filterUndefined } from "@chakra-ui/utils"
import { useChakra } from "../hooks"
import { SystemStyleObject } from "@chakra-ui/styled-system"
import isEqual from "react-fast-compare"

interface SingleStyleConfig {
  defaultProps?: Dict
  baseStyle?: Dict
  variants?: Dict
  sizes?: Dict
}

type StyleConfig = SingleStyleConfig | undefined

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

  const stylesRef = React.useRef<SystemStyleObject>({})

  return React.useMemo(() => {
    if (styleConfig) {
      const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, allProps)

      const variantStyle = runIfFn(
        styleConfig.variants?.[allProps.variant] ?? {},
        allProps,
      )

      const sizeStyle = runIfFn(
        styleConfig.sizes?.[allProps.size] ?? {},
        allProps,
      )

      const styles: SystemStyleObject = merge(
        {},
        baseStyles,
        sizeStyle,
        variantStyle,
      )

      const isStyleEqual = isEqual(stylesRef.current, styles)

      if (!isStyleEqual) {
        stylesRef.current = styles
      }
    }

    return stylesRef.current
  }, [allProps, styleConfig])
}

export default useStyleConfig
