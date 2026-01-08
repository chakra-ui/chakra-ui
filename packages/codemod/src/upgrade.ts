import * as p from "@clack/prompts"
import { spawn } from "child_process"
import fs from "fs"
import picocolors from "picocolors"
import semver from "semver"
import { runTransform } from "./run-transform.js"
import { upgradeTransforms } from "./transforms.js"
import { isGitClean } from "./utils/git.js"
import { isPackageUsed } from "./utils/is-package-used.js"
import { getPackageManager } from "./utils/package-manager.js"

interface UpgradeOptions {
  dry?: boolean
}

export async function upgrade(
  revision: string = "latest",
  options: UpgradeOptions = {},
) {
  const { dry = false } = options

  p.intro(picocolors.bgCyan(picocolors.black(" ✨ Chakra UI Upgrade Tool ")))

  section("Preflight Checks")

  const nodeVersion = process.version
  if (!semver.satisfies(nodeVersion, ">=20.0.0")) {
    p.cancel(picocolors.red(`Node.js 20+ required (current: ${nodeVersion})`))
    process.exit(1)
  }

  if (!dry && !(await isGitClean())) {
    const proceed = await p.confirm({
      message: "Git tree is dirty. Continue?",
      initialValue: false,
    })
    if (!proceed) return p.cancel("Upgrade cancelled")
  }

  const packageManager = getPackageManager()
  p.log.success(`Using package manager: ${packageManager}`)

  section("Dependency Analysis")
  const packagesToInstall = [
    `@chakra-ui/react@${revision}`,
    "@emotion/react@latest",
  ]
  const removalCandidates = [
    "@emotion/styled",
    "framer-motion",
    "@chakra-ui/icons",
  ]

  let packagesToRemove: string[] = []

  if (fs.existsSync("package.json")) {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    const installed = removalCandidates.filter((name) => deps[name])

    const unused = await Promise.all(
      installed.map(async (name) =>
        (await isPackageUsed(name, process.cwd())) ? null : name,
      ),
    )

    packagesToRemove = unused.filter(Boolean) as string[]
  }

  p.log.info(`Packages to install: ${packagesToInstall.join(", ")}`)
  if (packagesToRemove.length > 0) {
    p.log.info(`Packages to remove: ${packagesToRemove.join(", ")}`)
  }

  const proceedChanges = await p.confirm({
    message: "Proceed with these changes?",
  })
  if (!proceedChanges) return p.cancel("Upgrade cancelled")

  section("Applying Dependency Changes")
  if (!dry) {
    const s = p.spinner()
    s.start("Updating packages...")

    if (packagesToRemove.length > 0) {
      await runCommand(
        `${packageManager} ${packageManager === "npm" ? "uninstall" : "remove"} ${packagesToRemove.join(" ")}`,
        true,
      )
    }

    await runCommand(
      `${packageManager} ${packageManager === "npm" ? "install" : "add"} ${packagesToInstall.join(" ")}`,
      true,
    )

    s.stop("Dependencies updated")
  } else {
    p.log.info("[dry-run] Skipping package installation/removal")
  }

  section("Component Snippets")
  const installSnippets = await p.confirm({
    message: "Install Chakra component snippets?",
    initialValue: true,
  })

  if (installSnippets && !dry) {
    const s = p.spinner()
    s.start("Installing snippets...")
    try {
      await runCommand("npx @chakra-ui/cli snippet add", true)
      s.stop("Snippets installed")
    } catch {
      s.stop(
        "Snippet installation failed (manual: npx @chakra-ui/cli snippet add)",
      )
    }
  }

  section("Code Transforms")
  const preset = await p.select({
    message: "Upgrade depth:",
    options: [
      { label: "Safe", value: "safe" },
      { label: "Full migration (recommended)", value: "full" },
    ],
  })

  if (p.isCancel(preset)) return p.outro("Finished without transforms")

  const transformsToRun =
    preset === "safe"
      ? [
          "boolean-props",
          "spacing-props",
          "style-props",
          "theme-tokens",
          "color-palette",
        ]
      : upgradeTransforms

  if (transformsToRun.length > 0) {
    const s = p.spinner()
    s.start(`Running ${transformsToRun.length} transforms...`)

    for (const name of transformsToRun) {
      s.message(`Transforming: ${name}`)
      try {
        await runTransform(name, process.cwd(), { dry, upgrade: true })
      } catch (err) {
        p.log.error(`Failed transform: ${name}`)
      }
    }

    s.stop("All transforms completed")
  }

  p.outro(
    picocolors.green("🎉 Upgrade complete! Review your changes and run tests."),
  )
}

async function runCommand(cmd: string, silent: boolean = false) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(cmd, {
      shell: true,
      stdio: silent ? "ignore" : "inherit",
      env: process.env,
    })
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`Failed with code ${code}`)),
    )
  })
}

function section(title: string) {
  p.log.message(`\n${picocolors.bold(picocolors.cyan(`▸ ${title}`))}`)
}
