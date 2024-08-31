import * as p from "@clack/prompts"
import { boxen } from "@visulima/boxen"
import { Command } from "commander"
import createDebug from "debug"
import { existsSync } from "fs"
import { writeFile } from "fs/promises"
import { join } from "node:path/posix"
import { getProjectContext } from "../utils/context"
import { convertTsxToJsx } from "../utils/convert-tsx-to-jsx"
import { fetchComposition, fetchCompositions } from "../utils/fetch"
import { getFileDependencies } from "../utils/get-file-dependencies"
import { ensureDir } from "../utils/io"
import { installCommand } from "../utils/run-command"
import { type CompositionFile, addCommandFlagsSchema } from "../utils/schema"
import { uniq } from "../utils/shared"
import { tasks } from "../utils/tasks"

const debug = createDebug("chakra:snippet")

async function transformToJsx(item: CompositionFile) {
  const content = await convertTsxToJsx(item.file.content)
  item.file.content = content
  item.file.name = item.file.name.replace(".tsx", ".jsx")
}

function printFileSync(item: CompositionFile) {
  const boxText = boxen(item.file.content, {
    headerText: `${item.file.name}\n`,
    borderStyle: "none",
  })
  p.log.info(boxText)
}

export const SnippetCommand = new Command("snippet")
  .description("Add snippets to your project for better DX")
  .addCommand(
    new Command("add")
      .description("Add a new snippet for better DX")
      .argument("[snippets...]", "snippets to add")
      .option("-d, --dry-run", "Dry run")
      .option("--outdir <dir>", "Output directory to write the snippets")
      .option("-f, --force", "Overwrite existing files")
      .action(async (components: string[], flags: unknown) => {
        const parsedFlags = addCommandFlagsSchema.parse(flags)
        const { dryRun, force } = parsedFlags

        const ctx = await getProjectContext({ cwd: process.cwd() })
        debug("context", ctx)

        const jsx = !ctx.isTypeScript

        ensureDir(ctx.scope.componentsDir)
        const outdir = parsedFlags.outdir || ctx.scope.componentsDir

        const items = await fetchCompositions()

        const all = components.length === 0

        if (all) {
          p.log.info("No components selected, Adding all...")
          components = items.map((item) => item.id)
        }

        debug("components", components)

        p.log.info(`Adding ${components.length} snippet(s)...`)

        const deps = uniq(
          components.flatMap((id) => getFileDependencies(items, id)),
        )

        const fileDependencies = uniq(
          deps.map((dep) => dep.fileDependencies).flat(),
        )
        const npmDependencies = uniq(
          deps.map((dep) => dep.npmDependencies).flat(),
        )

        debug("fileDependencies", fileDependencies)
        debug("npmDependencies", npmDependencies)

        let skippedFiles: string[] = []

        await tasks([
          {
            title: `Installing required dependencies...`,
            enabled: !!npmDependencies.length && !dryRun,
            task: () =>
              installCommand([...npmDependencies, "--silent"], outdir),
          },
          {
            title: "Writing file dependencies",
            enabled: !!fileDependencies.length && !dryRun,
            task: async () => {
              await Promise.all(
                fileDependencies.map(async (dep) => {
                  if (existsSync(join(outdir, dep)) && !force) {
                    skippedFiles.push(dep)
                    return
                  }
                  const item = await fetchComposition(dep)

                  if (jsx) {
                    item.file.name = item.file.name.replace(".tsx", ".jsx")
                    await transformToJsx(item)
                  }

                  const outPath = join(outdir, item.file.name)

                  await writeFile(
                    outPath,
                    item.file.content.replace("compositions/ui", "."),
                    "utf-8",
                  )
                }),
              )
            },
          },
          {
            title: "Writing selected snippets",
            task: async () => {
              await Promise.all(
                components.map(async (id) => {
                  if (existsSync(join(outdir, id)) && !force) {
                    skippedFiles.push(id)
                    return
                  }

                  const item = await fetchComposition(id)

                  if (jsx) {
                    item.file.name = item.file.name.replace(".tsx", ".jsx")
                    await transformToJsx(item)
                  }

                  const outPath = join(outdir, item.file.name)

                  if (dryRun) {
                    printFileSync(item)
                  } else {
                    await writeFile(
                      outPath,
                      item.file.content.replace("compositions/ui", "."),
                      "utf-8",
                    )
                  }
                }),
              )
            },
          },
        ])

        if (skippedFiles.length) {
          p.log.warn(
            `Skipping ${skippedFiles.length} file(s) that already exist. Use the --force flag to overwrite.`,
          )
        }

        p.outro("🎉 Done!")
      }),
  )

  .addCommand(
    new Command("list")
      .description("List available snippets")
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

        p.log.info(`Found ${items.length} snippets`)

        p.log.info(table.toString())

        p.outro("🎉 Done!")
      }),
  )
