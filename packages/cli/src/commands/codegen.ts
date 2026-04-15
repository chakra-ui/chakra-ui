import * as p from "@clack/prompts"
import { Command } from "commander"
import { execSync } from "node:child_process"

export const CodegenCommand = new Command("codegen")
  .description("Generate Panda CSS styled-system output")
  .option("--clean", "Clean output directory before generating")
  .option("--watch", "Watch for changes and regenerate")
  .action(async (opts) => {
    const cwd = process.cwd()
    const flags = [opts.clean && "--clean", opts.watch && "--watch"]
      .filter(Boolean)
      .join(" ")

    const cmd = `npx panda codegen ${flags}`.trim()

    p.log.step(`Running: ${cmd}`)
    try {
      execSync(cmd, { cwd, stdio: "inherit" })
      p.log.success("Codegen complete")
    } catch {
      p.log.error("Codegen failed")
      process.exit(1)
    }
  })
