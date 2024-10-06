import * as p from "@clack/prompts"
import { Command } from "commander"
import { EjectCommand } from "./commands/eject.js"
import { SnippetCommand } from "./commands/snippet.js"
import { TypegenCommand } from "./commands/typegen.js"

process.setMaxListeners(Infinity)

export async function run() {
  p.intro("Chakra CLI ⚡️")

  const program = new Command()
    .name("chakra-ui")
    .description("The official CLI for Chakra UI projects")
    .version("3.0.0")

  program
    .addCommand(TypegenCommand)
    .addCommand(SnippetCommand)
    .addCommand(EjectCommand)

  program.parse()
}
