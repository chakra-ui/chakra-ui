import { Node, SyntaxKind } from "ts-morph"
import type { JsxElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const isTarget = (name: string) =>
    (name === "Show" || name === "Hide") && chakraLocalNames.has(name)

  const openings: Array<JsxElement | JsxSelfClosingElement> = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const el of openings) {
    const opening = Node.isJsxElement(el) ? el.getOpeningElement() : el
    const baseName = getJsxBaseName(opening.getTagNameNode())
    if (!isTarget(baseName)) continue

    const isShow = baseName === "Show"
    const propName = isShow ? "hideFrom" : "hideBelow"

    // Capture and remove the `below` prop.
    let belowInitializer: string | undefined
    const belowAttr = opening
      .getAttributes()
      .find(
        (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "below",
      )
    if (belowAttr && Node.isJsxAttribute(belowAttr)) {
      belowInitializer = belowAttr.getInitializer()?.getText()
      belowAttr.remove()
    }

    // Rename tag to Box (closing first, then opening).
    if (Node.isJsxElement(el)) {
      el.getClosingElement().getTagNameNode().replaceWithText("Box")
    }
    opening.getTagNameNode().replaceWithText("Box")

    opening.addAttribute({
      name: propName,
      initializer: belowInitializer,
    })
  }
}

export default transform
