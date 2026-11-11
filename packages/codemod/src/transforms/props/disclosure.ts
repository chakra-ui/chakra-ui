import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"

const transform: Transform = (sourceFile) => {
  const disclosureNames = new Set<string>()

  // 1. Find useDisclosure() and handle renames / tracking.
  for (const decl of sourceFile.getVariableDeclarations()) {
    const init = decl.getInitializer()
    if (
      !init ||
      !Node.isCallExpression(init) ||
      !Node.isIdentifier(init.getExpression()) ||
      init.getExpression().getText() !== "useDisclosure"
    ) {
      continue
    }

    const nameNode = decl.getNameNode()

    // const menu = useDisclosure()
    if (Node.isIdentifier(nameNode)) {
      disclosureNames.add(nameNode.getText())
      continue
    }

    // const { isOpen, onOpen } = useDisclosure()
    if (Node.isObjectBindingPattern(nameNode)) {
      const elements = nameNode.getElements()
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i]
        const propNameNode = el.getPropertyNameNode()
        if (propNameNode) {
          // Aliased: const { isOpen: menuOpen } -> const { open: menuOpen }
          if (
            Node.isIdentifier(propNameNode) &&
            propNameNode.getText() === "isOpen"
          ) {
            propNameNode.replaceWithText("open")
          }
        } else {
          // Shorthand: const { isOpen } -> const { open }
          const elName = el.getNameNode()
          if (Node.isIdentifier(elName) && elName.getText() === "isOpen") {
            elName.replaceWithText("open")
          }
        }
      }
    }
  }

  // 2. Update references: menu.isOpen -> menu.open
  if (disclosureNames.size > 0) {
    const accesses = sourceFile.getDescendantsOfKind(
      SyntaxKind.PropertyAccessExpression,
    )
    for (let i = accesses.length - 1; i >= 0; i--) {
      const pae = accesses[i]
      const obj = pae.getExpression()
      if (
        Node.isIdentifier(obj) &&
        disclosureNames.has(obj.getText()) &&
        pae.getName() === "isOpen"
      ) {
        pae.getNameNode().replaceWithText("open")
      }
    }
  }

  // 3. Update JSX usage for onOpenChange callback signature:
  // onOpenChange={menu.onClose} -> onOpenChange={(e) => menu.onClose()}
  const attrs = sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute)
  for (let i = attrs.length - 1; i >= 0; i--) {
    const attr = attrs[i]
    const nameNode = attr.getNameNode()
    if (!Node.isIdentifier(nameNode) || nameNode.getText() !== "onOpenChange") {
      continue
    }
    const init = attr.getInitializer()
    if (!init || !Node.isJsxExpression(init)) continue
    const expr = init.getExpression()
    if (!expr) continue

    // Ignore if it's already a function.
    if (Node.isArrowFunction(expr) || Node.isFunctionExpression(expr)) continue

    const isDisclosureCall =
      (Node.isPropertyAccessExpression(expr) &&
        Node.isIdentifier(expr.getExpression()) &&
        disclosureNames.has(expr.getExpression().getText())) ||
      (Node.isIdentifier(expr) && expr.getText() === "onClose")

    if (isDisclosureCall) {
      attr.setInitializer(`{(e) => ${expr.getText()}()}`)
    }
  }
}

export default transform
