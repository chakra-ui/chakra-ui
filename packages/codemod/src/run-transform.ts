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

  if (!transform) throw new Error(`Transform "${transformName}" not found.`)
  if (!fs.existsSync(targetPath))
    throw new Error(`Path "${targetPath}" not found.`)

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
    p.intro(color.bgCyan(color.black(" chakra-codemod ")))

    p.note(
      `Running ${color.cyan(transformName)} on ${color.dim(targetPath)}`,
      "Transforming Theme",
    )

    s = p.spinner()
    s.start(`Applying AST transformations via jscodeshift`)
  }

  return new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, [jscodeshiftBin, ...args], {
      stdio: upgrade ? "inherit" : "ignore",
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
          p.outro(`${color.cyan("Done!")} Your theme has been migrated to v3.`)
        }
        resolve()
      } else {
        if (s) s.stop(color.red("Transformation failed"))
        reject(new Error(`Failed with code ${code}`))
      }
    })
  })
}
