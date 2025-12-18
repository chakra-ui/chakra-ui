import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  JSXSpreadChild,
  JSXText,
  Literal,
  Options,
} from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  /**
   * Menu → Menu.Root
   */
  renameComponent(j, root, "Menu", "Menu.Root")

  /**
   * isLazy → lazyMount + unmountOnExit
   */
  root
    .find(j.JSXOpeningElement, {
      name: {
        type: "JSXMemberExpression",
        object: { name: "Menu" },
        property: { name: "Root" },
      },
    })
    .forEach((path) => {
      const attrs = path.node.attributes ?? []

      path.node.attributes = attrs.flatMap((attr) => {
        if (
          attr.type === "JSXAttribute" &&
          attr.name.type === "JSXIdentifier" &&
          attr.name.name === "isLazy"
        ) {
          return [
            j.jsxAttribute(j.jsxIdentifier("lazyMount")),
            j.jsxAttribute(j.jsxIdentifier("unmountOnExit")),
          ]
        }
        return attr
      })
    })

  /**
   * MenuButton → Menu.Trigger asChild
   */
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { type: "JSXIdentifier", name: "MenuButton" },
      },
    })
    .forEach((path) => {
      const button = path.node

      path.replace(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Menu"),
              j.jsxIdentifier("Trigger"),
            ),
            [j.jsxAttribute(j.jsxIdentifier("asChild"))],
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Menu"),
              j.jsxIdentifier("Trigger"),
            ),
          ),
          button.children ?? [],
        ),
      )
    })

  /**
   * MenuList → Portal > Menu.Positioner > Menu.Content
   */
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { type: "JSXIdentifier", name: "MenuList" },
      },
    })
    .forEach((path) => {
      const list = path.node

      path.replace(
        j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier("Portal"), [], false),
          j.jsxClosingElement(j.jsxIdentifier("Portal")),
          [
            j.jsxElement(
              j.jsxOpeningElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("Menu"),
                  j.jsxIdentifier("Positioner"),
                ),
                [],
                false,
              ),
              j.jsxClosingElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("Menu"),
                  j.jsxIdentifier("Positioner"),
                ),
              ),
              [
                j.jsxElement(
                  j.jsxOpeningElement(
                    j.jsxMemberExpression(
                      j.jsxIdentifier("Menu"),
                      j.jsxIdentifier("Content"),
                    ),
                    [],
                    false,
                  ),
                  j.jsxClosingElement(
                    j.jsxMemberExpression(
                      j.jsxIdentifier("Menu"),
                      j.jsxIdentifier("Content"),
                    ),
                  ),
                  list.children ?? [],
                ),
              ],
            ),
          ],
        ),
      )
    })

  /**
   * MenuItem → Menu.Item
   * onClick → onSelect
   * add value
   */
  let itemIndex = 0

  root
    .find(j.JSXOpeningElement, {
      name: { type: "JSXIdentifier", name: "MenuItem" },
    })
    .forEach((path) => {
      path.node.name = j.jsxMemberExpression(
        j.jsxIdentifier("Menu"),
        j.jsxIdentifier("Item"),
      )

      const attrs = path.node.attributes ?? []

      path.node.attributes = [
        ...attrs.flatMap((attr) => {
          if (
            attr.type === "JSXAttribute" &&
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "onClick"
          ) {
            return j.jsxAttribute(j.jsxIdentifier("onSelect"), attr.value)
          }
          return attr
        }),
        j.jsxAttribute(
          j.jsxIdentifier("value"),
          j.stringLiteral(`item-${itemIndex++}`),
        ),
      ]
    })

  root
    .find(j.JSXClosingElement, {
      name: { type: "JSXIdentifier", name: "MenuItem" },
    })
    .forEach((path) => {
      path.node.name = j.jsxMemberExpression(
        j.jsxIdentifier("Menu"),
        j.jsxIdentifier("Item"),
      )
    })

  /**
   * MenuOptionGroup → Radio / Checkbox groups
   */
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { type: "JSXIdentifier", name: "MenuOptionGroup" },
      },
    })
    .forEach((path) => {
      const attrs = path.node.openingElement.attributes ?? []

      const typeAttr = attrs.find(
        (a): a is JSXAttribute =>
          a.type === "JSXAttribute" &&
          a.name.type === "JSXIdentifier" &&
          a.name.name === "type" &&
          a.value?.type === "StringLiteral",
      )

      const type = (typeAttr?.value as any)?.value
      if (!type) return

      const groupName =
        type === "radio" ? "RadioItemGroup" : "CheckboxItemGroup"
      const itemName = type === "radio" ? "RadioItem" : "CheckboxItem"

      const children = path.node.children ?? []

      const items = children.filter((c): c is JSXElement =>
        isJSXElementNamed(c, "MenuItemOption"),
      )

      const newItems = items.map((item) =>
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Menu"),
              j.jsxIdentifier(itemName),
            ),
            item.openingElement.attributes ?? [],
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Menu"),
              j.jsxIdentifier(itemName),
            ),
          ),
          item.children ?? [],
        ),
      )

      path.replace(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Menu"),
              j.jsxIdentifier(groupName),
            ),
            attrs.filter(
              (a) =>
                a.type === "JSXAttribute" &&
                a.name.type === "JSXIdentifier" &&
                a.name.name !== "type",
            ),
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Menu"),
              j.jsxIdentifier(groupName),
            ),
          ),
          newItems,
        ),
      )
    })

  return root.toSource({ quote: "single" })
}

function renameComponent(j: any, root: any, from: string, to: string) {
  const parts = to.split(".")

  const newName =
    parts.length === 1
      ? j.jsxIdentifier(parts[0])
      : j.jsxMemberExpression(
          j.jsxIdentifier(parts[0]),
          j.jsxIdentifier(parts[1]),
        )

  root
    .find(j.JSXOpeningElement, {
      name: { type: "JSXIdentifier", name: from },
    })
    .forEach((p: any) => {
      p.node.name = newName
    })

  root
    .find(j.JSXClosingElement, {
      name: { type: "JSXIdentifier", name: from },
    })
    .forEach((p: any) => {
      p.node.name = newName
    })
}

function isJSXElementNamed(node: JSXChild, name: string): node is JSXElement {
  return (
    node.type === "JSXElement" &&
    node.openingElement.name.type === "JSXIdentifier" &&
    node.openingElement.name.name === name
  )
}

type JSXChild =
  | JSXElement
  | JSXText
  | JSXExpressionContainer
  | JSXFragment
  | JSXSpreadChild
  | Literal
