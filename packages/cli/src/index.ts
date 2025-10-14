import * as p from "@clack/prompts"
import { Command } from "commander"
import { config } from "dotenv"
import { createRequire } from "node:module"
import { BlocksCommand } from "./commands/blocks.js"
import { EjectCommand } from "./commands/eject.js"
import { SnippetCommand } from "./commands/snippet.js"
import { TypegenCommand } from "./commands/typegen.js"

config()

process.setMaxListeners(Infinity)

const req = createRequire(import.meta.url)
const packageJson = req("@chakra-ui/cli/package.json")

export async function run() {
  p.intro("Chakra CLI ⚡️")
  const program = new Command()
    .name("chakra-ui")
    .description("The official CLI for Chakra UI projects")
    .version(packageJson.version)

  program
    .addCommand(TypegenCommand)
    .addCommand(SnippetCommand)
    .addCommand(BlocksCommand)
    .addCommand(EjectCommand)

  program.parse()
}
