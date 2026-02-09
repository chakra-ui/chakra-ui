import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import {
  processDialogProps,
  renameToMemberExpression,
} from "../../utils/dialog-utils"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Drawer components to v3 Drawer compound component API
 *
 * @example
 * // Before
 * <Drawer isOpen={isOpen} onClose={onClose} placement="left" isFullHeight>
 *   <DrawerOverlay />
 *   <DrawerContent>
 *     <DrawerHeader>Title</DrawerHeader>
 *     <DrawerBody>Body</DrawerBody>
 *   </DrawerContent>
 * </Drawer>
 *
 * // After
 * <Drawer.Root open={isOpen} onOpenChange={(e) => { if (!e.open) onClose() }} placement="start">
 *   <Portal>
 *     <Drawer.Backdrop />
 *     <Drawer.Positioner>
 *       <Drawer.Content height="100%">
 *         <Drawer.Header>Title</Drawer.Header>
 *         <Drawer.Body>Body</Drawer.Body>
 *       </Drawer.Content>
 *     </Drawer.Positioner>
 *   </Portal>
 * </Drawer.Root>
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

  const transformedComponents = new Set<string>()
  const fullHeightContentPaths = new Set<any>()

  // Transform Drawer
  if (chakraLocalNames.has("Drawer")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "Drawer" } },
      })
      .forEach((path) => {
        const isFullHeight = transformDrawer(j, path)
        transformedComponents.add("Drawer")

        // Track which DrawerContent should have height="100%"
        if (isFullHeight) {
          // Find DrawerContent within this Drawer
          j(path)
            .find(j.JSXElement, {
              openingElement: { name: { name: "DrawerContent" } },
            })
            .forEach((contentPath) => {
              fullHeightContentPaths.add(contentPath)
            })
        }
      })
  }

  // Transform DrawerOverlay
  if (chakraLocalNames.has("DrawerOverlay")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "DrawerOverlay" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Drawer", "Backdrop")
        transformedComponents.add("DrawerOverlay")
      })
  }

  // Transform DrawerContent
  if (chakraLocalNames.has("DrawerContent")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "DrawerContent" } },
      })
      .forEach((path) => {
        transformDrawerContent(j, path, fullHeightContentPaths.has(path))
        transformedComponents.add("DrawerContent")
      })
  }

  // Transform DrawerHeader
  if (chakraLocalNames.has("DrawerHeader")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "DrawerHeader" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Drawer", "Header")
        transformedComponents.add("DrawerHeader")
      })
  }

  // Transform DrawerBody
  if (chakraLocalNames.has("DrawerBody")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "DrawerBody" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Drawer", "Body")
        transformedComponents.add("DrawerBody")
      })
  }

  // Transform DrawerFooter
  if (chakraLocalNames.has("DrawerFooter")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "DrawerFooter" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Drawer", "Footer")
        transformedComponents.add("DrawerFooter")
      })
  }

  // Transform DrawerCloseButton
  if (chakraLocalNames.has("DrawerCloseButton")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "DrawerCloseButton" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Drawer", "CloseTrigger")
        transformedComponents.add("DrawerCloseButton")
      })
  }

  // Update imports
  if (transformedComponents.size > 0) {
    const drawerComponentNames = [
      "Drawer",
      "DrawerOverlay",
      "DrawerContent",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
      "DrawerCloseButton",
    ]
    updateDrawerImports(j, root, transformedComponents, drawerComponentNames)
  }

  return root.toSource({ quote: "single" })
}

/**
 * Transform Drawer to Drawer.Root and wrap children in Portal
 * Handle placement remapping and isFullHeight
 * @returns {boolean} Whether isFullHeight was set
 */
function transformDrawer(j: any, path: any): boolean {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  let isFullHeight = false

  // Process drawer-specific props before common dialog props
  const processedAttrs = attrs.flatMap((attr: any) => {
    if (attr.type !== "JSXAttribute") return [attr]

    const propName = attr.name.name

    // Handle placement remapping: left→start, right→end
    if (propName === "placement") {
      const value = attr.value
      if (value?.type === "StringLiteral" || value?.type === "Literal") {
        const placement = value.value
        const placementMap: Record<string, string> = {
          left: "start",
          right: "end",
          start: "start",
          end: "end",
          top: "top",
          bottom: "bottom",
        }
        const newPlacement = placementMap[placement] || placement
        attr.value = j.stringLiteral(newPlacement)
      }
      // If it's an expression, keep as-is
      return [attr]
    }

    // Track isFullHeight and remove it
    if (propName === "isFullHeight") {
      isFullHeight = true
      return []
    }

    return [attr]
  })

  // Process common dialog props
  const newAttrs = processDialogProps(j, processedAttrs, {
    componentType: "modal",
  })

  // Update component name to Drawer.Root
  path.node.openingElement.name = j.jsxMemberExpression(
    j.jsxIdentifier("Drawer"),
    j.jsxIdentifier("Root"),
  )

  if (path.node.closingElement) {
    path.node.closingElement.name = j.jsxMemberExpression(
      j.jsxIdentifier("Drawer"),
      j.jsxIdentifier("Root"),
    )
  }

  path.node.openingElement.attributes = newAttrs

  // Wrap children in Portal (mimicking v2 behavior)
  if (children.length > 0) {
    const portalElement = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier("Portal"), []),
      j.jsxClosingElement(j.jsxIdentifier("Portal")),
      [j.jsxText("\n    "), ...children, j.jsxText("\n  ")],
    )
    path.node.children = [j.jsxText("\n  "), portalElement, j.jsxText("\n")]
  }

  return isFullHeight
}

/**
 * Transform DrawerContent to Drawer.Content wrapped in Drawer.Positioner
 * Add height="100%" if isFullHeight was set
 */
function transformDrawerContent(j: any, path: any, addFullHeight: boolean) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  // Add height="100%" if needed
  const finalAttrs = addFullHeight
    ? [
        ...attrs,
        j.jsxAttribute(j.jsxIdentifier("height"), j.stringLiteral("100%")),
      ]
    : attrs

  // Create Drawer.Content
  const contentElement = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Drawer"),
        j.jsxIdentifier("Content"),
      ),
      finalAttrs,
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Drawer"),
        j.jsxIdentifier("Content"),
      ),
    ),
    children,
  )

  // Wrap in Drawer.Positioner
  const positionerElement = j.jsxElement(
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
    [j.jsxText("\n    "), contentElement, j.jsxText("\n  ")],
  )

  j(path).replaceWith(positionerElement)
}

/**
 * Update imports for Drawer components
 * Similar to updateDialogImports but for Drawer namespace
 */
function updateDrawerImports(
  j: any,
  root: any,
  transformedComponents: Set<string>,
  componentNames: string[],
) {
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path: any) => {
      const specifiers = path.node.specifiers
      if (!specifiers) return

      let hasDrawer = false
      let hasPortal = false

      const newSpecifiers = specifiers.flatMap((spec: any) => {
        if (spec.type !== "ImportSpecifier") return spec

        const importName = spec.imported.name

        // Keep Drawer and Portal
        if (importName === "Drawer") {
          hasDrawer = true
          return spec
        }

        if (importName === "Portal") {
          hasPortal = true
          return spec
        }

        // Remove all component-specific imports
        if (componentNames.includes(importName)) {
          return []
        }

        return spec
      })

      // If we transformed components but don't have Drawer import, add it
      if (!hasDrawer && transformedComponents.size > 0) {
        newSpecifiers.push(j.importSpecifier(j.identifier("Drawer")))
      }

      // If we transformed Drawer but don't have Portal import, add it
      if (transformedComponents.has("Drawer") && !hasPortal) {
        newSpecifiers.push(j.importSpecifier(j.identifier("Portal")))
      }

      path.node.specifiers = newSpecifiers
    })
}
