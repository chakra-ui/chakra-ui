import type { API, FileInfo, Options } from "jscodeshift"
import type { JSXAttribute } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

const STYLE_PROP_MAP: Record<string, string> = {
  noOfLines: "lineClamp",
  truncated: "truncate",
  _activeLink: "_currentPage",
  _activeStep: "_currentStep",
  _mediaDark: "_osDark",
  _mediaLight: "_osLight",
}

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  root.find(j.JSXAttribute).forEach((path) => {
    const attr = path.node
    if (attr.name.type !== "JSXIdentifier") return

    const oldName = attr.name.name

    // Remove 'apply' prop
    if (oldName === "apply") {
      const jsxElement = path.parent.node
      if (jsxElement.type === "JSXOpeningElement") {
        jsxElement.attributes = jsxElement.attributes.filter(
          (a: JSXAttribute): a is JSXAttribute => a !== attr,
        )
      }
      return
    }

    // Rename style props based on the map
    const newName = STYLE_PROP_MAP[oldName]
    if (!newName) return

    attr.name.name = newName
  })

  return root.toSource({ quote: "single" })
}
