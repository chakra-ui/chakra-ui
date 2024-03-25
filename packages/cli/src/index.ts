import * as p from "@clack/prompts"
import { program } from "commander"
import { codegen } from "./codegen.js"
import * as io from "./io.js"

interface Flags {
  strict?: boolean
  format?: boolean
  watch?: string
  clean?: boolean
}

export async function run() {
  p.intro("Chakra CLI ⚡️")

  program
    .command("tokens <source>")
    .description("Generate theme and recipe typings")
    .option("--strict", "Generate strict types for props variant and size")
    .option("--format", "Disable auto formatting")
    .option("--watch [path]", "Watch directory for changes and rebuild")
    .option("--clean", "Clean the output directory")
    .action(async (source: string, flags: Flags) => {
      if (flags.clean) {
        await io.clean()
      }

      let result = await io.read(source)

      const build = async () => {
        await codegen(result.mod)

        if (flags.watch) {
          p.log.info("\n⌛️ Watching for changes...")
        }
      }

      if (!flags.watch) {
        await build()
      } else {
        io.watch(result.dependencies, async () => {
          result = await io.read(source)
          return build()
        })
      }

      p.outro("🎉 Done!")
    })

  program.on("--help", () => {
    console.info(`Example call:
    $ chakra-cli tokens theme.ts
  `)
  })

  program.parse()
}
