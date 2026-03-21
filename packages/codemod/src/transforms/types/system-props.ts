import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

export default function transform(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const { chakraLocalNames } = collectChakraLocalNames(j, root)

  if (chakraLocalNames.size === 0) {
    return file.source
  }

  let hasChakraSystemPropsImport = false

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value !== "@chakra-ui/react") return

    path.node.specifiers?.forEach((spec) => {
      if (
        spec.type === "ImportSpecifier" &&
        spec.imported.name === "SystemProps"
      ) {
        hasChakraSystemPropsImport = true
      }
    })
  })

  if (!hasChakraSystemPropsImport) {
    return file.source
  }

  root.find(j.Identifier, { name: "SystemProps" }).forEach((path) => {
    const parent = path.parent.node

    // Only touch type positions
    if (
      parent.type.startsWith("TS") ||
      parent.type === "TSTypeReference" ||
      parent.type === "TSIndexedAccessType"
    ) {
      path.node.name = "SystemStyleObject"
    }
  })

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value !== "@chakra-ui/react") return

    let systemPropsSpec: any = null
    let hasSystemStyleObject = false

    path.node.specifiers?.forEach((spec) => {
      if (spec.type !== "ImportSpecifier") return

      if (spec.imported.name === "SystemProps") {
        systemPropsSpec = spec
      }

      if (spec.imported.name === "SystemStyleObject") {
        hasSystemStyleObject = true
      }
    })

    if (!systemPropsSpec) return

    // Remove SystemProps
    path.node.specifiers = path.node.specifiers!.filter(
      (spec) => spec !== systemPropsSpec,
    )

    // Add SystemStyleObject if missing
    if (!hasSystemStyleObject) {
      path.node.specifiers!.push(
        j.importSpecifier(j.identifier("SystemStyleObject")),
      )
    }
  })

  return root.toSource({ quote: "single" })
}
