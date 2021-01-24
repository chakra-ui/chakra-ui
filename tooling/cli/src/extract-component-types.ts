import { isObject } from "@chakra-ui/utils"
import { printUnionMap } from "./extract-property-paths"

interface ComponentType extends Record<string, string[]> {
  sizes: string[]
  variants: string[]
}

export function extractComponentTypes(theme: Record<string, unknown>) {
  const components = theme.components
  if (!isObject(components)) {
    return {}
  }

  return Object.entries(components).reduce(
    (allDefs, [componentName, definition]) => {
      if (definition) {
        allDefs[componentName] = {
          sizes: Object.keys(definition.sizes ?? {}),
          variants: Object.keys(definition.variants ?? {}),
        }
      }

      return allDefs
    },
    {} as Record<string, ComponentType>,
  )
}

export function printComponentTypes(
  componentTypes: Record<string, ComponentType>,
) {
  const types = Object.entries(componentTypes).map(
    ([componentName, unions]) =>
      `${componentName}: {
  ${printUnionMap(unions)}
}`,
  )

  return `components: {
  ${types}  
}
`
}
