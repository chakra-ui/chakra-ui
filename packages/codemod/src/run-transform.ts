import { spawn } from "child_process"
import fs from "fs"
import { createRequire } from "node:module"
import { transforms } from "./transforms.js"

const require = createRequire(import.meta.url)

interface RunTransformOptions {
  dry?: boolean
  print?: boolean
}

export async function runTransform(
  transformName: string,
  targetPath: string,
  options: RunTransformOptions = {},
) {
  const { dry = false, print = false } = options
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

  return new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, [jscodeshiftBin, ...args], {
      stdio: "ignore", // Keeps terminal clean for the main spinner
      env: process.env,
    })

    child.on("error", reject)
    child.on("close", (code) => {
      code === 0 ? resolve() : reject(new Error(`Failed with code ${code}`))
    })
  })
}
