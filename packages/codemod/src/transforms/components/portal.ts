import { Node, SyntaxKind } from "ts-morph"
import type { JsxElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

function getInner(el: JsxElement | JsxSelfClosingElement): string {
  if (!Node.isJsxElement(el)) return ""
  const full = el.getText()
  const openText = el.getOpeningElement().getText()
  const closeText = el.getClosingElement().getText()
  return full.slice(openText.length, full.length - closeText.length)
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const openings: Array<JsxElement | JsxSelfClosingElement> = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  // 1. Remove `appendToParentPortal` from Portal components.
  for (const el of openings) {
    const opening = Node.isJsxElement(el) ? el.getOpeningElement() : el
    if (getJsxBaseName(opening.getTagNameNode()) !== "Portal") continue
    if (!chakraLocalNames.has("Portal")) continue
    opening
      .getAttributes()
      .find(
        (a) =>
          Node.isJsxAttribute(a) &&
          a.getNameNode().getText() === "appendToParentPortal",
      )
      ?.remove()
  }

  // 2. Unwrap PortalManager usages (replace with a fragment of its children).
  const managers = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ].filter((el) => {
    const opening = Node.isJsxElement(el) ? el.getOpeningElement() : el
    return (
      getJsxBaseName(opening.getTagNameNode()) === "PortalManager" &&
      chakraLocalNames.has("PortalManager")
    )
  })

  for (const el of managers.reverse()) {
    const inner = getInner(el)
    el.replaceWithText(`<>${inner}</>`)
  }

  // 3. Remove the PortalManager import.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (!importDecl.getModuleSpecifierValue().includes("@chakra-ui/react"))
      continue
    const named = importDecl
      .getNamedImports()
      .find((n) => n.getName() === "PortalManager")
    if (!named) continue
    named.remove()
    // Collapse to a side-effect import when nothing is left.
    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.replaceWithText(
        `import '${importDecl.getModuleSpecifierValue()}'`,
      )
    }
  }
}

export default transform
