import type { API, FileInfo, JSXElement, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  /**
   * Rename <Tabs> → <Tabs.Root> and props
   */
  root.find(j.JSXOpeningElement, { name: { name: "Tabs" } }).forEach((path) => {
    path.node.name = j.jsxMemberExpression(
      j.jsxIdentifier("Tabs"),
      j.jsxIdentifier("Root"),
    )

    const attrs = path.node.attributes ?? []

    path.node.attributes = attrs.flatMap((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return attr

      switch (attr.name.name) {
        case "defaultIndex":
          return j.jsxAttribute(j.jsxIdentifier("defaultValue"), attr.value)
        case "index":
          return j.jsxAttribute(j.jsxIdentifier("value"), attr.value)
        case "onChange":
          return j.jsxAttribute(
            j.jsxIdentifier("onValueChange"),
            wrapOnChange(j, attr.value),
          )
        case "isLazy":
          return [
            j.jsxAttribute(j.jsxIdentifier("lazyMount")),
            j.jsxAttribute(j.jsxIdentifier("unmountOnExit")),
          ]
        default:
          return attr
      }
    })
  })

  /**
   * Closing </Tabs> → </Tabs.Root>
   */
  root.find(j.JSXClosingElement, { name: { name: "Tabs" } }).forEach((path) => {
    path.node.name = j.jsxMemberExpression(
      j.jsxIdentifier("Tabs"),
      j.jsxIdentifier("Root"),
    )
  })

  /**
   * TabList → Tabs.List
   */
  renameComponent(j, root, "TabList", "Tabs.List")

  /**
   * Transform Tabs children (Triggers + Panels)
   */
  root
    .find(j.JSXElement, {
      openingElement: {
        name: {
          type: "JSXMemberExpression",
          object: { name: "Tabs" },
          property: { name: "Root" },
        },
      },
    })
    .forEach((path) => {
      const element = path.node

      const tabList = findChild(element, "TabList")
      const tabPanels = findChild(element, "TabPanels")

      if (!tabList || !tabPanels) return

      const tabs = getJSXElementChildren(tabList).filter(
        isJSXElementNamed("Tab"),
      )
      const panels = getJSXElementChildren(tabPanels).filter(
        isJSXElementNamed("TabPanel"),
      )

      const triggers = tabs.map((tab, i) =>
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Tabs"),
              j.jsxIdentifier("Trigger"),
            ),
            [
              j.jsxAttribute(
                j.jsxIdentifier("value"),
                j.stringLiteral(`tab-${i}`),
              ),
            ],
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Tabs"),
              j.jsxIdentifier("Trigger"),
            ),
          ),
          tab.children,
        ),
      )

      const contents = panels.map((panel, i) =>
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Tabs"),
              j.jsxIdentifier("Content"),
            ),
            [
              j.jsxAttribute(
                j.jsxIdentifier("value"),
                j.stringLiteral(`tab-${i}`),
              ),
            ],
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Tabs"),
              j.jsxIdentifier("Content"),
            ),
          ),
          panel.children,
        ),
      )

      element.children = [
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Tabs"),
              j.jsxIdentifier("List"),
            ),
            [],
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Tabs"),
              j.jsxIdentifier("List"),
            ),
          ),
          triggers,
        ),
        ...contents,
      ]
    })

  return root.toSource({ quote: "single" })
}

function renameComponent(j: any, root: any, from: string, to: string) {
  const parts = to.split(".")

  root
    .find(j.JSXIdentifier, { name: from })
    .replaceWith(() =>
      j.jsxMemberExpression(
        j.jsxIdentifier(parts[0]),
        j.jsxIdentifier(parts[1]),
      ),
    )
}

function wrapOnChange(j: any, value: any) {
  if (!value || value.type !== "JSXExpressionContainer") return value

  return j.jsxExpressionContainer(
    j.arrowFunctionExpression(
      [
        j.objectPattern([
          j.property("init", j.identifier("value"), j.identifier("value")),
        ]),
      ],
      j.callExpression(value.expression, [j.identifier("value")]),
    ),
  )
}

function findChild(parent: JSXElement, name: string): JSXElement | undefined {
  return parent.children?.find(
    (c): c is JSXElement =>
      c.type === "JSXElement" &&
      c.openingElement.name.type === "JSXIdentifier" &&
      c.openingElement.name.name === name,
  )
}

function getJSXElementChildren(el: JSXElement | undefined): JSXElement[] {
  if (!el?.children) return []
  return el.children.filter((c): c is JSXElement => c.type === "JSXElement")
}

function isJSXElementNamed(name: string) {
  return (node: any): node is JSXElement =>
    node.type === "JSXElement" &&
    node.openingElement.name.type === "JSXIdentifier" &&
    node.openingElement.name.name === name
}
