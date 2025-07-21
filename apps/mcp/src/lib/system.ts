import { defaultSystem } from "@chakra-ui/react/preset"
import { walkObject } from "./walk-object.js"

export const getSemanticTokens = () => {
  return Array.from(
    defaultSystem.tokens.categoryMap.get("colors")!.entries() as [string, any],
  )
    .filter(([, value]) => !!value.extensions.conditions)
    .map(([key]) => key)
}

export const getLayerStyles = () => {
  const layerStyles = defaultSystem._config.theme?.layerStyles ?? {}
  const keys = new Set<string>([])
  walkObject(
    layerStyles,
    (value, path) => {
      keys.add(path.join("."))
      return value
    },
    {
      stop(value) {
        return typeof value === "object" && "value" in value
      },
    },
  )
  return Array.from(keys)
}

export const getTextStyles = () => {
  const textStyles = defaultSystem._config.theme?.textStyles ?? {}
  const keys = new Set<string>([])
  walkObject(
    textStyles,
    (value, path) => {
      keys.add(path.join("."))
      return value
    },
    {
      stop(value) {
        return typeof value === "object" && "value" in value
      },
    },
  )
  return Array.from(keys)
}

export const tokenCategories = Array.from(
  defaultSystem.tokens.categoryMap.keys(),
)

export const getCategoryTokens = (category: string) => {
  return Array.from(
    defaultSystem.tokens.categoryMap.get(category)!.entries() as [string, any],
  )
    .filter(([, value]) => !value.extensions.conditions)
    .map(([key]) => key)
}
