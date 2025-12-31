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
  verbose?: boolean
  dry?: boolean
}

export async function upgrade(
  revision: string = "latest",
  options: UpgradeOptions = {},
) {
  const { dry = false } = options

  p.intro(picocolors.bgCyan(picocolors.black(" ✨ Chakra UI Upgrade Tool ")))

  section("Preflight checks")
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
  p.log.success(`Ready using ${packageManager}`)

  section("Dependency analysis")
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

  section("Upgrade plan")
  p.log.info(`Install: ${packagesToInstall.join(", ")}`)
  if (packagesToRemove.length > 0)
    p.log.info(`Remove: ${packagesToRemove.join(", ")}`)

  const proceed = await p.confirm({ message: "Proceed with changes?" })
  if (!proceed) return p.cancel("Cancelled")

  section("Applying dependency changes")
  if (!dry) {
    const s = p.spinner()
    s.start("Updating packages...")
    if (packagesToRemove.length > 0) {
      await runCommand(
        `${packageManager} ${packageManager === "npm" ? "uninstall" : "remove"} ${packagesToRemove.join(" ")}`,
        false,
        true,
      )
    }
    await runCommand(
      `${packageManager} ${packageManager === "npm" ? "install" : "add"} ${packagesToInstall.join(" ")}`,
      false,
      true,
    )
    s.stop("Dependencies updated")
  }

  section("Component snippets")
  const installSnippets = await p.confirm({
    message: "Install Chakra snippets?",
    initialValue: true,
  })
  if (installSnippets && !dry) {
    const s = p.spinner()
    s.start("Installing snippets...")
    try {
      await runCommand("npx @chakra-ui/cli snippet add", false, true)
      s.stop("Snippets installed")
    } catch {
      s.stop(
        "Snippet installation failed (manual: npx @chakra-ui/cli snippet add)",
      )
    }
  }

  section("Code transforms")
  const preset = await p.select({
    message: "Upgrade depth:",
    options: [
      { label: "Safe (recommended)", value: "safe" },
      { label: "Full migration", value: "full" },
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
        await runTransform(name, process.cwd(), { dry })
      } catch (err) {
        p.log.error(`Failed: ${name}`)
      }
    }
    s.stop("All transforms completed")
  }

  p.outro(
    picocolors.green("🎉 Upgrade complete! Review your changes and run tests."),
  )
}

async function runCommand(
  cmd: string,
  _verbose: boolean,
  silent: boolean = false,
) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(cmd, {
      shell: true,
      stdio: silent ? "ignore" : "inherit",
      env: process.env,
    })
    child.on("close", (code) => (code === 0 ? resolve() : reject()))
  })
}

function section(title: string) {
  p.log.message(`\n${picocolors.bold(picocolors.cyan(`▸ ${title}`))}`)
}
