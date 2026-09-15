import { Node, SyntaxKind } from "ts-morph"
import type { ObjectLiteralExpression, SourceFile } from "ts-morph"
import type { Transform, TransformContext } from "../../transform"

const STANDARD_TOKEN_KEYS = [
  "colors",
  "space",
  "fonts",
  "fontSizes",
  "fontWeights",
  "lineHeights",
  "letterSpacings",
  "sizes",
  "borders",
  "borderStyles",
  "borderWidths",
  "radii",
  "shadows",
  "zIndices",
  "breakpoints",
]

const SKIP_KEYS = ["styles", "components", "variants", "baseStyle", "mdx"]

function asObject(node: Node | undefined): ObjectLiteralExpression | undefined {
  return node && Node.isObjectLiteralExpression(node) ? node : undefined
}

function initOf(prop: Node): Node | undefined {
  return Node.isPropertyAssignment(prop) ? prop.getInitializer() : undefined
}

function hasValueKey(obj: ObjectLiteralExpression): boolean {
  return !!obj.getProperty("value")
}

/**
 * Wrap the leaves of a token category in `{ value: ... }`. Handles a flat leaf
 * map (`{ sm: '8px' }`), a nested group (`{ brand: { 500: '#fff' } }`), and
 * imported identifiers (resolved cross-file). Already-wrapped objects are left
 * alone, so it's idempotent.
 */
function wrapTokenCategory(
  obj: ObjectLiteralExpression,
  sourceFile: SourceFile,
  ctx: TransformContext,
) {
  if (hasValueKey(obj)) return

  const isLeafMap = obj.getProperties().every((p) => !asObject(initOf(p)))
  if (isLeafMap) {
    for (const child of obj.getProperties()) wrapLeaf(child)
    return
  }

  for (const prop of obj.getProperties()) {
    const name = Node.isPropertyAssignment(prop)
      ? prop.getName()
      : Node.isShorthandPropertyAssignment(prop)
        ? prop.getName()
        : undefined
    if (name && SKIP_KEYS.includes(name)) continue

    const init = initOf(prop)
    const initObj = asObject(init)
    if (initObj) {
      wrapTokenCategory(initObj, sourceFile, ctx)
    } else if (init && Node.isIdentifier(init)) {
      resolveAndWrapCrossFile(init.getText(), sourceFile, ctx)
    } else if (Node.isShorthandPropertyAssignment(prop)) {
      resolveAndWrapCrossFile(prop.getName(), sourceFile, ctx)
    }
  }
}

function wrapLeaf(prop: Node) {
  if (!Node.isPropertyAssignment(prop)) return
  const init = prop.getInitializer()
  if (!init) return
  const initObj = asObject(init)
  if (initObj && hasValueKey(initObj)) return
  prop.setInitializer(`{\nvalue: ${init.getText()}\n}`)
}

/**
 * Follow an imported token identifier to its source file and wrap the leaves
 * there (the whole point of the ts-morph engine). Leaves the theme reference
 * untouched. Warns when the import can't be resolved.
 */
function resolveAndWrapCrossFile(
  localName: string,
  sourceFile: SourceFile,
  ctx: TransformContext,
) {
  // Same-file declaration: wrap in place.
  const localDecl = sourceFile.getVariableDeclaration(localName)
  if (localDecl) {
    const obj = asObject(localDecl.getInitializer())
    if (obj) wrapTokenCategory(obj, sourceFile, ctx)
    return
  }

  // Imported from a sibling file: resolve and wrap there.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const named = importDecl
      .getNamedImports()
      .find((n) => (n.getAliasNode()?.getText() ?? n.getName()) === localName)
    if (!named) continue

    const sibling = importDecl.getModuleSpecifierSourceFile()
    if (!sibling) {
      ctx.report({
        level: "warn",
        message: `Couldn't resolve token import "${localName}" from "${importDecl.getModuleSpecifierValue()}".`,
        action:
          "Migrate its token values to the `{ value: ... }` shape manually. See https://chakra-ui.com/docs/theming/tokens",
      })
      return
    }

    const decl = sibling.getVariableDeclaration(named.getName())
    const obj = asObject(decl?.getInitializer())
    if (obj) wrapTokenCategory(obj, sibling, ctx)
    return
  }
}

/** Wrap textStyles / layerStyles CSS in `{ value: ... }`, preserving description. */
function transformStyleObject(obj: ObjectLiteralExpression) {
  for (const styleProp of obj.getProperties()) {
    if (!Node.isPropertyAssignment(styleProp)) continue
    const val = asObject(styleProp.getInitializer())
    if (!val || hasValueKey(val)) continue

    const descProp = val.getProperty("description")
    const descText =
      descProp && Node.isPropertyAssignment(descProp)
        ? descProp.getText()
        : null
    const cssProps = val
      .getProperties()
      .filter(
        (p) => !(Node.isPropertyAssignment(p) && p.getName() === "description"),
      )
    if (cssProps.length === 0) continue

    const cssText = cssProps.map((p) => p.getText()).join(",\n")
    styleProp.setInitializer(
      descText
        ? `{\n${descText},\nvalue: {\n${cssText}\n}\n}`
        : `{\nvalue: {\n${cssText}\n}\n}`,
    )
  }
}

/** Transform semanticTokens to nested `{ value: ... }` / condition syntax. */
function transformSemanticTokens(obj: ObjectLiteralExpression) {
  const processToken = (prop: Node) => {
    if (!Node.isPropertyAssignment(prop)) return
    const val = prop.getInitializer()
    if (!val) return
    const valObj = asObject(val)

    if (!valObj) {
      prop.setInitializer(`{\nvalue: ${val.getText()}\n}`)
      return
    }
    if (hasValueKey(valObj)) return

    const hasConditions = valObj.getProperties().some((p) => {
      const name = Node.isPropertyAssignment(p) ? p.getName() : undefined
      return name === "default" || (!!name && name.startsWith("_"))
    })

    if (hasConditions) {
      const parts = valObj.getProperties().map((p) => {
        if (!Node.isPropertyAssignment(p)) return p.getText()
        const key = p.getName()
        const newKey = key === "default" ? "base" : key
        let v = p.getInitializer()!
        const vObj = asObject(v)
        if (vObj && vObj.getProperties().length === 1) {
          const inner = vObj.getProperty("value")
          if (inner && Node.isPropertyAssignment(inner))
            v = inner.getInitializer()!
        }
        return `${newKey}: ${v.getText()}`
      })
      prop.setInitializer(`{\nvalue: {\n${parts.join(",\n")}\n}\n}`)
    } else {
      for (const child of valObj.getProperties()) processToken(child)
    }
  }

  for (const categoryProp of obj.getProperties()) {
    const catVal = asObject(initOf(categoryProp))
    if (catVal)
      for (const tokenProp of catVal.getProperties()) processToken(tokenProp)
  }
}

/** Add `&` prefix to nested selectors in global styles. */
function fixGlobalStyleSelectors(obj: ObjectLiteralExpression, depth = 0) {
  for (const prop of obj.getProperties()) {
    if (!Node.isPropertyAssignment(prop)) continue
    const key = prop.getName()
    const val = asObject(prop.getInitializer())
    if (!val) continue
    const needsAmpersand =
      depth > 0 &&
      (key.startsWith(".") || /^[a-z]/i.test(key)) &&
      !key.startsWith("&") &&
      !key.startsWith("*") &&
      !key.startsWith(":") &&
      !key.includes(",")
    if (needsAmpersand) prop.getNameNode().replaceWithText(`'& ${key}'`)
    fixGlobalStyleSelectors(val, depth + 1)
  }
}

function buildInnerConfig(parts: {
  globalCss?: string
  tokens?: string[]
  semanticTokens?: string
  textStyles?: string
  layerStyles?: string
  custom: string[]
}): string {
  const themeEntries: string[] = []
  if (parts.tokens?.length)
    themeEntries.push(`tokens: {\n${parts.tokens.join(",\n")}\n}`)
  if (parts.semanticTokens)
    themeEntries.push(`semanticTokens: ${parts.semanticTokens}`)
  if (parts.textStyles) themeEntries.push(`textStyles: ${parts.textStyles}`)
  if (parts.layerStyles) themeEntries.push(`layerStyles: ${parts.layerStyles}`)

  const configEntries: string[] = []
  if (parts.globalCss) configEntries.push(`globalCss: ${parts.globalCss}`)
  if (themeEntries.length)
    configEntries.push(`theme: {\n${themeEntries.join(",\n")}\n}`)
  configEntries.push(...parts.custom)

  return `{\n${configEntries.join(",\n")}\n}`
}

const transform: Transform = (sourceFile, ctx) => {
  const chakraImport = sourceFile.getImportDeclaration(
    (d) =>
      d.getModuleSpecifierValue() === "@chakra-ui/react" ||
      d.getModuleSpecifierValue().startsWith("@chakra-ui/"),
  )
  const hasExtendTheme = !!chakraImport
    ?.getNamedImports()
    .find((n) => n.getName() === "extendTheme")

  // Find extendTheme(...) calls.
  const extendCalls = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .filter((c) => {
      const expr = c.getExpression()
      return Node.isIdentifier(expr) && expr.getText() === "extendTheme"
    })

  for (const call of extendCalls) {
    const arg = call.getArguments()[0]
    let obj = asObject(arg)
    if (!obj && arg && Node.isIdentifier(arg)) {
      const decl = sourceFile.getVariableDeclaration(arg.getText())
      obj = asObject(decl?.getInitializer())
    }
    if (!obj) continue

    // 1. Global styles
    let globalCss: string | undefined
    const stylesProp = obj.getProperty("styles")
    if (stylesProp && Node.isPropertyAssignment(stylesProp)) {
      const stylesObj = asObject(stylesProp.getInitializer())
      const globalProp = stylesObj?.getProperty("global")
      const globalObj =
        globalProp && Node.isPropertyAssignment(globalProp)
          ? asObject(globalProp.getInitializer())
          : undefined
      if (globalObj) {
        fixGlobalStyleSelectors(globalObj)
        globalCss = globalObj.getText()
      }
      stylesProp.remove()
    }

    // 2. textStyles / 3. layerStyles
    const grabStyle = (key: string): string | undefined => {
      const prop = obj!.getProperty(key)
      if (!prop || !Node.isPropertyAssignment(prop)) return undefined
      const styleObj = asObject(prop.getInitializer())
      if (styleObj) transformStyleObject(styleObj)
      const text = prop.getInitializer()?.getText()
      prop.remove()
      return text
    }
    const textStyles = grabStyle("textStyles")
    const layerStyles = grabStyle("layerStyles")

    // 4. semanticTokens
    let semanticTokens: string | undefined
    const semProp = obj.getProperty("semanticTokens")
    if (semProp && Node.isPropertyAssignment(semProp)) {
      const semObj = asObject(semProp.getInitializer())
      if (semObj) transformSemanticTokens(semObj)
      semanticTokens = semProp.getInitializer()?.getText()
      semProp.remove()
    }

    // 5. config
    obj.getProperty("config")?.remove()

    // 6. tokens vs custom
    const tokens: string[] = []
    const custom: string[] = []

    // Wrap token leaves across the whole object (only token keys are wrapped;
    // non-standard keys are treated as custom and left alone below).
    for (const prop of [...obj.getProperties()]) {
      const name = Node.isPropertyAssignment(prop)
        ? prop.getName()
        : Node.isShorthandPropertyAssignment(prop)
          ? prop.getName()
          : undefined
      if (!name) continue
      if (STANDARD_TOKEN_KEYS.includes(name)) {
        const initObj = asObject(initOf(prop))
        if (initObj) {
          wrapTokenCategory(initObj, sourceFile, ctx)
        } else if (
          Node.isPropertyAssignment(prop) &&
          Node.isIdentifier(prop.getInitializer()!)
        ) {
          resolveAndWrapCrossFile(
            prop.getInitializer()!.getText(),
            sourceFile,
            ctx,
          )
        } else if (Node.isShorthandPropertyAssignment(prop)) {
          resolveAndWrapCrossFile(name, sourceFile, ctx)
        }
        tokens.push(prop.getText())
      } else {
        custom.push(prop.getText())
      }
    }

    const inner = buildInnerConfig({
      globalCss,
      tokens,
      semanticTokens,
      textStyles,
      layerStyles,
      custom,
    })

    call.replaceWithText(`createSystem(defaultConfig, ${inner})`)
  }

  // Update imports: extendTheme -> createSystem + defaultConfig
  if (hasExtendTheme && chakraImport) {
    chakraImport
      .getNamedImports()
      .find((n) => n.getName() === "extendTheme")
      ?.remove()
    chakraImport.setModuleSpecifier("@chakra-ui/react")
    const names = chakraImport.getNamedImports().map((n) => n.getName())
    if (!names.includes("createSystem"))
      chakraImport.addNamedImport("createSystem")
    if (!names.includes("defaultConfig"))
      chakraImport.addNamedImport("defaultConfig")
  }

  // Rename the theme variable (const theme = createSystem(...)) to `system`.
  for (const decl of sourceFile.getVariableDeclarations()) {
    const init = decl.getInitializer()
    if (
      decl.getName() === "theme" &&
      init &&
      Node.isCallExpression(init) &&
      Node.isIdentifier(init.getExpression()) &&
      init.getExpression().getText() === "createSystem"
    ) {
      const nameNode = decl.getNameNode()
      if (Node.isIdentifier(nameNode)) nameNode.rename("system")
    }
  }

  // Transform token access: system.colors.gray[200] -> system.token('colors.gray.200')
  transformTokenAccess(sourceFile)
}

function transformTokenAccess(sourceFile: SourceFile) {
  const hasSystem = sourceFile
    .getVariableDeclarations()
    .some((d) => d.getName() === "system")
  if (!hasSystem) return

  // Collect the longest access chains rooted at `system`.
  const accesses = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.ElementAccessExpression),
  ]

  for (const node of accesses) {
    // Only handle the outermost expression of a chain.
    const parent = node.getParent()
    if (
      parent &&
      (Node.isPropertyAccessExpression(parent) ||
        Node.isElementAccessExpression(parent))
    ) {
      continue
    }
    const parts = buildAccessPath(node)
    if (!parts) continue
    if (parts.root !== "system") continue
    if (parts.path.length < 2) continue
    node.replaceWithText(`system.token('${parts.path.join(".")}')`)
  }
}

function buildAccessPath(
  node: Node,
): { root: string; path: string[] } | undefined {
  const path: string[] = []
  let current: Node = node
  while (true) {
    if (Node.isPropertyAccessExpression(current)) {
      path.unshift(current.getName())
      current = current.getExpression()
    } else if (Node.isElementAccessExpression(current)) {
      const arg = current.getArgumentExpression()
      if (!arg || !(Node.isStringLiteral(arg) || Node.isNumericLiteral(arg)))
        return undefined
      path.unshift(String(arg.getLiteralValue()))
      current = current.getExpression()
    } else {
      break
    }
  }
  if (!Node.isIdentifier(current)) return undefined
  return { root: current.getText(), path }
}

export default transform
