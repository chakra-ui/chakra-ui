import { Node, SyntaxKind } from "ts-morph"
import type { SourceFile } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const MARKER = "TODO(chakra-v3)"
const DOCS = "https://chakra-ui.com/docs/get-started/migration"

interface Flag {
  pos: number
  message: string
}

const INVALID_TARGETS = new Set(["Input", "Select", "Textarea"])

const transform: Transform = (sourceFile, ctx) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  const full = sourceFile.getFullText()
  const flags: Flag[] = []

  const flag = (node: Node, message: string) => {
    const lineStart = startOfLine(full, node.getStart())
    if (alreadyFlagged(full, lineStart)) return
    flags.push({ pos: lineStart, message })
    ctx.report({
      level: "warn",
      line: node.getStartLineNumber(),
      message,
      action: `Migrate manually. See ${DOCS}`,
    })
  }

  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (!importDecl.getModuleSpecifierValue().includes("@chakra-ui/react")) {
      continue
    }
    for (const named of importDecl.getNamedImports()) {
      const name = named.getName()
      if (name === "FocusLock") {
        flag(
          importDecl,
          "FocusLock was removed — install and use `react-focus-lock`.",
        )
      }
      if (name === "useToast" || name === "createStandaloneToast") {
        flag(
          importDecl,
          `${name} was removed — use a createToaster snippet (components/ui/toaster).`,
        )
      }
    }
  }

  const openings = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const opening of openings) {
    const baseName = getJsxBaseName(opening.getTagNameNode())

    if (baseName === "ChakraProvider" && chakraLocalNames.has(baseName)) {
      const hasTheme = hasAttr(opening, "theme")
      const hasResetCss =
        hasAttr(opening, "resetCSS") || hasAttr(opening, "resetCss")
      if (hasTheme || hasResetCss) {
        flag(
          opening,
          "ChakraProvider: pass `value={system}` (createSystem) instead of `theme`, and set `preflight` on the system instead of `resetCSS`.",
        )
      }
    }

    if (INVALID_TARGETS.has(baseName) && chakraLocalNames.has(baseName)) {
      if (
        (hasAttr(opening, "invalid") || hasAttr(opening, "isInvalid")) &&
        !isInsideField(opening)
      ) {
        flag(
          opening,
          `${baseName} with an invalid state should be wrapped in <Field.Root invalid> with a <Field.Label>.`,
        )
      }
    }
  }

  applyFlags(sourceFile, full, flags)
}

function hasAttr(opening: Node, name: string): boolean {
  if (
    !Node.isJsxOpeningElement(opening) &&
    !Node.isJsxSelfClosingElement(opening)
  ) {
    return false
  }
  return opening
    .getAttributes()
    .some((a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === name)
}

function isInsideField(node: Node): boolean {
  let current = node.getParent()
  while (current) {
    if (Node.isJsxElement(current)) {
      const name = getJsxBaseName(current.getOpeningElement().getTagNameNode())
      if (name === "Field" || name.startsWith("Field")) return true
    }
    current = current.getParent()
  }
  return false
}

function startOfLine(text: string, pos: number): number {
  let start = pos
  while (start > 0 && text[start - 1] !== "\n") start--
  return start
}

function indentAt(text: string, lineStart: number): string {
  let i = lineStart
  let indent = ""
  while (text[i] === " " || text[i] === "\t") {
    indent += text[i]
    i++
  }
  return indent
}

function alreadyFlagged(text: string, lineStart: number): boolean {
  const prevLineEnd = lineStart - 1
  if (prevLineEnd <= 0) return false
  const prevLineStart = startOfLine(text, prevLineEnd)
  return text.slice(prevLineStart, lineStart).includes(MARKER)
}

function applyFlags(sourceFile: SourceFile, text: string, flags: Flag[]) {
  const seen = new Set<number>()
  const unique = flags.filter((f) => {
    if (seen.has(f.pos)) return false
    seen.add(f.pos)
    return true
  })
  unique.sort((a, b) => b.pos - a.pos)
  for (const f of unique) {
    const indent = indentAt(text, f.pos)
    sourceFile.insertText(f.pos, `${indent}// ${MARKER}: ${f.message}\n`)
  }
}

export default transform
