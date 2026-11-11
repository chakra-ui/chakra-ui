import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxAttribute,
  JsxElement,
  JsxOpeningElement,
  JsxSelfClosingElement,
  SourceFile,
} from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const POSITIONING_PROPS = [
  "placement",
  "gutter",
  "offset",
  "flip",
  "strategy",
  "boundary",
]

const OLD_MENU_COMPONENTS = [
  "MenuButton",
  "MenuList",
  "MenuItem",
  "MenuGroup",
  "MenuDivider",
  "MenuOptionGroup",
  "MenuItemOption",
]

function tagIs(opening: JsxOpening, name: string): boolean {
  const tag = opening.getTagNameNode()
  return Node.isIdentifier(tag) && tag.getText() === name
}

function allOpenings(sourceFile: SourceFile): JsxOpening[] {
  return [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
}

function findFirstOpening(
  sourceFile: SourceFile,
  name: string,
): JsxOpening | undefined {
  return allOpenings(sourceFile).find((o) => tagIs(o, name))
}

function findFirstElement(
  sourceFile: SourceFile,
  name: string,
): JsxElement | undefined {
  return sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .find((e) => tagIs(e.getOpeningElement(), name))
}

function renameTag(opening: JsxOpening, newText: string) {
  if (Node.isJsxSelfClosingElement(opening)) {
    opening.getTagNameNode().replaceWithText(newText)
    return
  }
  const el = opening.getParentIfKind(SyntaxKind.JsxElement)
  el?.getClosingElement()?.getTagNameNode().replaceWithText(newText)
  opening.getTagNameNode().replaceWithText(newText)
}

function childrenText(el: JsxElement, sourceFile: SourceFile): string {
  const start = el.getOpeningElement().getEnd()
  const end = el.getClosingElement().getStart()
  return sourceFile.getFullText().slice(start, end)
}

function jsxAttrValueText(attr: JsxAttribute): string | undefined {
  const init = attr.getInitializer()
  if (!init) return undefined
  if (Node.isStringLiteral(init)) return `'${init.getLiteralValue()}'`
  if (Node.isJsxExpression(init)) return init.getExpression()?.getText()
  return init.getText()
}

const transform: Transform = (sourceFile, ctx) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const hasMenu = chakraLocalNames.has("Menu")
  let usedPortal = false

  if (hasMenu) {
    // 1. Menu -> Menu.Root
    while (true) {
      const opening = findFirstOpening(sourceFile, "Menu")
      if (!opening) break
      renameTag(opening, "Menu.Root")
    }

    // 2. isLazy -> lazyMount + unmountOnExit
    for (const opening of allOpenings(sourceFile)) {
      if (opening.getTagNameNode().getText() !== "Menu.Root") continue
      const attrs = opening.getAttributes()
      const idx = attrs.findIndex(
        (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "isLazy",
      )
      if (idx === -1) continue
      const attr = attrs[idx]
      if (Node.isJsxAttribute(attr)) {
        attr.getNameNode().replaceWithText("lazyMount")
        opening.insertAttribute(idx + 1, { name: "unmountOnExit" })
      }
    }

    // 3. MenuButton -> Menu.Trigger (+ Button wrapper when `as` is present)
    while (true) {
      const btn = findFirstElement(sourceFile, "MenuButton")
      if (!btn) break
      const opening = btn.getOpeningElement()
      let rightIcon: string | undefined
      let leftIcon: string | undefined
      let asText: string | undefined
      const keep: string[] = []

      for (const attr of opening.getAttributes()) {
        if (!Node.isJsxAttribute(attr)) {
          keep.push(attr.getText())
          continue
        }
        const name = attr.getNameNode().getText()
        const init = attr.getInitializer()
        if (name === "rightIcon") {
          if (init && Node.isJsxExpression(init))
            rightIcon = init.getExpression()?.getText()
          continue
        }
        if (name === "leftIcon") {
          if (init && Node.isJsxExpression(init))
            leftIcon = init.getExpression()?.getText()
          continue
        }
        if (name === "as") {
          if (init && Node.isJsxExpression(init))
            asText = init.getExpression()?.getText()
          else if (init && Node.isStringLiteral(init))
            asText = init.getLiteralValue()
          continue
        }
        keep.push(attr.getText())
      }

      const inner = childrenText(btn, sourceFile)
      const content =
        (leftIcon ? `${leftIcon}\n` : "") +
        inner +
        (rightIcon ? `\n${rightIcon}` : "")

      const keepText = keep.length ? ` ${keep.join(" ")}` : ""
      let replacement: string
      if (!asText) {
        replacement = `<Menu.Trigger${keepText}>${content}</Menu.Trigger>`
      } else {
        replacement = `<Menu.Trigger asChild>\n<${asText}${keepText}>${content}</${asText}>\n</Menu.Trigger>`
      }
      btn.replaceWithText(replacement)
    }

    // 4. MenuList -> Portal > Menu.Positioner > Menu.Content
    while (true) {
      const opening = findFirstOpening(sourceFile, "MenuList")
      if (!opening) break
      usedPortal = true
      let inner = ""
      let target: JsxElement | JsxOpening = opening
      if (Node.isJsxSelfClosingElement(opening)) {
        target = opening
      } else {
        const el = opening.getParentIfKind(SyntaxKind.JsxElement)
        if (el) {
          inner = childrenText(el, sourceFile)
          target = el
        }
      }
      target.replaceWithText(
        `<Portal>\n<Menu.Positioner>\n<Menu.Content>${inner}</Menu.Content>\n</Menu.Positioner>\n</Portal>`,
      )
    }

    // 5. MenuItem -> Menu.Item with value + onClick -> onSelect
    let itemIndex = 0
    while (true) {
      const opening = findFirstOpening(sourceFile, "MenuItem")
      if (!opening) break
      for (const attr of opening.getAttributes()) {
        if (
          Node.isJsxAttribute(attr) &&
          attr.getNameNode().getText() === "onClick"
        ) {
          attr.getNameNode().replaceWithText("onSelect")
        }
      }
      opening.addAttribute({
        name: "value",
        initializer: `"item-${itemIndex++}"`,
      })
      renameTag(opening, "Menu.Item")
    }

    // 6. MenuOptionGroup (with a string `type`) -> RadioItemGroup / ItemGroup
    while (true) {
      const group = sourceFile
        .getDescendantsOfKind(SyntaxKind.JsxElement)
        .find((e) => {
          if (!tagIs(e.getOpeningElement(), "MenuOptionGroup")) return false
          return e
            .getOpeningElement()
            .getAttributes()
            .some((a) => {
              if (!Node.isJsxAttribute(a)) return false
              if (a.getNameNode().getText() !== "type") return false
              const init = a.getInitializer()
              return !!init && Node.isStringLiteral(init)
            })
        })
      if (!group) break

      const opening = group.getOpeningElement()
      const typeAttr = opening
        .getAttributes()
        .find(
          (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "type",
        ) as JsxAttribute
      const typeInit = typeAttr.getInitializer()
      const typeVal =
        typeInit && Node.isStringLiteral(typeInit)
          ? typeInit.getLiteralValue()
          : ""
      const groupName = typeVal === "radio" ? "RadioItemGroup" : "ItemGroup"
      const itemName = typeVal === "radio" ? "RadioItem" : "CheckboxItem"

      const newAttrs = opening
        .getAttributes()
        .filter(
          (a) =>
            !(Node.isJsxAttribute(a) && a.getNameNode().getText() === "type"),
        )
        .map((a) => a.getText())

      const items: string[] = []
      for (const child of group.getJsxChildren()) {
        let childOpening: JsxOpening | undefined
        let childInner = ""
        let selfClosing = false
        if (
          Node.isJsxElement(child) &&
          tagIs(child.getOpeningElement(), "MenuItemOption")
        ) {
          childOpening = child.getOpeningElement()
          childInner = childrenText(child, sourceFile)
        } else if (
          Node.isJsxSelfClosingElement(child) &&
          tagIs(child, "MenuItemOption")
        ) {
          childOpening = child
          selfClosing = true
        }
        if (!childOpening) continue
        const itemAttrs = childOpening.getAttributes().map((a) => a.getText())
        const attrsText = itemAttrs.length ? ` ${itemAttrs.join(" ")}` : ""
        if (selfClosing) {
          items.push(`<Menu.${itemName}${attrsText} />`)
        } else {
          items.push(
            `<Menu.${itemName}${attrsText}>${childInner}</Menu.${itemName}>`,
          )
        }
      }

      const groupAttrsText = newAttrs.length ? ` ${newAttrs.join(" ")}` : ""
      group.replaceWithText(
        `<Menu.${groupName}${groupAttrsText}>\n${items.join("\n")}\n</Menu.${groupName}>`,
      )
    }

    // 7. MenuGroup -> Menu.ItemGroup + Menu.ItemGroupLabel
    while (true) {
      const group = findFirstElement(sourceFile, "MenuGroup")
      if (!group) break
      const opening = group.getOpeningElement()
      const titleAttr = opening
        .getAttributes()
        .find(
          (a) =>
            Node.isJsxAttribute(a) && a.getNameNode().getText() === "title",
        ) as JsxAttribute | undefined

      let labelText: string | undefined
      if (titleAttr) {
        const init = titleAttr.getInitializer()
        if (init && Node.isStringLiteral(init))
          labelText = init.getLiteralValue()
        else if (init && Node.isJsxExpression(init)) labelText = init.getText()
      }

      const newAttrs = opening
        .getAttributes()
        .filter(
          (a) =>
            !(Node.isJsxAttribute(a) && a.getNameNode().getText() === "title"),
        )
        .map((a) => a.getText())

      const inner = childrenText(group, sourceFile)
      const label =
        labelText !== undefined
          ? `\n<Menu.ItemGroupLabel>${labelText}</Menu.ItemGroupLabel>`
          : ""
      const groupAttrsText = newAttrs.length ? ` ${newAttrs.join(" ")}` : ""
      group.replaceWithText(
        `<Menu.ItemGroup${groupAttrsText}>${label}${inner}</Menu.ItemGroup>`,
      )
    }

    // 8. MenuDivider -> Menu.Separator
    while (true) {
      const opening = findFirstOpening(sourceFile, "MenuDivider")
      if (!opening) break
      renameTag(opening, "Menu.Separator")
    }

    // 9. Group positioning props into `positioning`
    for (const opening of allOpenings(sourceFile)) {
      if (opening.getTagNameNode().getText() !== "Menu.Root") continue
      const props: string[] = []
      for (const attr of opening.getAttributes()) {
        if (!Node.isJsxAttribute(attr)) continue
        const name = attr.getNameNode().getText()
        if (!POSITIONING_PROPS.includes(name)) continue
        const valText = jsxAttrValueText(attr) ?? ""
        if (name === "boundary") props.push(`${name}: () => ${valText}`)
        else props.push(`${name}: ${valText}`)
        attr.remove()
      }
      if (props.length > 0) {
        opening.addAttribute({
          name: "positioning",
          initializer: `{{\n${props.join(",\n")},\n}}`,
        })
      }
    }
  }

  // Imports: remove old menu components, add Portal when used.
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (importDecl) {
    for (const spec of importDecl.getNamedImports()) {
      if (OLD_MENU_COMPONENTS.includes(spec.getName())) spec.remove()
    }
    if (usedPortal) {
      const hasPortal = importDecl
        .getNamedImports()
        .some((n) => n.getName() === "Portal")
      if (!hasPortal) importDecl.addNamedImport("Portal")
    }
  }

  void ctx
}

export default transform
