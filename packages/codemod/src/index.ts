import { Command } from "commander"
import { config } from "dotenv"
import { createRequire } from "node:module"
import { runTransform } from "../src/run-transform"
import { upgrade } from "../src/upgrade"

config()

process.setMaxListeners(Infinity)

const req = createRequire(import.meta.url)
const packageJson = req("@chakra-ui/codemod/package.json")

export async function run() {
  const program = new Command()

  program
    .name("@chakra-ui/codemod")
    .description("Codemods for migrating Chakra UI codebases")
    .version(packageJson.version)

  program
    .command("upgrade [revision]")
    .description(
      "Upgrade Chakra UI and run codemods automatically (e.g., upgrade 3.0.0 or upgrade latest)",
    )
    .option("--verbose", "Show detailed output during upgrade")
    .option("--dry", "Do a dry-run without making changes")
    .action(upgrade)

  program
    .command("transform <transform> <path>")
    .description("Run a specific transform on files or directory")
    .option("--dry", "Do a dry-run, no code will be edited")
    .option("--print", "Print the changed output for comparison")
    .option("-f, --force", "Bypass Git safety checks and forcibly run codemods")
    .action(runTransform)

  program.parse(process.argv)
}
