import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transform(
  file: FileInfo,
  _api: API,
  __options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const chakraLocalNames = new Set<string>()
  const svgComponents = new Set<string>()
  const componentAliases = new Map<string, string>() // Track component aliases

  // Step 1: Find direct Chakra UI imports
  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value
    if (typeof source === "string" && source.includes("@chakra-ui/react")) {
      path.node.specifiers?.forEach((spec) => {
        if (spec.local && spec.local.type === "Identifier") {
          const localName = spec.local.name
          chakraLocalNames.add(localName)
        }
      })
    }
  })

  // Step 2: Track all variable declarations and function calls
  root.find(j.VariableDeclarator).forEach((path) => {
    const declarator = path.node
    if (declarator.type !== "VariableDeclarator") return

    const id = declarator.id
    const init = declarator.init

    if (id.type !== "Identifier") return
    const varName = id.name

    // Check if variable has SVG type annotation
    if (id.typeAnnotation?.typeAnnotation?.type === "TSTypeReference") {
      const typeName = (id.typeAnnotation.typeAnnotation.typeName as any).name
      if (
        typeName === "SVGElement" ||
        typeName === "SVGSVGElement" ||
        typeName?.includes("SVG")
      ) {
        svgComponents.add(varName)
      }
    }

    // Check for React.FC<SVGProps<SVGSVGElement>> or similar
    if (
      init?.type === "ArrowFunctionExpression" ||
      init?.type === "FunctionExpression"
    ) {
      if (id.typeAnnotation) {
        const typeAnnotation = id.typeAnnotation.typeAnnotation
        if (typeAnnotation?.type === "TSTypeReference") {
          const typeNode = typeAnnotation as any
          if (typeNode.typeParameters?.params) {
            typeNode.typeParameters.params.forEach((param: any) => {
              if (param.type === "TSTypeReference") {
                const genericTypeName = param.typeName?.name
                if (genericTypeName?.includes("SVG")) {
                  svgComponents.add(varName)
                }
              }
            })
          }
        }
      }
    }

    if (!init) return

    // Case 1: const Button = chakra(SomeComponent) or chakra.button
    if (init.type === "CallExpression") {
      const callee = init.callee

      // Direct chakra() call
      if (callee.type === "Identifier" && callee.name === "chakra") {
        chakraLocalNames.add(varName)
        return
      }

      // chakra.button() or styled.button() call
      if (
        callee.type === "MemberExpression" &&
        callee.object.type === "Identifier" &&
        (callee.object.name === "chakra" || callee.object.name === "styled")
      ) {
        chakraLocalNames.add(varName)
        return
      }

      // Check if the first argument is a chakra component
      // e.g., const MyButton = someWrapper(ChakraButton)
      if (init.arguments.length > 0) {
        const firstArg = init.arguments[0]
        if (
          firstArg.type === "Identifier" &&
          chakraLocalNames.has(firstArg.name)
        ) {
          chakraLocalNames.add(varName)
          componentAliases.set(varName, firstArg.name)
          return
        }
      }
    }

    // Case 2: const Button = ChakraButton (direct assignment)
    if (init.type === "Identifier") {
      if (chakraLocalNames.has(init.name)) {
        chakraLocalNames.add(varName)
        componentAliases.set(varName, init.name)
      }
    }

    // Case 3: const Button = SomeObject.Button (member expression)
    if (init.type === "MemberExpression") {
      let current: any = init
      while (current.object) {
        if (
          current.object.type === "Identifier" &&
          chakraLocalNames.has(current.object.name)
        ) {
          chakraLocalNames.add(varName)
          break
        }
        current = current.object
      }
    }
  })

  // Step 3: Track function declarations
  root.find(j.FunctionDeclaration).forEach((path) => {
    const id = path.node.id
    if (!id || id.type !== "Identifier") return

    // Check if function returns a chakra component
    const returnStatements = j(path).find(j.ReturnStatement)
    returnStatements.forEach((retPath) => {
      const arg = retPath.node.argument

      // Check for SVG return type
      if (path.node.returnType?.typeAnnotation?.type === "TSTypeReference") {
        const typeName = (path.node.returnType.typeAnnotation.typeName as any)
          .name
        if (
          typeName === "SVGElement" ||
          typeName === "SVGSVGElement" ||
          typeName?.includes("SVG") ||
          typeName === "ReactElement"
        ) {
          if (
            arg?.type === "JSXElement" &&
            (arg as any).openingElement?.name?.name === "svg"
          ) {
            svgComponents.add(id.name)
          }
        }
      }

      // If it returns a chakra component JSX
      if (arg?.type === "JSXElement") {
        const openingElement = (arg as any).openingElement
        if (openingElement?.name?.type === "JSXIdentifier") {
          const returnedComponentName = openingElement.name.name
          if (chakraLocalNames.has(returnedComponentName)) {
            chakraLocalNames.add(id.name)
          }
        }
      }
    })
  })

  // Step 4: Track exports (both named and default)
  root.find(j.ExportNamedDeclaration).forEach((path) => {
    // export const Button = ...
    if (path.node.declaration?.type === "VariableDeclaration") {
      path.node.declaration.declarations.forEach((decl) => {
        if (
          decl.type === "VariableDeclarator" &&
          decl.id.type === "Identifier" &&
          decl.init
        ) {
          const varName = decl.id.name
          const init = decl.init

          // Same logic as above for tracking chakra components
          if (init.type === "CallExpression") {
            const callee = init.callee
            if (
              (callee.type === "Identifier" &&
                (callee.name === "chakra" || callee.name === "styled")) ||
              (callee.type === "MemberExpression" &&
                callee.object.type === "Identifier" &&
                (callee.object.name === "chakra" ||
                  callee.object.name === "styled"))
            ) {
              chakraLocalNames.add(varName)
            }
          }

          if (init.type === "Identifier" && chakraLocalNames.has(init.name)) {
            chakraLocalNames.add(varName)
            componentAliases.set(varName, init.name)
          }
        }
      })
    }

    // export { Button } - track if Button is already a chakra component
    if (!path.node.source) {
      path.node.specifiers?.forEach((spec) => {
        if (spec.type === "ExportSpecifier") {
          if (!spec.local || !spec.exported) return
          const localName =
            spec.local.type === "Identifier" ? spec.local.name : null
          const exportedName =
            spec.exported.type === "Identifier" ? spec.exported.name : null

          if (
            localName &&
            exportedName &&
            chakraLocalNames.has(localName as string)
          ) {
            chakraLocalNames.add(exportedName)
            componentAliases.set(exportedName, localName as string)
          }
        }
      })
    }
  })

  root.find(j.ExportDefaultDeclaration).forEach((path) => {
    const declaration = path.node.declaration

    if (
      declaration.type === "Identifier" &&
      chakraLocalNames.has(declaration.name)
    ) {
      chakraLocalNames.add("default")
    }

    if (declaration.type === "CallExpression") {
      const callee = declaration.callee
      if (
        (callee.type === "Identifier" &&
          (callee.name === "chakra" || callee.name === "styled")) ||
        (callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          (callee.object.name === "chakra" || callee.object.name === "styled"))
      ) {
        chakraLocalNames.add("default")
      }
    }
  })

  if (chakraLocalNames.size === 0) return file.source

  const isSVGComponent = (name: string): boolean => {
    return svgComponents.has(name)
  }

  root.find(j.JSXElement).forEach((elementPath) => {
    const openingElement = elementPath.node.openingElement
    const nameNode = openingElement.name

    let baseName = ""
    if (nameNode.type === "JSXIdentifier") {
      baseName = nameNode.name
    } else if (nameNode.type === "JSXMemberExpression") {
      let current: any = nameNode
      while (current.object) current = current.object
      baseName = current.name
    }

    if (!chakraLocalNames.has(baseName)) return

    const asPropIndex = openingElement.attributes?.findIndex(
      (attr) =>
        attr.type === "JSXAttribute" &&
        attr.name.type === "JSXIdentifier" &&
        attr.name.name === "as",
    )

    if (asPropIndex === undefined || asPropIndex === -1) return

    const asProp = openingElement.attributes![asPropIndex] as any
    const asValue = asProp.value

    let asComponentName: string | null = null
    let asComponentExpression: any = null

    if (asValue?.type === "JSXExpressionContainer") {
      const expr = asValue.expression
      if (expr.type === "Identifier") {
        asComponentName = expr.name
        asComponentExpression = expr
      } else if (expr.type === "MemberExpression") {
        const parts: string[] = []
        let current = expr
        while (current) {
          if (current.property?.name) {
            parts.unshift(current.property.name)
          }
          if (current.object?.type === "Identifier") {
            parts.unshift(current.object.name)
            break
          }
          current = current.object
        }
        asComponentName = parts[parts.length - 1]
        asComponentExpression = expr
      }
    } else if (
      asValue?.type === "Literal" &&
      typeof asValue.value === "string"
    ) {
      asComponentName = asValue.value
      asComponentExpression = j.jsxIdentifier(asValue.value)
    }

    if (!asComponentName) return

    openingElement.attributes!.splice(asPropIndex, 1)

    if (isSVGComponent(asComponentName)) {
      const iconElement = j.jsxElement(
        j.jsxOpeningElement(
          asComponentExpression.type === "MemberExpression"
            ? asComponentExpression
            : j.jsxIdentifier(asComponentName),
          [],
          true,
        ),
      )

      elementPath.node.children = [iconElement]
      elementPath.node.closingElement = j.jsxClosingElement(nameNode)
      openingElement.selfClosing = false
    } else {
      const otherAttrs = openingElement.attributes!.filter(
        (attr) =>
          !(
            attr.type === "JSXAttribute" &&
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "asChild"
          ),
      )

      const existingChildren = elementPath.node.children || []

      const childElement = j.jsxElement(
        j.jsxOpeningElement(
          asComponentExpression.type === "MemberExpression"
            ? asComponentExpression
            : j.jsxIdentifier(asComponentName),
          otherAttrs,
          existingChildren.length === 0,
        ),
        existingChildren.length === 0
          ? null
          : j.jsxClosingElement(
              asComponentExpression.type === "MemberExpression"
                ? asComponentExpression
                : j.jsxIdentifier(asComponentName),
            ),
        existingChildren,
      )

      openingElement.attributes = [
        j.jsxAttribute(j.jsxIdentifier("asChild"), null),
      ]
      elementPath.node.children = [childElement]
      elementPath.node.closingElement = j.jsxClosingElement(nameNode)
      openingElement.selfClosing = false
    }
  })

  return root.toSource({ quote: "single" })
}
