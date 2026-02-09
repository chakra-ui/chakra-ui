import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms transition components (Fade, ScaleFade, Slide, SlideFade) to Presence
 *
 * @example
 * // Fade
 * <Fade in={isOpen}>content</Fade>
 * // becomes
 * <Presence present={isOpen} animationName={{ _open: "fade-in", _closed: "fade-out" }} animationDuration="moderate">content</Presence>
 *
 * @example
 * // ScaleFade
 * <ScaleFade in={isOpen} initialScale={0.9}>content</ScaleFade>
 * // becomes
 * <Presence present={isOpen} animationStyle={{ _open: "scale-fade-in", _closed: "scale-fade-out" }} animationDuration="moderate">content</Presence>
 *
 * @example
 * // Slide
 * <Slide direction='bottom' in={isOpen}>content</Slide>
 * // becomes
 * <Presence position="fixed" bottom="0" insetX="0" present={isOpen} animationName={{ _open: "slide-from-bottom-full", _closed: "slide-to-bottom-full" }} animationDuration="moderate">content</Presence>
 *
 * @example
 * // SlideFade
 * <SlideFade in={isOpen} offsetY='20px'>content</SlideFade>
 * // becomes
 * <Presence present={isOpen} animationName={{ _open: "slide-from-bottom, fade-in", _closed: "slide-to-bottom, fade-out" }} animationDuration="moderate">content</Presence>
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

  // Transform Fade
  if (chakraLocalNames.has("Fade")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "Fade" } },
      })
      .forEach((path) => {
        transformFadeToPresence(j, path)
        transformedComponents.add("Fade")
      })
  }

  // Transform ScaleFade
  if (chakraLocalNames.has("ScaleFade")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "ScaleFade" } },
      })
      .forEach((path) => {
        transformScaleFadeToPresence(j, path)
        transformedComponents.add("ScaleFade")
      })
  }

  // Transform Slide
  if (chakraLocalNames.has("Slide")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "Slide" } },
      })
      .forEach((path) => {
        transformSlideToPresence(j, path)
        transformedComponents.add("Slide")
      })
  }

  // Transform SlideFade
  if (chakraLocalNames.has("SlideFade")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "SlideFade" } },
      })
      .forEach((path) => {
        transformSlideFadeToPresence(j, path)
        transformedComponents.add("SlideFade")
      })
  }

  // Update imports
  if (transformedComponents.size > 0) {
    updateImportsForTransitions(j, root, transformedComponents)
  }

  return root.toSource({ quote: "single" })
}

/**
 * Creates an animation name object expression for Presence component
 * @example { _open: "fade-in", _closed: "fade-out" }
 */
function createAnimationNameObject(
  j: any,
  openValue: string,
  closedValue: string,
) {
  return j.jsxExpressionContainer(
    j.objectExpression([
      j.property("init", j.identifier("_open"), j.stringLiteral(openValue)),
      j.property("init", j.identifier("_closed"), j.stringLiteral(closedValue)),
    ]),
  )
}

/**
 * Creates JSX attribute with string value
 */
function createStringAttribute(j: any, name: string, value: string) {
  return j.jsxAttribute(j.jsxIdentifier(name), j.stringLiteral(value))
}

/**
 * Get configuration for Slide component based on direction
 */
function getSlideDirectionConfig(direction: string) {
  const configs: Record<
    string,
    {
      positioning: Array<[string, string]>
      animationOpen: string
      animationClosed: string
    }
  > = {
    top: {
      positioning: [
        ["position", "fixed"],
        ["top", "0"],
        ["insetX", "0"],
      ],
      animationOpen: "slide-from-top-full",
      animationClosed: "slide-to-top-full",
    },
    bottom: {
      positioning: [
        ["position", "fixed"],
        ["bottom", "0"],
        ["insetX", "0"],
      ],
      animationOpen: "slide-from-bottom-full",
      animationClosed: "slide-to-bottom-full",
    },
    left: {
      positioning: [
        ["position", "fixed"],
        ["left", "0"],
        ["insetY", "0"],
      ],
      animationOpen: "slide-from-left-full",
      animationClosed: "slide-to-left-full",
    },
    right: {
      positioning: [
        ["position", "fixed"],
        ["right", "0"],
        ["insetY", "0"],
      ],
      animationOpen: "slide-from-right-full",
      animationClosed: "slide-to-right-full",
    },
  }
  return configs[direction] || configs.bottom // default to bottom
}

/**
 * Transform Fade component to Presence
 */
function transformFadeToPresence(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  const newAttrs = attrs.flatMap((attr: any) => {
    if (attr.type !== "JSXAttribute") return attr

    // Rename 'in' to 'present'
    if (attr.name.name === "in") {
      attr.name.name = "present"
      return attr
    }

    return attr
  })

  // Add animation props
  newAttrs.push(
    j.jsxAttribute(
      j.jsxIdentifier("animationName"),
      createAnimationNameObject(j, "fade-in", "fade-out"),
    ),
  )
  newAttrs.push(createStringAttribute(j, "animationDuration", "moderate"))

  // Create new Presence element
  const presenceElement = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier("Presence"), newAttrs),
    j.jsxClosingElement(j.jsxIdentifier("Presence")),
    children,
  )

  j(path).replaceWith(presenceElement)
}

/**
 * Transform ScaleFade component to Presence
 */
function transformScaleFadeToPresence(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  const newAttrs = attrs.flatMap((attr: any) => {
    if (attr.type !== "JSXAttribute") return attr

    // Rename 'in' to 'present'
    if (attr.name.name === "in") {
      attr.name.name = "present"
      return attr
    }

    // Remove initialScale prop (no longer customizable)
    if (attr.name.name === "initialScale") {
      return []
    }

    return attr
  })

  // Add animation props
  newAttrs.push(
    j.jsxAttribute(
      j.jsxIdentifier("animationStyle"),
      createAnimationNameObject(j, "scale-fade-in", "scale-fade-out"),
    ),
  )
  newAttrs.push(createStringAttribute(j, "animationDuration", "moderate"))

  // Create new Presence element
  const presenceElement = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier("Presence"), newAttrs),
    j.jsxClosingElement(j.jsxIdentifier("Presence")),
    children,
  )

  j(path).replaceWith(presenceElement)
}

/**
 * Transform Slide component to Presence
 */
function transformSlideToPresence(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  let direction = "bottom" // default direction
  let hasNonStaticDirection = false

  const newAttrs = attrs.flatMap((attr: any) => {
    if (attr.type !== "JSXAttribute") return attr

    // Rename 'in' to 'present'
    if (attr.name.name === "in") {
      attr.name.name = "present"
      return attr
    }

    // Extract direction value
    if (attr.name.name === "direction") {
      if (
        attr.value?.type === "StringLiteral" ||
        (attr.value?.type === "Literal" && typeof attr.value.value === "string")
      ) {
        direction = attr.value.value
      } else if (attr.value?.type === "JSXExpressionContainer") {
        // Dynamic direction - can't determine at compile time
        hasNonStaticDirection = true
      }
      return [] // Remove direction prop
    }

    return attr
  })

  // Get direction-specific configuration
  const config = getSlideDirectionConfig(direction)

  // Add positioning props
  config.positioning.forEach(([propName, propValue]) => {
    newAttrs.push(createStringAttribute(j, propName, propValue))
  })

  // Add animation props
  newAttrs.push(
    j.jsxAttribute(
      j.jsxIdentifier("animationName"),
      createAnimationNameObject(
        j,
        config.animationOpen,
        config.animationClosed,
      ),
    ),
  )
  newAttrs.push(createStringAttribute(j, "animationDuration", "moderate"))

  // Create new Presence element
  const presenceElement = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier("Presence"), newAttrs),
    j.jsxClosingElement(j.jsxIdentifier("Presence")),
    children,
  )

  j(path).replaceWith(presenceElement)

  // Add TODO comment if direction was dynamic
  if (hasNonStaticDirection) {
    const comment = j.commentLine(
      " TODO: Dynamic Slide direction detected. Please review and adjust positioning/animations manually.",
    )
    path.insertBefore(comment)
  }
}

/**
 * Transform SlideFade component to Presence
 */
function transformSlideFadeToPresence(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  const newAttrs = attrs.flatMap((attr: any) => {
    if (attr.type !== "JSXAttribute") return attr

    // Rename 'in' to 'present'
    if (attr.name.name === "in") {
      attr.name.name = "present"
      return attr
    }

    // Remove offsetY/offsetX props (no longer customizable)
    if (attr.name.name === "offsetY" || attr.name.name === "offsetX") {
      return []
    }

    return attr
  })

  // Add animation props
  newAttrs.push(
    j.jsxAttribute(
      j.jsxIdentifier("animationName"),
      createAnimationNameObject(
        j,
        "slide-from-bottom, fade-in",
        "slide-to-bottom, fade-out",
      ),
    ),
  )
  newAttrs.push(createStringAttribute(j, "animationDuration", "moderate"))

  // Create new Presence element
  const presenceElement = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier("Presence"), newAttrs),
    j.jsxClosingElement(j.jsxIdentifier("Presence")),
    children,
  )

  j(path).replaceWith(presenceElement)
}

/**
 * Update imports to replace transition component imports with Presence
 */
function updateImportsForTransitions(
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

      let hasPresence = false
      const filteredSpecifiers: any[] = []

      // Check if Presence is already imported
      specifiers.forEach((spec: any) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "Presence"
        ) {
          hasPresence = true
        }
      })

      // Filter out transformed components and track what to keep
      specifiers.forEach((spec: any) => {
        if (spec.type === "ImportSpecifier") {
          const importName = spec.imported.name
          if (transformedComponents.has(importName)) {
            // Skip - this component was transformed
            return
          }
        }
        filteredSpecifiers.push(spec)
      })

      // Add Presence if not already present
      if (!hasPresence) {
        filteredSpecifiers.push(j.importSpecifier(j.identifier("Presence")))
      }

      path.node.specifiers = filteredSpecifiers
    })
}
