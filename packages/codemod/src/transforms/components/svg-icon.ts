import { Node, SyntaxKind } from "ts-morph"
import type { Transform, TransformContext } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const transform: Transform = (sourceFile, ctx) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const elements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)
  for (const el of elements.reverse()) {
    if (el.wasForgotten()) continue
    const opening = el.getOpeningElement()
    const baseName = getJsxBaseName(opening.getTagNameNode())
    if (baseName !== "Icon" || !chakraLocalNames.has(baseName)) continue

    const attrs = opening.getAttributes()
    const viewBoxAttr = attrs.find(
      (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "viewBox",
    )
    if (!viewBoxAttr || !Node.isJsxAttribute(viewBoxAttr)) continue

    const hasElementChildren = el
      .getJsxChildren()
      .some((c) => Node.isJsxElement(c) || Node.isJsxSelfClosingElement(c))
    if (!hasElementChildren) continue

    const alreadySvg = el
      .getJsxChildren()
      .some(
        (c) =>
          (Node.isJsxElement(c) &&
            getJsxBaseName(c.getOpeningElement().getTagNameNode()) === "svg") ||
          (Node.isJsxSelfClosingElement(c) &&
            getJsxBaseName(c.getTagNameNode()) === "svg"),
      )
    if (alreadySvg) continue

    const viewBoxText = viewBoxAttr.getText()
    const hasAsChild = attrs.some(
      (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "asChild",
    )
    const hasBoxSize = attrs.some(
      (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "boxSize",
    )

    const keptAttrs = attrs
      .filter(
        (a) =>
          !(Node.isJsxAttribute(a) && a.getNameNode().getText() === "viewBox"),
      )
      .map((a) => a.getText())
    if (!hasAsChild) keptAttrs.push("asChild")

    const childrenText = el
      .getJsxChildren()
      .map((c) => c.getText())
      .join("")
      .trim()

    const openAttrs = keptAttrs.length ? " " + keptAttrs.join(" ") : ""
    el.replaceWithText(
      `<Icon${openAttrs}>\n<svg ${viewBoxText}>\n${childrenText}\n</svg>\n</Icon>`,
    )

    if (hasBoxSize) {
      reportBoxSize(ctx)
    }
  }
}

function reportBoxSize(ctx: TransformContext) {
  ctx.report({
    level: "warn",
    message:
      'Custom <Icon> used boxSize — v3 prefers the `size` prop (e.g. size="md").',
    action:
      "Review the icon size manually. See https://chakra-ui.com/docs/components/icon",
  })
}

export default transform
