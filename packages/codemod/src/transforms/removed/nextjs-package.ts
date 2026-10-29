import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxAttributeLike,
  JsxElement,
  JsxOpeningElement,
  JsxSelfClosingElement,
  SourceFile,
} from "ts-morph"
import type { Transform } from "../../transform"

type JsxLike = JsxElement | JsxSelfClosingElement

const transform: Transform = (sourceFile) => {
  let needsBox = false
  let needsChakraLink = false
  let needsNextImage = false
  let needsNextLink = false

  // Track which local names are used for components from @chakra-ui/next-js.
  const nextJsLinkNames = new Set<string>()
  const nextJsImageNames = new Set<string>()

  // Find and remove @chakra-ui/next-js imports, tracking the local names.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/next-js") continue
    for (const named of importDecl.getNamedImports()) {
      const importedName = named.getName()
      const localName = named.getAliasNode()?.getText() ?? importedName
      if (importedName === "Link" || importedName === "NextLink") {
        nextJsLinkNames.add(localName)
        needsChakraLink = true
      } else if (importedName === "Image" || importedName === "NextImage") {
        nextJsImageNames.add(localName)
        needsBox = true
      }
    }
    importDecl.remove()
  }

  // If no components from @chakra-ui/next-js were found, return early.
  if (nextJsLinkNames.size === 0 && nextJsImageNames.size === 0) return

  // Check if next/image and next/link imports already exist.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const spec = importDecl.getModuleSpecifierValue()
    if (spec === "next/image") needsNextImage = true
    if (spec === "next/link") needsNextLink = true
  }

  // Transform Image components from @chakra-ui/next-js.
  for (const componentName of nextJsImageNames) {
    for (const el of findJsxByName(sourceFile, componentName)) {
      if (el.wasForgotten()) continue
      needsBox = true
      needsNextImage = true

      const attrsText = getOpening(el)
        .getAttributes()
        .filter((a) => Node.isJsxAttribute(a) && attrName(a) !== "asChild")
        .map((a) => a.getText())
        .join(" ")

      const imageText = attrsText ? `<Image ${attrsText} />` : `<Image />`
      el.replaceWithText(`<Box asChild>\n  ${imageText}\n</Box>`)
    }
  }

  // Transform Link components from @chakra-ui/next-js.
  const nextLinkPropNames = new Set([
    "href",
    "replace",
    "scroll",
    "shallow",
    "locale",
    "prefetch",
    "passHref",
  ])

  for (const componentName of nextJsLinkNames) {
    for (const el of findJsxByName(sourceFile, componentName)) {
      if (el.wasForgotten()) continue
      needsChakraLink = true
      needsNextLink = true

      const opening = getOpening(el)
      const chakraLinkAttrs: string[] = []
      const nextLinkAttrs: string[] = []
      let isExternal = false

      for (const attr of opening.getAttributes()) {
        if (!Node.isJsxAttribute(attr)) {
          // Spread attributes go to Chakra Link.
          chakraLinkAttrs.push(attr.getText())
          continue
        }

        const name = attr.getNameNode().getText()

        if (name === "isExternal") {
          const init = attr.getInitializer()
          const isTrueValue =
            !init ||
            (Node.isJsxExpression(init) &&
              init.getExpression()?.getKind() === SyntaxKind.TrueKeyword)
          if (isTrueValue) isExternal = true
          continue
        }

        if (name === "passHref") continue

        if (nextLinkPropNames.has(name)) {
          nextLinkAttrs.push(attr.getText())
        } else {
          chakraLinkAttrs.push(attr.getText())
        }
      }

      // Add asChild to Chakra Link.
      chakraLinkAttrs.push("asChild")

      // If isExternal was true, add target and rel to NextLink.
      if (isExternal) {
        nextLinkAttrs.push(`target="_blank"`)
        nextLinkAttrs.push(`rel="noopener noreferrer"`)
      }

      const childrenText = Node.isJsxElement(el)
        ? sourceFile
            .getFullText()
            .slice(
              el.getOpeningElement().getEnd(),
              el.getClosingElement().getStart(),
            )
        : ""
      const hasChildren = childrenText.trim().length > 0

      const chakraAttrsText = chakraLinkAttrs.join(" ")
      const nextAttrsText = nextLinkAttrs.join(" ")

      const nextLinkText = hasChildren
        ? `<NextLink${nextAttrsText ? ` ${nextAttrsText}` : ""}>${childrenText}</NextLink>`
        : `<NextLink${nextAttrsText ? ` ${nextAttrsText}` : ""} />`

      el.replaceWithText(
        `<Link${chakraAttrsText ? ` ${chakraAttrsText}` : ""}>\n  ${nextLinkText}\n</Link>`,
      )
    }
  }

  // Add necessary imports to @chakra-ui/react.
  if (needsBox || needsChakraLink) {
    const chakraImport = sourceFile
      .getImportDeclarations()
      .find((d) => d.getModuleSpecifierValue() === "@chakra-ui/react")

    if (chakraImport) {
      const names = chakraImport.getNamedImports().map((n) => n.getName())
      if (needsBox && !names.includes("Box")) chakraImport.addNamedImport("Box")
      if (needsChakraLink && !names.includes("Link"))
        chakraImport.addNamedImport("Link")
    } else {
      const namedImports: string[] = []
      if (needsBox) namedImports.push("Box")
      if (needsChakraLink) namedImports.push("Link")
      sourceFile.insertImportDeclaration(0, {
        namedImports,
        moduleSpecifier: "@chakra-ui/react",
      })
    }
  }

  // Add next/image import if needed.
  if (needsNextImage && !hasImport(sourceFile, "next/image")) {
    sourceFile.insertImportDeclaration(0, {
      defaultImport: "Image",
      moduleSpecifier: "next/image",
    })
  }

  // Add next/link import if needed.
  if (needsNextLink && !hasImport(sourceFile, "next/link")) {
    sourceFile.insertImportDeclaration(0, {
      defaultImport: "NextLink",
      moduleSpecifier: "next/link",
    })
  }
}

/** Match both `<Name>...</Name>` and `<Name />`, later positions first. */
function findJsxByName(sourceFile: SourceFile, name: string): JsxLike[] {
  const elements: JsxLike[] = [
    ...sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxElement)
      .filter(
        (el) => el.getOpeningElement().getTagNameNode().getText() === name,
      ),
    ...sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
      .filter((el) => el.getTagNameNode().getText() === name),
  ]
  return elements.sort((a, b) => b.getStart() - a.getStart())
}

function getOpening(el: JsxLike): JsxOpeningElement | JsxSelfClosingElement {
  return Node.isJsxElement(el) ? el.getOpeningElement() : el
}

function attrName(attr: JsxAttributeLike): string | undefined {
  return Node.isJsxAttribute(attr) ? attr.getNameNode().getText() : undefined
}

function hasImport(sourceFile: SourceFile, moduleSpecifier: string): boolean {
  return sourceFile
    .getImportDeclarations()
    .some((d) => d.getModuleSpecifierValue() === moduleSpecifier)
}

export default transform
