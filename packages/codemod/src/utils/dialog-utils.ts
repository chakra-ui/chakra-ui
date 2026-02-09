/**
 * Shared utilities for Dialog transformations (Modal, AlertDialog, etc.)
 */

/**
 * Process Dialog props and transform them
 */
export function processDialogProps(
  j: any,
  attrs: any[],
  options: {
    componentType?: "modal" | "alertdialog"
    additionalRole?: string
  } = {},
) {
  const newAttrs: any[] = []
  let onCloseHandler: any = null

  attrs.forEach((attr: any) => {
    if (attr.type !== "JSXAttribute") {
      newAttrs.push(attr)
      return
    }

    const propName = attr.name.name
    const propValue = attr.value

    // Prop transformations
    if (propName === "isOpen") {
      attr.name.name = "open"
      newAttrs.push(attr)
      return
    }

    if (propName === "onClose") {
      onCloseHandler = getValueExpression(j, propValue)
      return
    }

    if (propName === "isCentered") {
      attr.name.name = "placement"
      attr.value = j.stringLiteral("center")
      newAttrs.push(attr)
      return
    }

    if (propName === "closeOnOverlayClick") {
      attr.name.name = "closeOnInteractOutside"
      newAttrs.push(attr)
      return
    }

    if (propName === "closeOnEsc") {
      attr.name.name = "closeOnEscape"
      newAttrs.push(attr)
      return
    }

    if (propName === "blockScrollOnMount") {
      attr.name.name = "preventScroll"
      newAttrs.push(attr)
      return
    }

    if (propName === "onCloseComplete") {
      attr.name.name = "onExitComplete"
      newAttrs.push(attr)
      return
    }

    if (propName === "onEsc") {
      attr.name.name = "onEscapeKeyDown"
      newAttrs.push(attr)
      return
    }

    if (propName === "onOverlayClick") {
      attr.name.name = "onInteractOutside"
      newAttrs.push(attr)
      return
    }

    // finalFocusRef -> finalFocusEl with function wrapper
    if (propName === "finalFocusRef") {
      const refValue = getValueExpression(j, propValue)
      const newAttr = j.jsxAttribute(
        j.jsxIdentifier("finalFocusEl"),
        j.jsxExpressionContainer(
          j.arrowFunctionExpression(
            [],
            j.memberExpression(refValue, j.identifier("current")),
          ),
        ),
      )
      newAttrs.push(newAttr)
      return
    }

    // initialFocusRef -> initialFocusEl with function wrapper
    if (propName === "initialFocusRef") {
      const refValue = getValueExpression(j, propValue)
      const newAttr = j.jsxAttribute(
        j.jsxIdentifier("initialFocusEl"),
        j.jsxExpressionContainer(
          j.arrowFunctionExpression(
            [],
            j.memberExpression(refValue, j.identifier("current")),
          ),
        ),
      )
      newAttrs.push(newAttr)
      return
    }

    // AlertDialog-specific: leastDestructiveRef -> initialFocusEl
    if (propName === "leastDestructiveRef") {
      const refValue = getValueExpression(j, propValue)
      const newAttr = j.jsxAttribute(
        j.jsxIdentifier("initialFocusEl"),
        j.jsxExpressionContainer(
          j.arrowFunctionExpression(
            [],
            j.memberExpression(refValue, j.identifier("current")),
          ),
        ),
      )
      newAttrs.push(newAttr)
      return
    }

    // Size remapping
    if (propName === "size") {
      const sizeValue = getValueExpression(j, propValue)
      // Map v2 sizes to v3 sizes
      // v2: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full"
      // v3: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full"
      if (sizeValue.type === "StringLiteral" || sizeValue.type === "Literal") {
        const size = sizeValue.value
        const sizeMap: Record<string, string> = {
          xs: "xs",
          sm: "sm",
          md: "md",
          lg: "lg",
          xl: "xl",
          "2xl": "xl", // Map to xl
          "3xl": "xl", // Map to xl
          "4xl": "xl", // Map to xl
          "5xl": "xl", // Map to xl
          "6xl": "xl", // Map to xl
          full: "full",
        }
        const newSize = sizeMap[size] || size
        attr.value = j.stringLiteral(newSize)
        newAttrs.push(attr)
      } else {
        // If it's an expression, keep as-is
        newAttrs.push(attr)
      }
      return
    }

    // Pass-through props
    if (
      propName === "motionPreset" ||
      propName === "scrollBehavior" ||
      propName === "trapFocus"
    ) {
      newAttrs.push(attr)
      return
    }

    // Remove props
    if (
      propName === "allowPinchZoom" ||
      propName === "autoFocus" ||
      propName === "lockFocusAcrossFrames" ||
      propName === "preserveScrollBarGap" ||
      propName === "returnFocusOnClose" ||
      propName === "useInert" ||
      propName === "portalProps"
    ) {
      return
    }

    // Default: keep the prop
    newAttrs.push(attr)
  })

  // Add role attribute if specified (for AlertDialog)
  if (options.additionalRole) {
    newAttrs.push(
      j.jsxAttribute(
        j.jsxIdentifier("role"),
        j.stringLiteral(options.additionalRole),
      ),
    )
  }

  // Transform onClose to onOpenChange
  if (onCloseHandler) {
    const getHandlerStatement = (handler: any) => {
      if (!handler) return j.blockStatement([])

      // If it's an arrow function or function expression, use its body
      if (
        handler.type === "ArrowFunctionExpression" ||
        handler.type === "FunctionExpression"
      ) {
        if (handler.body.type === "BlockStatement") {
          return handler.body
        }
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
          j.unaryExpression(
            "!",
            j.memberExpression(j.identifier("e"), j.identifier("open")),
          ),
          getHandlerStatement(onCloseHandler),
        ),
      ]),
    )

    newAttrs.push(
      j.jsxAttribute(
        j.jsxIdentifier("onOpenChange"),
        j.jsxExpressionContainer(onOpenChangeHandler),
      ),
    )
  }

  return newAttrs
}

/**
 * Get value expression from JSX attribute value
 */
export function getValueExpression(j: any, propValue: any) {
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
 * Transform content component to Dialog.Content wrapped in Dialog.Positioner
 */
export function transformDialogContent(
  j: any,
  path: any,
  componentName: "Dialog" = "Dialog",
) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  // Create Dialog.Content
  const contentElement = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("Content"),
      ),
      attrs,
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("Content"),
      ),
    ),
    children,
  )

  // Wrap in Dialog.Positioner
  const positionerElement = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("Positioner"),
      ),
      [],
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("Positioner"),
      ),
    ),
    [j.jsxText("\n    "), contentElement, j.jsxText("\n  ")],
  )

  j(path).replaceWith(positionerElement)
}

/**
 * Rename component to member expression (e.g., Dialog.Body)
 */
export function renameToMemberExpression(
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
 * Update imports for Dialog components
 */
export function updateDialogImports(
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

      let hasDialog = false
      let hasPortal = false

      const newSpecifiers = specifiers.flatMap((spec: any) => {
        if (spec.type !== "ImportSpecifier") return spec

        const importName = spec.imported.name

        // Keep Dialog and Portal
        if (importName === "Dialog") {
          hasDialog = true
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

      // If we transformed components but don't have Dialog import, add it
      if (!hasDialog && transformedComponents.size > 0) {
        newSpecifiers.push(j.importSpecifier(j.identifier("Dialog")))
      }

      // If we transformed root component but don't have Portal import, add it
      const rootComponents = componentNames.filter(
        (name) => name === "Modal" || name === "AlertDialog",
      )
      const hasRootComponent = rootComponents.some((name) =>
        transformedComponents.has(name),
      )
      if (hasRootComponent && !hasPortal) {
        newSpecifiers.push(j.importSpecifier(j.identifier("Portal")))
      }

      path.node.specifiers = newSpecifiers
    })
}
