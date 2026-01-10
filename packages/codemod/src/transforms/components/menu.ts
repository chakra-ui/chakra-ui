import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXElement,
  Options,
} from "jscodeshift"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const { chakraLocalNames, componentAliases } = collectChakraLocalNames(
    j,
    root,
  )
  if (chakraLocalNames.size === 0) return file.source

  root.find(j.JSXOpeningElement).forEach((path) => {
    const baseName = getJsxBaseName(path.node.name)
    const isChakra = chakraLocalNames.has(baseName)
    const resolvesToMenu =
      baseName === "Menu" ||
      (componentAliases.has(baseName) &&
        componentAliases.get(baseName) === "Menu")
    if (!isChakra || !resolvesToMenu) return
    path.node.name = j.jsxMemberExpression(
      j.jsxIdentifier("Menu"),
      j.jsxIdentifier("Root"),
    )
  })

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

  root
    .find(j.JSXElement, {
      openingElement: {
        name: { type: "JSXIdentifier", name: "MenuButton" },
      },
    })
    .forEach((path) => {
      const button = path.node
      const hasChakraMenu =
        chakraLocalNames.has("Menu") ||
        Array.from(componentAliases.values()).includes("Menu")
      if (!hasChakraMenu) return

      const attrs = button.openingElement.attributes ?? []

      let rightIcon: JSXElement | null = null
      let leftIcon: JSXElement | null = null
      const filteredAttrs = attrs.filter((attr) => {
        if (
          attr.type === "JSXAttribute" &&
          attr.value?.type === "JSXExpressionContainer"
        ) {
          if (attr.name.name === "rightIcon") {
            rightIcon = attr.value.expression as JSXElement
            return false
          }
          if (attr.name.name === "leftIcon") {
            leftIcon = attr.value.expression as JSXElement
            return false
          }
        }
        return true
      })

      const children: any[] = []
      if (leftIcon) children.push(leftIcon)
      children.push(...(button.children ?? []))
      if (rightIcon) children.push(rightIcon)

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
          [
            j.jsxElement(
              j.jsxOpeningElement(
                j.jsxIdentifier("Button"),
                filteredAttrs,
                false,
              ),
              j.jsxClosingElement(j.jsxIdentifier("Button")),
              children,
            ),
          ],
        ),
      )
    })

  root
    .find(j.JSXElement, {
      openingElement: {
        name: { type: "JSXIdentifier", name: "MenuList" },
      },
    })
    .forEach((path) => {
      const hasChakraMenu =
        chakraLocalNames.has("Menu") ||
        Array.from(componentAliases.values()).includes("Menu")
      if (!hasChakraMenu) return
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

  let itemIndex = 0

  root
    .find(j.JSXOpeningElement, {
      name: { type: "JSXIdentifier", name: "MenuItem" },
    })
    .forEach((path) => {
      const hasChakraMenu =
        chakraLocalNames.has("Menu") ||
        Array.from(componentAliases.values()).includes("Menu")
      if (!hasChakraMenu) return
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
      const hasChakraMenu =
        chakraLocalNames.has("Menu") ||
        Array.from(componentAliases.values()).includes("Menu")
      if (!hasChakraMenu) return
      path.node.name = j.jsxMemberExpression(
        j.jsxIdentifier("Menu"),
        j.jsxIdentifier("Item"),
      )
    })

  root
    .find(j.JSXElement, {
      openingElement: {
        name: { type: "JSXIdentifier", name: "MenuOptionGroup" },
      },
    })
    .forEach((path) => {
      const hasChakraMenu =
        chakraLocalNames.has("Menu") ||
        Array.from(componentAliases.values()).includes("Menu")
      if (!hasChakraMenu) return
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

  // Ensure Portal import exists if Portal is used
  const usesPortal = root.find(j.JSXIdentifier, { name: "Portal" }).size() > 0
  if (usesPortal) {
    const imports = root.find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    if (imports.size() > 0) {
      imports.forEach((imp) => {
        const specs = imp.node.specifiers || []
        const hasPortal = specs.some(
          (s) => s.type === "ImportSpecifier" && s.imported.name === "Portal",
        )
        if (!hasPortal) {
          specs.push(j.importSpecifier(j.identifier("Portal")))
          imp.node.specifiers = specs
        }
      })
    } else {
      root
        .get()
        .node.program.body.unshift(
          j.importDeclaration(
            [j.importSpecifier(j.identifier("Portal"))],
            j.stringLiteral("@chakra-ui/react"),
          ),
        )
    }
  }

  return root.toSource({ quote: "single" })
}

function isJSXElementNamed(node: any, name: string): node is JSXElement {
  return (
    node.type === "JSXElement" &&
    node.openingElement.name.type === "JSXIdentifier" &&
    node.openingElement.name.name === name
  )
}
