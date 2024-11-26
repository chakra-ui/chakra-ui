import * as p from "@clack/prompts"
import { Command } from "commander"
import { resolve } from "path/posix"
import { EjectCommand } from "./commands/eject.js"
import { SnippetCommand } from "./commands/snippet.js"
import { TypegenCommand } from "./commands/typegen.js"

process.setMaxListeners(Infinity)

export async function run() {
  p.intro("Chakra CLI ⚡️")
  const packageJson = await import(resolve("package.json"))
  const program = new Command()
    .name("chakra-ui")
    .description("The official CLI for Chakra UI projects")
    .version(packageJson.version)

  program
    .addCommand(TypegenCommand)
    .addCommand(SnippetCommand)
    .addCommand(EjectCommand)

  program.parse()
}
