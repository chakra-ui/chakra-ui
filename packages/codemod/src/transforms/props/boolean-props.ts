import { Node, SyntaxKind } from "ts-morph"
import type { ObjectLiteralExpression } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const BOOLEAN_PROP_MAP: Record<string, string> = {
  isOpen: "open",
  defaultIsOpen: "defaultOpen",
  isDisabled: "disabled",
  isInvalid: "invalid",
  isRequired: "required",
  isChecked: "checked",
  isIndeterminate: "indeterminate",
  isReadOnly: "readOnly",
  isLoading: "loading",
  isActive: "data-active",
  isCentered: "placement",
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const renameObjectProps = (obj: ObjectLiteralExpression) => {
    const props = obj.getProperties()
    // Edit later-in-file nodes first to avoid stale-node errors.
    for (let i = props.length - 1; i >= 0; i--) {
      const prop = props[i]
      if (Node.isPropertyAssignment(prop)) {
        const nameNode = prop.getNameNode()
        if (Node.isIdentifier(nameNode)) {
          const newName = BOOLEAN_PROP_MAP[nameNode.getText()]
          if (newName) nameNode.replaceWithText(newName)
        } else if (Node.isStringLiteral(nameNode)) {
          const newName = BOOLEAN_PROP_MAP[nameNode.getLiteralValue()]
          if (newName) nameNode.setLiteralValue(newName)
        }
      } else if (Node.isShorthandPropertyAssignment(prop)) {
        const keyName = prop.getName()
        const newName = BOOLEAN_PROP_MAP[keyName]
        if (newName) prop.replaceWithText(`${newName}: ${keyName}`)
      }
    }
  }

  const openings = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const opening of openings) {
    if (!chakraLocalNames.has(getJsxBaseName(opening.getTagNameNode())))
      continue

    const attrs = opening.getDescendantsOfKind(SyntaxKind.JsxAttribute)
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i]
      const nameNode = attr.getNameNode()
      if (!Node.isIdentifier(nameNode)) continue
      const name = nameNode.getText()

      if (name === "isCentered") {
        nameNode.replaceWithText("placement")
        const init = attr.getInitializer()
        const isTrue =
          init != null &&
          Node.isJsxExpression(init) &&
          init.getExpression()?.getKind() === SyntaxKind.TrueKeyword
        if (init == null || isTrue) {
          attr.setInitializer('"center"')
        }
      } else if (BOOLEAN_PROP_MAP[name]) {
        nameNode.replaceWithText(BOOLEAN_PROP_MAP[name])
      }
    }

    const spreads = opening.getDescendantsOfKind(SyntaxKind.JsxSpreadAttribute)
    for (let i = spreads.length - 1; i >= 0; i--) {
      const arg = spreads[i].getExpression()
      if (Node.isObjectLiteralExpression(arg)) renameObjectProps(arg)
    }
  }
}

export default transform
