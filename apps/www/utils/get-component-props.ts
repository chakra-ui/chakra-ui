import { deepMerge } from "@/lib/deep-merge"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { kebabCase } from "scule"

export interface Properties {
  type: string
  isRequired: boolean
  defaultValue?: string | undefined
  description?: string | undefined
}

const sortEntries = (props: Record<string, any>): [string, Properties][] => {
  return Object.entries(props).sort(([, a], [, b]) => {
    if (a.isRequired && !b.isRequired) return -1
    if (!a.isRequired && b.isRequired) return 1
    if (a.defaultValue && !b.defaultValue) return -1
    if (!a.defaultValue && b.defaultValue) return 1
    return 0
  })
}

function getType(baseDir: string, componentName?: string): Record<string, any> {
  const path = join(
    process.cwd(),
    "public",
    "types",
    baseDir,
    `${componentName}.json`,
  )
  if (!existsSync(path)) return {}
  return JSON.parse(readFileSync(path, "utf-8"))
}

export function getComponentTypes(component: string) {
  const componentName = kebabCase(component)
  const arkTypes = getType("ark", componentName)
  const recipeTypes = getType("recipe", componentName)
  const componentTypes = getType("component", componentName)
  const staticTypes = getType("static", componentName)
  return deepMerge({}, arkTypes, recipeTypes, componentTypes, staticTypes)
}

export function getComponentProps(options: {
  component: string
  part?: string
  omit?: string[]
}) {
  const { component, part, omit } = options

  const componentTypes = getComponentTypes(component)
  const componentType = part ? componentTypes[part] : componentTypes

  if (!componentType?.props) return null

  return sortEntries(componentType.props).filter(
    ([name]) => !omit?.includes(name),
  )
}

export function propsToMdTable(props: {
  component: string
  part?: string
  omit?: string[]
}) {
  const properties = getComponentProps(props)

  if (!properties?.length) return null

  return `| Prop | Default | Type | Description |
| --- | --- | --- | --- |
${properties
  .map(
    ([name, property]) =>
      `| ${name} | ${property.defaultValue} | \`${property.type.replaceAll('"', "'").replaceAll("|", "\\|").replaceAll("\n", "\\n")}\` | ${property.description} |`,
  )
  .join("\n")}
`
}
