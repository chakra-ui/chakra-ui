import { Node, SyntaxKind } from "ts-morph"
import type { JsxChild } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const LEAF_MAP: Record<string, string> = {
  EditablePreview: "Editable.Preview",
  EditableInput: "Editable.Input",
  EditableTextarea: "Editable.Textarea",
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  // useEditableControls() call expressions -> useEditableContext()
  for (const call of sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  )) {
    const expr = call.getExpression()
    if (Node.isIdentifier(expr) && expr.getText() === "useEditableControls") {
      expr.replaceWithText("useEditableContext")
    }
  }

  // useEditableControls import -> useEditableContext
  const chakraImport = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  chakraImport
    ?.getNamedImports()
    .find((n) => n.getName() === "useEditableControls")
    ?.getNameNode()
    .replaceWithText("useEditableContext")

  const isEditable = (tagNode: Node) =>
    getJsxBaseName(tagNode) === "Editable" && chakraLocalNames.has("Editable")

  const targets: Node[] = []
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    if (isEditable(el.getOpeningElement().getTagNameNode())) targets.push(el)
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (isEditable(el.getTagNameNode())) targets.push(el)
  }

  targets.sort((a, b) => b.getStart() - a.getStart())

  for (const el of targets) {
    const opening = Node.isJsxElement(el) ? el.getOpeningElement() : (el as any)

    const attrParts: string[] = []
    let previewFocusableFalse = false
    let addSubmitModeEnter = false

    for (const attr of opening.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) {
        attrParts.push(attr.getText())
        continue
      }
      const name = attr.getNameNode().getText()
      const init = attr.getInitializer()
      const initText = init?.getText()

      switch (name) {
        case "isDisabled":
          attrParts.push(kv("disabled", initText))
          break
        case "isPreviewFocusable":
          if (initText === "{false}") previewFocusableFalse = true
          break
        case "onCancel":
          attrParts.push(kv("onValueRevert", initText))
          break
        case "onChange":
          attrParts.push(kv("onValueChange", initText))
          break
        case "onSubmit":
          attrParts.push(kv("onValueCommit", initText))
          break
        case "selectAllOnFocus":
          attrParts.push(kv("selectOnFocus", initText))
          break
        case "startWithEditView":
          attrParts.push(`defaultEdit=${initText ?? "{true}"}`)
          break
        case "submitOnBlur":
          if (initText === "{false}") addSubmitModeEnter = true
          break
        case "finalFocusRef": {
          const inner =
            init && Node.isJsxExpression(init)
              ? init.getExpression()?.getText()
              : undefined
          if (inner) {
            attrParts.push(`finalFocusEl={() => ${inner}.current}`)
          } else {
            attrParts.push(attr.getText())
          }
          break
        }
        default:
          attrParts.push(attr.getText())
      }
    }

    if (addSubmitModeEnter) attrParts.push(`submitMode="enter"`)

    const attrsStr = attrParts.length ? " " + attrParts.join(" ") : ""

    const renderChild = (child: JsxChild): string => {
      if (Node.isJsxSelfClosingElement(child) || Node.isJsxElement(child)) {
        const childOpening = Node.isJsxElement(child)
          ? child.getOpeningElement()
          : child
        const base = getJsxBaseName(childOpening.getTagNameNode())
        const mapped = LEAF_MAP[base]
        if (mapped) {
          const childAttrs = childOpening
            .getAttributes()
            .map((a) => a.getText())
          if (base === "EditablePreview" && previewFocusableFalse) {
            childAttrs.push("tabIndex={undefined}")
          }
          const attrsPart = childAttrs.length ? " " + childAttrs.join(" ") : ""
          if (Node.isJsxSelfClosingElement(child)) {
            return `<${mapped}${attrsPart} />`
          }
          const inner = child.getJsxChildren().map(renderChild).join("")
          return `<${mapped}${attrsPart}>${inner}</${mapped}>`
        }
      }
      return child.getText()
    }

    const childrenText = Node.isJsxElement(el)
      ? el.getJsxChildren().map(renderChild).join("")
      : ""

    el.replaceWithText(
      Node.isJsxElement(el)
        ? `<Editable.Root${attrsStr}>${childrenText}</Editable.Root>`
        : `<Editable.Root${attrsStr} />`,
    )
  }
}

function kv(name: string, initText: string | undefined): string {
  return initText !== undefined ? `${name}=${initText}` : name
}

export default transform
