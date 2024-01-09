import { isObject } from "./utils/is-object.js"
import { printUnionMap } from "./extract-property-paths.js"

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

function esc(name: string) {
  return name.match(/^[a-zA-Z0-9\-_]+$/) ? name : `"${name}"`
}

export function printComponentTypes(
  componentTypes: Record<string, ComponentType>,
  strict = false,
) {
  const types = Object.entries(componentTypes)
    .map(
      ([componentName, unions]) =>
        `${esc(componentName)}: {
  ${printUnionMap(unions, strict)}
}`,
    )
    .join(`\n`)

  return `components: {
  ${types}  
}
`
}
