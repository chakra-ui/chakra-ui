import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  isTrackedJsx,
} from "../../utils/chakra-tracker"
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

  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  if (chakraLocalNames.size === 0) return file.source

  root.find(j.JSXElement).forEach((elementPath) => {
    const openingElement = elementPath.node.openingElement
    if (!isTrackedJsx(openingElement, chakraLocalNames)) return
    const attrs = openingElement.attributes || []
    attrs.forEach((attr) => {
      if (attr.type !== "JSXAttribute") return
      if (attr.name.type !== "JSXIdentifier") return
      const oldName = attr.name.name

      if (oldName === "apply") {
        openingElement.attributes = attrs.filter((a) => a !== attr)
        return
      }

      const newName = STYLE_PROP_MAP[oldName]
      if (!newName) return

      attr.name.name = newName
    })
  })

  return root.toSource({ quote: "single" })
}
