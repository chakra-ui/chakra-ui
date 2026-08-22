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

  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  if (chakraLocalNames.size === 0) return file.source

  // Handle AvatarGroup - remove max prop
  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    if (!chakraLocalNames.has(baseName)) return

    if (baseName === "AvatarGroup") {
      const attrs = opening.attributes || []
      opening.attributes = attrs
        .filter((attr) => {
          if (
            attr.type !== "JSXAttribute" ||
            attr.name.type !== "JSXIdentifier"
          ) {
            return true
          }
          return attr.name.name !== "max"
        })
        .map((attr) => {
          if (
            attr.type === "JSXAttribute" &&
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "spacing"
          ) {
            attr.name.name = "spaceX"
          }
          return attr
        })
      return
    }

    if (baseName !== "Avatar") return

    const attrs = opening.attributes || []
    const remainingAttrs: any[] = []
    let nameAttr: any = null
    let iconAttr: any = null
    let getInitialsAttr: any = null
    let iconLabelAttr: any = null
    const imageAttrs: any[] = []

    attrs.forEach((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier") {
        remainingAttrs.push(attr)
        return
      }
      const name = attr.name.name
      // Remove unsupported props
      if (
        name === "max" ||
        name === "ignoreFallback" ||
        name === "showBorder"
      ) {
        return
      }
      if (name === "name") {
        nameAttr = attr
        return
      }
      if (name === "icon") {
        iconAttr = attr
        return
      }
      if (name === "getInitials") {
        getInitialsAttr = attr
        return
      }
      if (name === "iconLabel") {
        iconLabelAttr = attr
        return
      }
      if (
        name === "src" ||
        name === "alt" ||
        name === "srcSet" ||
        name === "sizes" ||
        name === "loading" ||
        name === "referrerPolicy" ||
        name === "crossOrigin"
      ) {
        imageAttrs.push(attr)
        return
      }
      remainingAttrs.push(attr)
    })
    opening.attributes = remainingAttrs

    // Convert <Avatar ...> to <Avatar.Root ...>
    const newName = j.jsxMemberExpression(
      j.jsxIdentifier("Avatar"),
      j.jsxIdentifier("Root"),
    )
    opening.name = newName

    // Inject parts for Fallback and Image
    const children = elPath.node.children || []
    const newChildren = []

    // Always add Avatar.Fallback
    const fallbackName = j.jsxMemberExpression(
      j.jsxIdentifier("Avatar"),
      j.jsxIdentifier("Fallback"),
    )

    const fallbackAttrs: any[] = []
    const fallbackChildren: any[] = []

    // Add name attribute if present
    if (nameAttr) {
      fallbackAttrs.push(
        j.jsxAttribute(j.jsxIdentifier("name"), nameAttr.value || null),
      )
    }

    // Add iconLabel as aria-label if present
    if (iconLabelAttr) {
      fallbackAttrs.push(
        j.jsxAttribute(
          j.jsxIdentifier("aria-label"),
          iconLabelAttr.value || null,
        ),
      )
    }

    // Add icon as children if present
    if (iconAttr) {
      if (iconAttr.value?.type === "JSXExpressionContainer") {
        fallbackChildren.push(
          j.jsxExpressionContainer(iconAttr.value.expression),
        )
      }
    }

    // Add TODO comment for getInitials
    if (getInitialsAttr) {
      const comment = j.commentLine(
        " TODO: Handle getInitials function manually",
        true,
        false,
      )
      newChildren.push(comment)
    }

    const fallback = j.jsxElement(
      j.jsxOpeningElement(
        fallbackName,
        fallbackAttrs,
        fallbackChildren.length === 0,
      ),
      fallbackChildren.length > 0 ? j.jsxClosingElement(fallbackName) : null,
      fallbackChildren,
    )
    newChildren.push(fallback)

    if (imageAttrs.length > 0) {
      const imageName = j.jsxMemberExpression(
        j.jsxIdentifier("Avatar"),
        j.jsxIdentifier("Image"),
      )
      const image = j.jsxElement(
        j.jsxOpeningElement(imageName, imageAttrs, true),
        null,
        [],
      )
      newChildren.push(image)
    }

    // Handle AvatarBadge children - remove and add TODO comment with original code
    const updatedChildren: any[] = []
    for (const child of children) {
      if (
        child.type === "JSXElement" &&
        getJsxBaseName(child.openingElement?.name) === "AvatarBadge"
      ) {
        const todoComment = j.commentLine(
          " TODO [BREAKING]: AvatarBadge removed. Migrate to Float + Circle pattern.",
          true,
          false,
        )
        updatedChildren.push(todoComment)
        const linkComment = j.commentLine(
          " See https://chakra-ui.com/docs/components/avatar#badge",
          true,
          false,
        )
        updatedChildren.push(linkComment)

        // Add the original code as a comment
        const originalCode = j(child).toSource()
        const codeComment = j.commentLine(
          ` Original: ${originalCode}`,
          true,
          false,
        )
        updatedChildren.push(codeComment)
        // Don't include the AvatarBadge child - remove it to avoid build errors
      } else {
        updatedChildren.push(child)
      }
    }

    newChildren.push(...updatedChildren)

    // If we have new children, ensure we have a closing element
    if (newChildren.length > 0) {
      elPath.node.children = newChildren
      if (!elPath.node.closingElement) {
        elPath.node.closingElement = j.jsxClosingElement(newName)
      } else {
        elPath.node.closingElement.name = newName
      }
      // Make sure opening element is not self-closing
      opening.selfClosing = false
    } else {
      // No children, keep as self-closing
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }
  })

  return root.toSource({ quote: "single" })
}
