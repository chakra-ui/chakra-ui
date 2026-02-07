import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Breadcrumb components to v3 compound component API
 *
 * @example
 * // Before
 * <Breadcrumb>
 *   <BreadcrumbItem>
 *     <BreadcrumbLink href="#">Home</BreadcrumbLink>
 *   </BreadcrumbItem>
 *   <BreadcrumbItem isCurrentPage>
 *     <BreadcrumbLink href="#">Current</BreadcrumbLink>
 *   </BreadcrumbItem>
 * </Breadcrumb>
 *
 * // After
 * <Breadcrumb.Root>
 *   <Breadcrumb.List>
 *     <Breadcrumb.Item>
 *       <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
 *     </Breadcrumb.Item>
 *     <Breadcrumb.Separator />
 *     <Breadcrumb.Item>
 *       <Breadcrumb.CurrentLink>Current</Breadcrumb.CurrentLink>
 *     </Breadcrumb.Item>
 *   </Breadcrumb.List>
 * </Breadcrumb.Root>
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

  // Transform Breadcrumb
  if (chakraLocalNames.has("Breadcrumb")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "Breadcrumb" } },
      })
      .forEach((path) => {
        transformBreadcrumb(j, path)
        transformedComponents.add("Breadcrumb")
      })
  }

  // Transform BreadcrumbItem
  if (chakraLocalNames.has("BreadcrumbItem")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "BreadcrumbItem" } },
      })
      .forEach((path) => {
        transformBreadcrumbItem(j, path)
        transformedComponents.add("BreadcrumbItem")
      })
  }

  // Transform BreadcrumbLink
  if (chakraLocalNames.has("BreadcrumbLink")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "BreadcrumbLink" } },
      })
      .forEach((path) => {
        transformBreadcrumbLink(j, path)
        transformedComponents.add("BreadcrumbLink")
      })
  }

  // Update imports
  if (transformedComponents.size > 0) {
    updateBreadcrumbImports(j, root, transformedComponents)
  }

  return root.toSource({ quote: "single" })
}

/**
 * Transform Breadcrumb to Breadcrumb.Root with Breadcrumb.List wrapper
 */
function transformBreadcrumb(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  let separatorProp: any = null
  let listPropsValue: any = null
  const rootAttrs: any[] = []
  const listAttrs: any[] = []

  // Process attributes
  attrs.forEach((attr: any) => {
    if (attr.type !== "JSXAttribute") {
      rootAttrs.push(attr)
      return
    }

    // Extract separator prop
    if (attr.name.name === "separator") {
      separatorProp = attr.value
      return
    }

    // Extract listProps
    if (attr.name.name === "listProps") {
      listPropsValue = attr.value
      return
    }

    // spacing -> gap (goes on List)
    if (attr.name.name === "spacing") {
      attr.name.name = "gap"
      listAttrs.push(attr)
      return
    }

    // Other props go on Root
    rootAttrs.push(attr)
  })

  // Spread listProps if present
  if (listPropsValue) {
    if (listPropsValue.type === "JSXExpressionContainer") {
      listAttrs.push(j.jsxSpreadAttribute(listPropsValue.expression))
    }
  }

  // Insert separators between BreadcrumbItems
  const newChildren = insertSeparators(j, children, separatorProp)

  // Create Breadcrumb.List
  const listElement = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Breadcrumb"),
        j.jsxIdentifier("List"),
      ),
      listAttrs,
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Breadcrumb"),
        j.jsxIdentifier("List"),
      ),
    ),
    newChildren,
  )

  // Create Breadcrumb.Root
  const rootElement = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Breadcrumb"),
        j.jsxIdentifier("Root"),
      ),
      rootAttrs,
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Breadcrumb"),
        j.jsxIdentifier("Root"),
      ),
    ),
    [j.jsxText("\n  "), listElement, j.jsxText("\n")],
  )

  j(path).replaceWith(rootElement)
}

/**
 * Insert Breadcrumb.Separator between items
 */
function insertSeparators(j: any, children: any[], separatorProp: any) {
  const newChildren: any[] = []
  const items: any[] = []

  // Collect all BreadcrumbItem elements
  children.forEach((child) => {
    if (
      child.type === "JSXElement" &&
      child.openingElement?.name?.name === "BreadcrumbItem"
    ) {
      items.push(child)
    } else if (child.type !== "JSXText" || child.value.trim() !== "") {
      // Preserve non-empty text and other elements
      if (child.type !== "JSXText" || child.value.trim()) {
        newChildren.push(child)
      }
    }
  })

  // Insert items with separators
  items.forEach((item, index) => {
    // Add proper whitespace before item
    if (index === 0) {
      newChildren.push(j.jsxText("\n    "))
    }

    newChildren.push(item)

    // Add separator if not last item
    if (index < items.length - 1) {
      newChildren.push(j.jsxText("\n    "))

      const separator = createSeparator(j, separatorProp)
      newChildren.push(separator)
    }

    // Add closing whitespace
    if (index === items.length - 1) {
      newChildren.push(j.jsxText("\n  "))
    }
  })

  return newChildren
}

/**
 * Create Breadcrumb.Separator element
 */
function createSeparator(j: any, separatorProp: any) {
  if (!separatorProp) {
    // Default separator (empty)
    return j.jsxElement(
      j.jsxOpeningElement(
        j.jsxMemberExpression(
          j.jsxIdentifier("Breadcrumb"),
          j.jsxIdentifier("Separator"),
        ),
        [],
        true,
      ),
    )
  }

  // Custom separator
  let children: any[] = []

  if (
    separatorProp.type === "Literal" ||
    separatorProp.type === "StringLiteral"
  ) {
    // String separator like "-"
    children = [j.jsxText(separatorProp.value)]
  } else if (separatorProp.type === "JSXExpressionContainer") {
    // Element separator like {<ChevronRightIcon />}
    children = [separatorProp]
  }

  return j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Breadcrumb"),
        j.jsxIdentifier("Separator"),
      ),
      [],
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Breadcrumb"),
        j.jsxIdentifier("Separator"),
      ),
    ),
    children,
  )
}

/**
 * Transform BreadcrumbItem to Breadcrumb.Item
 */
function transformBreadcrumbItem(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  const newAttrs = attrs.flatMap((attr: any) => {
    if (attr.type !== "JSXAttribute") return attr

    // Remove isCurrentPage (handled by BreadcrumbLink -> CurrentLink)
    if (attr.name.name === "isCurrentPage") {
      return []
    }

    // Remove isLastChild
    if (attr.name.name === "isLastChild") {
      return []
    }

    // spacing -> gap
    if (attr.name.name === "spacing") {
      attr.name.name = "gap"
      return attr
    }

    return attr
  })

  // Update component name to Breadcrumb.Item
  path.node.openingElement.name = j.jsxMemberExpression(
    j.jsxIdentifier("Breadcrumb"),
    j.jsxIdentifier("Item"),
  )

  if (path.node.closingElement) {
    path.node.closingElement.name = j.jsxMemberExpression(
      j.jsxIdentifier("Breadcrumb"),
      j.jsxIdentifier("Item"),
    )
  }

  path.node.openingElement.attributes = newAttrs
}

/**
 * Transform BreadcrumbLink to Breadcrumb.Link or Breadcrumb.CurrentLink
 */
function transformBreadcrumbLink(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  let isCurrentPage = false

  const newAttrs = attrs.flatMap((attr: any) => {
    if (attr.type !== "JSXAttribute") return attr

    // Check for isCurrentPage prop
    if (attr.name.name === "isCurrentPage") {
      // Check if it's true (boolean or true value)
      if (
        !attr.value || // <BreadcrumbLink isCurrentPage />
        (attr.value.type === "JSXExpressionContainer" &&
          attr.value.expression.type === "BooleanLiteral" &&
          attr.value.expression.value === true)
      ) {
        isCurrentPage = true
      }
      return [] // Remove the prop
    }

    return attr
  })

  // Determine component name
  const componentName = isCurrentPage ? "CurrentLink" : "Link"

  // Update component name
  path.node.openingElement.name = j.jsxMemberExpression(
    j.jsxIdentifier("Breadcrumb"),
    j.jsxIdentifier(componentName),
  )

  if (path.node.closingElement) {
    path.node.closingElement.name = j.jsxMemberExpression(
      j.jsxIdentifier("Breadcrumb"),
      j.jsxIdentifier(componentName),
    )
  }

  path.node.openingElement.attributes = newAttrs
}

/**
 * Update imports for Breadcrumb components
 */
function updateBreadcrumbImports(
  j: any,
  root: any,
  transformedComponents: Set<string>,
) {
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path: any) => {
      const specifiers = path.node.specifiers
      if (!specifiers) return

      let hasBreadcrumb = false

      const newSpecifiers = specifiers.flatMap((spec: any) => {
        if (spec.type !== "ImportSpecifier") return spec

        const importName = spec.imported.name

        // Keep only Breadcrumb, remove component-specific imports
        if (importName === "Breadcrumb") {
          hasBreadcrumb = true
          return spec
        }

        // Remove BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator
        if (
          importName === "BreadcrumbItem" ||
          importName === "BreadcrumbLink" ||
          importName === "BreadcrumbSeparator"
        ) {
          return []
        }

        return spec
      })

      // If we transformed breadcrumb components but don't have Breadcrumb import, add it
      if (!hasBreadcrumb && transformedComponents.size > 0) {
        newSpecifiers.push(j.importSpecifier(j.identifier("Breadcrumb")))
      }

      path.node.specifiers = newSpecifiers
    })
}
