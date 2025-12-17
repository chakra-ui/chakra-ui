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

export default function transform(
  file: FileInfo,
  _api: API,
  __options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  /**
   * JSX: <Component isOpen /> → <Component open />
   */
  root.find(j.JSXAttribute).forEach((path) => {
    const name = path.node.name

    if (name.type !== "JSXIdentifier") return

    const attrName = path.node.name.name

    // Handle isCentered specially
    if (attrName === "isCentered") {
      path.node.name.name = "placement"
      // If value is true/truthy, set to "center"
      if (
        path.node.value?.type === "JSXExpressionContainer" &&
        path.node.value.expression.type === "Literal" &&
        path.node.value.expression.value === true
      ) {
        path.node.value = j.literal("center")
      } else if (!path.node.value) {
        path.node.value = j.literal("center")
      }
      return
    }

    const newName = BOOLEAN_PROP_MAP[name.name]
    if (!newName) return

    name.name = newName
  })

  /**
   * Objects: { isOpen: true } → { open: true }
   *          { isOpen } → { open }
   */
  root.find(j.Property).forEach((path) => {
    const { key, computed } = path.node
    if (computed) return

    if (key.type === "Identifier") {
      const newName = BOOLEAN_PROP_MAP[key.name]
      if (!newName) return

      key.name = newName
    }

    if (key.type === "Literal" && typeof key.value === "string") {
      const newName = BOOLEAN_PROP_MAP[key.value]
      if (!newName) return

      key.value = newName
    }
  })

  /**
   * TypeScript types & interfaces:
   * interface Props { isDisabled?: boolean }
   */
  root.find(j.TSPropertySignature).forEach((path) => {
    const key = path.node.key

    if (key.type === "Identifier") {
      const newName = BOOLEAN_PROP_MAP[key.name]
      if (!newName) return

      key.name = newName
    }

    if (key.type === "Literal" && typeof key.value === "string") {
      const newName = BOOLEAN_PROP_MAP[key.value]
      if (!newName) return

      key.value = newName
    }
  })

  return root.toSource({ quote: "single" })
}
