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

  function shouldNotWrapInValue(keyName: string): boolean {
    // Keys that should be skipped from transformation entirely
    const skipKeys = ["mdx", "components", "variants", "baseStyle"]
    if (skipKeys.includes(keyName)) return true

    return false
  }

  function transformThemeObject(objNode: any, ancestors: string[] = []) {
    if (!isObject(objNode)) return

    objNode.properties.forEach((prop: any) => {
      const keyName = prop.key?.name
      const value = prop.value

      // Skip certain keys entirely
      const skipKeys = ["styles", "components", "variants", "baseStyle", "mdx"]
      if (skipKeys.includes(keyName)) return

      const currentAncestors = [...ancestors, keyName]

      if (isObject(value)) {
        const isLeafMap = value.properties.every((p: any) => !isObject(p.value))

        if (isLeafMap) {
          value.properties.forEach((childProp: any) => {
            const childKey = childProp.key?.name

            // Don't wrap responsive values in textStyles or other excluded cases
            if (!shouldNotWrapInValue(childKey)) {
              if (childProp.value && !transformedNodes.has(childProp.value)) {
                const node = childProp.value
                const hasValue =
                  isObject(node) &&
                  node.properties.some((p: any) => p.key?.name === "value")
                if (!hasValue) {
                  childProp.value = j.objectExpression([
                    j.property("init", j.identifier("value"), node),
                  ])
                  transformedNodes.add(childProp.value)
                }
              }
            }
          })
        } else {
          transformThemeObject(value, currentAncestors)
        }
      } else if (isIdentifier(value)) {
        const varName = value.name
        root
          .find(j.VariableDeclarator, { id: { name: varName } })
          .forEach((decl) => {
            transformThemeObject(decl.node.init, currentAncestors)
          })
      }
    })
  }

  // Transform textStyles/layerStyles to wrap each style in { value: ... }
  function transformStyleObject(styleNode: any) {
    if (!isObject(styleNode)) return

    styleNode.properties.forEach((styleProp: any) => {
      const styleValue = styleProp.value

      // Skip if not an object (shouldn't happen in valid styles)
      if (!isObject(styleValue)) return

      // Check if already wrapped in { value: ... }
      const hasValue = styleValue.properties.some(
        (p: any) => p.key?.name === "value" || p.key?.value === "value",
      )

      if (hasValue) return

      // Check if this is a style definition (has CSS properties) or has description
      const hasDescription = styleValue.properties.some(
        (p: any) => p.key?.name === "description",
      )

      const cssProperties = styleValue.properties.filter(
        (p: any) => p.key?.name !== "description",
      )

      // If we have CSS properties, wrap them in { value: ... }
      if (cssProperties.length > 0) {
        const newProperties: any[] = []

        // Preserve description if it exists
        if (hasDescription) {
          const descProp = styleValue.properties.find(
            (p: any) => p.key?.name === "description",
          )
          if (descProp) {
            newProperties.push(descProp)
          }
        }

        // Wrap CSS properties in value
        newProperties.push(
          j.property(
            "init",
            j.identifier("value"),
            j.objectExpression(cssProperties),
          ),
        )

        styleProp.value = j.objectExpression(newProperties)
      }
    })
  }

  // Transform semantic tokens to use nested value syntax
  function transformSemanticTokens(semanticTokensNode: any) {
    if (!isObject(semanticTokensNode)) return

    function processSemanticToken(prop: any) {
      const value = prop.value
      if (!value) return

      if (!isObject(value)) {
        // Handle Literal values: 'teal.500' -> { value: 'teal.500' }
        prop.value = j.objectExpression([
          j.property("init", j.identifier("value"), value),
        ])
        return
      }

      const properties = value.properties
      // Check if it's already wrapped in { value: ... }
      const hasValue = properties.some(
        (p: any) =>
          (p.key?.type === "Identifier" && p.key?.name === "value") ||
          (p.key?.type === "Literal" && p.key?.value === "value"),
      )

      if (hasValue) return

      const hasConditions = properties.some((p: any) => {
        const name = p.key?.name || p.key?.value
        return (
          name === "default" ||
          (typeof name === "string" && name.startsWith("_"))
        )
      })

      if (hasConditions) {
        // Transform: { default: 'teal.500', _dark: 'teal.300' }
        // To: { value: { base: 'teal.500', _dark: 'teal.300' } }
        const transformedProps = properties.map((p: any) => {
          const condKey = p.key?.name || p.key?.value
          const newKey = condKey === "default" ? "base" : condKey

          let val = p.value
          // Flatten if already wrapped in { value: ... }
          if (isObject(val) && val.properties.length === 1) {
            const subProp = val.properties[0]
            const subKey = subProp.key?.name || subProp.key?.value
            if (subKey === "value") {
              val = subProp.value
            }
          }

          return j.property("init", j.identifier(newKey), val)
        })

        prop.value = j.objectExpression([
          j.property(
            "init",
            j.identifier("value"),
            j.objectExpression(transformedProps),
          ),
        ])
      } else {
        // Nested object, recurse
        properties.forEach((childProp: any) => {
          processSemanticToken(childProp)
        })
      }
    }

    semanticTokensNode.properties.forEach((categoryProp: any) => {
      const categoryValue = categoryProp.value
      if (isObject(categoryValue)) {
        categoryValue.properties.forEach((tokenProp: any) => {
          processSemanticToken(tokenProp)
        })
      }
    })
  }

  // Fix nested selectors in global styles by adding & prefix
  function fixGlobalStyleSelectors(globalStylesNode: any) {
    if (!globalStylesNode || !isObject(globalStylesNode)) return

    function processStyleObject(node: any, depth: number = 0) {
      if (!isObject(node)) return

      node.properties.forEach((prop: any) => {
        const key = prop.key?.name || prop.key?.value

        if (typeof key === "string" && isObject(prop.value)) {
          // Only fix selectors at depth > 0 (nested inside an element selector like 'body')
          if (depth > 0) {
            // Check if it's a class/element selector that doesn't already have &
            const needsAmpersand =
              (key.startsWith(".") || /^[a-z]/i.test(key)) &&
              !key.startsWith("&") &&
              !key.startsWith("*") &&
              !key.startsWith(":") && // pseudo-selectors like :hover don't need &
              !key.includes(",") // compound selectors like 'html, body' don't need &

            if (needsAmpersand) {
              prop.key = j.literal(`& ${key}`)
            }
          }
        }

        // Recursively process nested objects with increased depth
        if (isObject(prop.value)) {
          processStyleObject(prop.value, depth + 1)
        }
      })
    }

    processStyleObject(globalStylesNode)
  }

  // First pass: Find all extendTheme calls and track variable names
  root
    .find(j.CallExpression, { callee: { name: "extendTheme" } })
    .forEach((path) => {
      const parent = path.parent

      if (
        parent.value.type === "VariableDeclarator" &&
        parent.value.id.type === "Identifier"
      ) {
        const varName = parent.value.id.name
        themeVariableNames.add(varName)
      } else if (parent.value.type === "ExportDefaultDeclaration") {
        themeVariableNames.add("theme")
        themeVariableNames.add("system")
      }

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

      // Handle case where argument is a variable reference
      if (isIdentifier(argPath.value)) {
        themeVarName = argPath.value.name
        const declPath = root.find(j.VariableDeclarator, {
          id: { name: themeVarName as string },
        })

        if (declPath.length > 0) {
          declPath.forEach((decl) => {
            targetObjectPath = decl.get("init")
            j(decl.parent).remove()
          })
        }
      }

      // Ensure we have an object to work with
      if (!isObject(targetObjectPath.value)) {
        return
      }

      const properties = targetObjectPath.value.properties as any[]

      // 1. Extract and fix global styles
      const stylesIndex = properties.findIndex((p) => p.key?.name === "styles")
      let globalStyles = null
      if (stylesIndex !== -1) {
        const stylesProp = properties[stylesIndex]
        if (isObject(stylesProp.value)) {
          const globalProp = stylesProp.value.properties.find(
            (p: any) => p.key?.name === "global",
          )
          if (globalProp) {
            globalStyles = globalProp.value
            fixGlobalStyleSelectors(globalStyles)
          }
        }
        properties.splice(stylesIndex, 1)
      }

      // 2. Extract and transform textStyles
      const textStylesIndex = properties.findIndex(
        (p) => p.key?.name === "textStyles",
      )
      let textStyles = null
      if (textStylesIndex !== -1) {
        textStyles = properties[textStylesIndex].value
        // Transform textStyles to wrap values in { value: ... }
        transformStyleObject(textStyles)
        properties.splice(textStylesIndex, 1)
      }

      // 3. Extract and transform layerStyles
      const layerStylesIndex = properties.findIndex(
        (p) => p.key?.name === "layerStyles",
      )
      let layerStyles = null
      if (layerStylesIndex !== -1) {
        layerStyles = properties[layerStylesIndex].value
        // Transform layerStyles to wrap values in { value: ... }
        transformStyleObject(layerStyles)
        properties.splice(layerStylesIndex, 1)
      }

      // 4. Extract and transform semanticTokens
      const semanticTokensIndex = properties.findIndex(
        (p) => p.key?.name === "semanticTokens",
      )
      let semanticTokens = null
      if (semanticTokensIndex !== -1) {
        semanticTokens = properties[semanticTokensIndex].value
        // Transform semantic tokens
        transformSemanticTokens(semanticTokens)
        properties.splice(semanticTokensIndex, 1)
      }

      // 5. Remove config
      const configIndex = properties.findIndex((p) => p.key?.name === "config")
      if (configIndex !== -1) {
        properties.splice(configIndex, 1)
      }

      // 6. Identify regular tokens vs custom keys
      const standardTokenKeys = [
        "colors",
        "space",
        "fonts",
        "fontSizes",
        "fontWeights",
        "lineHeights",
        "letterSpacings",
        "sizes",
        "borders",
        "borderStyles",
        "borderWidths",
        "radii",
        "shadows",
        "zIndices",
        "breakpoints",
      ]

      const tokenProperties: any[] = []
      const customProperties: any[] = []

      properties.forEach((prop) => {
        const name = prop.key?.name
        if (standardTokenKeys.includes(name)) {
          tokenProperties.push(prop)
        } else {
          customProperties.push(prop)
        }
      })

      // Transform regular tokens
      if (tokenProperties.length > 0) {
        const tempObj = j.objectExpression(tokenProperties)
        transformThemeObject(tempObj)
      }

      // 7. Build the createSystem config object
      const themeProperties: any[] = []

      if (tokenProperties.length > 0) {
        themeProperties.push(
          j.property(
            "init",
            j.identifier("tokens"),
            j.objectExpression(tokenProperties),
          ),
        )
      }

      if (semanticTokens) {
        themeProperties.push(
          j.property("init", j.identifier("semanticTokens"), semanticTokens),
        )
      }

      if (textStyles) {
        themeProperties.push(
          j.property("init", j.identifier("textStyles"), textStyles),
        )
      }

      if (layerStyles) {
        themeProperties.push(
          j.property("init", j.identifier("layerStyles"), layerStyles),
        )
      }

      const configProperties: any[] = []

      if (globalStyles) {
        configProperties.push(
          j.property("init", j.identifier("globalCss"), globalStyles),
        )
      }

      if (themeProperties.length > 0) {
        configProperties.push(
          j.property(
            "init",
            j.identifier("theme"),
            j.objectExpression(themeProperties),
          ),
        )
      }

      // Add custom properties (like mdx) to the top level
      customProperties.forEach((prop) => {
        configProperties.push(prop)
      })

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
  root.find(j.ImportDefaultSpecifier).forEach((path) => {
    const localName = path.value.local?.name
    if (localName === "theme" || localName === "system") {
      themeVariableNames.add(localName)
    }
  })

  // Track variable declarations
  root.find(j.VariableDeclarator).forEach((path) => {
    if (path.value.id.type === "Identifier") {
      const varName = path.value.id.name
      if (varName === "theme" || varName === "system") {
        themeVariableNames.add(varName)
      }
    }
  })

  // Rename theme variables to system
  root.find(j.VariableDeclarator, { id: { name: "theme" } }).forEach((path) => {
    const init = path.value.init
    const isCreateSystemCall =
      init?.type === "CallExpression" &&
      init.callee?.type === "Identifier" &&
      init.callee.name === "createSystem"

    if (!isCreateSystemCall) {
      return
    }

    const newName = "system"
    themeVariableNames.delete("theme")
    themeVariableNames.add(newName)
    path.get("id").replace(j.identifier(newName))
  })

  // Update standalone 'theme' identifiers to 'system'
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

    if (!rootName || !themeVariableNames.has(rootName)) {
      return
    }

    const parts = buildTokenPath(node)
    if (parts.length === 0) return

    if (parts.length >= 2) {
      const tokenPath = parts.join(".")

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
