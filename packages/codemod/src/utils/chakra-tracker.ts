import type { Collection, JSCodeshift } from "jscodeshift"

export function collectChakraLocalNames(j: JSCodeshift, root: Collection<any>) {
  const chakraLocalNames = new Set<string>()
  const svgComponents = new Set<string>()
  const componentAliases = new Map<string, string>()

  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value
    if (typeof source === "string" && source.includes("@chakra-ui/react")) {
      path.node.specifiers?.forEach((spec) => {
        if (spec.local && spec.local.type === "Identifier") {
          chakraLocalNames.add(spec.local.name)
        }
      })
    }
  })

  root.find(j.VariableDeclarator).forEach((path) => {
    const declarator = path.node
    if (declarator.type !== "VariableDeclarator") return
    const id = declarator.id
    const init = declarator.init
    if (id.type !== "Identifier") return
    const varName = id.name

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

    if (init.type === "CallExpression") {
      const callee = init.callee
      if (callee.type === "Identifier" && callee.name === "chakra") {
        chakraLocalNames.add(varName)
        return
      }
      if (
        callee.type === "MemberExpression" &&
        callee.object.type === "Identifier" &&
        (callee.object.name === "chakra" || callee.object.name === "styled")
      ) {
        chakraLocalNames.add(varName)
        return
      }
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

    if (init.type === "Identifier") {
      if (chakraLocalNames.has(init.name)) {
        chakraLocalNames.add(varName)
        componentAliases.set(varName, init.name)
      }
    }

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

  root.find(j.FunctionDeclaration).forEach((path) => {
    const id = path.node.id
    if (!id || id.type !== "Identifier") return
    const returnStatements = j(path).find(j.ReturnStatement)
    returnStatements.forEach((retPath) => {
      const arg = retPath.node.argument
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

  root.find(j.ExportNamedDeclaration).forEach((path) => {
    if (path.node.declaration?.type === "VariableDeclaration") {
      path.node.declaration.declarations.forEach((decl) => {
        if (
          decl.type === "VariableDeclarator" &&
          decl.id.type === "Identifier" &&
          decl.init
        ) {
          const varName = decl.id.name
          const init = decl.init
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

  return { chakraLocalNames, svgComponents, componentAliases }
}

export function getJsxBaseName(nameNode: any) {
  if (nameNode.type === "JSXIdentifier") {
    return nameNode.name
  }
  if (nameNode.type === "JSXMemberExpression") {
    let current: any = nameNode
    while (current.object) current = current.object
    return current.name
  }
  return ""
}

export function isTrackedJsx(
  openingElement: any,
  chakraLocalNames: Set<string>,
) {
  const baseName = getJsxBaseName(openingElement.name)
  return chakraLocalNames.has(baseName)
}
