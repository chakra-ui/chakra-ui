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

  const disclosureNames = new Set<string>()

  let didTransformDrawer = false

  root.find(j.VariableDeclarator).forEach((path) => {
    const init = path.node.init
    if (
      init?.type === "CallExpression" &&
      init.callee.type === "Identifier" &&
      init.callee.name === "useDisclosure"
    ) {
      if (path.node.id.type === "Identifier") {
        disclosureNames.add(path.node.id.name)
      } else if (path.node.id.type === "ObjectPattern") {
        path.node.id.properties.forEach((prop) => {
          if (
            prop.type === "ObjectProperty" &&
            prop.key.type === "Identifier" &&
            prop.key.name === "isOpen"
          ) {
            prop.key.name = "open"
            if (prop.value.type === "Identifier") prop.value.name = "open"
          }
        })
      }
    }
  })

  if (disclosureNames.size > 0) {
    root.find(j.MemberExpression).forEach((path) => {
      if (
        path.node.object.type === "Identifier" &&
        disclosureNames.has(path.node.object.name) &&
        path.node.property.type === "Identifier" &&
        path.node.property.name === "isOpen"
      ) {
        path.node.property.name = "open"
      }
    })
  }

  const componentMap: Record<string, string> = {
    Drawer: "Root",
    DrawerOverlay: "Backdrop",
    DrawerContent: "Content",
    DrawerHeader: "Header",
    DrawerBody: "Body",
    DrawerFooter: "Footer",
    DrawerCloseButton: "CloseTrigger",
  }

  const propMap: Record<string, string> = {
    isOpen: "open",
    onClose: "onOpenChange",
    blockScrollOnMount: "preventScroll",
    closeOnEsc: "closeOnEscape",
    closeOnOverlayClick: "closeOnInteractOutside",
  }

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)

    if (!chakraLocalNames.has(baseName) || !componentMap[baseName]) return

    didTransformDrawer = true

    const newTagName = j.jsxMemberExpression(
      j.jsxIdentifier("Drawer"),
      j.jsxIdentifier(componentMap[baseName]),
    )
    opening.name = newTagName
    if (elPath.node.closingElement) elPath.node.closingElement.name = newTagName

    if (baseName === "Drawer") {
      opening.attributes?.forEach((attr) => {
        if (
          attr.type === "JSXAttribute" &&
          attr.name.type === "JSXIdentifier"
        ) {
          const newName = propMap[attr.name.name]
          if (newName) {
            attr.name.name = newName
            if (
              newName === "onOpenChange" &&
              attr.value?.type === "JSXExpressionContainer"
            ) {
              const expr = attr.value.expression
              attr.value.expression = j.arrowFunctionExpression(
                [j.identifier("e")],
                j.callExpression(expr as any, []),
              )
            }
          }
        }
      })
    }

    // Wrap DrawerContent with <Drawer.Positioner> and <Portal>
    if (baseName === "DrawerContent") {
      const parent = elPath.parentPath.node
      const isAlreadyWrapped =
        parent.type === "JSXElement" &&
        getJsxBaseName(parent.openingElement.name) === "Drawer.Positioner"

      if (!isAlreadyWrapped) {
        const positioner = j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Drawer"),
              j.jsxIdentifier("Positioner"),
            ),
            [],
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Drawer"),
              j.jsxIdentifier("Positioner"),
            ),
          ),
          [elPath.node],
        )
        const portal = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier("Portal"), []),
          j.jsxClosingElement(j.jsxIdentifier("Portal")),
          [positioner],
        )
        j(elPath).replaceWith(portal)
      }
    }
  })

  if (didTransformDrawer) {
    root.find(j.ImportDeclaration).forEach((path) => {
      if (path.node.source.value !== "@chakra-ui/react") return

      const specifiers = path.node.specifiers || []
      let hasDrawer = false
      let hasPortal = specifiers.some(
        (s) => s.type === "ImportSpecifier" && s.imported.name === "Portal",
      )

      const filtered = specifiers.filter((spec) => {
        if (spec.type !== "ImportSpecifier") return true
        const name = spec.imported.name
        if (name === "Drawer") {
          hasDrawer = true
          return true
        }
        return !componentMap[name as string]
      })

      if (!hasDrawer) filtered.push(j.importSpecifier(j.identifier("Drawer")))
      if (!hasPortal) filtered.push(j.importSpecifier(j.identifier("Portal")))

      path.node.specifiers = filtered
    })
  }

  return root.toSource({ quote: "single" })
}
