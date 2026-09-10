import { Node } from "ts-morph"
import type { Transform } from "../../transform"

const transform: Transform = (sourceFile, ctx) => {
  if (!ctx.filePath.includes(".storybook")) return

  let hasChanges = false
  let needsStorybookImports = false
  let hasStorybookImports = false

  // Remove @chakra-ui/storybook-addon imports.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/storybook-addon")
      continue
    needsStorybookImports = true
    importDecl.remove()
    hasChanges = true
  }

  // Detect existing @storybook/addon-themes import.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() === "@storybook/addon-themes") {
      hasStorybookImports = true
    }
  }

  // Rewrite the `preview` decorators.
  for (const decl of sourceFile.getVariableDeclarations()) {
    if (decl.getName() !== "preview") continue
    const init = decl.getInitializer()
    if (!init || !Node.isObjectLiteralExpression(init)) continue

    const decoratorsProp = init.getProperty("decorators")
    if (!decoratorsProp || !Node.isPropertyAssignment(decoratorsProp)) continue

    const decoratorsValue = decoratorsProp.getInitializer()
    if (!decoratorsValue || !Node.isArrayLiteralExpression(decoratorsValue))
      continue

    const elements = decoratorsValue.getElements()
    const hasChakraDecorator = elements.some(
      (elem) => Node.isCallExpression(elem) || Node.isIdentifier(elem),
    )

    if (!hasChakraDecorator) continue

    needsStorybookImports = true

    const arrowFns = elements
      .filter((elem) => Node.isArrowFunction(elem))
      .map((elem) => elem.getText())

    const newDecorators = [
      `withThemeByClassName({\n` +
        `  defaultTheme: "light",\n` +
        `  themes: {\n` +
        `    light: "",\n` +
        `    dark: "dark"\n` +
        `  }\n` +
        `})`,
      ...arrowFns,
    ].join(",\n")

    decoratorsValue.replaceWithText(`[\n${newDecorators}\n]`)
    hasChanges = true
  }

  if (needsStorybookImports && !hasStorybookImports) {
    sourceFile.insertImportDeclaration(0, {
      namedImports: ["withThemeByClassName"],
      moduleSpecifier: "@storybook/addon-themes",
    })
    sourceFile.insertImportDeclaration(1, {
      isTypeOnly: true,
      namedImports: ["Preview", "ReactRenderer"],
      moduleSpecifier: "@storybook/react",
    })
    hasChanges = true
  }

  if (hasChanges) {
    const comment =
      `/*\n` +
      ` Chakra UI Storybook addon has been migrated to @storybook/addon-themes.\n` +
      ` Make sure to:\n` +
      ` 1. Install: npm install @storybook/addon-themes\n` +
      ` 2. Add to .storybook/main.ts addons: ['@storybook/addon-themes']\n` +
      ` 3. Review the decorators configuration below\n` +
      `*/`

    const firstStatement = sourceFile.getStatements()[0]
    if (firstStatement) {
      sourceFile.insertText(firstStatement.getStart(), `${comment}\n`)
    }
  }
}

export default transform
