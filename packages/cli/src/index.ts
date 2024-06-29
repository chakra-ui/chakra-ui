import * as p from "@clack/prompts"
import { Command } from "commander"
import { CompositionCommand } from "./commands/composition.js"
import { TypegenCommand } from "./commands/typegen.js"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

export async function run() {
  p.intro("Chakra CLI ⚡️")

  const program = new Command()
    .name("chakra-ui")
    .description("add compositions and examples to your project")
    .version("3.0.0")

  program.addCommand(TypegenCommand).addCommand(CompositionCommand)

  program.parse()
}
