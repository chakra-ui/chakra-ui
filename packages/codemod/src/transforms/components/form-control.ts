import { Node, StructureKind, SyntaxKind } from "ts-morph"
import type {
  JsxAttributeStructure,
  JsxAttributedNode,
  JsxOpeningElement,
  JsxSelfClosingElement,
  JsxSpreadAttributeStructure,
  OptionalKind,
} from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type AttrStructure =
  | OptionalKind<JsxAttributeStructure>
  | OptionalKind<JsxSpreadAttributeStructure>

const PROP_RENAMES: Record<string, string> = {
  isInvalid: "invalid",
  isRequired: "required",
  isDisabled: "disabled",
  isReadOnly: "readOnly",
}

const FORM_COMPONENTS = [
  "FormControl",
  "FormLabel",
  "FormHelperText",
  "FormErrorMessage",
]

function getOpening(el: Node): JsxOpeningElement | JsxSelfClosingElement {
  return Node.isJsxElement(el) ? el.getOpeningElement() : (el as any)
}

function hasStringAttr(
  opening: JsxAttributedNode,
  name: string,
  value: string,
): boolean {
  return opening.getAttributes().some((a) => {
    if (!Node.isJsxAttribute(a)) return false
    if (a.getNameNode().getText() !== name) return false
    const init = a.getInitializer()
    return (
      init != null &&
      Node.isStringLiteral(init) &&
      init.getLiteralText() === value
    )
  })
}

function setAttributes(
  opening: JsxAttributedNode,
  structures: AttrStructure[],
): void {
  for (const attr of [...opening.getAttributes()].reverse()) attr.remove()
  if (structures.length) opening.addAttributes(structures)
}

function renameTag(el: Node, newName: string): void {
  if (Node.isJsxElement(el)) {
    el.getClosingElement()?.getTagNameNode().replaceWithText(newName)
    el.getOpeningElement().getTagNameNode().replaceWithText(newName)
  } else if (Node.isJsxSelfClosingElement(el)) {
    el.getTagNameNode().replaceWithText(newName)
  }
}

function collectByName(
  sourceFile: import("ts-morph").SourceFile,
  predicate: (base: string) => boolean,
): Node[] {
  const out: Node[] = []
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    if (predicate(getJsxBaseName(el.getOpeningElement().getTagNameNode()))) {
      out.push(el)
    }
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (predicate(getJsxBaseName(el.getTagNameNode()))) out.push(el)
  }
  out.sort((a, b) => b.getStart() - a.getStart())
  return out
}

function isInsideFieldset(el: Node): boolean {
  let node = el.getParent()
  while (node) {
    if (Node.isJsxElement(node)) {
      const tag = node.getOpeningElement().getTagNameNode().getText()
      if (tag === "Fieldset.Root") return true
    }
    node = node.getParent()
  }
  return false
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return
  if (!FORM_COMPONENTS.some((name) => chakraLocalNames.has(name))) return

  let needsFieldImport = false
  let needsFieldsetImport = false

  // Pass 1: FormControl -> Field.Root / Fieldset.Root
  for (const el of collectByName(
    sourceFile,
    (base) => base === "FormControl" && chakraLocalNames.has("FormControl"),
  )) {
    const opening = getOpening(el)
    const isFieldset = hasStringAttr(opening, "as", "fieldset")
    const comp = isFieldset ? "Fieldset" : "Field"
    if (isFieldset) needsFieldsetImport = true
    else needsFieldImport = true

    const structures: AttrStructure[] = []
    for (const attr of opening.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) {
        structures.push({
          kind: StructureKind.JsxSpreadAttribute,
          expression: (attr as any).getExpression().getText(),
        })
        continue
      }
      const name = attr.getNameNode().getText()
      const init = attr.getInitializer()
      if (
        name === "as" &&
        init &&
        Node.isStringLiteral(init) &&
        init.getLiteralText() === "fieldset"
      ) {
        continue
      }
      const newName = PROP_RENAMES[name] ?? name
      structures.push({ name: newName, initializer: init?.getText() })
    }

    setAttributes(opening, structures)
    renameTag(el, `${comp}.Root`)
  }

  // Pass 2: FormLabel / FormHelperText / FormErrorMessage
  for (const el of collectByName(
    sourceFile,
    (base) =>
      (base === "FormLabel" ||
        base === "FormHelperText" ||
        base === "FormErrorMessage") &&
      chakraLocalNames.has(base),
  )) {
    const opening = getOpening(el)
    const base = getJsxBaseName(opening.getTagNameNode())
    const inFieldset = isInsideFieldset(el)

    if (base === "FormLabel") {
      const hasLegend = hasStringAttr(opening, "as", "legend")
      const comp = inFieldset || hasLegend ? "Fieldset" : "Field"
      const sub = inFieldset || hasLegend ? "Legend" : "Label"
      if (comp === "Fieldset") needsFieldsetImport = true
      else needsFieldImport = true
      if (hasLegend) {
        const asAttr = opening
          .getAttributes()
          .find(
            (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "as",
          )
        asAttr?.remove()
      }
      renameTag(el, `${comp}.${sub}`)
    } else {
      const comp = inFieldset ? "Fieldset" : "Field"
      if (comp === "Fieldset") needsFieldsetImport = true
      else needsFieldImport = true
      const sub = base === "FormHelperText" ? "HelperText" : "ErrorText"
      renameTag(el, `${comp}.${sub}`)
    }
  }

  // Update imports
  const chakraImport = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (chakraImport) {
    for (const named of [...chakraImport.getNamedImports()]) {
      if (FORM_COMPONENTS.includes(named.getName())) named.remove()
    }
    const names = chakraImport.getNamedImports().map((n) => n.getName())
    if (needsFieldImport && !names.includes("Field")) {
      chakraImport.addNamedImport("Field")
    }
    if (needsFieldsetImport && !names.includes("Fieldset")) {
      chakraImport.addNamedImport("Fieldset")
    }
  }
}

export default transform
