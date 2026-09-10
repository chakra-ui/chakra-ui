import { Node, SyntaxKind } from "ts-morph"
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const FALLBACK_PROPS = [
  "fallback",
  "fallbackSrc",
  "ignoreFallback",
  "fallbackStrategy",
]

function transformImageProps(opening: JsxOpening) {
  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) continue
    const name = attr.getNameNode().getText()
    if (name === "fit") {
      attr.getNameNode().replaceWithText("objectFit")
    } else if (name === "align") {
      attr.getNameNode().replaceWithText("objectPosition")
    } else if (FALLBACK_PROPS.includes(name)) {
      attr.remove()
    }
  }
}

function renameTag(opening: JsxOpening, newText: string) {
  if (Node.isJsxSelfClosingElement(opening)) {
    opening.getTagNameNode().replaceWithText(newText)
    return
  }
  const el = opening.getParentIfKind(SyntaxKind.JsxElement)
  el?.getClosingElement()?.getTagNameNode().replaceWithText(newText)
  opening.getTagNameNode().replaceWithText(newText)
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const hasImg = chakraLocalNames.has("Img")
  const hasImage = chakraLocalNames.has("Image")
  if (!hasImg && !hasImage) return

  const openings: JsxOpening[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const opening of openings) {
    if (opening.wasForgotten()) continue
    const baseName = getJsxBaseName(opening.getTagNameNode())
    if (baseName === "Img" && hasImg) {
      transformImageProps(opening)
      renameTag(opening, "Image")
    } else if (baseName === "Image" && hasImage) {
      transformImageProps(opening)
    }
  }

  // Update imports: Img -> Image (or remove Img if Image already imported)
  if (hasImg) {
    const importDecl = sourceFile.getImportDeclaration(
      (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
    )
    const imgSpec = importDecl
      ?.getNamedImports()
      .find((n) => n.getName() === "Img")
    if (imgSpec) {
      if (hasImage) imgSpec.remove()
      else imgSpec.setName("Image")
    }
  }
}

export default transform
