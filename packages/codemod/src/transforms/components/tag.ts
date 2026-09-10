import { SyntaxKind } from "ts-morph"
import type { Node } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const MAPPING: Record<string, string> = {
  Tag: "Tag.Root",
  TagLeftIcon: "Tag.StartElement",
  TagRightIcon: "Tag.EndElement",
  TagLabel: "Tag.Label",
  TagCloseButton: "Tag.CloseTrigger",
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const resolve = (tagNode: Node): string | undefined => {
    const base = getJsxBaseName(tagNode)
    if (!chakraLocalNames.has(base)) return undefined
    return MAPPING[base]
  }

  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const opening = el.getOpeningElement()
    const to = resolve(opening.getTagNameNode())
    if (!to) continue
    // Rename the closing tag first (later position) so the opening tag's
    // position stays stable.
    el.getClosingElement()?.getTagNameNode().replaceWithText(to)
    opening.getTagNameNode().replaceWithText(to)
  }

  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    const to = resolve(el.getTagNameNode())
    if (!to) continue
    el.getTagNameNode().replaceWithText(to)
  }
}

export default transform
