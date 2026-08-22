import type {
  API,
  CallExpression,
  FileInfo,
  Options,
  TSTypeParameterInstantiation,
} from "jscodeshift"

export default function transformer(
  file: FileInfo,
  api: API,
  _options: Options,
) {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasChanges = false

  let needsReactForwardRef = false
  let hasReactImport = false
  let hasReactForwardRefImport = false

  root
    .find(j.ImportDeclaration, { source: { value: "react" } })
    .forEach((path) => {
      hasReactImport = true
      path.node.specifiers?.forEach((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "forwardRef"
        ) {
          hasReactForwardRefImport = true
        }
      })
    })

  root
    .find(j.ImportDeclaration, { source: { value: "@chakra-ui/react" } })
    .forEach((path) => {
      const originalLength = path.node.specifiers?.length || 0

      const specifiers = path.node.specifiers?.filter((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "forwardRef"
        ) {
          needsReactForwardRef = true
          return false
        }
        return true
      })

      if (specifiers && specifiers.length < originalLength) {
        if (specifiers.length === 0) {
          j(path).remove()
        } else {
          path.node.specifiers = specifiers
        }
        hasChanges = true
      }
    })

  root
    .find(j.CallExpression, { callee: { name: "forwardRef" } })
    .forEach((path) => {
      const node = path.node as CallExpression & {
        typeParameters?: TSTypeParameterInstantiation
      }

      if (node.typeParameters && node.typeParameters.params.length === 2) {
        const propsType = node.typeParameters.params[0]
        const elementType = node.typeParameters.params[1]

        if (
          elementType.type === "TSLiteralType" &&
          elementType.literal.type === "StringLiteral"
        ) {
          const elementName = elementType.literal.value
          const htmlElementType = HTML_ELEMENT_MAP[elementName] || "HTMLElement"

          node.typeParameters.params = [
            j.tsTypeReference(j.identifier(htmlElementType)),
            propsType,
          ]

          hasChanges = true
        }
      }
    })

  if (needsReactForwardRef && !hasReactForwardRefImport) {
    if (hasReactImport) {
      root
        .find(j.ImportDeclaration, { source: { value: "react" } })
        .forEach((path) => {
          const hasForwardRef = path.node.specifiers?.some(
            (spec) =>
              spec.type === "ImportSpecifier" &&
              spec.imported.name === "forwardRef",
          )

          if (!hasForwardRef) {
            const forwardRefSpecifier = j.importSpecifier(
              j.identifier("forwardRef"),
            )
            path.node.specifiers = path.node.specifiers || []
            path.node.specifiers.push(forwardRefSpecifier)
            hasChanges = true
          }
        })
    } else {
      const newImport = j.importDeclaration(
        [j.importSpecifier(j.identifier("forwardRef"))],
        j.literal("react"),
      )

      const firstImport = root.find(j.ImportDeclaration).at(0)
      if (firstImport.length > 0) {
        firstImport.insertBefore(newImport)
      } else {
        root.get().node.program.body.unshift(newImport)
      }
      hasChanges = true
    }
  }

  return hasChanges ? root.toSource() : file.source
}

const HTML_ELEMENT_MAP: Record<string, string> = {
  button: "HTMLButtonElement",
  div: "HTMLDivElement",
  span: "HTMLSpanElement",
  input: "HTMLInputElement",
  a: "HTMLAnchorElement",
  img: "HTMLImageElement",
  p: "HTMLParagraphElement",
  h1: "HTMLHeadingElement",
  h2: "HTMLHeadingElement",
  h3: "HTMLHeadingElement",
  h4: "HTMLHeadingElement",
  h5: "HTMLHeadingElement",
  h6: "HTMLHeadingElement",
  ul: "HTMLUListElement",
  ol: "HTMLOListElement",
  li: "HTMLLIElement",
  form: "HTMLFormElement",
  label: "HTMLLabelElement",
  select: "HTMLSelectElement",
  textarea: "HTMLTextAreaElement",
  section: "HTMLElement",
  article: "HTMLElement",
  nav: "HTMLElement",
  header: "HTMLElement",
  footer: "HTMLElement",
  main: "HTMLElement",
  aside: "HTMLElement",
}
