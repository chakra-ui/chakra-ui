import * as p from "@clack/prompts"
import { Command } from "commander"
import createDebug from "debug"
import { searchDocs } from "../utils/fetch"
import { formatCliError } from "../utils/format-error"

const debug = createDebug("chakra:docs")

export const DocsCommand = new Command("docs")
  .description("Search the Chakra UI documentation")
  .argument("<query>", "Search query")
  .action(async (query: string) => {
    debug("searching docs for", query)

    try {
      const results = await searchDocs(query)

      if (results.length === 0) {
        p.log.warn(
          `No results found for "${query}". Try component names like "button", "modal", or topics like "styling", "theming".`,
        )
        p.outro("Done!")
        return
      }

      const { default: Table } = await import("cli-table")

      const table = new Table({
        head: ["name", "category", "url"],
        colWidths: [25, 15, 50],
        style: { compact: true },
      })

      const truncate = (s: string, max: number) =>
        s.length <= max ? s : `${s.slice(0, max - 1)}…`

      for (const item of results) {
        table.push([item.label, item.category, truncate(item.url, 52)])
      }

      p.log.info(`Found ${results.length} result(s) for "${query}"`)
      p.log.info(table.toString())

      p.outro("🎉 Done!")
    } catch (error) {
      p.log.error(formatCliError(error))
      process.exit(1)
    }
  })
