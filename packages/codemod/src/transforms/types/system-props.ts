import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const chakraImports = sourceFile
    .getImportDeclarations()
    .filter((d) => d.getModuleSpecifierValue() === "@chakra-ui/react")

  const hasChakraSystemPropsImport = chakraImports.some((d) =>
    d.getNamedImports().some((n) => n.getName() === "SystemProps"),
  )

  if (!hasChakraSystemPropsImport) return

  // Rename `SystemProps` -> `SystemStyleObject`, but only when it appears in a
  // type position (inside a type reference / indexed access type).
  const ranges: Array<[number, number]> = []
  for (const id of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
    if (id.getText() !== "SystemProps") continue
    const parent = id.getParent()
    if (!parent) continue
    if (
      Node.isTypeReference(parent) ||
      Node.isIndexedAccessTypeNode(parent) ||
      parent.getKindName().startsWith("TS")
    ) {
      ranges.push([id.getStart(), id.getEnd()])
    }
  }

  // Apply replacements from last to first so earlier positions stay valid.
  ranges.sort((a, b) => b[0] - a[0])
  for (const [start, end] of ranges) {
    sourceFile.replaceText([start, end], "SystemStyleObject")
  }

  // Update imports: remove `SystemProps`, add `SystemStyleObject` if missing.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/react") continue

    const named = importDecl.getNamedImports()
    const systemPropsSpec = named.find((n) => n.getName() === "SystemProps")
    if (!systemPropsSpec) continue

    const hasSystemStyleObject = named.some(
      (n) => n.getName() === "SystemStyleObject",
    )

    systemPropsSpec.remove()

    if (!hasSystemStyleObject) {
      importDecl.addNamedImport("SystemStyleObject")
    }
  }
}

export default transform
