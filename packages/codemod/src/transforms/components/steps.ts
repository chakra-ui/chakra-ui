import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxElement,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const OLD_STEPS_COMPONENTS = [
  "Stepper",
  "Step",
  "StepDescription",
  "StepIcon",
  "StepIndicator",
  "StepNumber",
  "StepSeparator",
  "StepStatus",
  "StepTitle",
]

function renameTag(el: JsxElement | JsxSelfClosingElement, to: string) {
  if (Node.isJsxElement(el)) {
    el.getClosingElement()?.getTagNameNode().replaceWithText(to)
    el.getOpeningElement().getTagNameNode().replaceWithText(to)
  } else {
    el.getTagNameNode().replaceWithText(to)
  }
}

function isMemberTag(
  opening: JsxOpeningElement | JsxSelfClosingElement,
  object: string,
  property: string,
): boolean {
  const tag = opening.getTagNameNode()
  if (!Node.isPropertyAccessExpression(tag)) return false
  const obj = tag.getExpression()
  return (
    Node.isIdentifier(obj) &&
    obj.getText() === object &&
    tag.getName() === property
  )
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const stepsNames = new Set([...OLD_STEPS_COMPONENTS, "Steps", "useSteps"])
  const chakraImports = sourceFile
    .getImportDeclarations()
    .filter((d) => d.getModuleSpecifierValue() === "@chakra-ui/react")

  const usesSteps = chakraImports.some((d) =>
    d.getNamedImports().some((n) => stepsNames.has(n.getName())),
  )
  if (!usesSteps) return

  // Detect useSteps hook usage and normalize destructured assignment.
  let usesStepsHook = false
  let stepsVariableName = "stepsApi"
  for (const decl of sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration,
  )) {
    const init = decl.getInitializer()
    if (
      !init ||
      !Node.isCallExpression(init) ||
      !Node.isIdentifier(init.getExpression()) ||
      init.getExpression().getText() !== "useSteps"
    ) {
      continue
    }
    usesStepsHook = true
    const nameNode = decl.getNameNode()
    if (Node.isObjectBindingPattern(nameNode)) {
      let variableName = "stepsApi"
      let counter = 1
      while (sourceFile.getVariableDeclaration(variableName)) {
        variableName = `stepsApi${counter++}`
      }
      stepsVariableName = variableName
      nameNode.replaceWithText(variableName)
    } else if (Node.isIdentifier(nameNode)) {
      stepsVariableName = nameNode.getText()
    }
  }

  // Imports: remove old step components, add Steps once, handle StepIcon.
  const hadStepIcon = chakraImports.some((d) =>
    d.getNamedImports().some((n) => n.getName() === "StepIcon"),
  )
  let stepsAddedToFile = chakraImports.some((d) =>
    d.getNamedImports().some((n) => n.getName() === "Steps"),
  )

  for (const importDecl of chakraImports) {
    const named = importDecl.getNamedImports()
    for (let i = named.length - 1; i >= 0; i--) {
      if (OLD_STEPS_COMPONENTS.includes(named[i].getName())) named[i].remove()
    }
    const hasSteps = importDecl
      .getNamedImports()
      .some((n) => n.getName() === "Steps")
    if (!stepsAddedToFile && !hasSteps) {
      importDecl.insertNamedImport(0, "Steps")
      stepsAddedToFile = true
    }
  }

  // Remove empty chakra imports.
  for (const importDecl of chakraImports) {
    if (importDecl.wasForgotten()) continue
    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove()
    }
  }

  // Add LuCheck import from react-icons/lu when StepIcon was used.
  if (hadStepIcon) {
    const reactIcons = sourceFile
      .getImportDeclarations()
      .find((d) => d.getModuleSpecifierValue() === "react-icons/lu")
    if (reactIcons) {
      if (
        !reactIcons.getNamedImports().some((n) => n.getName() === "LuCheck")
      ) {
        reactIcons.addNamedImport("LuCheck")
      }
    } else {
      const newImport = sourceFile.insertImportDeclaration(1, {
        moduleSpecifier: "react-icons/lu",
        namedImports: ["LuCheck"],
      })
      // Keep a blank line between the chakra import group and this one.
      newImport.prependWhitespace("\n")
    }
  }

  // Stepper props: index -> step (or removed when using the hook).
  const openingsForProps: (JsxOpeningElement | JsxSelfClosingElement)[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
  for (const opening of openingsForProps) {
    if (getJsxBaseName(opening.getTagNameNode()) !== "Stepper") continue
    if (!chakraLocalNames.has("Stepper")) continue
    const attrs = opening.getAttributes()
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i]
      if (!Node.isJsxAttribute(attr)) continue
      if (attr.getNameNode().getText() !== "index") continue
      if (usesStepsHook) attr.remove()
      else attr.getNameNode().replaceWithText("step")
    }
  }

  // useSteps({ index }) -> useSteps({ defaultStep })
  for (const call of sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  )) {
    const expr = call.getExpression()
    if (!Node.isIdentifier(expr) || expr.getText() !== "useSteps") continue
    const arg = call.getArguments()[0]
    if (!arg || !Node.isObjectLiteralExpression(arg)) continue
    const prop = arg.getProperty("index")
    if (prop && Node.isPropertyAssignment(prop)) {
      prop.getNameNode().replaceWithText("defaultStep")
    }
  }

  // Wrap Stepper children in Steps.List (only when not using the hook).
  if (!usesStepsHook) {
    const steppers = sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxElement)
      .filter(
        (el) =>
          getJsxBaseName(el.getOpeningElement().getTagNameNode()) ===
            "Stepper" && chakraLocalNames.has("Stepper"),
      )
    const withStart = steppers
      .map((el) => ({ el, start: el.getStart() }))
      .sort((a, b) => b.start - a.start)
    for (const { el } of withStart) {
      if (el.wasForgotten()) continue
      const open = el.getOpeningElement()
      const close = el.getClosingElement()
      if (!close) continue
      const inner = sourceFile
        .getFullText()
        .slice(open.getEnd(), close.getStart())
      el.replaceWithText(
        `${open.getText()}<Steps.List>${inner}</Steps.List>${close.getText()}`,
      )
    }
  }

  // Transform component names.
  const componentMap: Record<string, string> = {
    Stepper: usesStepsHook ? "Steps.RootProvider" : "Steps.Root",
    Step: "Steps.Item",
    StepIndicator: "Steps.Indicator",
    StepStatus: "Steps.Status",
    StepTitle: "Steps.Title",
    StepDescription: "Steps.Description",
    StepSeparator: "Steps.Separator",
    StepNumber: "Steps.Number",
    StepIcon: "LuCheck",
  }

  const elements: (JsxElement | JsxSelfClosingElement)[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
  const withStart = elements
    .map((e) => ({ e, start: e.getStart() }))
    .sort((a, b) => b.start - a.start)
  for (const { e } of withStart) {
    if (e.wasForgotten()) continue
    const opening = Node.isJsxElement(e) ? e.getOpeningElement() : e
    const tag = opening.getTagNameNode()
    if (!Node.isIdentifier(tag)) continue
    const name = tag.getText()
    if (!chakraLocalNames.has(name)) continue
    const to = componentMap[name]
    if (to) renameTag(e, to)
  }

  // StepStatus props: active -> current (now Steps.Status).
  for (const opening of [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]) {
    if (!isMemberTag(opening, "Steps", "Status")) continue
    for (const attr of opening.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) continue
      if (attr.getNameNode().getText() === "active") {
        attr.getNameNode().replaceWithText("current")
      }
    }
  }

  // Add value={stepsApi} to Steps.RootProvider when using the hook.
  if (usesStepsHook) {
    for (const opening of [
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ]) {
      if (!isMemberTag(opening, "Steps", "RootProvider")) continue
      const hasValue = opening
        .getAttributes()
        .some(
          (a) =>
            Node.isJsxAttribute(a) && a.getNameNode().getText() === "value",
        )
      if (!hasValue) {
        opening.addAttribute({
          name: "value",
          initializer: `{${stepsVariableName}}`,
        })
      }
    }
  }
}

export default transform
