import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Image/Img component
 *
 * @example
 * // Rename Img to Image
 * import { Img } from '@chakra-ui/react'
 * <Img src="..." />
 * // becomes
 * import { Image } from '@chakra-ui/react'
 * <Image src="..." />
 *
 * @example
 * // Transform props
 * <Image fit="cover" align="center" fallbackSrc="..." />
 * // becomes
 * <Image objectFit="cover" objectPosition="center" />
 */
export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const { chakraLocalNames } = collectChakraLocalNames(j, root)

  if (chakraLocalNames.size === 0) return file.source

  // Track if we need to update imports
  let hasImgImport = false
  let hasImageImport = false

  // Transform Img components
  if (chakraLocalNames.has("Img")) {
    hasImgImport = true
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "Img" } },
      })
      .forEach((path) => {
        transformImageProps(j, path)
        // Rename Img to Image
        path.node.openingElement.name = j.jsxIdentifier("Image")
        if (path.node.closingElement) {
          path.node.closingElement.name = j.jsxIdentifier("Image")
        }
      })
  }

  // Transform Image components
  if (chakraLocalNames.has("Image")) {
    hasImageImport = true
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "Image" } },
      })
      .forEach((path) => {
        transformImageProps(j, path)
      })
  }

  // Update imports: Img -> Image
  if (hasImgImport) {
    root
      .find(j.ImportDeclaration, {
        source: { value: "@chakra-ui/react" },
      })
      .forEach((path) => {
        const specifiers = path.node.specifiers
        if (!specifiers) return

        path.node.specifiers = specifiers
          .map((spec) => {
            if (
              spec.type === "ImportSpecifier" &&
              spec.imported.name === "Img"
            ) {
              // If Image is already imported, remove Img
              if (hasImageImport) {
                return null
              }
              // Otherwise rename Img to Image
              return j.importSpecifier(j.identifier("Image"))
            }
            return spec
          })
          .filter(Boolean) as any[]
      })
  }

  return root.toSource({ quote: "single" })
}

/**
 * Transform Image/Img component props
 */
function transformImageProps(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []

  path.node.openingElement.attributes = attrs.flatMap((attr: any) => {
    if (attr.type !== "JSXAttribute") return attr

    // fit -> objectFit
    if (attr.name.name === "fit") {
      attr.name.name = "objectFit"
      return attr
    }

    // align -> objectPosition
    if (attr.name.name === "align") {
      attr.name.name = "objectPosition"
      return attr
    }

    // Remove fallback-related props
    if (
      attr.name.name === "fallback" ||
      attr.name.name === "fallbackSrc" ||
      attr.name.name === "ignoreFallback" ||
      attr.name.name === "fallbackStrategy"
    ) {
      return []
    }

    return attr
  })
}
