import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

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

export default function transform(
  file: FileInfo,
  _api: API,
  __options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  if (chakraLocalNames.size === 0) return file.source

  const renameObjectProps = (objectNode: any) => {
    if (objectNode.type !== "ObjectExpression") return

    objectNode.properties.forEach((prop: any) => {
      if (prop.type === "Property" && !prop.computed) {
        const keyName =
          prop.key.type === "Identifier" ? prop.key.name : prop.key.value
        const newName = BOOLEAN_PROP_MAP[keyName]

        if (newName) {
          if (prop.key.type === "Identifier") {
            prop.key.name = newName
          } else {
            prop.key.value = newName
          }
          if (prop.shorthand) prop.shorthand = false
        }
      }
    })
  }

  root.find(j.JSXOpeningElement).forEach((path) => {
    const nameNode = path.node.name
    const baseName = getJsxBaseName(nameNode)
    if (!chakraLocalNames.has(baseName)) return

    j(path)
      .find(j.JSXAttribute)
      .forEach((attrPath) => {
        const name = attrPath.node.name
        if (name.type !== "JSXIdentifier") return

        if (name.name === "isCentered") {
          name.name = "placement"
          if (
            !attrPath.node.value ||
            (attrPath.node.value.type === "JSXExpressionContainer" &&
              (attrPath.node.value.expression as any).value === true)
          ) {
            attrPath.node.value = j.literal("center")
          }
        } else if (BOOLEAN_PROP_MAP[name.name]) {
          name.name = BOOLEAN_PROP_MAP[name.name]
        }
      })

    j(path)
      .find(j.JSXSpreadAttribute)
      .forEach((spreadPath) => {
        const arg = spreadPath.node.argument
        if (arg.type === "ObjectExpression") {
          renameObjectProps(arg)
        }
      })
  })

  return root.toSource({ quote: "single" })
}
