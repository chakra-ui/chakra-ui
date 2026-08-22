import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Popover components to v3 compound component API
 *
 * @example
 * // Before
 * <Popover>
 *   <PopoverTrigger><Button>Click</Button></PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverArrow />
 *     <PopoverCloseButton />
 *     <PopoverHeader>Header</PopoverHeader>
 *     <PopoverBody>Body</PopoverBody>
 *   </PopoverContent>
 * </Popover>
 *
 * // After
 * <Popover.Root>
 *   <Popover.Trigger asChild><Button>Click</Button></Popover.Trigger>
 *   <Popover.Positioner>
 *     <Popover.Content>
 *       <Popover.Arrow />
 *       <Popover.CloseTrigger />
 *       <Popover.Title>Header</Popover.Title>
 *       <Popover.Body>Body</Popover.Body>
 *     </Popover.Content>
 *   </Popover.Positioner>
 * </Popover.Root>
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
  let usedHoverCard = false

  // Transform Popover
  if (chakraLocalNames.has("Popover")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "Popover" } },
      })
      .forEach((path) => {
        const isHoverCard = transformPopover(j, path)
        if (isHoverCard) {
          usedHoverCard = true
        }
        transformedComponents.add("Popover")
      })
  }

  // Transform PopoverTrigger
  if (chakraLocalNames.has("PopoverTrigger")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "PopoverTrigger" } },
      })
      .forEach((path) => {
        transformPopoverTrigger(j, path)
        transformedComponents.add("PopoverTrigger")
      })
  }

  // Transform PopoverContent
  if (chakraLocalNames.has("PopoverContent")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "PopoverContent" } },
      })
      .forEach((path) => {
        transformPopoverContent(j, path)
        transformedComponents.add("PopoverContent")
      })
  }

  // Transform PopoverHeader
  if (chakraLocalNames.has("PopoverHeader")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "PopoverHeader" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Popover", "Title")
        transformedComponents.add("PopoverHeader")
      })
  }

  // Transform PopoverBody
  if (chakraLocalNames.has("PopoverBody")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "PopoverBody" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Popover", "Body")
        transformedComponents.add("PopoverBody")
      })
  }

  // Transform PopoverFooter
  if (chakraLocalNames.has("PopoverFooter")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "PopoverFooter" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Popover", "Footer")
        transformedComponents.add("PopoverFooter")
      })
  }

  // Transform PopoverArrow
  if (chakraLocalNames.has("PopoverArrow")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "PopoverArrow" } },
      })
      .forEach((path) => {
        transformPopoverArrow(j, path)
        transformedComponents.add("PopoverArrow")
      })
  }

  // Transform PopoverCloseButton
  if (chakraLocalNames.has("PopoverCloseButton")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "PopoverCloseButton" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Popover", "CloseTrigger")
        transformedComponents.add("PopoverCloseButton")
      })
  }

  // Transform PopoverAnchor
  if (chakraLocalNames.has("PopoverAnchor")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "PopoverAnchor" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Popover", "Anchor")
        transformedComponents.add("PopoverAnchor")
      })
  }

  // If HoverCard was used, rename all Popover.* to HoverCard.* in the entire tree
  if (usedHoverCard) {
    root.find(j.JSXElement).forEach((path: any) => {
      const openingName = path.node.openingElement.name
      const closingName = path.node.closingElement?.name

      // Check if it's a Popover.* member expression
      if (
        openingName?.type === "JSXMemberExpression" &&
        openingName.object?.name === "Popover"
      ) {
        openingName.object.name = "HoverCard"
      }

      if (
        closingName?.type === "JSXMemberExpression" &&
        closingName.object?.name === "Popover"
      ) {
        closingName.object.name = "HoverCard"
      }
    })
  }

  // Update imports
  if (transformedComponents.size > 0) {
    updatePopoverImports(j, root, transformedComponents, usedHoverCard)
  }

  return root.toSource({ quote: "single" })
}

/**
 * Transform Popover to Popover.Root or HoverCard.Root
 * @returns true if HoverCard was used
 */
function transformPopover(j: any, path: any): boolean {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  // Check if trigger="hover" to use HoverCard instead
  const triggerAttr = attrs.find(
    (attr: any) =>
      attr.type === "JSXAttribute" &&
      attr.name.name === "trigger" &&
      attr.value &&
      (attr.value.type === "Literal" || attr.value.type === "StringLiteral") &&
      attr.value.value === "hover",
  )
  const useHoverCard = !!triggerAttr

  // Check if this is a render prop pattern
  const hasRenderProp = children.some(
    (child: any) =>
      child.type === "JSXExpressionContainer" &&
      (child.expression.type === "ArrowFunctionExpression" ||
        child.expression.type === "FunctionExpression"),
  )

  if (hasRenderProp) {
    transformPopoverWithRenderProp(j, path, useHoverCard)
    return useHoverCard
  }

  const { rootAttrs, positioningProps, arrowSize } = processPopoverProps(
    j,
    attrs,
    useHoverCard,
  )

  // Update component name to Popover.Root or HoverCard.Root
  const componentName = useHoverCard ? "HoverCard" : "Popover"
  path.node.openingElement.name = j.jsxMemberExpression(
    j.jsxIdentifier(componentName),
    j.jsxIdentifier("Root"),
  )

  if (path.node.closingElement) {
    path.node.closingElement.name = j.jsxMemberExpression(
      j.jsxIdentifier(componentName),
      j.jsxIdentifier("Root"),
    )
  }

  path.node.openingElement.attributes = rootAttrs

  // If there are positioning props, add them as a positioning object
  if (positioningProps.length > 0) {
    path.node.openingElement.attributes.push(
      j.jsxAttribute(
        j.jsxIdentifier("positioning"),
        j.jsxExpressionContainer(
          j.objectExpression(
            positioningProps.map(([key, value]: [string, any]) =>
              j.property("init", j.identifier(key), value),
            ),
          ),
        ),
      ),
    )
  }

  // If arrowSize was on the root, transfer it to Arrow
  if (arrowSize) {
    transferArrowSizeToArrow(j, path, arrowSize, componentName)
  }

  return useHoverCard
}

/**
 * Transform Popover with render prop pattern
 */
function transformPopoverWithRenderProp(
  j: any,
  path: any,
  useHoverCard = false,
) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  const { rootAttrs, positioningProps, arrowSize } = processPopoverProps(
    j,
    attrs,
    useHoverCard,
  )

  const componentName = useHoverCard ? "HoverCard" : "Popover"

  // Find the render prop function
  const renderPropChild = children.find(
    (child: any) =>
      child.type === "JSXExpressionContainer" &&
      (child.expression.type === "ArrowFunctionExpression" ||
        child.expression.type === "FunctionExpression"),
  )

  if (!renderPropChild) return

  // Transform the render prop function to use v3 Context API
  const renderPropFunc = renderPropChild.expression
  const params = renderPropFunc.params || []

  // Check if the function uses destructuring to get isOpen, onClose, onOpen
  if (params.length > 0 && params[0].type === "ObjectPattern") {
    const properties = params[0].properties || []
    const usedProps = new Set(
      properties
        .map((prop: any) => {
          if (prop.type === "Property" || prop.type === "ObjectProperty") {
            return prop.key.name
          }
          return null
        })
        .filter(Boolean),
    )

    const needsIsOpen = usedProps.has("isOpen")
    const needsOnClose = usedProps.has("onClose")
    const needsOnOpen = usedProps.has("onOpen")
    const needsSetOpen = needsOnClose || needsOnOpen

    // Build new parameter destructuring with only v3 properties
    const newProperties: any[] = []

    if (needsIsOpen) {
      // Rename open to isOpen: { open: isOpen }
      newProperties.push(
        j.property("init", j.identifier("open"), j.identifier("isOpen")),
      )
    }

    if (needsSetOpen) {
      // Add setOpen
      newProperties.push(
        j.property("init", j.identifier("setOpen"), j.identifier("setOpen")),
      )
    }

    // Update the parameter
    params[0] = j.objectPattern(newProperties)

    // Get the original function body
    const originalBody = renderPropFunc.body

    // Create helper declarations for onClose/onOpen
    const helperDeclarations: any[] = []

    if (needsOnClose) {
      helperDeclarations.push(
        j.variableDeclaration("const", [
          j.variableDeclarator(
            j.identifier("onClose"),
            j.arrowFunctionExpression(
              [],
              j.callExpression(j.identifier("setOpen"), [
                j.booleanLiteral(false),
              ]),
            ),
          ),
        ]),
      )
    }

    if (needsOnOpen) {
      helperDeclarations.push(
        j.variableDeclaration("const", [
          j.variableDeclarator(
            j.identifier("onOpen"),
            j.arrowFunctionExpression(
              [],
              j.callExpression(j.identifier("setOpen"), [
                j.booleanLiteral(true),
              ]),
            ),
          ),
        ]),
      )
    }

    // Wrap the body in a block statement if needed
    if (helperDeclarations.length > 0) {
      if (
        originalBody.type === "JSXElement" ||
        originalBody.type === "JSXFragment"
      ) {
        // Arrow function with expression body - convert to block with return
        renderPropFunc.body = j.blockStatement([
          ...helperDeclarations,
          j.returnStatement(originalBody),
        ])
      } else if (originalBody.type === "BlockStatement") {
        // Already a block - insert declarations at the beginning
        originalBody.body = [...helperDeclarations, ...originalBody.body]
      }
    }
  }

  // Create Context wrapper (Popover.Context or HoverCard.Context)
  const contextElement = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("Context"),
      ),
      [],
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("Context"),
      ),
    ),
    [renderPropChild],
  )

  // Create new Root attributes
  const newRootAttrs = [...rootAttrs]
  if (positioningProps.length > 0) {
    newRootAttrs.push(
      j.jsxAttribute(
        j.jsxIdentifier("positioning"),
        j.jsxExpressionContainer(
          j.objectExpression(
            positioningProps.map(([key, value]: [string, any]) =>
              j.property("init", j.identifier(key), value),
            ),
          ),
        ),
      ),
    )
  }

  // Create Root element
  const rootElement = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("Root"),
      ),
      newRootAttrs,
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("Root"),
      ),
    ),
    [j.jsxText("\n  "), contextElement, j.jsxText("\n")],
  )

  j(path).replaceWith(rootElement)

  // If arrowSize was on the root, transfer it to Arrow
  if (arrowSize) {
    transferArrowSizeToArrow(j, path, arrowSize, componentName)
  }
}

/**
 * Process Popover props and separate positioning props
 */
function processPopoverProps(j: any, attrs: any[], useHoverCard = false) {
  const rootAttrs: any[] = []
  const positioningProps: Array<[string, any]> = []
  let arrowSize: any = null
  let onOpenHandler: any = null
  let onCloseHandler: any = null

  attrs.forEach((attr: any) => {
    if (attr.type !== "JSXAttribute") {
      rootAttrs.push(attr)
      return
    }

    const propName = attr.name.name
    const propValue = attr.value

    // Positioning props
    if (propName === "placement") {
      positioningProps.push(["placement", getValueExpression(j, propValue)])
      return
    }

    if (propName === "boundary") {
      const refValue = getValueExpression(j, propValue)

      // Transform: boundary={ref.current} -> boundary: () => ref.current
      // If it's already a member expression accessing .current, wrap in function
      // Otherwise, add .current and wrap in function
      let boundaryValue
      if (
        refValue.type === "MemberExpression" &&
        refValue.property.name === "current"
      ) {
        // Already has .current, just wrap in arrow function
        boundaryValue = j.arrowFunctionExpression([], refValue)
      } else {
        // Add .current and wrap in arrow function
        boundaryValue = j.arrowFunctionExpression(
          [],
          j.memberExpression(refValue, j.identifier("current")),
        )
      }

      positioningProps.push(["boundary", boundaryValue])
      return
    }

    if (propName === "flip") {
      positioningProps.push(["flip", getValueExpression(j, propValue)])
      return
    }

    if (propName === "gutter") {
      positioningProps.push(["gutter", getValueExpression(j, propValue)])
      return
    }

    if (propName === "matchWidth") {
      positioningProps.push(["sameWidth", getValueExpression(j, propValue)])
      return
    }

    if (propName === "offset") {
      positioningProps.push(["offset", getValueExpression(j, propValue)])
      return
    }

    if (propName === "strategy") {
      positioningProps.push(["strategy", getValueExpression(j, propValue)])
      return
    }

    if (propName === "arrowPadding") {
      positioningProps.push(["arrowPadding", getValueExpression(j, propValue)])
      return
    }

    if (propName === "preventOverflow") {
      positioningProps.push([
        "preventOverflow",
        getValueExpression(j, propValue),
      ])
      return
    }

    if (propName === "eventListeners") {
      // Transform eventListeners to positioning.listeners
      // Also transform keys: scroll -> ancestorScroll, resize -> ancestorResize
      const value = getValueExpression(j, propValue)

      // If it's an object expression, transform the keys
      if (value.type === "ObjectExpression") {
        const transformedProperties = value.properties.map((prop: any) => {
          if (
            (prop.type === "Property" || prop.type === "ObjectProperty") &&
            prop.key
          ) {
            const keyName = prop.key.name || prop.key.value
            // Transform key names
            if (keyName === "scroll") {
              return j.property(
                "init",
                j.identifier("ancestorScroll"),
                prop.value,
              )
            }
            if (keyName === "resize") {
              return j.property(
                "init",
                j.identifier("ancestorResize"),
                prop.value,
              )
            }
          }
          return prop
        })

        positioningProps.push([
          "listeners",
          j.objectExpression(transformedProperties),
        ])
      } else {
        // If it's not an object literal (e.g., a variable), keep it as-is
        positioningProps.push(["listeners", value])
      }
      return
    }

    // Prop transformations
    if (propName === "closeOnBlur") {
      attr.name.name = "closeOnInteractOutside"
      rootAttrs.push(attr)
      return
    }

    if (propName === "closeOnEsc") {
      attr.name.name = "closeOnEscape"
      rootAttrs.push(attr)
      return
    }

    if (propName === "defaultIsOpen") {
      attr.name.name = "defaultOpen"
      rootAttrs.push(attr)
      return
    }

    if (propName === "isOpen") {
      attr.name.name = "open"
      rootAttrs.push(attr)
      return
    }

    if (propName === "isLazy") {
      attr.name.name = "lazyMount"
      rootAttrs.push(attr)
      return
    }

    if (propName === "lazyBehavior") {
      // If "keepMounted", remove the prop
      if (
        propValue &&
        propValue.type === "Literal" &&
        propValue.value === "keepMounted"
      ) {
        return
      }
      // If "unmount", add unmountOnExit prop
      if (
        propValue &&
        propValue.type === "Literal" &&
        propValue.value === "unmount"
      ) {
        rootAttrs.push(j.jsxAttribute(j.jsxIdentifier("unmountOnExit"), null))
        return
      }
      return
    }

    // Capture onOpen and onClose to merge into onOpenChange
    if (propName === "onOpen") {
      onOpenHandler = getValueExpression(j, propValue)
      return
    }

    if (propName === "onClose") {
      onCloseHandler = getValueExpression(j, propValue)
      return
    }

    // Remove props (but keep openDelay/closeDelay for HoverCard)
    if (
      propName === "computePositionOnMount" ||
      propName === "returnFocusOnClose" ||
      propName === "arrowShadowColor" ||
      propName === "trigger" ||
      propName === "modifiers"
    ) {
      return
    }

    // Remove delay props only for Popover (keep for HoverCard)
    if (
      (propName === "openDelay" || propName === "closeDelay") &&
      !useHoverCard
    ) {
      return
    }

    // Extract arrowSize to transfer to Arrow component
    if (propName === "arrowSize") {
      arrowSize = getValueExpression(j, propValue)
      return
    }

    // initialFocusRef -> initialFocusEl with function wrapper
    if (propName === "initialFocusRef") {
      const refValue = getValueExpression(j, propValue)

      // Transform: initialFocusRef={ref} -> initialFocusEl={() => ref.current}
      const newAttr = j.jsxAttribute(
        j.jsxIdentifier("initialFocusEl"),
        j.jsxExpressionContainer(
          j.arrowFunctionExpression(
            [],
            j.memberExpression(refValue, j.identifier("current")),
          ),
        ),
      )
      rootAttrs.push(newAttr)
      return
    }

    // Default: keep the prop
    rootAttrs.push(attr)
  })

  // Merge onOpen and onClose into onOpenChange
  if (onOpenHandler || onCloseHandler) {
    // Helper to get the statement for a handler
    const getHandlerStatement = (handler: any) => {
      if (!handler) return j.blockStatement([])

      // If it's an arrow function, use its body directly
      if (
        handler.type === "ArrowFunctionExpression" ||
        handler.type === "FunctionExpression"
      ) {
        // If the body is already a block statement, use it
        if (handler.body.type === "BlockStatement") {
          return handler.body
        }
        // If it's an expression body, wrap it in a block with expression statement
        return j.blockStatement([j.expressionStatement(handler.body)])
      }

      // Otherwise, call the handler as a function
      return j.blockStatement([
        j.expressionStatement(j.callExpression(handler, [])),
      ])
    }

    const onOpenChangeHandler = j.arrowFunctionExpression(
      [j.identifier("e")],
      j.blockStatement([
        j.ifStatement(
          j.memberExpression(j.identifier("e"), j.identifier("open")),
          getHandlerStatement(onOpenHandler),
          onCloseHandler ? getHandlerStatement(onCloseHandler) : null,
        ),
      ]),
    )

    rootAttrs.push(
      j.jsxAttribute(
        j.jsxIdentifier("onOpenChange"),
        j.jsxExpressionContainer(onOpenChangeHandler),
      ),
    )
  }

  return { rootAttrs, positioningProps, arrowSize }
}

/**
 * Get value expression from JSX attribute value
 */
function getValueExpression(j: any, propValue: any) {
  if (!propValue) {
    return j.booleanLiteral(true)
  }
  if (propValue.type === "Literal" || propValue.type === "StringLiteral") {
    return j.stringLiteral(propValue.value)
  }
  if (propValue.type === "JSXExpressionContainer") {
    return propValue.expression
  }
  return propValue
}

/**
 * Transform PopoverTrigger to Popover.Trigger with asChild
 */
function transformPopoverTrigger(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []

  // Add asChild prop
  const newAttrs = [j.jsxAttribute(j.jsxIdentifier("asChild"), null), ...attrs]

  path.node.openingElement.name = j.jsxMemberExpression(
    j.jsxIdentifier("Popover"),
    j.jsxIdentifier("Trigger"),
  )

  if (path.node.closingElement) {
    path.node.closingElement.name = j.jsxMemberExpression(
      j.jsxIdentifier("Popover"),
      j.jsxIdentifier("Trigger"),
    )
  }

  path.node.openingElement.attributes = newAttrs
}

/**
 * Transform PopoverContent to Popover.Content wrapped in Popover.Positioner
 */
function transformPopoverContent(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  // Create Popover.Content
  const contentElement = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Popover"),
        j.jsxIdentifier("Content"),
      ),
      attrs,
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Popover"),
        j.jsxIdentifier("Content"),
      ),
    ),
    children,
  )

  // Wrap in Popover.Positioner
  const positionerElement = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Popover"),
        j.jsxIdentifier("Positioner"),
      ),
      [],
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier("Popover"),
        j.jsxIdentifier("Positioner"),
      ),
    ),
    [j.jsxText("\n    "), contentElement, j.jsxText("\n  ")],
  )

  j(path).replaceWith(positionerElement)
}

/**
 * Transfer arrowSize from root to Arrow component
 */
function transferArrowSizeToArrow(
  j: any,
  popoverPath: any,
  arrowSize: any,
  componentName = "Popover",
) {
  // Find Arrow descendants (before transformation) or Component.Arrow (after)
  j(popoverPath)
    .find(j.JSXElement)
    .filter((path: any) => {
      const name = path.node.openingElement.name
      // Match both PopoverArrow and Component.Arrow (Popover.Arrow or HoverCard.Arrow)
      return (
        (name.type === "JSXIdentifier" && name.name === "PopoverArrow") ||
        (name.type === "JSXMemberExpression" &&
          (name.object.name === componentName ||
            name.object.name === "Popover") &&
          name.property.name === "Arrow")
      )
    })
    .forEach((arrowPath: any) => {
      const attrs = arrowPath.node.openingElement.attributes || []

      // Check if css prop already exists
      const existingCssAttr = attrs.find(
        (attr: any) => attr.type === "JSXAttribute" && attr.name.name === "css",
      )

      if (existingCssAttr) {
        // Merge with existing css prop
        const cssValue = existingCssAttr.value
        if (
          cssValue &&
          cssValue.type === "JSXExpressionContainer" &&
          cssValue.expression.type === "ObjectExpression"
        ) {
          // Add --arrow-size to existing object
          cssValue.expression.properties.push(
            j.property("init", j.stringLiteral("--arrow-size"), arrowSize),
          )
        }
      } else {
        // Add new css prop
        attrs.push(
          j.jsxAttribute(
            j.jsxIdentifier("css"),
            j.jsxExpressionContainer(
              j.objectExpression([
                j.property("init", j.stringLiteral("--arrow-size"), arrowSize),
              ]),
            ),
          ),
        )
      }
    })
}

/**
 * Transform PopoverArrow - handle arrowSize prop
 */
function transformPopoverArrow(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []

  const newAttrs = attrs.flatMap((attr: any) => {
    if (attr.type !== "JSXAttribute") return attr

    // arrowSize -> css prop with --arrow-size
    if (attr.name.name === "arrowSize") {
      const sizeValue = getValueExpression(j, attr.value)
      return j.jsxAttribute(
        j.jsxIdentifier("css"),
        j.jsxExpressionContainer(
          j.objectExpression([
            j.property("init", j.stringLiteral("--arrow-size"), sizeValue),
          ]),
        ),
      )
    }

    return attr
  })

  renameToMemberExpression(j, path, "Popover", "Arrow")
  path.node.openingElement.attributes = newAttrs
}

/**
 * Rename component to member expression (e.g., Popover.Body)
 */
function renameToMemberExpression(
  j: any,
  path: any,
  object: string,
  property: string,
) {
  path.node.openingElement.name = j.jsxMemberExpression(
    j.jsxIdentifier(object),
    j.jsxIdentifier(property),
  )

  if (path.node.closingElement) {
    path.node.closingElement.name = j.jsxMemberExpression(
      j.jsxIdentifier(object),
      j.jsxIdentifier(property),
    )
  }
}

/**
 * Update imports for Popover components
 */
function updatePopoverImports(
  j: any,
  root: any,
  transformedComponents: Set<string>,
  usedHoverCard: boolean,
) {
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path: any) => {
      const specifiers = path.node.specifiers
      if (!specifiers) return

      let hasPopover = false
      let hasHoverCard = false
      let popoverIndex = -1

      const newSpecifiers = specifiers.flatMap((spec: any, index: number) => {
        if (spec.type !== "ImportSpecifier") return spec

        const importName = spec.imported.name

        // Keep only Popover, remove component-specific imports
        if (importName === "Popover") {
          hasPopover = true
          popoverIndex = index
          return spec
        }

        // Check if HoverCard is already imported
        if (importName === "HoverCard") {
          hasHoverCard = true
          return spec
        }

        // Remove all Popover subcomponent imports
        if (
          importName === "PopoverTrigger" ||
          importName === "PopoverContent" ||
          importName === "PopoverHeader" ||
          importName === "PopoverBody" ||
          importName === "PopoverFooter" ||
          importName === "PopoverArrow" ||
          importName === "PopoverCloseButton" ||
          importName === "PopoverAnchor"
        ) {
          return []
        }

        return spec
      })

      // If we transformed popover components but don't have Popover import, add it
      if (!hasPopover && transformedComponents.size > 0) {
        newSpecifiers.push(j.importSpecifier(j.identifier("Popover")))
        popoverIndex = newSpecifiers.length - 1
      }

      // If we used HoverCard but don't have HoverCard import, insert it after Popover
      if (usedHoverCard && !hasHoverCard) {
        if (popoverIndex >= 0) {
          // Insert HoverCard right after Popover
          newSpecifiers.splice(
            popoverIndex + 1,
            0,
            j.importSpecifier(j.identifier("HoverCard")),
          )
        } else {
          // No Popover found, add at the end
          newSpecifiers.push(j.importSpecifier(j.identifier("HoverCard")))
        }
      }

      path.node.specifiers = newSpecifiers
    })
}
