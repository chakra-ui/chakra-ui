import { Node, SyntaxKind } from "ts-morph"
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const transform: Transform = (sourceFile) => {
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )

  const linkNames = new Set<string>()
  if (importDecl) {
    for (const spec of importDecl.getNamedImports()) {
      const imported = spec.getName()
      if (imported === "Link" || imported === "LinkOverlay") {
        linkNames.add(spec.getAliasNode()?.getText() ?? imported)
      }
    }
  }

  if (linkNames.size === 0) return

  const openings: JsxOpening[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const opening of openings) {
    if (opening.wasForgotten()) continue
    const tagNode = opening.getTagNameNode()
    if (!Node.isIdentifier(tagNode)) continue
    if (!linkNames.has(tagNode.getText())) continue

    let hasIsExternal = false
    for (const attr of opening.getAttributes()) {
      if (
        Node.isJsxAttribute(attr) &&
        attr.getNameNode().getText() === "isExternal"
      ) {
        hasIsExternal = true
        attr.remove()
      }
    }

    if (!hasIsExternal) continue

    const attrs = opening.getAttributes()
    const hasTarget = attrs.some(
      (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "target",
    )
    const hasRel = attrs.some(
      (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "rel",
    )

    if (!hasTarget) {
      opening.addAttribute({ name: "target", initializer: '"_blank"' })
    }
    if (!hasRel) {
      opening.addAttribute({
        name: "rel",
        initializer: '"noopener noreferrer"',
      })
    }
  }
}

export default transform
