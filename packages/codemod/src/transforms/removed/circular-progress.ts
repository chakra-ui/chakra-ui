import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  // Rename `CircularProgress` -> `ProgressCircle` in @chakra-ui/react imports.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/react") continue
    const spec = importDecl
      .getNamedImports()
      .find((n) => n.getName() === "CircularProgress")
    if (spec) spec.setName("ProgressCircle")
  }

  // Transform <CircularProgress ... /> into the ProgressCircle composition.
  const elements = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .filter(
      (el) =>
        el.getOpeningElement().getTagNameNode().getText() ===
        "CircularProgress",
    )
    .reverse()

  for (const el of elements) {
    if (el.wasForgotten()) continue
    if (!chakraLocalNames.has("CircularProgress")) continue

    const opening = el.getOpeningElement()

    let valueInit: string | undefined
    let thicknessInit: string | undefined
    let colorInit: string | undefined
    let isIndeterminate = false
    const otherProps: string[] = []

    for (const attr of opening.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) {
        otherProps.push(attr.getText())
        continue
      }

      const name = attr.getNameNode().getText()
      const init = attr.getInitializer()

      if (name === "value") {
        valueInit = init?.getText()
      } else if (name === "thickness") {
        thicknessInit = init?.getText()
      } else if (name === "color") {
        colorInit = init?.getText()
      } else if (name === "isIndeterminate") {
        if (init && Node.isJsxExpression(init)) {
          const expr = init.getExpression()
          if (expr && expr.getKind() === SyntaxKind.FalseKeyword) {
            isIndeterminate = false
          } else {
            isIndeterminate = true
          }
        } else {
          isIndeterminate = true
        }
      } else {
        otherProps.push(attr.getText())
      }
    }

    // Root props: value first, then the untouched other props.
    const valueText = isIndeterminate
      ? "value={null}"
      : valueInit
        ? `value=${valueInit}`
        : "value={0}"
    const rootPropsText = [valueText, ...otherProps].join(" ")

    // Circle props: optional css custom property for thickness.
    let circlePropsText = ""
    if (thicknessInit) {
      const thicknessValue =
        thicknessInit.startsWith("{") && thicknessInit.endsWith("}")
          ? thicknessInit.slice(1, -1).trim()
          : thicknessInit
      circlePropsText = ` css={{ "--thickness": ${thicknessValue} }}`
    }

    // Range props: optional stroke from color.
    const rangePropsText = colorInit ? ` stroke=${colorInit}` : ""

    const newText =
      `<ProgressCircle.Root ${rootPropsText}>\n` +
      `  <ProgressCircle.Circle${circlePropsText}>\n` +
      `    <ProgressCircle.Track />\n` +
      `    <ProgressCircle.Range${rangePropsText} />\n` +
      `  </ProgressCircle.Circle>\n` +
      `</ProgressCircle.Root>`

    el.replaceWithText(newText)
  }
}

export default transform
