import { Dict, isEmptyObject, runIfFn, deepmerge } from "@chakra-ui/utils"
import { get } from "./get"
import css from "./css"
import { CSSObject } from "./css.types"

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

function hasThemingProps(props: any) {
  if (!props) return false
  return Object.keys(props).some(item =>
    Object.values(modifierMap).includes(item),
  )
}

export function getModifierStyles(
  props: Dict | undefined,
  themeKey: string | undefined,
  modifiers = Object.keys(modifierMap),
) {
  // if no theme key was passed or no prop was passed, bail out
  if (!themeKey || !props) return undefined

  // for nested component keys ("Menu.List"), let's split to get the parent and child
  const [parent, component] = themeKey.split(".")

  // check that the parent theme exists
  const itExists = get(props.theme, `components.${parent}`) != null

  if (!itExists) return undefined

  const defaultProps = get(props.theme, `components.${parent}.defaultProps`) as
    | Dict
    | undefined

  let styles: Dict = {}

  for (const modifier of modifiers) {
    const _modifier = modifierMap[modifier as keyof typeof modifierMap]

    const propValue = props[_modifier] ?? defaultProps?.[_modifier]

    if (!propValue) continue

    const styleObjectOrFn = get(
      props.theme,
      `components.${parent}.${modifier}.${propValue}`,
    )

    if (!styleObjectOrFn) continue

    const computedStyles = runIfFn(styleObjectOrFn, props)

    styles = isSubcomponent(themeKey)
      ? deepmerge(styles, computedStyles[component])
      : deepmerge(styles, computedStyles)
  }

  return styles
}

function has(val: any): val is object {
  return val && !isEmptyObject(val)
}

export function getComponentStyles(props: any, themeKey: string) {
  let styles: CSSObject = {}

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
