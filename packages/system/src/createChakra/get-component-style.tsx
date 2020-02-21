import { Dict, isEmptyObject } from "@chakra-ui/utils"
import { get } from "@styled-system/css"
import css from "../css"
import { isSubcomponent, runIfFn } from "./create-chakra.utils"
import { CreateChakraOptions } from "./types"

function getBaseStyle(props: any, themeKey: string) {
  const [parent, component] = themeKey.split(".")
  const baseStyleOrFn = get(props.theme, `components.${parent}.baseStyle`)

  if (!baseStyleOrFn) return undefined

  let baseStyle = runIfFn(baseStyleOrFn, props)

  if (isSubcomponent(themeKey)) {
    baseStyle = baseStyle[component]
  }
  return baseStyle
}

function getVariantPropStyle(props: any, prop: any, themeKey: string) {
  const [parent, component] = themeKey.split(".")

  const defaultValue = get(
    props.theme,
    `components.${parent}.${prop}.__default`,
  )
  const value = props[prop] || defaultValue

  const ObjectOrFn = get(props.theme, `components.${parent}.${prop}.${value}`)

  if (!ObjectOrFn) return undefined

  let baseStyle = runIfFn(ObjectOrFn, props)
  if (isSubcomponent(themeKey)) {
    baseStyle = baseStyle[component]
  }
  return baseStyle
}

function getVariantStyle(props: any, themeKey: string) {
  let componentStyle = {}
  const themableProps = ["variantSize", "variant"] as const

  for (const prop of themableProps) {
    const styleObject = getVariantPropStyle(props, prop, themeKey)
    if (!styleObject) continue
    componentStyle = { ...componentStyle, ...styleObject }
  }

  return componentStyle
}

function getComponentStyles<P>(props: any, options?: CreateChakraOptions<P>) {
  let componentStyle: Dict = {}

  const themeKey = options?.themeKey
  if (!themeKey) return {}

  const baseStyleObject = getBaseStyle(props, themeKey)

  if (baseStyleObject && !isEmptyObject(baseStyleObject)) {
    const baseStyle = css(baseStyleObject)(props.theme)
    componentStyle = { ...componentStyle, ...baseStyle }
  }

  const variantStyleObject = getVariantStyle(props, themeKey)

  if (variantStyleObject && !isEmptyObject(variantStyleObject)) {
    const variantStyle = css(variantStyleObject)(props.theme)
    componentStyle = { ...componentStyle, ...variantStyle }
  }

  return componentStyle
}

export default getComponentStyles
