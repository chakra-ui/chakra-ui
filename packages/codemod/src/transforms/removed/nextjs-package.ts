import type { API, FileInfo, Options } from "jscodeshift"

export default function transformer(
  file: FileInfo,
  api: API,
  _options: Options,
) {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasChanges = false

  let needsBox = false
  let needsLink = false
  let needsNextImage = false
  let needsNextLink = false

  const removedComponents: Record<
    string,
    { replacement: string; wrapper: string }
  > = {
    ChakraNextImage: { replacement: "Image", wrapper: "Box" },
    ChakraNextLink: { replacement: "Link", wrapper: "Link" },
    NextImage: { replacement: "Image", wrapper: "Box" },
    NextLink: { replacement: "Link", wrapper: "Link" },
  }

  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/next-js" },
    })
    .forEach((path) => {
      path.node.specifiers?.forEach((spec) => {
        if (spec.type === "ImportSpecifier") {
          const name = spec.imported.name as string
          if (removedComponents[name]) {
            if (name.includes("Image")) needsBox = true
            if (name.includes("Link")) needsLink = true
          }
        }
      })
      j(path).remove()
      hasChanges = true
    })

  // Check for next/image and next/link imports
  root
    .find(j.ImportDeclaration, {
      source: { value: "next/image" },
    })
    .forEach(() => {
      needsNextImage = true
    })

  root
    .find(j.ImportDeclaration, {
      source: { value: "next/link" },
    })
    .forEach(() => {
      needsNextLink = true
    })

  // Transform ChakraNextImage -> Box asChild with Next Image
  Object.keys(removedComponents).forEach((componentName) => {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: componentName } },
      })
      .forEach((path) => {
        const isImage = componentName.includes("Image")
        const isLink = componentName.includes("Link")

        const openingElement = path.node.openingElement
        const attributes = openingElement.attributes || []
        const children = path.node.children || []

        // For images
        if (isImage) {
          needsBox = true
          needsNextImage = true

          // Create wrapper Box with asChild
          const wrapper = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier("Box"),
              [j.jsxAttribute(j.jsxIdentifier("asChild"), null)],
              false,
            ),
            j.jsxClosingElement(j.jsxIdentifier("Box")),
            [
              j.jsxText("\n  "),
              j.jsxElement(
                j.jsxOpeningElement(
                  j.jsxIdentifier("Image"),
                  attributes.filter(
                    (attr) =>
                      attr.type === "JSXAttribute" &&
                      !["asChild"].includes(attr.name.name as string),
                  ),
                  true,
                ),
                null,
                [],
              ),
              j.jsxText("\n"),
            ],
          )

          j(path).replaceWith(wrapper)
          hasChanges = true
        }

        // For links
        if (isLink) {
          needsLink = true
          needsNextLink = true

          // Check for isExternal prop
          const isExternalAttr = attributes.find(
            (attr) =>
              attr.type === "JSXAttribute" && attr.name.name === "isExternal",
          )

          const hasIsExternal = !!isExternalAttr

          // Filter out isExternal from wrapper Link
          const wrapperAttrs = attributes.filter(
            (attr) =>
              attr.type === "JSXAttribute" && attr.name.name !== "isExternal",
          )

          // Add asChild prop
          wrapperAttrs.push(j.jsxAttribute(j.jsxIdentifier("asChild"), null))

          // Create Next Link attributes
          const nextLinkAttrs: any[] = []

          if (hasIsExternal && isExternalAttr?.type === "JSXAttribute") {
            const isExternalValue = isExternalAttr.value
            const isTrue =
              !isExternalValue ||
              (isExternalValue.type === "JSXExpressionContainer" &&
                isExternalValue.expression.type === "Literal" &&
                isExternalValue.expression.value === true)

            if (isTrue) {
              nextLinkAttrs.push(
                j.jsxAttribute(j.jsxIdentifier("target"), j.literal("_blank")),
              )
              nextLinkAttrs.push(
                j.jsxAttribute(
                  j.jsxIdentifier("rel"),
                  j.literal("noopener noreferrer"),
                ),
              )
            }
          }

          const hrefAttr = attributes.find(
            (attr) => attr.type === "JSXAttribute" && attr.name.name === "href",
          )
          if (hrefAttr) {
            nextLinkAttrs.push(hrefAttr)
          }

          const wrapper = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier("Link"),
              wrapperAttrs,
              children.length === 0,
            ),
            children.length === 0
              ? null
              : j.jsxClosingElement(j.jsxIdentifier("Link")),
            children.length === 0
              ? []
              : [
                  j.jsxText("\n  "),
                  j.jsxElement(
                    j.jsxOpeningElement(
                      j.jsxIdentifier("NextLink"),
                      nextLinkAttrs,
                      children.length === 0,
                    ),
                    children.length === 0
                      ? null
                      : j.jsxClosingElement(j.jsxIdentifier("NextLink")),
                    children.length === 0 ? [] : children,
                  ),
                  j.jsxText("\n"),
                ],
          )

          j(path).replaceWith(wrapper)
          hasChanges = true
        }
      })
  })

  // Add necessary imports
  if (needsBox || needsLink) {
    root
      .find(j.ImportDeclaration, {
        source: { value: "@chakra-ui/react" },
      })
      .forEach((path) => {
        const specifiers = path.node.specifiers || []

        if (needsBox) {
          const hasBox = specifiers.some(
            (spec) =>
              spec.type === "ImportSpecifier" && spec.imported.name === "Box",
          )
          if (!hasBox) {
            specifiers.push(j.importSpecifier(j.identifier("Box")))
          }
        }

        if (needsLink) {
          const hasLink = specifiers.some(
            (spec) =>
              spec.type === "ImportSpecifier" && spec.imported.name === "Link",
          )
          if (!hasLink) {
            specifiers.push(j.importSpecifier(j.identifier("Link")))
          }
        }

        path.node.specifiers = specifiers
      })
  }

  if (needsNextImage) {
    const hasImageImport =
      root.find(j.ImportDeclaration, {
        source: { value: "next/image" },
      }).length > 0

    if (!hasImageImport) {
      const imageImport = j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier("Image"))],
        j.literal("next/image"),
      )

      const firstImport = root.find(j.ImportDeclaration).at(0)
      if (firstImport.length > 0) {
        firstImport.insertBefore(imageImport)
      } else {
        root.get().node.program.body.unshift(imageImport)
      }
    }
  }

  if (needsNextLink) {
    const hasLinkImport =
      root.find(j.ImportDeclaration, {
        source: { value: "next/link" },
      }).length > 0

    if (!hasLinkImport) {
      const linkImport = j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier("NextLink"))],
        j.literal("next/link"),
      )

      const firstImport = root.find(j.ImportDeclaration).at(0)
      if (firstImport.length > 0) {
        firstImport.insertBefore(linkImport)
      } else {
        root.get().node.program.body.unshift(linkImport)
      }
    }
  }

  return hasChanges ? root.toSource() : file.source
}
