import { Node, SyntaxKind } from "ts-morph"
import type { ObjectLiteralExpression } from "ts-morph"
import type { Transform } from "../../transform"

function keyName(node: Node): string {
  if (Node.isIdentifier(node)) return node.getText()
  if (Node.isStringLiteral(node)) return node.getLiteralValue()
  if (Node.isNumericLiteral(node)) return node.getText()
  return ""
}

function wrapColorValues(obj: ObjectLiteralExpression) {
  const props = obj.getProperties()
  // Edit later-in-file nodes first to avoid stale-node errors.
  for (let i = props.length - 1; i >= 0; i--) {
    const prop = props[i]
    if (!Node.isPropertyAssignment(prop)) continue
    const init = prop.getInitializer()
    if (!init) continue
    if (Node.isObjectLiteralExpression(init)) {
      wrapColorValues(init)
    } else {
      prop.setInitializer(`{ value: ${init.getText()} }`)
    }
  }

  const keys = obj
    .getProperties()
    .filter(Node.isPropertyAssignment)
    .map((p) => keyName(p.getNameNode()))

  if (keys.includes("50") && keys.includes("900") && !keys.includes("950")) {
    obj.addPropertyAssignment({
      name: "'950'",
      initializer: "{ value: '#09090b' }",
    })
  }
}

const transform: Transform = (sourceFile) => {
  // Process root object literals only; nested ones are reached via recursion.
  const objects = sourceFile
    .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)
    .filter(
      (obj) =>
        obj.getFirstAncestorByKind(SyntaxKind.ObjectLiteralExpression) ===
        undefined,
    )

  for (const obj of objects) {
    wrapColorValues(obj)
  }
}

export default transform
