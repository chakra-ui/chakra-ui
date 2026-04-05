import * as p from "@clack/prompts"
import { Command } from "commander"
import createDebug from "debug"
import { fetchTheme } from "../utils/fetch"
import { formatCliError } from "../utils/format-error"

const debug = createDebug("chakra:theme")

function countThemeValues(values: unknown): number {
  if (Array.isArray(values)) return values.length
  if (values && typeof values === "object") {
    return Object.keys(values as object).length
  }
  return 0
}

export const ThemeCommand = new Command("theme")
  .description("Show the Chakra UI theme specification")
  .option(
    "--filter <category>",
    "Print JSON for one category (tokens, semanticTokens, textStyles, layerStyles, animationStyles, keyframes, breakpoints, …)",
  )
  .option(
    "--json",
    "Print full theme data as JSON (default is a summary table)",
  )
  .action(async (flags: { filter?: string; json?: boolean }) => {
    debug("fetching theme", flags)

    try {
      const items = await fetchTheme()
      const keys = items.map((item) => item.key)

      if (flags.filter) {
        const entry = items.find((item) => item.key === flags.filter)
        if (!entry) {
          p.log.error(
            `Unknown category "${flags.filter}". Available: ${keys.join(", ")}`,
          )
          process.exit(1)
        }
        p.log.info(`Theme: ${entry.key}`)
        p.log.info(JSON.stringify(entry.values, null, 2))
      } else if (flags.json) {
        p.log.info(JSON.stringify(items, null, 2))
      } else {
        const { default: Table } = await import("cli-table")

        const table = new Table({
          head: ["category", "items"],
          colWidths: [28, 10],
          style: { compact: true },
        })

        for (const item of items) {
          table.push([item.key, String(countThemeValues(item.values))])
        }

        p.log.info(
          `Theme categories (${items.length}). Use --filter <category> for one section, or --json for full data.`,
        )
        p.log.info(table.toString())
      }

      p.outro("🎉 Done!")
    } catch (error) {
      p.log.error(formatCliError(error))
      process.exit(1)
    }
  })
