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

  root
    .find(j.JSXOpeningElement, { name: { name: "Editable" } })
    .forEach((path) => {
      if (!chakraLocalNames.has("Editable")) return
      const attrs = path.node.attributes ?? []

      path.node.attributes = attrs.map((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "finalFocusRef":
            return j.jsxAttribute(
              j.jsxIdentifier("finalFocusEl"),
              j.jsxExpressionContainer(
                j.arrowFunctionExpression([], attr.value as any),
              ),
            )
          case "isDisabled":
            return j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value)
          case "onSubmit":
            return j.jsxAttribute(j.jsxIdentifier("onValueCommit"), attr.value)
          case "onCancel":
            return j.jsxAttribute(j.jsxIdentifier("onValueRevert"), attr.value)
          case "onChange":
            return j.jsxAttribute(j.jsxIdentifier("onValueChange"), attr.value)
          case "startWithEditView":
            return j.jsxAttribute(j.jsxIdentifier("defaultEdit"), attr.value)
          case "submitOnBlur":
            return j.jsxAttribute(j.jsxIdentifier("submitMode"), attr.value)
          default:
            return attr
        }
      })
    })

  return root.toSource({ quote: "single" })
}
