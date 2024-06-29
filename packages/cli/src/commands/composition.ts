import * as p from "@clack/prompts"
import { boxen } from "@visulima/boxen"
import { Command } from "commander"
import { existsSync } from "fs"
import { writeFile } from "fs/promises"
import { join } from "node:path/posix"
import { z } from "zod"
import { convertTsxToJsx } from "../utils/convert-tsx-to-jsx"
import { fetchComposition, fetchCompositions } from "../utils/fetch"
import { getFileDependencies } from "../utils/get-file-dependencies"
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
        join(process.cwd(), "components", "ui"),
      )
      .option("--all", "Add all compositions")
      .option("--jsx", "Emit JSX files instead of TSX")
      .action(async (components: string[], flags: unknown) => {
        const { dryRun, outdir, jsx, all } = S.addCommandFlags.parse(flags)

        const items = await fetchCompositions()

        if (components.length === 0 && !all) {
          p.log.info("No components provided, Adding all components...")

          const selected = await p.multiselect({
            message:
              "Select compositions to add. Press <space> to select. Press <enter> to submit.",
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

        if (all) {
          components = items.map((item) => item.id)
        }

        if (components.length === 0) {
          p.log.info("No compositions selected. Exiting...")
          process.exit(0)
        }

        p.log.info(`Adding ${components.length} composition(s)...`)

        const formatFileName = (name: string) =>
          jsx ? name.replace(".tsx", ".jsx") : name

        await Promise.all(
          components.map(async (id) => {
            if (existsSync(join(outdir, id))) return

            const item = await fetchComposition(id)
            const dependencies = getFileDependencies(items, id)

            if (jsx) {
              const content = await convertTsxToJsx(item.file.content)
              item.file.content = content
              item.file.name = formatFileName(item.file.name)
            }

            const outPath = join(outdir, item.file.name)

            if (dryRun) {
              const boxText = boxen(item.file.content, {
                headerText: `${item.file.name}\n`,
                borderStyle: "none",
              })

              p.log.info(boxText)

              if (dependencies.length) {
                p.log.info(`Writing dependencies: ${dependencies.join(", ")}`)
              }
            } else {
              // if dependencies are not found, write them to the outdir as well
              await Promise.all(
                dependencies.map(async (dep) => {
                  if (existsSync(join(outdir, dep))) return

                  const depItem = await fetchComposition(dep)
                  depItem.file.name = formatFileName(depItem.file.name)

                  if (jsx) {
                    const content = await convertTsxToJsx(depItem.file.content)
                    depItem.file.content = content
                  }

                  const depOutPath = join(outdir, depItem.file.name)
                  return writeFile(depOutPath, depItem.file.content, "utf-8")
                }),
              )

              return writeFile(outPath, item.file.content, "utf-8")
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
