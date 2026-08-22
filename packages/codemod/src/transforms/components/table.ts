import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  if (chakraLocalNames.size === 0) return file.source

  renameComponent(j, root, "Table", "Table.Root")
  renameComponent(j, root, "Thead", "Table.Header")
  renameComponent(j, root, "Tbody", "Table.Body")
  renameComponent(j, root, "Tfoot", "Table.Footer")
  renameComponent(j, root, "Tr", "Table.Row")
  renameComponent(j, root, "Th", "Table.ColumnHeader")
  renameComponent(j, root, "Td", "Table.Cell")
  renameComponent(j, root, "TableCaption", "Table.Caption")
  renameComponent(j, root, "TableContainer", "Table.ScrollArea")

  root
    .find(j.JSXOpeningElement)
    .filter((path) => {
      const baseName =
        path.node.name.type === "JSXMemberExpression" &&
        path.node.name.object.type === "JSXIdentifier"
          ? path.node.name.object.name
          : null
      if (!baseName || !chakraLocalNames.has(baseName)) return false
      const name = path.node.name
      return (
        name.type === "JSXMemberExpression" &&
        name.object.type === "JSXIdentifier" &&
        name.object.name === "Table" &&
        (name.property.name === "ColumnHeader" || name.property.name === "Cell")
      )
    })
    .forEach((path) => {
      const attrs = path.node.attributes ?? []

      const hasIsNumeric = attrs.some(
        (a) =>
          a.type === "JSXAttribute" &&
          a.name.type === "JSXIdentifier" &&
          a.name.name === "isNumeric",
      )

      if (!hasIsNumeric) return

      path.node.attributes = [
        ...attrs.filter(
          (a) =>
            !(
              a.type === "JSXAttribute" &&
              a.name.type === "JSXIdentifier" &&
              a.name.name === "isNumeric"
            ),
        ),
        j.jsxAttribute(j.jsxIdentifier("textAlign"), j.stringLiteral("end")),
      ]
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
