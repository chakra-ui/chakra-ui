import type { API, FileInfo } from "jscodeshift"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(file: FileInfo, _api: API) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const CHAKRA_PACKAGES = ["@chakra-ui/react"]
  const transformedNodes = new Set()

  const isObject = (node: any) => node?.type === "ObjectExpression"
  const isIdentifier = (node: any) => node?.type === "Identifier"

  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  let hasExtendThemeImport = false

  const themeVariableNames = new Set<string>()

  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value as string
    if (CHAKRA_PACKAGES.includes(source) || source.startsWith("@chakra-ui/")) {
      path.node.specifiers?.forEach((s) => {
        if (s.type === "ImportSpecifier" && s.imported.name === "extendTheme") {
          hasExtendThemeImport = true
        }
      })
    }
  })

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

  function extractGlobalStyles(objPath: any): any {
    if (!objPath || !isObject(objPath.value)) return null

    const properties = objPath.value.properties
    const stylesIndex = properties.findIndex(
      (p: any) => p.key?.name === "styles",
    )

    if (stylesIndex === -1) return null

    const stylesProp = properties[stylesIndex]
    if (!isObject(stylesProp.value)) return null

    const globalProp = stylesProp.value.properties.find(
      (p: any) => p.key?.name === "global",
    )
    if (!globalProp) return null

    // Remove styles property from the object
    properties.splice(stylesIndex, 1)

    return globalProp.value
  }

  function transformThemeObject(objPath: any) {
    if (!objPath || !isObject(objPath.value)) return
    objPath.get("properties").each((prop: any) => {
      const keyName = prop.value.key?.name
      const valuePath = prop.get("value")
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

  // First pass: Find all extendTheme calls and track variable names
  root
    .find(j.CallExpression, { callee: { name: "extendTheme" } })
    .forEach((path) => {
      // Check if this extendTheme call is assigned to a variable or exported
      const parent = path.parent

      if (
        parent.value.type === "VariableDeclarator" &&
        parent.value.id.type === "Identifier"
      ) {
        // const theme = extendTheme(...)
        const varName = parent.value.id.name
        themeVariableNames.add(varName)
      } else if (parent.value.type === "ExportDefaultDeclaration") {
        // export default extendTheme(...)
        // In this case, track imports of this file in other files would use their import name
        // For now, we'll track 'theme' and 'system' as common names
        themeVariableNames.add("theme")
        themeVariableNames.add("system")
      }

      // Also check if the argument is a variable reference
      const argPath = path.get("arguments", 0)
      if (isIdentifier(argPath.value)) {
        const themeVarName = argPath.value.name
        themeVariableNames.add(themeVarName)
      }
    })

  // Second pass: Transform the extendTheme calls
  root
    .find(j.CallExpression, { callee: { name: "extendTheme" } })
    .forEach((path) => {
      const argPath = path.get("arguments", 0)
      let targetObjectPath = argPath
      let themeVarName: string | null = null

      if (isIdentifier(argPath.value)) {
        themeVarName = argPath.value.name
        root
          .find(j.VariableDeclarator, { id: { name: themeVarName as string } })
          .forEach((decl) => {
            targetObjectPath = decl.get("init")
            // Remove the theme variable declaration
            j(decl.parent).remove()
          })
      }

      // Extract global styles before transformation
      const globalStyles = extractGlobalStyles(targetObjectPath)

      // Transform the rest of the theme object
      transformThemeObject(targetObjectPath)

      // Build the createSystem config object
      const configProperties = []

      // Add globalCss if we have global styles
      if (globalStyles) {
        configProperties.push(
          j.property("init", j.identifier("globalCss"), globalStyles),
        )
      }

      // Add theme.tokens
      configProperties.push(
        j.property(
          "init",
          j.identifier("theme"),
          j.objectExpression([
            j.property("init", j.identifier("tokens"), targetObjectPath.value),
          ]),
        ),
      )

      path.replace(
        j.callExpression(j.identifier("createSystem"), [
          j.identifier("defaultConfig"),
          j.objectExpression(configProperties),
        ]),
      )
    })

  if (hasExtendThemeImport) {
    root.find(j.ImportDeclaration).forEach((path) => {
      const source = path.node.source.value as string
      if (
        CHAKRA_PACKAGES.includes(source) ||
        source.startsWith("@chakra-ui/")
      ) {
        path.node.source.value = "@chakra-ui/react"
        path.node.specifiers = path.node.specifiers?.filter(
          (s) =>
            !(
              s.type === "ImportSpecifier" && s.imported.name === "extendTheme"
            ),
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
        if (path.node.specifiers?.length === 0) {
          j(path).remove()
        }
      }
    })
  }

  // Track default imports that might be theme/system
  // Look for imports where the source exports a createSystem call
  root.find(j.ImportDefaultSpecifier).forEach((path) => {
    const localName = path.value.local?.name
    // Add common theme variable names
    if (localName === "theme" || localName === "system") {
      themeVariableNames.add(localName)
    }
  })

  // Track variable declarations
  root.find(j.VariableDeclarator).forEach((path) => {
    if (path.value.id.type === "Identifier") {
      const varName = path.value.id.name
      // If the variable is named 'theme' or 'system', track it
      if (varName === "theme" || varName === "system") {
        themeVariableNames.add(varName)
      }
    }
  })

  // Rename theme variables to system
  root.find(j.VariableDeclarator, { id: { name: "theme" } }).forEach((path) => {
    // Check if this is a createSystem call (already transformed)
    const init = path.value.init
    const isCreateSystemCall =
      init?.type === "CallExpression" &&
      init.callee?.type === "Identifier" &&
      init.callee.name === "createSystem"

    if (!isCreateSystemCall) {
      // Only rename if it's not the createSystem result
      return
    }

    const newName = "system"
    themeVariableNames.delete("theme")
    themeVariableNames.add(newName)
    path.get("id").replace(j.identifier(newName))
  })

  // Update standalone 'theme' identifiers to 'system' (but not in member expressions or properties)
  root.find(j.Identifier, { name: "theme" }).forEach((path) => {
    const parent = path.parent.node
    if (parent.type !== "Property" || parent.value === path.node) {
      if (
        parent.type !== "JSXAttribute" &&
        parent.type !== "MemberExpression" &&
        parent.type !== "VariableDeclarator" &&
        parent.type !== "ImportDefaultSpecifier"
      ) {
        if (themeVariableNames.has("theme")) {
          path.node.name = "system"
        }
      }
    }
  })

  root
    .find(j.JSXOpeningElement)
    .filter((p) => {
      const baseName = getJsxBaseName(p.node.name)
      return baseName === "ChakraProvider" || chakraLocalNames.has(baseName)
    })
    .forEach((path) => {
      path.get("attributes").each((attr: any) => {
        if (attr.value?.name?.name === "theme") {
          attr.get("name").replace(j.jsxIdentifier("value"))
        }
      })
    })

  root.find(j.VariableDeclarator, { id: { name: "extendTheme" } }).remove()
  root.find(j.FunctionDeclaration, { id: { name: "extendTheme" } }).remove()

  // Helper functions for token transformation
  function buildTokenPath(node: any): string[] {
    const parts: string[] = []
    let current = node

    while (current && current.type === "MemberExpression") {
      if (current.property.type === "Identifier" && !current.computed) {
        parts.unshift(current.property.name)
      } else if (current.property.type === "Literal") {
        parts.unshift(String(current.property.value))
      } else if (current.property.type === "Identifier" && current.computed) {
        // Dynamic key, can't transform statically
        return []
      }
      current = current.object
    }

    return parts
  }

  function getRootIdentifier(node: any): string | null {
    let current = node
    while (current && current.type === "MemberExpression") {
      current = current.object
    }
    if (current && current.type === "Identifier") {
      return current.name
    }
    return null
  }

  // Transform all theme token accesses to .token() calls
  root.find(j.MemberExpression).forEach((path) => {
    const node = path.node
    const rootName = getRootIdentifier(node)

    // Check if this is accessing a tracked theme variable
    if (!rootName || !themeVariableNames.has(rootName)) {
      return
    }

    // Build the full token path
    const parts = buildTokenPath(node)
    if (parts.length === 0) return

    // Check if this looks like a token access (e.g., colors.gray.200, fontSizes.xl)
    // Token accesses typically have at least 2 parts
    if (parts.length >= 2) {
      const tokenPath = parts.join(".")

      // Replace with rootName.token("path")
      path.replace(
        j.callExpression(
          j.memberExpression(j.identifier(rootName), j.identifier("token")),
          [j.literal(tokenPath)],
        ),
      )
    }
  })

  return root.toSource({ quote: "single", trailingComma: true })
}
