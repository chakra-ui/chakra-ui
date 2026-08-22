import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

const CHAKRA_SOURCES = ["@chakra-ui/react", "@/components/ui"]

export default function transform(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const chakraLocalNames = new Set<string>()
  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value
    if (
      typeof source === "string" &&
      CHAKRA_SOURCES.some((s) => source.includes(s))
    ) {
      path.node.specifiers?.forEach((spec) => {
        if (spec.local) chakraLocalNames.add(spec.local.name as string)
      })
    }
  })

  if (chakraLocalNames.size === 0) return file.source

  const renameObjectProps = (objectNode: any) => {
    if (objectNode.type !== "ObjectExpression") return

    objectNode.properties.forEach((prop: any) => {
      if (prop.type === "Property" && !prop.computed) {
        const keyName =
          prop.key.type === "Identifier" ? prop.key.name : prop.key.value

        if (keyName === "spacing") {
          if (prop.key.type === "Identifier") {
            prop.key.name = "gap"
          } else {
            prop.key.value = "gap"
          }
        }
      }
    })
  }

  root.find(j.JSXOpeningElement).forEach((path) => {
    const nameNode = path.node.name
    let baseName = ""

    if (nameNode.type === "JSXIdentifier") {
      baseName = nameNode.name
    } else if (nameNode.type === "JSXMemberExpression") {
      let current: any = nameNode
      while (current.object) current = current.object
      baseName = current.name
    }

    if (!chakraLocalNames.has(baseName)) return

    j(path)
      .find(j.JSXAttribute)
      .forEach((attrPath) => {
        const name = attrPath.node.name
        if (name.type !== "JSXIdentifier") return

        if (name.name === "spacing") {
          name.name = "gap"
        }
      })

    j(path)
      .find(j.JSXSpreadAttribute)
      .forEach((spreadPath) => {
        const arg = spreadPath.node.argument
        if (arg.type === "ObjectExpression") {
          renameObjectProps(arg)
        }
      })
  })

  return root.toSource({ quote: "single" })
}
