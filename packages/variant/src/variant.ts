import { css, SystemStyleObject } from "@chakra-ui/css"
import { Dict, get, runIfFn, merge } from "@chakra-ui/utils"
import { createParser, StyleConfig, combineParsers } from "@chakra-ui/parser"

export interface CreateVariantOptions {
  prop: string
  themeKey?: string
  values?: Dict<SystemStyleObject>
}

export function createVariant(options: CreateVariantOptions) {
  const { values = {}, prop, themeKey } = options

  const sx: StyleConfig = {
    transform: (value: any, scale: any, props: any) => {
      const styleObjectOrFn =
        get(props.theme, `${scale}.${value}`) ?? get(values, value)
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

const sizes = (options: any) => {
  return createVariant({
    prop: "size",
    themeKey: `components.${options.themeKey}.sizes`,
    values: options.sizes,
  })
}

const variants = (options: any) =>
  createVariant({
    prop: "variant",
    themeKey: `components.${options.themeKey}.variants`,
    values: options.variants,
  })

const baseStyle = (options: any) => (props: any) =>
  get(props.theme, `components.${options.themeKey}.baseStyle`)

export function createComponent(options: any) {
  const parser = combineParsers(sizes(options), variants(options))

  return (props: any) => {
    let result: any = {}
    const defaults = get(
      props.theme,
      `components.${options.themeKey}.defaultProps`,
    )

    for (const prop of parser.propNames) {
      props[prop] = props[prop] ?? defaults?.[prop]
      const base = baseStyle(options)(props)
      const out = merge(base ?? {}, parser(props) ?? {})
      result = merge(result, out)
    }

    return result
  }
}
