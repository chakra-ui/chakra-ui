import * as p from "@clack/prompts"
import { boxen } from "@visulima/boxen"
import { Command } from "commander"
import { writeFile } from "fs/promises"
import { join } from "node:path/posix"
import { z } from "zod"
import { convertTsxToJsx } from "../utils/convert-tsx-to-jsx"
import { fetchComposition, fetchCompositions } from "../utils/fetch"
import * as S from "../utils/schema"

export const CompositionCommand = new Command("composition")
  .description("Add compositions to your project for better DX")

  .addCommand(
    new Command("add")
      .description("Add a new composition for better DX")
      .argument("[components...]", "components to add")
      .option("-d, --dry-run", "Dry run")
      .option(
        "--outdir <dir>",
        "Output directory to write the composition",
        process.cwd(),
      )
      .option("--jsx", "Emit JSX files instead of TSX")
      .action(async (components: string[], flags: unknown) => {
        const { dryRun, outdir, jsx } = S.addCommandFlags.parse(flags)

        if (components.length === 0) {
          p.log.info("No components provided, Adding all components...")

          const items = await fetchCompositions()

          const selected = await p.multiselect({
            message: "Select compositions to add",
            options: [
              { label: "All Compositions", value: "all" },
              ...items.map((item) => ({
                label: item.component,
                value: item.id,
              })),
            ],
          })

          components = z
            .array(z.string())
            .transform((s) =>
              s.includes("all") ? items.map((item) => item.id) : s,
            )
            .parse(selected)
        }

        p.log.info(`Adding ${components.length} composition(s)...`)

        await Promise.all(
          components.map(async (id) => {
            const item = await fetchComposition(id)

            if (jsx) {
              const content = await convertTsxToJsx(item.file.content)
              item.file.content = content
              item.file.name = item.file.name.replace(".tsx", ".jsx")
            }

            const outPath = join(outdir, item.file.name)

            if (dryRun) {
              const boxText = boxen(item.file.content, {
                headerText: `${item.file.name}\n`,
                borderStyle: "none",
              })

              p.log.info(boxText)
            } else {
              writeFile(outPath, item.file.content, "utf-8")
            }
          }),
        )

        p.outro("🎉 Done!")
      }),
  )

  .addCommand(
    new Command("list")
      .description("List all compositions")
      .action(async () => {
        const { default: Table } = await import("cli-table")

        const table = new Table({
          head: ["name", "dependencies"],
          colWidths: [20, 30],
          style: { compact: true },
        })

        const items = await fetchCompositions()

        if (!Array.isArray(items)) {
          throw new Error("[chakra] invalid json response")
        }

        items.forEach((item) => {
          const deps = item.npmDependencies
          const depsString = deps.length ? deps.join(", ") : "-"
          table.push([item.id, depsString])
        })

        p.log.info(`Found ${items.length} compositions`)

        p.log.info(table.toString())

        p.outro("🎉 Done!")
      }),
  )
