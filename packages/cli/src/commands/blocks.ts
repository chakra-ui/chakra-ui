import * as p from "@clack/prompts"
import { boxen } from "@visulima/boxen"
import { Command } from "commander"
import createDebug from "debug"
import { existsSync } from "fs"
import { writeFile } from "fs/promises"
import { join } from "node:path/posix"
import { z } from "zod"
import { getProjectContext } from "../utils/context"
import { convertTsxToJsx } from "../utils/convert-tsx-to-jsx"
import { fetchProBlock, fetchProBlocks } from "../utils/fetch"
import { ensureDir } from "../utils/io"
import { addCommandFlagsSchema } from "../utils/schema"
import { tasks } from "../utils/tasks"

interface ChakraProBlockVariant {
  id: string
  name: string
  categoryId: string
  accessLevel: "free" | "pro"
}

interface ChakraProBlock {
  id: string
  name: string
  group: string
  description: string
  figmaNodeId: string
  variants: ChakraProBlockVariant[]
}

const debug = createDebug("chakra:blocks")

function handleCancel(value: unknown): void {
  if (p.isCancel(value)) {
    p.cancel("Operation cancelled")
    process.exit(0)
  }
}

function ensureApiKey(): string {
  const apiKey = process.env.CHAKRA_UI_PRO_API_KEY
  if (!apiKey) {
    p.log.error("CHAKRA_UI_PRO_API_KEY environment variable is required")
    p.outro("Set your API key and try again")
    process.exit(1)
  }
  return apiKey
}

export const BlocksCommand = new Command("blocks")
  .description("Add Chakra UI Pro blocks to your project")
  .addCommand(
    new Command("add")
      .description("Add a new block from Chakra UI Pro")
      .argument("[blockId]", "block ID to add")
      .option("-v, --variant <variant>", "Specific variant to add")
      .option("-d, --dry-run", "Dry run")
      .option("--outdir <dir>", "Output directory to write the blocks")
      .option("-f, --force", "Overwrite existing files")
      .option("--tsx", "Convert to TSX")
      .action(async (blockId: string | undefined, flags: unknown) => {
        const parsedFlags = addCommandFlagsSchema
          .extend({
            variant: z.string().optional(),
          })
          .parse(flags)

        const { dryRun, force, tsx, variant } = parsedFlags

        const ctx = await getProjectContext({
          cwd: parsedFlags.outdir || process.cwd(),
          tsx,
        })

        debug("context", ctx)

        const jsx = !ctx.isTypeScript
        const baseOutdir = parsedFlags.outdir || "src/components/blocks"

        const apiKey = ensureApiKey()

        const blocksResponse = await fetchProBlocks()
        const allBlocks = blocksResponse.data.filter(
          (block: ChakraProBlock) =>
            block.group.toLowerCase() !== "documentation",
        )

        let blocksToDownload: string[] = []

        if (!blockId) {
          // Interactive selection - show all blocks
          const blockOptions = allBlocks.flatMap((block: ChakraProBlock) =>
            block.variants.map((v: ChakraProBlockVariant) => ({
              value: `${block.id}/${v.id}`,
              label: `${block.group}/${block.name} - ${v.name}`,
            })),
          )

          const selectedBlock = await p.select({
            message: "Select a block:",
            options: blockOptions,
          })

          handleCancel(selectedBlock)
          blocksToDownload = [selectedBlock as string]
        } else {
          // Find the block by ID
          const targetBlock = allBlocks.find(
            (block: ChakraProBlock) => block.id === blockId,
          )

          if (!targetBlock) {
            p.log.error(`Block "${blockId}" not found`)
            const availableBlocks = allBlocks
              .map((block: ChakraProBlock) => block.id)
              .join(", ")
            p.log.info(`Available blocks: ${availableBlocks}`)
            process.exit(1)
          }

          if (variant) {
            // Add specific variant
            const targetVariant = targetBlock.variants.find(
              (v: ChakraProBlockVariant) => v.id === variant,
            )

            if (!targetVariant) {
              p.log.error(
                `Variant "${variant}" not found for block "${blockId}"`,
              )
              const availableVariants = targetBlock.variants
                .map((v: ChakraProBlockVariant) => v.id)
                .join(", ")
              p.log.info(`Available variants: ${availableVariants}`)
              process.exit(1)
            }

            blocksToDownload = [`${blockId}/${variant}`]
          } else {
            // Add all variants of the block
            blocksToDownload = targetBlock.variants.map(
              (v: ChakraProBlockVariant) => `${blockId}/${v.id}`,
            )
          }
        }

        debug("blocksToDownload", blocksToDownload)

        p.log.info(`Adding ${blocksToDownload.length} block(s)...`)

        let skippedFiles: string[] = []

        await tasks([
          {
            title: "Downloading selected blocks",
            task: async () => {
              await Promise.all(
                blocksToDownload.map(async (blockId) => {
                  const [category, id] = blockId.split("/")

                  if (!category || !id) {
                    p.log.warn(
                      `Invalid block ID format: ${blockId}. Expected format: category/id`,
                    )
                    return
                  }

                  try {
                    const blockData = await fetchProBlock(category, id, apiKey)

                    const files = blockData.files
                    if (!files || files.length === 0) {
                      p.log.error(`No files found for block ${blockId}`)
                      return
                    }

                    // Create block-specific directory: [outdir or src/components/blocks]/[blockId]/[variantId]
                    const blockOutdir = join(baseOutdir, category, id)
                    ensureDir(blockOutdir)

                    for (const fileData of files) {
                      let filename = fileData.filename || `${id}.tsx`
                      let content = fileData.content

                      if (!content) {
                        p.log.warn(
                          `No content found for file ${filename} in block ${blockId}`,
                        )
                        continue
                      }

                      if (jsx) {
                        filename = filename.replace(".tsx", ".jsx")
                        content = await convertTsxToJsx(content)
                      }

                      if (existsSync(join(blockOutdir, filename)) && !force) {
                        skippedFiles.push(filename)
                        continue
                      }

                      if (dryRun) {
                        printBlockSync(content, filename)
                      } else {
                        const outPath = join(blockOutdir, filename)
                        await writeFile(outPath, content, "utf-8")
                      }
                    }
                  } catch (error) {
                    if (error instanceof Error) {
                      p.log.error(
                        `Failed to fetch block ${blockId}: ${error.message}`,
                      )
                    }
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

        if (blocksToDownload.length === 1) {
          const [category, id] = blocksToDownload[0].split("/")
          const blockOutdir = join(baseOutdir, category, id)
          p.outro(`🎉 Added block to ${blockOutdir}`)
        } else {
          p.outro(`🎉 Added ${blocksToDownload.length} blocks to ${baseOutdir}`)
        }
      }),
  )
  .addCommand(
    new Command("list")
      .description("List available Chakra UI Pro blocks")
      .option("-c, --category <category>", "Filter by category")
      .action(async (flags: { category?: string }) => {
        const { default: Table } = await import("cli-table")

        const table = new Table({
          head: ["Category", "Name"],
          colWidths: [20, 50],
          style: { compact: true },
        })

        try {
          const blocksResponse = await fetchProBlocks()
          const blocks = blocksResponse.data.filter(
            (block: ChakraProBlock) =>
              block.group.toLowerCase() !== "documentation",
          )

          const filteredBlocks = flags.category
            ? blocks.filter(
                (block: ChakraProBlock) =>
                  block.group.toLowerCase() === flags.category?.toLowerCase() ||
                  block.id === flags.category,
              )
            : blocks

          if (filteredBlocks.length === 0) {
            if (flags.category) {
              p.log.warn(`No blocks found for category: ${flags.category}`)
              const categories = [
                ...new Set(blocks.map((block: ChakraProBlock) => block.group)),
              ].join(", ")
              p.log.info(`Available categories: ${categories}`)
            } else {
              p.log.warn("No blocks found")
            }
            return
          }

          filteredBlocks
            .sort((a, b) => a.group.localeCompare(b.group))
            .forEach((block: ChakraProBlock) => {
              const blockCount = block.variants.length
              const nameWithCount = `${block.name} (${blockCount} block${blockCount === 1 ? "" : "s"})`
              table.push([block.group, nameWithCount])
            })

          const totalVariants = filteredBlocks.reduce(
            (sum, block) => sum + block.variants.length,
            0,
          )
          p.log.info(
            `Found ${totalVariants} block(s) across ${filteredBlocks.length} component(s)`,
          )
          p.log.info(table.toString())
        } catch (error) {
          p.log.error("Failed to fetch blocks list")
          if (error instanceof Error) {
            debug("error", error.message)
          }
        }

        p.outro("🎉 Done!")
      }),
  )

function printBlockSync(content: string, filename: string) {
  const boxText = boxen(content, {
    headerText: `${filename}\n`,
    borderStyle: "none",
  })
  p.log.info(boxText)
}
