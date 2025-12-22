import { execSync } from "child_process"
import fs from "fs"
import { createRequire } from "node:module"
import picocolors from "picocolors"
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
    console.error(
      picocolors.red(
        `\n❌ Transform "${transformName}" not found. Available transforms:\n`,
      ),
    )
    Object.keys(transforms).forEach((key) => {
      console.log(
        picocolors.cyan(`  - ${key}`),
        picocolors.gray(`(${transforms[key].description})`),
      )
    })
    process.exit(1)
  }

  if (!fs.existsSync(targetPath)) {
    console.error(picocolors.red(`\n❌ Path "${targetPath}" does not exist.\n`))
    process.exit(1)
  }

  if (!force && !dry) {
    const gitClean = await isGitClean()
    if (!gitClean) {
      console.error(
        picocolors.yellow(
          "\n⚠️  Git directory is not clean. Please commit or stash your changes before running codemods.\n",
        ),
      )
      console.log(
        picocolors.gray("You can bypass this check with the --force flag.\n"),
      )
      process.exit(1)
    }
  }

  console.log(
    picocolors.blue(
      `\n🔄 Running transform: ${picocolors.bold(transform.name)}\n`,
    ),
  )
  console.log(picocolors.gray(`   ${transform.description}\n`))

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
      console.log(picocolors.yellow("   🔍 Running in dry-run mode\n"))
    }

    if (print) {
      args.push("--print")
    }

    const command = `${jscodeshiftBin} ${args.join(" ")}`

    if (print) {
      console.log(picocolors.gray(`   $ ${command}\n`))
    }

    execSync(command, { stdio: "inherit" })

    console.log(
      picocolors.green(`\n✅ Transform "${transform.name}" completed!\n`),
    )
  } catch (error) {
    console.error(
      picocolors.red(`\n❌ Transform "${transform.name}" failed.\n`),
    )

    if (error instanceof Error) {
      console.error(picocolors.gray(error.message))
    }

    process.exit(1)
  }
}
