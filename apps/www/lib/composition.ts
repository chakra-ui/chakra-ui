import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { Project } from "ts-morph"

/**
 * Transform example code using ts-morph AST manipulation
 */
function transformCode(content: string): string {
  const project = new Project({
    useInMemoryFileSystem: true,
    skipLoadingLibFiles: true,
  })

  const sourceFile = project.createSourceFile("temp.tsx", content)

  // Transform all import declarations
  sourceFile.getImportDeclarations().forEach((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    // Replace compositions/ui with @/components/ui
    if (moduleSpecifier.startsWith("compositions/ui")) {
      const newSpecifier = moduleSpecifier.replace(
        "compositions/ui",
        "@/components/ui",
      )
      importDecl.setModuleSpecifier(newSpecifier)
    }

    // Handle DecorativeBox -> Box conversion
    if (moduleSpecifier === "compositions/lib/decorative-box") {
      // Find or create @chakra-ui/react import
      let chakraImport = sourceFile.getImportDeclaration("@chakra-ui/react")

      if (chakraImport) {
        // Add Box to existing Chakra import if not already present
        const namedImports = chakraImport.getNamedImports()
        const hasBox = namedImports.some((imp) => imp.getName() === "Box")

        if (!hasBox) {
          chakraImport.addNamedImport("Box")
        }

        // Remove DecorativeBox import (will be removed after iteration)
        importDecl.remove()
      } else {
        // Replace DecorativeBox import with Box import
        importDecl.setModuleSpecifier("@chakra-ui/react")
        importDecl.getNamedImports().forEach((namedImport) => {
          if (namedImport.getName() === "DecorativeBox") {
            namedImport.setName("Box")
          }
        })
      }
    }
  })

  // Transform export declarations: export const ComponentName -> const Demo
  sourceFile.getVariableStatements().forEach((statement) => {
    if (statement.isExported()) {
      const declarations = statement.getDeclarations()
      declarations.forEach((decl) => {
        const name = decl.getName()
        // Only rename if it's an exported const with arrow function
        const initializer = decl.getInitializer()
        if (initializer?.getKindName() === "ArrowFunction") {
          decl.rename("Demo")
          statement.setIsExported(false)
        }
      })
    }
  })

  // Get transformed text
  let transformedContent = sourceFile.getFullText()

  // Replace DecorativeBox component usages with Box
  // (Still using string replacement for JSX elements as ts-morph JSX manipulation is complex)
  transformedContent = transformedContent.replaceAll("DecorativeBox", "Box")

  // Ensure empty line between imports and const Demo
  transformedContent = transformedContent.replace(
    /(\n)(const Demo = )/,
    "\n\n$2",
  )

  return transformedContent
}

export const readExampleFile = async (
  name: string,
  scope: "examples" | "ui" = "examples",
  ext = "tsx",
) => {
  const filePath = resolve("../compositions/src", scope, `${name}.${ext}`)

  const fileContent = await readFile(filePath, "utf-8")

  // Transform all code using ts-morph
  return transformCode(fileContent)
}
