import * as p from "@clack/prompts"
import { spawn } from "child_process"
import fs from "fs"
import picocolors from "picocolors"
import semver from "semver"
import { runTransform } from "./run-transform.js"
import { transforms, upgradeTransforms } from "./transforms.js"
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

    try {
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
    } catch (err) {
      s.stop(picocolors.red("Failed to update dependencies"))
      p.log.error(err instanceof Error ? err.message : String(err))
      return
    }
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
      // Determine the correct executor based on the package manager
      const executor =
        packageManager === "pnpm"
          ? "pnpm dlx"
          : packageManager === "bun"
            ? "bunx"
            : "npx --yes"

      await runCommand(`${executor} @chakra-ui/cli snippet add`, true)
      s.stop("Snippets installed")
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      s.stop(`Snippet installation failed: ${msg}`)
    }
  }

  section("Code Transforms")
  const preset = await p.select({
    message: "Upgrade depth:",
    options: [
      { label: "Safe", value: "safe" },
      { label: "Full migration (recommended)", value: "full" },
      { label: "Custom (select transforms manually)", value: "custom" },
    ],
  })

  if (p.isCancel(preset)) return p.outro("Finished without transforms")

  let transformsToRun: string[] = []

  if (preset === "safe") {
    transformsToRun = [
      "boolean-props",
      "spacing-props",
      "style-props",
      "theme-tokens",
      "color-palette",
    ]
  } else if (preset === "full") {
    transformsToRun = upgradeTransforms
  } else if (preset === "custom") {
    const customSelection = await p.multiselect({
      message: "Choose the transforms to run:",
      options: Object.keys(transforms).map((name, i) => ({
        label: `${(i + 1).toString().padStart(2, "0")}-${name}`,
        value: name,
      })),
    })

    if (p.isCancel(customSelection) || customSelection.length === 0) {
      return p.outro("No transforms selected. Upgrade finished.")
    }

    transformsToRun = customSelection
  }

  if (transformsToRun.length > 0) {
    const s = p.spinner()
    s.start(`Running ${transformsToRun.length} transforms...`)

    for (const name of transformsToRun) {
      s.message(`Transforming: ${name}`)
      try {
        await runTransform(name, process.cwd(), { dry, upgrade: true })
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        p.log.error(`Failed transform ${name}: ${msg}`)
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
      stdio: silent ? ["ignore", "ignore", "pipe"] : "inherit",
      env: process.env,
    })

    let stderr = ""
    if (child.stderr) {
      child.stderr.on("data", (data) => {
        stderr += data.toString()
      })
    }

    child.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        const errorMsg = stderr ? `\nStderr: ${stderr}` : ""
        reject(new Error(`Failed with code ${code}${errorMsg}`))
      }
    })
  })
}

function section(title: string) {
  p.log.message(`\n${picocolors.bold(picocolors.cyan(`▸ ${title}`))}`)
}
