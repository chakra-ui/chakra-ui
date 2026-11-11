import { Node, SyntaxKind } from "ts-morph"
import type { JsxElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

const OLD_STAT_COMPONENTS = [
  "StatLabel",
  "StatNumber",
  "StatHelpText",
  "StatArrow",
  "StatGroup",
]

const COMPONENT_MAP: Record<string, string> = {
  Stat: "Stat.Root",
  StatLabel: "Stat.Label",
  StatNumber: "Stat.ValueText",
  StatHelpText: "Stat.HelpText",
  StatGroup: "Stat.Root",
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

  // Transform JSX. Process later/inner elements first for stable positions.
  const elements: (JsxElement | JsxSelfClosingElement)[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
  const withStart = elements
    .map((e) => ({ e, start: e.getStart() }))
    .sort((a, b) => b.start - a.start)

  for (const { e } of withStart) {
    if (e.wasForgotten()) continue
    const opening = Node.isJsxElement(e) ? e.getOpeningElement() : e
    const tag = opening.getTagNameNode()
    if (!Node.isIdentifier(tag)) continue
    const name = tag.getText()
    if (!chakraLocalNames.has(name)) continue

    if (name === "StatArrow") {
      const typeAttr = opening
        .getAttributes()
        .find(
          (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "type",
        )
      if (!typeAttr || !Node.isJsxAttribute(typeAttr)) continue

      const init = typeAttr.getInitializer()
      const typeValue =
        init && Node.isStringLiteral(init) ? init.getLiteralValue() : null
      const component =
        typeValue === "increase" ? "UpIndicator" : "DownIndicator"

      typeAttr.remove()
      renameTag(e, `Stat.${component}`)
      continue
    }

    const to = COMPONENT_MAP[name]
    if (to) renameTag(e, to)
  }

  // Remove old Stat component imports (keep Stat itself).
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/react") continue
    const named = importDecl.getNamedImports()
    for (let i = named.length - 1; i >= 0; i--) {
      if (OLD_STAT_COMPONENTS.includes(named[i].getName())) named[i].remove()
    }
    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove()
    }
  }
}

export default transform
