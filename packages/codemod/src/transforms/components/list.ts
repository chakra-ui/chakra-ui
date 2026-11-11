import { Node, SyntaxKind } from "ts-morph"
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

function renameTag(opening: JsxOpening, newText: string) {
  if (Node.isJsxSelfClosingElement(opening)) {
    opening.getTagNameNode().replaceWithText(newText)
    return
  }
  const el = opening.getParentIfKind(SyntaxKind.JsxElement)
  el?.getClosingElement()?.getTagNameNode().replaceWithText(newText)
  opening.getTagNameNode().replaceWithText(newText)
}

function transformListProps(opening: JsxOpening) {
  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) continue
    const name = attr.getNameNode().getText()
    if (name === "spacing") attr.getNameNode().replaceWithText("gap")
    else if (name === "styleType")
      attr.getNameNode().replaceWithText("listStyleType")
    else if (name === "stylePosition")
      attr.getNameNode().replaceWithText("listStylePosition")
  }
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const listComponents = [
    "List",
    "OrderedList",
    "UnorderedList",
    "ListItem",
    "ListIcon",
  ]
  const hasListComponent = listComponents.some((name) =>
    chakraLocalNames.has(name),
  )
  if (!hasListComponent) return

  const openings: JsxOpening[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const opening of openings) {
    if (opening.wasForgotten()) continue
    const baseName = getJsxBaseName(opening.getTagNameNode())
    if (!chakraLocalNames.has(baseName)) continue

    switch (baseName) {
      case "List":
        transformListProps(opening)
        renameTag(opening, "List.Root")
        break
      case "OrderedList":
        opening.insertAttribute(0, { name: "as", initializer: '"ol"' })
        transformListProps(opening)
        renameTag(opening, "List.Root")
        break
      case "UnorderedList":
        opening.insertAttribute(0, { name: "as", initializer: '"ul"' })
        transformListProps(opening)
        renameTag(opening, "List.Root")
        break
      case "ListItem":
        renameTag(opening, "List.Item")
        break
      case "ListIcon":
        renameTag(opening, "List.Indicator")
        break
    }
  }

  // Update imports
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (importDecl) {
    const toRemove = ["OrderedList", "UnorderedList", "ListItem", "ListIcon"]
    for (const spec of importDecl.getNamedImports()) {
      if (toRemove.includes(spec.getName())) spec.remove()
    }
    const hasList = importDecl
      .getNamedImports()
      .some((n) => n.getName() === "List")
    if (!hasList) importDecl.addNamedImport("List")
  }
}

export default transform
