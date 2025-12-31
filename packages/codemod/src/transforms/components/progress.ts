import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Progress to compound component:
 * Before: <Progress hasStripe isAnimated value={75} colorScheme="blue" />
 * After:
 * <Progress.Root striped animated value={75} colorPalette="blue">
 *   <Progress.Track>
 *     <Progress.Range />
 *   </Progress.Track>
 * </Progress.Root>
 */
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
    .find(j.JSXElement, {
      openingElement: { name: { name: "Progress" } },
    })
    .forEach((path) => {
      const baseName = getJsxBaseName(path.node.openingElement.name)
      if (!chakraLocalNames.has(baseName) || baseName !== "Progress") return
      const attrs = path.node.openingElement.attributes || []
      const newAttrs: any[] = []

      // Transform props
      attrs.forEach((attr) => {
        if (attr.type !== "JSXAttribute") {
          newAttrs.push(attr)
          return
        }

        // hasStripe -> striped
        if (attr.name.name === "hasStripe") {
          attr.name.name = "striped"
          newAttrs.push(attr)
        }
        // isAnimated -> animated
        else if (attr.name.name === "isAnimated") {
          attr.name.name = "animated"
          newAttrs.push(attr)
        }
        // colorScheme -> colorPalette
        else if (attr.name.name === "colorScheme") {
          attr.name.name = "colorPalette"
          newAttrs.push(attr)
        }
        // Keep other props
        else {
          newAttrs.push(attr)
        }
      })

      // Create new structure
      const progressRoot = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("Progress"),
            j.jsxIdentifier("Root"),
          ),
          newAttrs,
        ),
        j.jsxClosingElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("Progress"),
            j.jsxIdentifier("Root"),
          ),
        ),
        [
          j.jsxText("\n  "),
          j.jsxElement(
            j.jsxOpeningElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("Progress"),
                j.jsxIdentifier("Track"),
              ),
              [],
            ),
            j.jsxClosingElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("Progress"),
                j.jsxIdentifier("Track"),
              ),
            ),
            [
              j.jsxText("\n    "),
              j.jsxElement(
                j.jsxOpeningElement(
                  j.jsxMemberExpression(
                    j.jsxIdentifier("Progress"),
                    j.jsxIdentifier("Range"),
                  ),
                  [],
                  true,
                ),
              ),
              j.jsxText("\n  "),
            ],
          ),
          j.jsxText("\n"),
        ],
      )

      j(path).replaceWith(progressRoot)
    })

  return root.toSource({ quote: "single" })
}
