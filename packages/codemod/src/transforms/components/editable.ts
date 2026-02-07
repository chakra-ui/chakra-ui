import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const { chakraLocalNames, componentAliases } = collectChakraLocalNames(
    j,
    root,
  )
  if (chakraLocalNames.size === 0) return file.source

  // Transform useEditableControls hook to useEditableContext
  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const source = path.node.source.value
      return source === "@chakra-ui/react"
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers || []
      path.node.specifiers = specifiers.map((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.type === "Identifier" &&
          spec.imported.name === "useEditableControls"
        ) {
          return j.importSpecifier(j.identifier("useEditableContext"))
        }
        return spec
      })
    })

  // Transform useEditableControls() calls to useEditableContext()
  root
    .find(j.CallExpression, {
      callee: { type: "Identifier", name: "useEditableControls" },
    })
    .forEach((path) => {
      path.node.callee = j.identifier("useEditableContext")
    })

  // Transform Editable components
  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    const isChakra = chakraLocalNames.has(baseName)

    if (!isChakra) return

    // Handle Editable -> Editable.Root
    if (
      baseName === "Editable" ||
      (componentAliases.has(baseName) &&
        componentAliases.get(baseName) === "Editable")
    ) {
      const attrs = opening.attributes || []
      const newAttributes: any[] = []
      let isPreviewFocusableValue: any = null
      let submitOnBlurValue: any = null

      attrs.forEach((attr) => {
        if (
          attr.type !== "JSXAttribute" ||
          attr.name.type !== "JSXIdentifier"
        ) {
          newAttributes.push(attr)
          return
        }

        const name = attr.name.name
        switch (name) {
          case "isDisabled":
            newAttributes.push(
              j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value),
            )
            break
          case "isPreviewFocusable":
            isPreviewFocusableValue = attr.value
            break
          case "onCancel":
            newAttributes.push(
              j.jsxAttribute(j.jsxIdentifier("onValueRevert"), attr.value),
            )
            break
          case "onChange":
            newAttributes.push(
              j.jsxAttribute(j.jsxIdentifier("onValueChange"), attr.value),
            )
            break
          case "onSubmit":
            newAttributes.push(
              j.jsxAttribute(j.jsxIdentifier("onValueCommit"), attr.value),
            )
            break
          case "selectAllOnFocus":
            newAttributes.push(
              j.jsxAttribute(j.jsxIdentifier("selectOnFocus"), attr.value),
            )
            break
          case "startWithEditView":
            // Transform to defaultEdit
            newAttributes.push(
              j.jsxAttribute(
                j.jsxIdentifier("defaultEdit"),
                attr.value || j.jsxExpressionContainer(j.booleanLiteral(true)),
              ),
            )
            break
          case "submitOnBlur":
            submitOnBlurValue = attr.value
            break
          case "finalFocusRef":
            // Transform to finalFocusEl function
            if (attr.value?.type === "JSXExpressionContainer") {
              const expr = attr.value.expression
              // Create arrow function: () => ref.current
              const arrowFunc = j.arrowFunctionExpression(
                [],
                j.memberExpression(expr, j.identifier("current")),
              )
              newAttributes.push(
                j.jsxAttribute(
                  j.jsxIdentifier("finalFocusEl"),
                  j.jsxExpressionContainer(arrowFunc),
                ),
              )
            } else {
              newAttributes.push(attr)
            }
            break
          default:
            newAttributes.push(attr)
        }
      })

      // Handle submitOnBlur={false} -> submitMode='enter'
      if (
        submitOnBlurValue &&
        ((submitOnBlurValue.type === "JSXExpressionContainer" &&
          submitOnBlurValue.expression.type === "Literal" &&
          submitOnBlurValue.expression.value === false) ||
          (submitOnBlurValue.type === "JSXExpressionContainer" &&
            submitOnBlurValue.expression.type === "BooleanLiteral" &&
            submitOnBlurValue.expression.value === false))
      ) {
        newAttributes.push(
          j.jsxAttribute(j.jsxIdentifier("submitMode"), j.literal("enter")),
        )
      }

      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("Editable"),
        j.jsxIdentifier("Root"),
      )
      opening.name = newName
      opening.attributes = newAttributes

      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }

      // Handle isPreviewFocusable={false} -> add tabIndex={undefined} to Preview
      if (
        isPreviewFocusableValue &&
        ((isPreviewFocusableValue.type === "JSXExpressionContainer" &&
          isPreviewFocusableValue.expression.type === "Literal" &&
          isPreviewFocusableValue.expression.value === false) ||
          (isPreviewFocusableValue.type === "JSXExpressionContainer" &&
            isPreviewFocusableValue.expression.type === "BooleanLiteral" &&
            isPreviewFocusableValue.expression.value === false))
      ) {
        // Find EditablePreview child and add tabIndex={undefined}
        const children = elPath.node.children || []
        children.forEach((child: any) => {
          if (
            child.type === "JSXElement" &&
            getJsxBaseName(child.openingElement.name) === "EditablePreview"
          ) {
            const previewAttrs = child.openingElement.attributes || []
            previewAttrs.push(
              j.jsxAttribute(
                j.jsxIdentifier("tabIndex"),
                j.jsxExpressionContainer(j.identifier("undefined")),
              ),
            )
            child.openingElement.attributes = previewAttrs
          }
        })
      }
    }

    // Handle EditablePreview -> Editable.Preview
    if (
      baseName === "EditablePreview" ||
      (componentAliases.has(baseName) &&
        componentAliases.get(baseName) === "EditablePreview")
    ) {
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("Editable"),
        j.jsxIdentifier("Preview"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }

    // Handle EditableInput -> Editable.Input
    if (
      baseName === "EditableInput" ||
      (componentAliases.has(baseName) &&
        componentAliases.get(baseName) === "EditableInput")
    ) {
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("Editable"),
        j.jsxIdentifier("Input"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }

    // Handle EditableTextarea -> Editable.Textarea
    if (
      baseName === "EditableTextarea" ||
      (componentAliases.has(baseName) &&
        componentAliases.get(baseName) === "EditableTextarea")
    ) {
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("Editable"),
        j.jsxIdentifier("Textarea"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }
  })

  return root.toSource({ quote: "single" })
}
