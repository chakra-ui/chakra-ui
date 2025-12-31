import * as p from "@clack/prompts"
import { execSync } from "child_process"
import fs from "fs"
import { createRequire } from "node:module"
import { transforms } from "./transforms.js"
import { isGitClean } from "./utils/git.js"

const require = createRequire(import.meta.url)

interface RunTransformOptions {
  dry?: boolean
  print?: boolean
  force?: boolean
}

export async function runTransform(
  transformName: string,
  targetPath: string,
  options: RunTransformOptions = {},
) {
  const { dry = false, print = false, force = false } = options
  const transform = transforms[transformName]
  if (!transform) {
    p.cancel(`Transform "${transformName}" not found.`)
    const list = Object.keys(transforms)
      .map((key) => `- ${key} (${transforms[key].description})`)
      .join("\n")
    p.note(`Available transforms:\n${list}`)
    process.exit(1)
  }

  if (!fs.existsSync(targetPath)) {
    p.cancel(`Path "${targetPath}" does not exist.`)
    process.exit(1)
  }

  if (!force && !dry) {
    const gitClean = await isGitClean()
    if (!gitClean) {
      p.note(
        "Git directory is not clean. Commit or stash your changes before running codemods.",
      )
      p.note("You can bypass this check with the --force flag.")
      process.exit(1)
    }
  }

  p.intro(`Running transform: ${transform.name}`)
  if (transform.description) p.note(transform.description)

  try {
    const jscodeshiftBin = require.resolve("jscodeshift/bin/jscodeshift.js")

    const args = [
      "-t",
      transform.path,
      targetPath,
      "--extensions=tsx,ts,jsx,js",
      "--parser=tsx",
    ]

    if (dry) {
      args.push("--dry")
      p.note("Running in dry-run mode")
    }

    if (print) {
      args.push("--print")
    }

    const command = `${jscodeshiftBin} ${args.join(" ")}`

    const spinner = p.spinner()
    spinner.start(`Executing: ${transform.name}`)
    if (print) p.note(`$ ${command}`)

    execSync(command, { stdio: "inherit" })

    spinner.stop(`Transform "${transform.name}" completed`)
    p.outro("Done")
  } catch (error) {
    if (error instanceof Error) p.log.error(error.message)
    p.cancel(`Transform "${transform.name}" failed.`)
    process.exit(1)
  }
}
