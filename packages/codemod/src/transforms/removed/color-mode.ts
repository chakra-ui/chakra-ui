import { execSync } from "child_process"
import fs from "fs"
import type { API, FileInfo, Options } from "jscodeshift"
import path from "path"
import { getProjectInfo } from "../../utils/get-project-info"

export default function transformer(
  file: FileInfo,
  api: API,
  _options: Options,
) {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasChanges = false
  const removedSpecifiers: { imported: string; local: string }[] = []

  // Detect usage of ColorMode features that require the snippet
  const colorModeFeatures = [
    "useColorMode",
    "ColorModeProvider",
    "LightMode",
    "DarkMode",
    "useColorModeValue",
  ]

  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers?.filter((spec) => {
        if (spec.type === "ImportSpecifier") {
          const importedName = (spec.imported as any).name as string
          const localName = (spec.local as any)?.name || importedName

          if (colorModeFeatures.includes(importedName)) {
            removedSpecifiers.push({ imported: importedName, local: localName })
            return false // Remove from @chakra-ui/react
          }

          const removedComponents = ["ColorModeScript"]
          return !removedComponents.includes(importedName)
        }
        return true
      })

      if (specifiers && specifiers.length !== path.node.specifiers?.length) {
        path.node.specifiers = specifiers
        hasChanges = true
      }

      if (path.node.specifiers?.length === 0) {
        j(path).remove()
        hasChanges = true
      }
    })

  // Remove ColorModeScript
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "ColorModeScript" } },
    })
    .forEach((path) => {
      j(path).remove()
      hasChanges = true
    })

  if (removedSpecifiers.length > 0) {
    const { componentsDir } = getProjectInfo(process.cwd())
    const componentName = "color-mode"

    // Check if snippet exists (simple check for .tsx, .jsx, .ts, .js)
    const extensions = [".tsx", ".jsx", ".ts", ".js"]
    const snippetExists = extensions.some((ext) =>
      fs.existsSync(path.join(componentsDir, `${componentName}${ext}`)),
    )

    if (!snippetExists) {
      try {
        // Install snippet
        execSync("npx @chakra-ui/cli snippet add color-mode --yes", {
          stdio: "inherit",
        })
      } catch (e) {
        console.error("Failed to install color-mode snippet", e)
      }
    }

    // Add import from snippet
    const snippetPath = `${componentsDir}/color-mode`
    let relativeImportPath = path.relative(
      path.dirname(file.path),
      path.join(process.cwd(), snippetPath),
    )
    if (!relativeImportPath.startsWith(".")) {
      relativeImportPath = "./" + relativeImportPath
    }
    relativeImportPath = relativeImportPath.split(path.sep).join("/")

    const newImport = j.importDeclaration(
      removedSpecifiers.map((s) =>
        j.importSpecifier(j.identifier(s.imported), j.identifier(s.local)),
      ),
      j.literal(relativeImportPath),
    )

    const firstImport = root.find(j.ImportDeclaration).at(0)
    if (firstImport.length > 0) {
      firstImport.insertAfter(newImport)
    } else {
      root.get().node.program.body.unshift(newImport)
    }
    hasChanges = true
  }

  return hasChanges ? root.toSource() : file.source
}
