import { Node, SyntaxKind } from "ts-morph"
import type { JsxElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

const TAG_MAP: Record<string, string> = {
  Table: "Table.Root",
  Thead: "Table.Header",
  Tbody: "Table.Body",
  Tfoot: "Table.Footer",
  Tr: "Table.Row",
  Th: "Table.ColumnHeader",
  Td: "Table.Cell",
  TableCaption: "Table.Caption",
  TableContainer: "Table.ScrollArea",
}

function renameTag(el: JsxElement | JsxSelfClosingElement, to: string) {
  if (Node.isJsxElement(el)) {
    el.getClosingElement()?.getTagNameNode().replaceWithText(to)
    el.getOpeningElement().getTagNameNode().replaceWithText(to)
  } else {
    el.getTagNameNode().replaceWithText(to)
  }
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  // Rename tags. Process later elements first to keep positions stable.
  const elements: (JsxElement | JsxSelfClosingElement)[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
  const withStart = elements
    .map((e) => ({ e, start: e.getStart() }))
    .sort((a, b) => b.start - a.start)

  for (const { e } of withStart) {
    if (e.wasForgotten()) continue
    const tag = Node.isJsxElement(e)
      ? e.getOpeningElement().getTagNameNode()
      : e.getTagNameNode()
    if (!Node.isIdentifier(tag)) continue
    const to = TAG_MAP[tag.getText()]
    if (to) renameTag(e, to)
  }

  // isNumeric -> textAlign="end" on Table.ColumnHeader / Table.Cell.
  const openings = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
  for (const opening of openings) {
    const tag = opening.getTagNameNode()
    if (!Node.isPropertyAccessExpression(tag)) continue
    const obj = tag.getExpression()
    if (!Node.isIdentifier(obj) || obj.getText() !== "Table") continue
    if (!chakraLocalNames.has("Table")) continue
    const prop = tag.getName()
    if (prop !== "ColumnHeader" && prop !== "Cell") continue

    const isNumeric = opening
      .getAttributes()
      .find(
        (a) =>
          Node.isJsxAttribute(a) && a.getNameNode().getText() === "isNumeric",
      )
    if (!isNumeric) continue
    isNumeric.remove()
    opening.addAttribute({ name: "textAlign", initializer: '"end"' })
  }
}

export default transform
