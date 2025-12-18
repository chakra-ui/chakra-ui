import type { API, FileInfo, Options } from "jscodeshift"

/**
 * Codemod to migrate Chakra UI v2 color mode to v3 (next-themes)
 *
 * Transformations:
 * 1. Remove ColorModeProvider imports
 * 2. Replace useColorMode with useTheme from next-themes
 * 3. Replace useColorModeValue with conditional logic
 * 4. Replace LightMode/DarkMode with className
 * 5. Remove ColorModeScript
 */
export default function transformer(
  file: FileInfo,
  api: API,
  _options: Options,
) {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasChanges = false
  let needsUseTheme = false
  let hasNextThemesImport = false

  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers?.filter((spec) => {
        if (spec.type === "ImportSpecifier") {
          const removedComponents = [
            "ColorModeProvider",
            "LightMode",
            "DarkMode",
            "ColorModeScript",
            "useColorMode",
            "useColorModeValue",
          ]

          const name = spec.imported.name as string
          return !removedComponents.includes(name)
        }
        return true
      })

      if (specifiers && specifiers.length > 0) {
        path.node.specifiers = specifiers
        hasChanges = true
      } else {
        j(path).remove()
        hasChanges = true
      }
    })

  root
    .find(j.CallExpression, {
      callee: { name: "useColorMode" },
    })
    .forEach((path) => {
      // Replace with useTheme
      path.node.callee = j.identifier("useTheme")
      needsUseTheme = true
      hasChanges = true

      // If assigned to a variable, we need to update destructuring
      const parent = path.parent
      if (parent.node.type === "VariableDeclarator") {
        const id = parent.node.id
        if (id.type === "ObjectPattern") {
          // Map old properties to new ones
          id.properties = id.properties.map((prop: any) => {
            if (prop.type === "Property" && prop.key.type === "Identifier") {
              if (prop.key.name === "colorMode") {
                return j.property(
                  "init",
                  j.identifier("theme"),
                  j.identifier("theme"),
                )
              }
              if (prop.key.name === "setColorMode") {
                return j.property(
                  "init",
                  j.identifier("setTheme"),
                  j.identifier("setTheme"),
                )
              }
              if (prop.key.name === "toggleColorMode") {
                // toggleColorMode needs custom implementation
                return j.property(
                  "init",
                  j.identifier("setTheme"),
                  j.identifier("setTheme"),
                )
              }
            }
            return prop
          })
        }
      }
    })

  root
    .find(j.CallExpression, {
      callee: { name: "useColorModeValue" },
    })
    .forEach((path) => {
      const args = path.node.arguments.filter(
        (arg) => arg.type !== "SpreadElement",
      )

      if (args.length === 2) {
        const lightValue = args[0]
        const darkValue = args[1]

        const replacement = j.conditionalExpression(
          j.binaryExpression("===", j.identifier("theme"), j.literal("light")),
          lightValue,
          darkValue,
        )

        j(path).replaceWith(replacement)
        needsUseTheme = true
        hasChanges = true
      }
    })

  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: "LightMode" },
      },
    })
    .forEach((path) => {
      const children = path.node.children
      if (children && children.length > 0) {
        const div = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier("div"), [
            j.jsxAttribute(j.jsxIdentifier("className"), j.literal("light")),
          ]),
          j.jsxClosingElement(j.jsxIdentifier("div")),
          children,
        )
        j(path).replaceWith(div)
        hasChanges = true
      }
    })

  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: "DarkMode" },
      },
    })
    .forEach((path) => {
      const children = path.node.children
      if (children && children.length > 0) {
        const div = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier("div"), [
            j.jsxAttribute(j.jsxIdentifier("className"), j.literal("dark")),
          ]),
          j.jsxClosingElement(j.jsxIdentifier("div")),
          children,
        )
        j(path).replaceWith(div)
        hasChanges = true
      }
    })

  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: "ColorModeScript" },
      },
    })
    .forEach((path) => {
      j(path).remove()
      hasChanges = true
    })

  if (needsUseTheme) {
    root
      .find(j.ImportDeclaration, {
        source: { value: "next-themes" },
      })
      .forEach(() => {
        hasNextThemesImport = true
      })

    if (!hasNextThemesImport) {
      const newImport = j.importDeclaration(
        [j.importSpecifier(j.identifier("useTheme"))],
        j.literal("next-themes"),
      )

      const firstImport = root.find(j.ImportDeclaration).at(0)
      if (firstImport.length > 0) {
        firstImport.insertAfter(newImport)
      } else {
        root.get().node.program.body.unshift(newImport)
      }
      hasChanges = true
    }
  }

  return hasChanges ? root.toSource() : file.source
}
