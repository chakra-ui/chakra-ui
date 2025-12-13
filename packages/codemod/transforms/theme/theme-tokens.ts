import type { API, FileInfo, Node } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

function wrapTokenValues(j: any, obj: Node) {
  const objExpression = obj as any
  if (!objExpression.properties) return

  objExpression.properties.forEach((prop: any) => {
    if (prop.value.type === "ObjectExpression") {
      wrapTokenValues(j, prop.value)
    } else {
      prop.value = j.objectExpression([
        j.property("init", j.identifier("value"), prop.value),
      ])
    }
  })
}

export default function themeTransformer(file: FileInfo, _api: API) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === "@chakra-ui/react") {
      const specifiers = path.node.specifiers
      if (!specifiers) return
      path.node.specifiers = specifiers.filter((s) => {
        return !(
          s.type === "ImportSpecifier" && s.imported.name === "extendTheme"
        )
      })

      path.node.specifiers.push(
        j.importSpecifier(j.identifier("createSystem")),
        j.importSpecifier(j.identifier("defaultConfig")),
      )
    }
  })

  root.find(j.VariableDeclarator).forEach((path) => {
    if (
      path.node.id.type === "Identifier" &&
      path.node.id.name === "theme" &&
      path.node.init?.type === "CallExpression" &&
      path.node.init.callee.type === "Identifier" &&
      path.node.init.callee.name === "extendTheme"
    ) {
      const themeArg = path.node.init.arguments[0]
      if (themeArg?.type === "ObjectExpression") {
        wrapTokenValues(j, themeArg)
        path.node.init = j.callExpression(j.identifier("createSystem"), [
          j.identifier("defaultConfig"),
          j.objectExpression([
            j.property("init", j.identifier("theme"), themeArg),
          ]),
        ])

        path.node.id.name = "system"
      }
    }
  })

  return root.toSource({ quote: "single" })
}
