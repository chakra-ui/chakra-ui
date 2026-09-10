import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"

/**
 * Codemod to handle styleConfig and multiStyleConfig removal
 *
 * These have been replaced with recipes and slot recipes.
 * This codemod adds migration comments since the transformation
 * requires understanding the component's styling logic.
 */

const REMOVED_FUNCTIONS = [
  "defineStyleConfig",
  "defineMultiStyleConfig",
  "createMultiStyleConfigHelpers",
  "createStyleConfigHelpers",
]

const CALL_COMMENTS: Record<string, string> = {
  defineStyleConfig:
    `/*\n` +
    ` MIGRATION: defineStyleConfig has been removed.\n` +
    ` Replace with recipes using defineRecipe from @chakra-ui/react.\n` +
    `\n` +
    ` Example:\n` +
    ` import { defineRecipe } from "@chakra-ui/react"\n` +
    `\n` +
    ` export const buttonRecipe = defineRecipe({\n` +
    `   base: { /* base styles */ },\n` +
    `   variants: { /* variants */ },\n` +
    `   defaultVariants: { /* defaults */ }\n` +
    ` })\n` +
    `\n` +
    ` See: https://chakra-ui.com/docs/theming/recipes\n` +
    `*/`,
  defineMultiStyleConfig:
    `/*\n` +
    ` MIGRATION: defineMultiStyleConfig has been removed.\n` +
    ` Replace with slot recipes using defineSlotRecipe from @chakra-ui/react.\n` +
    `\n` +
    ` Example:\n` +
    ` import { defineSlotRecipe } from "@chakra-ui/react"\n` +
    `\n` +
    ` export const cardSlotRecipe = defineSlotRecipe({\n` +
    `   slots: ['root', 'header', 'body', 'footer'],\n` +
    `   base: {\n` +
    `     root: { /* styles */ },\n` +
    `     header: { /* styles */ }\n` +
    `   },\n` +
    `   variants: { /* variants */ }\n` +
    ` })\n` +
    `\n` +
    ` See: https://chakra-ui.com/docs/theming/slot-recipes\n` +
    `*/`,
  createMultiStyleConfigHelpers:
    `/*\n` +
    ` MIGRATION: createMultiStyleConfigHelpers has been removed.\n` +
    ` Use defineSlotRecipe directly without helpers.\n` +
    ` See: https://chakra-ui.com/docs/theming/slot-recipes\n` +
    `*/`,
}

const transform: Transform = (sourceFile) => {
  let hasChanges = false
  const foundStyleConfigs: string[] = []
  const insertions: Array<{ pos: number; text: string }> = []

  // Remove imports of style config functions first, so the comment positions
  // collected below reflect the mutated source (insertText uses raw offsets).
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/react") continue
    let removed = false
    for (const named of importDecl.getNamedImports()) {
      if (REMOVED_FUNCTIONS.includes(named.getName())) {
        named.remove()
        removed = true
      }
    }
    if (removed) {
      hasChanges = true
      if (
        importDecl.getNamedImports().length === 0 &&
        !importDecl.getDefaultImport() &&
        !importDecl.getNamespaceImport()
      ) {
        importDecl.remove()
      }
    }
  }

  // Collect migration comments for the removed style-config call expressions.
  for (const call of sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  )) {
    const callee = call.getExpression()
    if (!Node.isIdentifier(callee)) continue
    const name = callee.getText()
    if (!CALL_COMMENTS[name]) continue

    foundStyleConfigs.push(name)
    const statement = call.getFirstAncestor((a) => Node.isStatement(a))
    if (statement) {
      insertions.push({
        pos: statement.getStart(),
        text: `${CALL_COMMENTS[name]}\n`,
      })
      hasChanges = true
    }
  }

  // Flag `theme.components` usage patterns.
  for (const access of sourceFile.getDescendantsOfKind(
    SyntaxKind.PropertyAccessExpression,
  )) {
    const obj = access.getExpression()
    if (
      !Node.isPropertyAccessExpression(obj) ||
      obj.getName() !== "components"
    ) {
      continue
    }
    const parent = access.getParent()
    if (parent && Node.isPropertyAssignment(parent)) {
      insertions.push({
        pos: parent.getStart(),
        text: "// Component styles should now use recipes. See migration guide.\n",
      })
      hasChanges = true
    }
  }

  // Add summary comment if any style configs were found.
  if (foundStyleConfigs.length > 0 && hasChanges) {
    const uniqueConfigs = [...new Set(foundStyleConfigs)]
    const summary =
      `/*\n` +
      ` ============================================================\n` +
      ` CHAKRA UI v3 MIGRATION - STYLE CONFIG CHANGES\n` +
      ` ============================================================\n` +
      `\n` +
      ` The following style config patterns were found and need migration:\n` +
      ` ${uniqueConfigs.map((c) => `- ${c}`).join("\n ")}\n` +
      `\n` +
      ` These have been replaced with:\n` +
      ` - defineRecipe (for single-part components)\n` +
      ` - defineSlotRecipe (for multi-part components)\n` +
      `\n` +
      ` Key differences:\n` +
      ` 1. Recipes use a different structure (base, variants, defaultVariants)\n` +
      ` 2. No more "parts" - use "slots" in slot recipes\n` +
      ` 3. Variants are defined directly, not in a separate object\n` +
      ` 4. Default variants use "defaultVariants" key\n` +
      `\n` +
      ` Documentation:\n` +
      ` - Recipes: https://chakra-ui.com/docs/theming/recipes\n` +
      ` - Slot Recipes: https://chakra-ui.com/docs/theming/slot-recipes\n` +
      ` - Migration Guide: https://chakra-ui.com/docs/get-started/migration\n` +
      `\n` +
      ` ============================================================\n` +
      `*/`

    const firstStatement = sourceFile.getStatements()[0]
    if (firstStatement) {
      insertions.push({ pos: firstStatement.getStart(), text: `${summary}\n` })
    }
  }

  // Apply comment insertions from last to first so positions stay valid.
  insertions.sort((a, b) => b.pos - a.pos)
  for (const ins of insertions) {
    sourceFile.insertText(ins.pos, ins.text)
  }
}

export default transform
