import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import { SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import { getProjectInfo } from "../../utils/get-project-info"

// Features that require the color-mode snippet.
const COLOR_MODE_FEATURES = [
  "useColorMode",
  "ColorModeProvider",
  "LightMode",
  "DarkMode",
  "useColorModeValue",
]

const REMOVED_COMPONENTS = ["ColorModeScript"]

const transform: Transform = (sourceFile, ctx) => {
  const removedSpecifiers: { imported: string; local: string }[] = []

  // Remove color-mode imports from @chakra-ui/react, tracking the local names.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/react") continue

    for (const named of importDecl.getNamedImports()) {
      const importedName = named.getName()
      const localName = named.getAliasNode()?.getText() ?? importedName

      if (COLOR_MODE_FEATURES.includes(importedName)) {
        removedSpecifiers.push({ imported: importedName, local: localName })
        named.remove()
      } else if (REMOVED_COMPONENTS.includes(importedName)) {
        named.remove()
      }
    }

    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove()
    }
  }

  // Remove <ColorModeScript /> elements.
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    if (el.wasForgotten()) continue
    if (
      el.getOpeningElement().getTagNameNode().getText() === "ColorModeScript"
    ) {
      el.replaceWithText("")
    }
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (el.wasForgotten()) continue
    if (el.getTagNameNode().getText() === "ColorModeScript") {
      el.replaceWithText("")
    }
  }

  if (removedSpecifiers.length > 0) {
    const { componentsDir } = getProjectInfo(process.cwd())
    const componentName = "color-mode"

    // Check if snippet exists (simple check for .tsx, .jsx, .ts, .js).
    const extensions = [".tsx", ".jsx", ".ts", ".js"]
    const snippetExists = extensions.some((ext) =>
      fs.existsSync(path.join(componentsDir, `${componentName}${ext}`)),
    )

    if (!snippetExists && !ctx.dry) {
      try {
        execSync("npx --yes @chakra-ui/cli snippet add color-mode", {
          stdio: "ignore",
        })
      } catch {
        console.error(
          "Could not auto-install the color-mode snippet. Run `npx @chakra-ui/cli snippet add color-mode` manually.",
        )
      }
    }

    // Compute the relative import path to the snippet.
    const snippetPath = `${componentsDir}/color-mode`
    let relativeImportPath = path.relative(
      path.dirname(ctx.filePath),
      path.join(process.cwd(), snippetPath),
    )
    if (!relativeImportPath.startsWith(".")) {
      relativeImportPath = "./" + relativeImportPath
    }
    relativeImportPath = relativeImportPath.split(path.sep).join("/")

    const namedImports = removedSpecifiers.map((s) => ({
      name: s.imported,
      alias: s.local !== s.imported ? s.local : undefined,
    }))

    const imports = sourceFile.getImportDeclarations()
    const insertIndex = imports.length > 0 ? 1 : 0
    sourceFile.insertImportDeclaration(insertIndex, {
      namedImports,
      moduleSpecifier: relativeImportPath,
    })
  }
}

export default transform
