import * as p from "@clack/prompts"
import { spawn } from "child_process"
import fs from "fs"
import path from "path"
import picocolors from "picocolors"
import semver from "semver"
import { runTransform } from "./run-transform.js"
import { transforms, upgradeTransforms } from "./transforms.js"
import { getProjectInfo } from "./utils/get-project-info.js"
import { isGitClean } from "./utils/git.js"
import { isPackageUsed } from "./utils/is-package-used.js"
import { getPackageManager } from "./utils/package-manager.js"

interface UpgradeOptions {
  dry?: boolean
}

process.once("SIGINT", () => {
  p.cancel("Upgrade cancelled.")
  process.exit(0)
})

function abort(message = "Upgrade cancelled.") {
  p.cancel(message)
  process.exit(0)
}

export async function upgrade(
  revision: string = "latest",
  options: UpgradeOptions = {},
) {
  const { dry = false } = options

  if (revision === "latest") {
    revision = "^3.0.0"
  }

  p.intro(picocolors.bgCyan(picocolors.black(" ✨ Chakra UI ")))

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

    if (p.isCancel(proceed)) {
      return abort()
    }

    if (!proceed) {
      return abort()
    }
  }

  const packageManager = getPackageManager()
  p.log.success(`Using package manager: ${packageManager}`)

  section("Dependency Analysis")

  const packagesToInstall = [
    `@chakra-ui/react@${revision}`,
    "@emotion/react@^11",
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

  if (p.isCancel(proceedChanges)) {
    return abort()
  }

  if (!proceedChanges) {
    return abort()
  }

  section("Applying Dependency Changes")

  if (!dry) {
    const s = p.spinner()
    s.start("Updating packages...")

    try {
      if (packagesToRemove.length > 0) {
        await runCommand(
          `${packageManager} ${
            packageManager === "npm" ? "uninstall" : "remove"
          } ${packagesToRemove.join(" ")}`,
          true,
        )
      }

      await runCommand(
        `${packageManager} ${
          packageManager === "npm" ? "install" : "add"
        } ${packagesToInstall.join(" ")}`,
        true,
      )

      s.stop("Dependencies updated")
    } catch (err) {
      s.stop(picocolors.red("Failed to update dependencies"))
      p.log.error(err instanceof Error ? err.message : String(err))
      return abort()
    }
  } else {
    p.log.info("[dry-run] Skipping package installation/removal")
  }

  section("Component Snippets")

  const installSnippets = await p.confirm({
    message: "Install Chakra component snippets?",
    initialValue: true,
  })

  if (p.isCancel(installSnippets)) {
    return abort()
  }

  if (installSnippets && !dry) {
    const s = p.spinner()
    s.start("Installing snippets...")

    try {
      const executor =
        packageManager === "pnpm"
          ? "pnpm dlx"
          : packageManager === "bun"
            ? "bunx"
            : "npx --yes"

      await runCommand(`${executor} @chakra-ui/cli snippet add`, true)
      s.stop("Snippets installed")
    } catch (err) {
      s.stop("Snippet installation failed")
    }
  }

  section("Code Transforms")

  const preset = await p.select({
    message: "Upgrade depth:",
    options: [
      { label: "Full migration (recommended)", value: "full" },
      { label: "Custom (select transforms manually)", value: "custom" },
    ],
  })

  if (p.isCancel(preset)) {
    return abort()
  }

  let transformsToRun: string[] = []

  if (preset === "full") {
    transformsToRun = upgradeTransforms
  } else {
    const customSelection = await p.multiselect({
      message: "Choose the transforms to run:",
      options: Object.keys(transforms).map((name, i) => ({
        label: `${(i + 1).toString().padStart(2, "0")}-${name}`,
        value: name,
      })),
    })

    if (p.isCancel(customSelection)) {
      return abort()
    }

    if (customSelection.length === 0) {
      return abort("No transforms selected. Upgrade cancelled.")
    }

    transformsToRun = customSelection
  }

  if (transformsToRun.length > 0) {
    const s = p.spinner()
    s.start(`Running ${transformsToRun.length} transforms...`)

    const { componentsDir } = getProjectInfo(process.cwd())

    // file -> transforms that touch it
    const byFile = new Map<string, Set<string>>()
    const errorsByFile = new Map<string, Set<string>>()
    let failed = 0

    const add = (map: Map<string, Set<string>>, file: string, name: string) => {
      if (!map.has(file)) map.set(file, new Set())
      map.get(file)!.add(name)
    }

    for (const name of transformsToRun) {
      s.message(`Transforming: ${name}`)
      try {
        const res = await runTransform(name, process.cwd(), {
          dry,
          upgrade: true,
          ignorePattern: ["node_modules", componentsDir],
        })
        res.files.forEach((f) => add(byFile, f, name))
        res.errorFiles.forEach((f) => add(errorsByFile, f, name))
      } catch (err) {
        failed++
        const msg = err instanceof Error ? err.message : String(err)
        p.log.error(`Failed transform ${name}: ${msg}`)
      }
    }

    s.stop(
      dry
        ? "Dry run complete — no files were changed"
        : "All transforms completed",
    )

    reportChanges(byFile, errorsByFile, dry, failed)
  }

  if (dry) {
    p.outro(
      picocolors.green(
        "Dry run done. To see exact changes, run the upgrade on a clean branch and use `git diff`.",
      ),
    )
  } else {
    p.outro(
      picocolors.green(
        "🎉 Upgrade complete! Review the diff and run your tests.",
      ),
    )
  }
}

async function runCommand(cmd: string, silent = false) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(cmd, {
      shell: true,
      stdio: silent ? ["ignore", "ignore", "pipe"] : "inherit",
      env: process.env,
    })

    let stderr = ""
    child.stderr?.on("data", (data) => {
      stderr += data.toString()
    })

    child.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new Error(stderr || `Failed with code ${code}`))
    })
  })
}

function section(title: string) {
  p.log.message(`\n${picocolors.bold(picocolors.cyan(`▸ ${title}`))}`)
}

const INLINE_THRESHOLD = 25

function humanize(name: string): string {
  const isComponent = transforms[name]?.path
    .split(path.sep)
    .includes("components")
  if (isComponent) {
    return name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("")
  }
  return name.replace(/-/g, " ")
}

function labelsFor(names: Set<string>): string {
  return [...new Set([...names].map(humanize))].sort().join(", ")
}

function reportChanges(
  byFile: Map<string, Set<string>>,
  errorsByFile: Map<string, Set<string>>,
  dry: boolean,
  failed: number,
) {
  if (byFile.size === 0 && errorsByFile.size === 0) {
    if (failed === 0) p.log.info("No files matched any transform.")
    return
  }

  const verb = dry ? "would change" : "changed"
  const entries = [...byFile.entries()].sort(([a], [b]) => a.localeCompare(b))

  if (entries.length > 0) {
    if (entries.length > INLINE_THRESHOLD) {
      const reportPath = writeReport(entries, errorsByFile, dry)
      p.note(
        `${entries.length} files ${verb}.\nFull breakdown: ${picocolors.cyan(reportPath)}`,
        dry ? "Preview" : "Summary",
      )
    } else {
      const body = entries
        .map(
          ([file, names]) =>
            `${picocolors.cyan(file)}\n  ${picocolors.dim(labelsFor(names))}`,
        )
        .join("\n")
      p.note(body, `Files that ${verb} (${entries.length})`)
    }
  }

  if (errorsByFile.size > 0) {
    const body = [...errorsByFile.entries()]
      .map(([file, names]) => `${file} (${labelsFor(names)})`)
      .join("\n")
    p.note(
      picocolors.yellow(body),
      `${errorsByFile.size} file(s) need manual attention`,
    )
  }
}

function writeReport(
  entries: [string, Set<string>][],
  errorsByFile: Map<string, Set<string>>,
  dry: boolean,
): string {
  const verb = dry ? "would change" : "changed"
  const lines = [
    `# Chakra UI v3 upgrade${dry ? " (dry run)" : ""}`,
    "",
    `${entries.length} files ${verb}.`,
    "",
    "## Files",
    "",
  ]

  for (const [file, names] of entries) {
    lines.push(`- \`${file}\` — ${labelsFor(names)}`)
  }
  lines.push("")

  if (errorsByFile.size > 0) {
    lines.push("## Needs manual attention", "")
    for (const [file, names] of errorsByFile) {
      lines.push(`- \`${file}\` — ${labelsFor(names)}`)
    }
    lines.push("")
  }

  const reportPath = path.join(process.cwd(), "chakra-codemod-report.md")
  fs.writeFileSync(reportPath, lines.join("\n"))
  return path.relative(process.cwd(), reportPath)
}
