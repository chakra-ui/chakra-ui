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

export default function transformer(file: FileInfo, _api: API) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  let extendThemeImported = false
  let chakraImportPath: any = null

  // Check for extendTheme import
  root
    .find(j.ImportDeclaration, { source: { value: "@chakra-ui/react" } })
    .forEach((path) => {
      const specifiers = path.node.specifiers
      if (!specifiers) return
      const hasExtendTheme = specifiers.some(
        (s) =>
          s.type === "ImportSpecifier" && s.imported.name === "extendTheme",
      )
      if (hasExtendTheme) {
        extendThemeImported = true
        chakraImportPath = path
      }
    })

  if (!extendThemeImported) return root.toSource({ quote: "single" })

  const specifiers = chakraImportPath.node.specifiers
  chakraImportPath.node.specifiers = specifiers.filter(
    (s: any) =>
      !(s.type === "ImportSpecifier" && s.imported.name === "extendTheme"),
  )
  chakraImportPath.node.specifiers.push(
    j.importSpecifier(j.identifier("createSystem")),
    j.importSpecifier(j.identifier("defaultConfig")),
  )

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
        const tokensProp = j.property("init", j.identifier("tokens"), themeArg)
        const themeObj = j.objectExpression([tokensProp])
        path.node.init = j.callExpression(j.identifier("createSystem"), [
          j.identifier("defaultConfig"),
          j.objectExpression([
            j.property("init", j.identifier("theme"), themeObj),
          ]),
        ])
        path.node.id.name = "system"
      }
    }
  })

  return root.toSource({ quote: "single" })
}
