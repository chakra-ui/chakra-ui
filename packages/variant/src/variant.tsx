import { css, SystemStyleObject } from "@chakra-ui/css"
import { Dict, get, runIfFn } from "@chakra-ui/utils"

export interface CreateVariantOptions {
  prop: string
  defaultValue?: string
  themeKey?: string
  values?: Dict<SystemStyleObject>
}

export function createVariant(options: CreateVariantOptions) {
  const { values = {}, prop, defaultValue, themeKey } = options

  const parser = (props: Dict) => {
    const theme = props.theme ?? {}
    // get all variants
    const valuesInTheme = themeKey ? get(theme, themeKey, null) : null

    // resolve variants if it's a function
    const allValues = {
      ...runIfFn(values, props),
      ...runIfFn(valuesInTheme, props),
    }

    // get variant value or use default
    const propValue = props[prop as keyof typeof props] ?? defaultValue

    if (!propValue) return

    const styleObject = allValues[propValue]
    const _css = css(styleObject)(theme)
    return _css
  }

  parser.propNames = [prop]

  return parser
}

export const textStyle = createVariant({
  themeKey: "textStyles",
  prop: "textStyle",
})

export const layerStyle = createVariant({
  themeKey: "layerStyles",
  prop: "layerStyle",
})
