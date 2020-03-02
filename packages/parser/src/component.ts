import { Dict, isEmptyObject, runIfFn, deepmerge } from "@chakra-ui/utils"
import { get } from "./get"
import css from "./css"

export function isSubcomponent(themeKey: string) {
  return themeKey.split(".").length > 1
}

export function getBaseStyle(props: Dict, themeKey: string) {
  const [parent, component] = themeKey.split(".")

  const baseStyleOrFn = get(props.theme, `components.${parent}.baseStyle`)
  if (!baseStyleOrFn) return undefined
  let baseStyle = runIfFn(baseStyleOrFn, props)

  if (isSubcomponent(themeKey)) {
    baseStyle = baseStyle[component]
  }

  return baseStyle
}

const modifierMap = {
  sizes: "size",
  variants: "variant",
}

export function getModifierStyles(
  props: Dict,
  themeKey: string,
  modifiers = Object.keys(modifierMap),
) {
  if (!themeKey) return undefined

  const [parent, component] = themeKey.split(".")

  const itExists = !!get(props.theme, `components.${parent}`)
  if (!itExists) return undefined

  const defaultProps = get(props.theme, `components.${parent}.defaultProps`)

  let styles: Dict = {}

  modifiers.forEach(modifier => {
    const _modifier = modifierMap[modifier as keyof typeof modifierMap]
    const value = props[_modifier] ?? defaultProps[_modifier]
    const styleObjectOrFn = get(
      props.theme,
      `components.${parent}.${modifier}.${value}`,
    )

    if (!styleObjectOrFn) return undefined
    const computedStyles = runIfFn(styleObjectOrFn, props)

    styles = isSubcomponent(themeKey)
      ? deepmerge(styles, computedStyles[component])
      : deepmerge(styles, computedStyles)
  })

  return styles
}

function has(val: any): val is object {
  return val && !isEmptyObject(val)
}

export function getComponentStyles(props: any, themeKey: string) {
  let styles: Dict = {}

  if (!themeKey) return undefined

  const baseStyleObject = getBaseStyle(props, themeKey)
  if (has(baseStyleObject)) {
    const baseStyle = css(baseStyleObject)(props.theme)
    styles = deepmerge(styles, baseStyle)
  }

  const modiferStyleObject = getModifierStyles(props, themeKey)
  if (has(modiferStyleObject)) {
    const modiferStyle = css(modiferStyleObject)(props.theme)
    styles = deepmerge(styles, modiferStyle)
  }

  return styles
}
