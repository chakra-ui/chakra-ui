import { Command } from "commander"
import { createRequire } from "node:module"
import color from "picocolors"
import { runTransform } from "../src/run-transform"
import { transforms, upgradeTransforms } from "../src/transforms"
import { upgrade } from "../src/upgrade"

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
    .option("--dry-run", "Alias for --dry")
    .option("--transform <names...>", "Run only the named transforms")
    .option(
      "--cross-file",
      "Resolve components imported through barrels/re-exports (slower)",
    )
    .option(
      "--fail-on-warn",
      "Exit with a non-zero code if any warnings are emitted",
    )
    .action(upgrade)

  program
    .command("list")
    .description("List the available transforms")
    .action(() => {
      for (const name of upgradeTransforms) {
        const info = transforms[name]
        console.log(
          `${color.cyan(name)}  ${color.dim(info?.description ?? "")}`,
        )
      }
    })

  program
    .command("transform <transform> <path>")
    .description("Run a specific transform on files or directory")
    .option("--dry", "Do a dry-run, no code will be edited")
    .option("--dry-run", "Alias for --dry")
    .option(
      "--cross-file",
      "Resolve components imported through barrels/re-exports (slower)",
    )
    .option("-f, --force", "Bypass Git safety checks")
    .option(
      "--fail-on-warn",
      "Exit with a non-zero code if any warnings are emitted",
    )
    .action(async (transform, path, options) => {
      const result = await runTransform(transform, path, {
        ...options,
        dry: Boolean(options.dry || options.dryRun),
        upgrade: false,
      })
      if (options.failOnWarn && result.diagnostics.length > 0) {
        process.exitCode = 1
      }
    })

  program.parse(process.argv)
}
