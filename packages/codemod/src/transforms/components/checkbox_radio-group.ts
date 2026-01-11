import type { API, FileInfo, JSXAttribute, Options } from "jscodeshift"
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

  /**
   * Checkbox → compound
   */
  root
    .find(j.JSXElement, { openingElement: { name: { name: "Checkbox" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("Checkbox")) return
      const oldAttrs = path.node.openingElement.attributes ?? []
      const children = path.node.children ?? []

      // Map props
      const rootAttrs: JSXAttribute[] = []
      let indeterminateAttr: JSXAttribute | null = null

      oldAttrs.forEach((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return

        switch (attr.name.name) {
          case "isChecked":
            rootAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("checked"), attr.value),
            )
            break
          case "isDisabled":
            rootAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value),
            )
            break
          case "isInvalid":
            rootAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("invalid"), attr.value),
            )
            break
          case "colorScheme":
            rootAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("colorPalette"), attr.value),
            )
            break
          case "isIndeterminate":
            indeterminateAttr = j.jsxAttribute(
              j.jsxIdentifier("indeterminate"),
              attr.value,
            )
            break
          default:
            rootAttrs.push(attr)
        }
      })

      // Build new structure
      path.replace(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Checkbox"),
              j.jsxIdentifier("Root"),
            ),
            rootAttrs,
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Checkbox"),
              j.jsxIdentifier("Root"),
            ),
          ),
          [
            j.jsxElement(
              j.jsxOpeningElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("Checkbox"),
                  j.jsxIdentifier("HiddenInput"),
                ),
                [],
                true,
              ),
              null,
              [],
            ),
            j.jsxElement(
              j.jsxOpeningElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("Checkbox"),
                  j.jsxIdentifier("Control"),
                ),
                [],
                false,
              ),
              j.jsxClosingElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("Checkbox"),
                  j.jsxIdentifier("Control"),
                ),
              ),
              [
                j.jsxElement(
                  j.jsxOpeningElement(
                    j.jsxMemberExpression(
                      j.jsxIdentifier("Checkbox"),
                      j.jsxIdentifier("Indicator"),
                    ),
                    indeterminateAttr ? [indeterminateAttr] : [],
                    true,
                  ),
                  null,
                  [],
                ),
              ],
            ),
            j.jsxElement(
              j.jsxOpeningElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("Checkbox"),
                  j.jsxIdentifier("Label"),
                ),
                [],
                false,
              ),
              j.jsxClosingElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("Checkbox"),
                  j.jsxIdentifier("Label"),
                ),
              ),
              children,
            ),
          ],
        ),
      )
    })

  /**
   * RadioGroup → compound
   */
  root
    .find(j.JSXElement, { openingElement: { name: { name: "RadioGroup" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("RadioGroup")) return
      const oldAttrs = path.node.openingElement.attributes ?? []
      const children = path.node.children ?? []

      path.replace(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("RadioGroup"),
              j.jsxIdentifier("Root"),
            ),
            oldAttrs,
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("RadioGroup"),
              j.jsxIdentifier("Root"),
            ),
          ),
          children.map((c) => {
            if (c.type !== "JSXElement") return c

            // Only transform <Radio> → <RadioGroup.Item>
            const name = c.openingElement.name
            if (name.type !== "JSXIdentifier" || name.name !== "Radio") return c

            const radioAttrs = c.openingElement.attributes ?? []
            const radioChildren = c.children ?? []

            return j.jsxElement(
              j.jsxOpeningElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("RadioGroup"),
                  j.jsxIdentifier("Item"),
                ),
                radioAttrs,
                false,
              ),
              j.jsxClosingElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("RadioGroup"),
                  j.jsxIdentifier("Item"),
                ),
              ),
              [
                j.jsxElement(
                  j.jsxOpeningElement(
                    j.jsxMemberExpression(
                      j.jsxIdentifier("RadioGroup"),
                      j.jsxIdentifier("ItemHiddenInput"),
                    ),
                    [],
                    true,
                  ),
                  null,
                  [],
                ),
                j.jsxElement(
                  j.jsxOpeningElement(
                    j.jsxMemberExpression(
                      j.jsxIdentifier("RadioGroup"),
                      j.jsxIdentifier("ItemIndicator"),
                    ),
                    [],
                    true,
                  ),
                  null,
                  [],
                ),
                j.jsxElement(
                  j.jsxOpeningElement(
                    j.jsxMemberExpression(
                      j.jsxIdentifier("RadioGroup"),
                      j.jsxIdentifier("ItemText"),
                    ),
                    [],
                    false,
                  ),
                  j.jsxClosingElement(
                    j.jsxMemberExpression(
                      j.jsxIdentifier("RadioGroup"),
                      j.jsxIdentifier("ItemText"),
                    ),
                  ),
                  radioChildren,
                ),
              ],
            )
          }),
        ),
      )
    })

  return root.toSource({ quote: "single" })
}
