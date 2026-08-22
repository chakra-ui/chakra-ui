import type { API, FileInfo, Options } from "jscodeshift"

/**
 * Codemod to handle styleConfig and multiStyleConfig removal
 *
 * These have been replaced with recipes and slot recipes.
 * This codemod adds migration comments since the transformation
 * requires understanding the component's styling logic.
 */

export default function transformer(
  file: FileInfo,
  api: API,
  _options: Options,
) {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasChanges = false

  const foundStyleConfigs: string[] = []

  // Find defineStyleConfig usage
  root
    .find(j.CallExpression, {
      callee: { name: "defineStyleConfig" },
    })
    .forEach((path) => {
      foundStyleConfigs.push("defineStyleConfig")

      // Add a comment explaining the migration
      const comment = j.commentBlock(
        `\n` +
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
          ` See: https://chakra-ui.com/docs/theming/recipes\n`,
        true,
        false,
      )

      const statement = path.parentPath.parentPath
      if (statement && statement.value) {
        statement.value.comments = statement.value.comments || []
        statement.value.comments.unshift(comment)
        hasChanges = true
      }
    })

  // Find defineMultiStyleConfig usage
  root
    .find(j.CallExpression, {
      callee: { name: "defineMultiStyleConfig" },
    })
    .forEach((path) => {
      foundStyleConfigs.push("defineMultiStyleConfig")

      const comment = j.commentBlock(
        `\n` +
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
          ` See: https://chakra-ui.com/docs/theming/slot-recipes\n`,
        true,
        false,
      )

      const statement = path.parentPath.parentPath
      if (statement && statement.value) {
        statement.value.comments = statement.value.comments || []
        statement.value.comments.unshift(comment)
        hasChanges = true
      }
    })

  // Find createMultiStyleConfigHelpers usage
  root
    .find(j.CallExpression, {
      callee: { name: "createMultiStyleConfigHelpers" },
    })
    .forEach((path) => {
      foundStyleConfigs.push("createMultiStyleConfigHelpers")

      const comment = j.commentBlock(
        `\n` +
          ` MIGRATION: createMultiStyleConfigHelpers has been removed.\n` +
          ` Use defineSlotRecipe directly without helpers.\n` +
          ` See: https://chakra-ui.com/docs/theming/slot-recipes\n`,
        true,
        false,
      )

      const statement = path.parentPath.parentPath
      if (statement && statement.value) {
        statement.value.comments = statement.value.comments || []
        statement.value.comments.unshift(comment)
        hasChanges = true
      }
    })

  // Remove imports of style config functions
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const removedFunctions = [
        "defineStyleConfig",
        "defineMultiStyleConfig",
        "createMultiStyleConfigHelpers",
        "createStyleConfigHelpers",
      ]

      const originalLength = path.node.specifiers?.length || 0
      const specifiers = path.node.specifiers?.filter((spec) => {
        if (spec.type === "ImportSpecifier") {
          return !removedFunctions.includes(spec.imported.name as string)
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

  // Find theme.components usage patterns
  root
    .find(j.MemberExpression, {
      object: { property: { name: "components" } },
    })
    .forEach((path) => {
      // Check if this is inside extendTheme or similar
      const parent = path.parent
      if (parent && parent.value.type === "Property") {
        const comment = j.commentLine(
          " Component styles should now use recipes. See migration guide.",
        )

        if (parent.value.comments) {
          parent.value.comments.push(comment)
        } else {
          parent.value.comments = [comment]
        }
        hasChanges = true
      }
    })

  // Add summary comment if any style configs were found
  if (foundStyleConfigs.length > 0 && hasChanges) {
    const uniqueConfigs = [...new Set(foundStyleConfigs)]
    const summary = j.commentBlock(
      `\n` +
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
        ` ============================================================\n`,
      true,
      false,
    )

    const firstStatement = root.find(j.Program).get("body", 0)
    if (firstStatement) {
      firstStatement.node.comments = firstStatement.node.comments || []
      firstStatement.node.comments.unshift(summary)
    }
  }

  return hasChanges ? root.toSource() : file.source
}
