import { Node, StructureKind, SyntaxKind } from "ts-morph"
import type {
  JsxAttributeStructure,
  JsxAttributedNode,
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

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames, componentAliases } =
    collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const resolves = (base: string, target: string) =>
    chakraLocalNames.has(base) &&
    (base === target || componentAliases.get(base) === target)

  // --- Transform Checkbox elements (full restructure) ---
  const checkboxTargets: Node[] = []
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const base = getJsxBaseName(el.getOpeningElement().getTagNameNode())
    if (resolves(base, "Checkbox")) checkboxTargets.push(el)
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    const base = getJsxBaseName(el.getTagNameNode())
    if (resolves(base, "Checkbox")) checkboxTargets.push(el)
  }
  checkboxTargets.sort((a, b) => b.getStart() - a.getStart())

  for (const el of checkboxTargets) {
    transformCheckbox(el)
  }

  // --- Transform CheckboxGroup elements (attribute edits) ---
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const base = getJsxBaseName(el.getOpeningElement().getTagNameNode())
    if (!resolves(base, "CheckboxGroup")) continue
    transformCheckboxGroup(el.getOpeningElement())
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    const base = getJsxBaseName(el.getTagNameNode())
    if (!resolves(base, "CheckboxGroup")) continue
    transformCheckboxGroup(el)
  }
}

function transformCheckboxGroup(opening: JsxAttributedNode): void {
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
    const init = attr.getInitializer()?.getText()
    switch (name) {
      case "isDisabled":
        structures.push({ name: "disabled", initializer: init })
        break
      case "isNative":
        break // remove
      case "onChange":
        structures.push({ name: "onValueChange", initializer: init })
        break
      default:
        structures.push({ name, initializer: init })
    }
  }
  for (const attr of [...opening.getAttributes()].reverse()) attr.remove()
  if (structures.length) opening.addAttributes(structures)
}

function transformCheckbox(el: Node): void {
  const opening = Node.isJsxElement(el) ? el.getOpeningElement() : (el as any)

  const rootAttrs: string[] = []
  let iconInner: string | undefined
  let iconIsJsx = false
  let iconTag: string | undefined
  let iconExistingAttrs: string[] = []
  let iconColorInit: string | undefined
  let iconSizeInit: string | undefined
  let inputPropsInner: string | undefined
  let tabIndexInit: string | undefined
  let indeterminateInner: string | undefined
  let checkedInner: string | undefined

  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) {
      rootAttrs.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()
    const init = attr.getInitializer()
    const initText = init?.getText()
    const exprText =
      init && Node.isJsxExpression(init)
        ? init.getExpression()?.getText()
        : undefined

    switch (name) {
      case "icon": {
        if (init && Node.isJsxExpression(init)) {
          const expr = init.getExpression()
          iconInner = expr?.getText()
          if (
            expr &&
            (Node.isJsxElement(expr) ||
              Node.isJsxSelfClosingElement(expr) ||
              Node.isJsxFragment(expr))
          ) {
            iconIsJsx = true
            if (Node.isJsxSelfClosingElement(expr)) {
              iconTag = expr.getTagNameNode().getText()
              iconExistingAttrs = expr.getAttributes().map((a) => a.getText())
            } else if (Node.isJsxElement(expr)) {
              const o = expr.getOpeningElement()
              iconTag = o.getTagNameNode().getText()
              iconExistingAttrs = o.getAttributes().map((a) => a.getText())
            }
          }
        }
        break
      }
      case "iconColor":
        iconColorInit = initText
        break
      case "iconSize":
        iconSizeInit = initText
        break
      case "inputProps":
        inputPropsInner = exprText
        break
      case "tabIndex":
        tabIndexInit = initText
        break
      case "isIndeterminate":
        indeterminateInner = exprText
        break
      case "isChecked":
        checkedInner = exprText
        break
      case "isFocusable":
        break // remove
      case "isDisabled":
        rootAttrs.push(kv("disabled", initText))
        break
      case "isInvalid":
        rootAttrs.push(kv("invalid", initText))
        break
      case "isReadOnly":
        rootAttrs.push(kv("readOnly", initText))
        break
      case "isRequired":
        rootAttrs.push(kv("required", initText))
        break
      case "onChange":
        rootAttrs.push(kv("onCheckedChange", initText))
        break
      case "colorScheme":
        rootAttrs.push(kv("colorPalette", initText))
        break
      default:
        rootAttrs.push(attr.getText())
    }
  }

  // checked / indeterminate
  if (indeterminateInner !== undefined) {
    const elsePart = checkedInner !== undefined ? checkedInner : "false"
    rootAttrs.push(
      `checked={${indeterminateInner} ? 'indeterminate' : ${elsePart}}`,
    )
  } else if (checkedInner !== undefined) {
    rootAttrs.push(`checked={${checkedInner}}`)
  }

  // HiddenInput
  const hiddenAttrs: string[] = []
  if (tabIndexInit !== undefined) hiddenAttrs.push(`tabIndex=${tabIndexInit}`)
  if (inputPropsInner !== undefined) hiddenAttrs.push(`{...${inputPropsInner}}`)
  const hiddenStr = hiddenAttrs.length ? " " + hiddenAttrs.join(" ") : ""
  const hiddenInput = `<Checkbox.HiddenInput${hiddenStr} />`

  // Control content
  let controlChild: string
  if (iconInner !== undefined) {
    if (iconIsJsx && iconTag) {
      const attrs = [...iconExistingAttrs]
      if (iconColorInit !== undefined) attrs.push(`color=${iconColorInit}`)
      if (iconSizeInit !== undefined) attrs.push(`boxSize=${iconSizeInit}`)
      const attrsPart = attrs.length ? " " + attrs.join(" ") : ""
      controlChild = `<${iconTag}${attrsPart} />`
    } else {
      controlChild = `{${iconInner}}`
    }
  } else {
    const indicatorAttrs: string[] = []
    if (iconColorInit !== undefined)
      indicatorAttrs.push(`color=${iconColorInit}`)
    if (iconSizeInit !== undefined)
      indicatorAttrs.push(`boxSize=${iconSizeInit}`)
    controlChild = indicatorAttrs.length
      ? `<Checkbox.Indicator ${indicatorAttrs.join(" ")}></Checkbox.Indicator>`
      : `<Checkbox.Indicator />`
  }
  const control = `<Checkbox.Control>\n${controlChild}\n</Checkbox.Control>`

  // Label
  const originalChildren = Node.isJsxElement(el) ? el.getJsxChildren() : []
  const hasNonEmptyChildren = originalChildren.some(
    (c) => !Node.isJsxText(c) || c.getText().trim() !== "",
  )
  const label = hasNonEmptyChildren
    ? `<Checkbox.Label>${originalChildren
        .map((c) => c.getText())
        .join("")}</Checkbox.Label>`
    : ""

  const rootAttrsStr = rootAttrs.length ? " " + rootAttrs.join(" ") : ""
  const parts = [
    `<Checkbox.Root${rootAttrsStr}>`,
    hiddenInput,
    control,
    ...(label ? [label] : []),
    `</Checkbox.Root>`,
  ]
  el.replaceWithText(parts.join("\n"))
}

function kv(name: string, initText: string | undefined): string {
  return initText !== undefined ? `${name}=${initText}` : name
}

export default transform
