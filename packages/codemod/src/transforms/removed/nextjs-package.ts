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
  let needsChakraLink = false
  let needsNextImage = false
  let needsNextLink = false

  // Track which local names are used for components from @chakra-ui/next-js
  const nextJsLinkNames = new Set<string>()
  const nextJsImageNames = new Set<string>()

  // Find and remove @chakra-ui/next-js imports, tracking the local names
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/next-js" },
    })
    .forEach((path) => {
      path.node.specifiers?.forEach((spec) => {
        if (spec.type === "ImportSpecifier" && spec.local) {
          const importedName = spec.imported.name
          const localName = spec.local.name

          if (importedName === "Link" || importedName === "NextLink") {
            nextJsLinkNames.add(localName as string)
            needsChakraLink = true
          } else if (importedName === "Image" || importedName === "NextImage") {
            nextJsImageNames.add(localName as string)
            needsBox = true
          }
        }
      })
      j(path).remove()
      hasChanges = true
    })

  // If no components from @chakra-ui/next-js were found, return early
  if (nextJsLinkNames.size === 0 && nextJsImageNames.size === 0) {
    return file.source
  }

  // Check if next/image and next/link imports already exist
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

  // Transform Image components from @chakra-ui/next-js
  nextJsImageNames.forEach((componentName) => {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: componentName } },
      })
      .forEach((path) => {
        needsBox = true
        needsNextImage = true

        const openingElement = path.node.openingElement
        const attributes = openingElement.attributes || []

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
                    attr.name.name !== "asChild",
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
      })
  })

  // Transform Link components from @chakra-ui/next-js
  nextJsLinkNames.forEach((componentName) => {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: componentName } },
      })
      .forEach((path) => {
        needsChakraLink = true
        needsNextLink = true

        const openingElement = path.node.openingElement
        const attributes = openingElement.attributes || []
        const children = path.node.children || []

        // Props that belong on NextLink, not Chakra Link
        const nextLinkPropNames = new Set([
          "href",
          "replace",
          "scroll",
          "shallow",
          "locale",
          "prefetch",
          "passHref", // This should be removed entirely (not needed with asChild)
        ])

        // Separate attributes for Chakra Link wrapper vs NextLink child
        const chakraLinkAttrs: any[] = []
        const nextLinkAttrs: any[] = []
        let isExternal = false

        attributes.forEach((attr) => {
          if (attr.type !== "JSXAttribute") {
            // Spread attributes go to Chakra Link
            chakraLinkAttrs.push(attr)
            return
          }

          const attrName = attr.name.name as string

          // Handle isExternal
          if (attrName === "isExternal") {
            const attrValue = attr.value
            const isTrueValue =
              !attrValue ||
              (attrValue.type === "JSXExpressionContainer" &&
                attrValue.expression.type === "Literal" &&
                attrValue.expression.value === true) ||
              (attrValue.type === "JSXExpressionContainer" &&
                attrValue.expression.type === "BooleanLiteral" &&
                attrValue.expression.value === true)

            if (isTrueValue) {
              isExternal = true
            }
            // Don't add isExternal to either component
            return
          }

          // Skip passHref entirely (deprecated with asChild)
          if (attrName === "passHref") {
            return
          }

          // Distribute props
          if (nextLinkPropNames.has(attrName)) {
            nextLinkAttrs.push(attr)
          } else {
            chakraLinkAttrs.push(attr)
          }
        })

        // Add asChild to Chakra Link
        chakraLinkAttrs.push(j.jsxAttribute(j.jsxIdentifier("asChild"), null))

        // If isExternal was true, add target and rel to NextLink
        if (isExternal) {
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

        const wrapper = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier("Link"), chakraLinkAttrs, false),
          j.jsxClosingElement(j.jsxIdentifier("Link")),
          [
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
              children,
            ),
            j.jsxText("\n"),
          ],
        )

        j(path).replaceWith(wrapper)
        hasChanges = true
      })
  })

  // Add necessary imports to @chakra-ui/react
  if (needsBox || needsChakraLink) {
    const chakraImport = root.find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })

    if (chakraImport.length > 0) {
      chakraImport.forEach((path) => {
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

        if (needsChakraLink) {
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
    } else {
      // Create @chakra-ui/react import if it doesn't exist
      const newSpecifiers = []
      if (needsBox) newSpecifiers.push(j.importSpecifier(j.identifier("Box")))
      if (needsChakraLink)
        newSpecifiers.push(j.importSpecifier(j.identifier("Link")))

      const chakraImportDeclaration = j.importDeclaration(
        newSpecifiers,
        j.literal("@chakra-ui/react"),
      )

      const firstImport = root.find(j.ImportDeclaration).at(0)
      if (firstImport.length > 0) {
        firstImport.insertBefore(chakraImportDeclaration)
      } else {
        root.get().node.program.body.unshift(chakraImportDeclaration)
      }
    }
  }

  // Add next/image import if needed
  if (
    needsNextImage &&
    !root.find(j.ImportDeclaration, { source: { value: "next/image" } }).length
  ) {
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

  // Add next/link import if needed
  if (
    needsNextLink &&
    !root.find(j.ImportDeclaration, { source: { value: "next/link" } }).length
  ) {
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

  return hasChanges ? root.toSource() : file.source
}
