import { Dict, get, getWithDefault, isObject } from "@chakra-ui/utils"

export function hasTheme(props: PropsOrTheme): props is { theme: Dict } {
  return Boolean(isObject(props) && props.theme)
}

export const determineTheme = (props: PropsOrTheme) => {
  return hasTheme(props) ? props.theme : props
}

export function transformWithConfig(theme: Dict, value: any, config: any) {
  if (!config) return value

  const scale = get(theme, config.scale, config.fallbackScale)

  if (config.transform) {
    return config.transform(value, scale)
  }

  return getWithDefault(value, scale)
}

export type PropsOrTheme = Dict | { theme: Dict }
