import * as p from "@clack/prompts"
import { spawn } from "child_process"
import fs from "fs"
import { createRequire } from "node:module"
import color from "picocolors"
import { transforms } from "./transforms.js"

const require = createRequire(import.meta.url)

interface RunTransformOptions {
  dry?: boolean
  print?: boolean
  upgrade?: boolean
}

export async function runTransform(
  transformName: string,
  targetPath: string,
  options: RunTransformOptions = {},
) {
  const { dry = false, print = false, upgrade = false } = options
  const transform = transforms[transformName]

  if (!transform) {
    throw new Error(color.red(`Transform "${transformName}" not found.`))
  }

  if (!fs.existsSync(targetPath)) {
    throw new Error(color.red(`Target path "${targetPath}" not found.`))
  }

  const jscodeshiftBin = require.resolve("jscodeshift/bin/jscodeshift.js")
  const args = [
    "-t",
    transform.path,
    targetPath,
    "--extensions=tsx,ts,jsx,js",
    "--parser=tsx",
    "--jobs=1",
    "--ignore-pattern=node_modules",
  ]

  if (dry) args.push("--dry")
  if (print) args.push("--print")

  let s: ReturnType<typeof p.spinner> | undefined

  if (!upgrade) {
    p.intro(color.bgCyan(color.black(" ✨ Chakra Codemod ")))
    p.note(
      `Preparing to run ${color.cyan(transformName)} on ${color.dim(targetPath)}`,
    )
    if (dry) {
      p.log.info(color.yellow("[dry-run] No changes will be applied"))
    }
  }

  return new Promise<void>((resolve, reject) => {
    try {
      s = p.spinner()
      s.start(`Running codemod: ${transformName}`)

      const child = spawn(process.execPath, [jscodeshiftBin, ...args], {
        stdio: upgrade || dry ? "inherit" : "pipe",
        env: process.env,
      })

      child.on("error", (err) => {
        if (s) s.stop(color.red("Failed to start process"))
        reject(err)
      })

      child.on("close", (code) => {
        if (code === 0) {
          if (!upgrade && s) {
            s.stop(color.green("Transformations complete"))
            p.outro(`${color.cyan("Done!")} Your theme/code has been migrated.`)
          }
          resolve()
        } else {
          if (s) s.stop(color.red("Transformation failed"))
          reject(
            new Error(`Transform "${transformName}" failed with code ${code}`),
          )
        }
      })
    } catch (err) {
      if (s) s.stop(color.red("Unexpected error during transformation"))
      reject(err)
    }
  })
}
