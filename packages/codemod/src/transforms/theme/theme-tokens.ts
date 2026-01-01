import type { API, FileInfo } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(file: FileInfo, _api: API) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  // --- 1. CONFIGURATION & UTILS ---
  const CHAKRA_PACKAGES = ["@chakra-ui/react", "@chakra-ui/core"]
  const transformedNodes = new Set()

  const isObject = (node: any) => node?.type === "ObjectExpression"
  const isIdentifier = (node: any) => node?.type === "Identifier"

  /**
   * Wraps a value in { value: x } if not already wrapped.
   */
  function wrapValue(path: any) {
    if (!path.value || transformedNodes.has(path.value)) return
    const node = path.value

    if (isObject(node)) {
      const hasValue = node.properties.some((p: any) => p.key?.name === "value")
      if (hasValue) return
    }

    path.replace(
      j.objectExpression([j.property("init", j.identifier("value"), node)]),
    )
    transformedNodes.add(path.value)
  }

  /**
   * Recursively traverses an object and follows Identifiers to their declarations.
   */
  function transformThemeObject(objPath: any) {
    if (!objPath || !isObject(objPath.value)) return

    objPath.get("properties").each((prop: any) => {
      const keyName = prop.value.key?.name
      const valuePath = prop.get("value")

      // Skip non-token top-level keys
      if (["styles", "components", "variants", "baseStyle"].includes(keyName))
        return

      if (isObject(valuePath.value)) {
        const isLeafMap = valuePath.value.properties.every(
          (p: any) => !isObject(p.value),
        )
        if (isLeafMap) {
          valuePath.get("properties").each((childProp: any) => {
            wrapValue(childProp.get("value"))
          })
        } else {
          transformThemeObject(valuePath)
        }
      } else if (isIdentifier(valuePath.value)) {
        const varName = valuePath.value.name
        root
          .find(j.VariableDeclarator, { id: { name: varName } })
          .forEach((decl) => {
            transformThemeObject(decl.get("init"))
          })
      }
    })
  }

  // --- 2. TRANSFORM CALL SITES (The "Heavy Lifting") ---
  root
    .find(j.CallExpression, { callee: { name: "extendTheme" } })
    .forEach((path) => {
      const argPath = path.get("arguments", 0)
      let targetObjectPath = argPath

      // Follow variable if extendTheme(variable)
      if (isIdentifier(argPath.value)) {
        const varName = argPath.value.name
        root
          .find(j.VariableDeclarator, { id: { name: varName } })
          .forEach((decl) => {
            targetObjectPath = decl.get("init")
          })
      }

      transformThemeObject(targetObjectPath)

      path.replace(
        j.callExpression(j.identifier("createSystem"), [
          j.identifier("defaultConfig"),
          j.objectExpression([
            j.property(
              "init",
              j.identifier("theme"),
              j.objectExpression([
                j.property(
                  "init",
                  j.identifier("tokens"),
                  targetObjectPath.value,
                ),
              ]),
            ),
          ]),
        ]),
      )
    })

  // --- 3. CLEAN UP IMPORTS ---
  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value as string
    if (CHAKRA_PACKAGES.includes(source) || source.startsWith("@chakra-ui/")) {
      path.node.source.value = "@chakra-ui/react"

      // Filter out extendTheme from imports
      path.node.specifiers = path.node.specifiers?.filter(
        (s) =>
          !(s.type === "ImportSpecifier" && s.imported.name === "extendTheme"),
      )

      const names = path.node.specifiers?.map((s: any) => s.imported?.name)
      if (!names?.includes("createSystem")) {
        path.node.specifiers?.push(
          j.importSpecifier(j.identifier("createSystem")),
        )
      }
      if (!names?.includes("defaultConfig")) {
        path.node.specifiers?.push(
          j.importSpecifier(j.identifier("defaultConfig")),
        )
      }

      // If the import is now empty (only extendTheme was there), remove the whole line
      if (path.node.specifiers?.length === 0) {
        j(path).remove()
      }
    }
  })

  // --- 4. RENAME THEME VARIABLE & PROVIDER PROP ---
  root.find(j.VariableDeclarator, { id: { name: "theme" } }).forEach((path) => {
    path.get("id").replace(j.identifier("system"))
  })

  root.find(j.Identifier, { name: "theme" }).forEach((path) => {
    const parent = path.parent.node
    if (parent.type !== "Property" || parent.value === path.node) {
      if (
        parent.type !== "JSXAttribute" &&
        parent.type !== "MemberExpression"
      ) {
        path.node.name = "system"
      }
    }
  })

  root
    .find(j.JSXOpeningElement, { name: { name: "ChakraProvider" } })
    .forEach((path) => {
      path.get("attributes").each((attr: any) => {
        if (attr.value.name?.name === "theme") {
          attr.get("name").replace(j.jsxIdentifier("value"))
        }
      })
    })

  // --- 5. FINAL SAFETY: REMOVE ANY REMAINING extendTheme DECLARATIONS ---
  // This handles cases where extendTheme might have been aliased or declared locally
  root.find(j.VariableDeclarator, { id: { name: "extendTheme" } }).remove()
  root.find(j.FunctionDeclaration, { id: { name: "extendTheme" } }).remove()

  return root.toSource({ quote: "single", trailingComma: true })
}
