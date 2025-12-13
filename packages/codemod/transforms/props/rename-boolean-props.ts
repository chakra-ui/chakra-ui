import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

const BOOLEAN_PROP_MAP: Record<string, string> = {
  isOpen: "open",
  defaultIsOpen: "defaultOpen",
  isDisabled: "disabled",
  isInvalid: "invalid",
  isRequired: "required",
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
