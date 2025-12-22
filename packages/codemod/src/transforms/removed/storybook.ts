import type { API, FileInfo, Options } from "jscodeshift"

/**
 * Codemod to migrate Chakra UI Storybook addon to @storybook/addon-themes
 *
 * Transformations:
 * 1. Remove @chakra-ui/storybook-addon imports
 * 2. Add @storybook/addon-themes imports
 * 3. Transform decorator from Chakra's to withThemeByClassName
 */

export default function transformer(
  file: FileInfo,
  api: API,
  _options: Options,
) {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasChanges = false

  // Only process .storybook files
  if (!file.path.includes(".storybook")) {
    return file.source
  }

  let needsStorybookImports = false
  let hasStorybookImports = false

  // Remove Chakra Storybook addon imports
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/storybook-addon" },
    })
    .forEach((path) => {
      needsStorybookImports = true
      j(path).remove()
      hasChanges = true
    })

  // Check for existing Storybook imports
  root
    .find(j.ImportDeclaration, {
      source: { value: "@storybook/addon-themes" },
    })
    .forEach(() => {
      hasStorybookImports = true
    })

  // Transform preview configuration
  root
    .find(j.VariableDeclarator, {
      id: { name: "preview" },
    })
    .forEach((path) => {
      if (path.node.init?.type === "ObjectExpression") {
        const properties = path.node.init.properties

        // Find decorators array
        const decoratorsProp = properties.find(
          (prop) =>
            prop.type === "Property" &&
            prop.key.type === "Identifier" &&
            prop.key.name === "decorators",
        )

        if (
          decoratorsProp &&
          decoratorsProp.type === "Property" &&
          decoratorsProp.value.type === "ArrayExpression"
        ) {
          // Check if there's a Chakra decorator to replace
          const hasChakraDecorator = decoratorsProp.value.elements.some(
            (elem) =>
              elem?.type === "CallExpression" || elem?.type === "Identifier",
          )

          if (hasChakraDecorator) {
            needsStorybookImports = true

            // Create new decorators array with withThemeByClassName
            const newDecorators = j.arrayExpression([
              // Add withThemeByClassName
              j.callExpression(j.identifier("withThemeByClassName"), [
                j.objectExpression([
                  j.property(
                    "init",
                    j.identifier("defaultTheme"),
                    j.literal("light"),
                  ),
                  j.property(
                    "init",
                    j.identifier("themes"),
                    j.objectExpression([
                      j.property("init", j.identifier("light"), j.literal("")),
                      j.property(
                        "init",
                        j.identifier("dark"),
                        j.literal("dark"),
                      ),
                    ]),
                  ),
                ]),
              ]),
              // Keep ChakraProvider wrapper if it exists
              ...decoratorsProp.value.elements.filter((elem) => {
                if (!elem) return false
                // Keep arrow functions that wrap ChakraProvider
                if (elem.type === "ArrowFunctionExpression") {
                  return true
                }
                return false
              }),
            ])

            decoratorsProp.value = newDecorators
            hasChanges = true
          }
        }
      }
    })

  // Add necessary imports
  if (needsStorybookImports && !hasStorybookImports) {
    // Add withThemeByClassName import
    const withThemeImport = j.importDeclaration(
      [j.importSpecifier(j.identifier("withThemeByClassName"))],
      j.literal("@storybook/addon-themes"),
    )

    // Add type imports
    const typeImports = j.importDeclaration(
      [
        j.importSpecifier(j.identifier("Preview")),
        j.importSpecifier(j.identifier("ReactRenderer")),
      ],
      j.literal("@storybook/react"),
    )
    typeImports.importKind = "type"

    // Insert imports
    const firstImport = root.find(j.ImportDeclaration).at(0)
    if (firstImport.length > 0) {
      firstImport.insertBefore(withThemeImport)
      firstImport.insertBefore(typeImports)
    } else {
      root.get().node.program.body.unshift(typeImports)
      root.get().node.program.body.unshift(withThemeImport)
    }

    hasChanges = true
  }

  // Add a comment with migration instructions if changes were made
  if (hasChanges) {
    const comment = j.commentBlock(
      `\n` +
        ` Chakra UI Storybook addon has been migrated to @storybook/addon-themes.\n` +
        ` Make sure to:\n` +
        ` 1. Install: npm install @storybook/addon-themes\n` +
        ` 2. Add to .storybook/main.ts addons: ['@storybook/addon-themes']\n` +
        ` 3. Review the decorators configuration below\n`,
      true,
      false,
    )

    const firstStatement = root.find(j.Program).get("body", 0)
    if (firstStatement) {
      firstStatement.node.comments = firstStatement.node.comments || []
      firstStatement.node.comments.unshift(comment)
    }
  }

  return hasChanges ? root.toSource() : file.source
}
