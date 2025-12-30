import type { API, FileInfo, Options } from "jscodeshift"
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

const CHAKRA_SOURCES = ["@chakra-ui/react", "@/components/ui"]

export default function transform(
  file: FileInfo,
  _api: API,
  __options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const chakraLocalNames = new Set<string>()
  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value
    if (
      typeof source === "string" &&
      CHAKRA_SOURCES.some((s) => source.includes(s))
    ) {
      path.node.specifiers?.forEach((spec) => {
        if (spec.local) chakraLocalNames.add(spec.local.name as string)
      })
    }
  })

  if (chakraLocalNames.size === 0) return file.source

  /**
   * Helper to rename object properties (for spreads or style objects)
   */
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
          // Fix shorthand { isActive } -> { 'data-active': isActive }
          if (prop.shorthand) prop.shorthand = false
        }
      }
    })
  }

  /**
   * 2. Transform JSX
   */
  root.find(j.JSXOpeningElement).forEach((path) => {
    const nameNode = path.node.name
    let baseName = ""

    if (nameNode.type === "JSXIdentifier") {
      baseName = nameNode.name
    } else if (nameNode.type === "JSXMemberExpression") {
      let current: any = nameNode
      while (current.object) current = current.object
      baseName = current.name
    }

    if (!chakraLocalNames.has(baseName)) return

    // Handle standard attributes
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

    // Handle spreads: <Button {...{ isActive: true }} />
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
