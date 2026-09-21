import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxAttribute,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

function getAttr(opening: JsxOpening, name: string): JsxAttribute | undefined {
  for (const attr of opening.getAttributes()) {
    if (Node.isJsxAttribute(attr) && attr.getNameNode().getText() === name) {
      return attr
    }
  }
  return undefined
}

function transformAlertRootProps(opening: JsxOpening) {
  // variant left-accent / top-accent -> subtle + border props
  const variantAttr = getAttr(opening, "variant")
  let accent: "left" | "top" | undefined
  if (variantAttr) {
    const init = variantAttr.getInitializer()
    if (init && Node.isStringLiteral(init)) {
      const val = init.getLiteralValue()
      if (val === "left-accent") {
        variantAttr.setInitializer('"subtle"')
        accent = "left"
      } else if (val === "top-accent") {
        variantAttr.setInitializer('"subtle"')
        accent = "top"
      }
    }
  }

  // Remove addRole prop (not needed in v3)
  getAttr(opening, "addRole")?.remove()

  if (accent === "left") {
    opening.addAttribute({ name: "borderStartWidth", initializer: '"3px"' })
    opening.addAttribute({
      name: "borderStartColor",
      initializer: '"colorPalette.solid"',
    })
  } else if (accent === "top") {
    opening.addAttribute({ name: "borderTopWidth", initializer: '"3px"' })
    opening.addAttribute({
      name: "borderTopColor",
      initializer: '"colorPalette.solid"',
    })
  }
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const renameMap: Record<string, string> = {
    Alert: "Alert.Root",
    AlertIcon: "Alert.Indicator",
    AlertTitle: "Alert.Title",
    AlertDescription: "Alert.Description",
  }

  const alertSubComponents = ["AlertIcon", "AlertTitle", "AlertDescription"]

  // Multi-child JSX elements.
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const opening = el.getOpeningElement()
    const baseName = getJsxBaseName(opening.getTagNameNode())
    if (!chakraLocalNames.has(baseName)) continue
    const target = renameMap[baseName]
    if (!target) continue

    if (baseName === "Alert") {
      transformAlertRootProps(opening)
    }

    if (baseName === "AlertIcon") {
      // Collapse to a self-closing indicator.
      const attrsText = opening
        .getAttributes()
        .map((a) => a.getText())
        .join(" ")
      el.replaceWithText(
        `<Alert.Indicator${attrsText ? " " + attrsText : ""} />`,
      )
      continue
    }

    el.getClosingElement()?.getTagNameNode().replaceWithText(target)
    opening.getTagNameNode().replaceWithText(target)
  }

  // Self-closing JSX elements.
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    const baseName = getJsxBaseName(el.getTagNameNode())
    if (!chakraLocalNames.has(baseName)) continue
    const target = renameMap[baseName]
    if (!target) continue
    if (baseName === "Alert") transformAlertRootProps(el)
    el.getTagNameNode().replaceWithText(target)
  }

  // Update imports.
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (!importDecl) return

  for (const named of importDecl.getNamedImports()) {
    if (alertSubComponents.includes(named.getName())) named.remove()
  }

  const hasAnyAlertComponent = ["Alert", ...alertSubComponents].some((name) =>
    chakraLocalNames.has(name),
  )
  const hasAlert = importDecl
    .getNamedImports()
    .some((n) => n.getName() === "Alert")
  if (!hasAlert && hasAnyAlertComponent) importDecl.addNamedImport("Alert")
}

export default transform
