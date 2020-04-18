import { css, SystemStyleObject } from "@chakra-ui/css"
import { Dict, get, runIfFn } from "@chakra-ui/utils"
import { createParser, StyleConfig } from "@chakra-ui/parser"

export interface CreateVariantOptions {
  prop: string
  themeKey?: string
  values?: Dict<SystemStyleObject>
}

export function createVariant(options: CreateVariantOptions) {
  const { values = {}, prop, themeKey } = options

  const sx: StyleConfig = {
    transform: (value: any, scale: any, props: any) => {
      const styleObjectOrFn = get(props.theme, `${scale}.${value}`, null)
      const styleObject = runIfFn(styleObjectOrFn, props)
      return css(styleObject)(props.theme)
    },
    scale: themeKey,
    fallbackScale: values,
  }

  const config = {
    [prop]: sx,
  }

  const parser = createParser(config)
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
