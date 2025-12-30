import * as p from "@clack/prompts"
import { execSync } from "child_process"
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
  const { verbose = false, dry = false } = options

  console.log(picocolors.bold(picocolors.blue("\n🚀 Chakra UI Upgrade Tool\n")))

  const nodeVersion = process.version
  if (!semver.satisfies(nodeVersion, ">=20.0.0")) {
    p.cancel(
      picocolors.red(
        `Node.js 20.x or higher is required. You are running ${nodeVersion}.`,
      ),
    )
    process.exit(1)
  }

  if (!dry) {
    const gitClean = await isGitClean()
    if (!gitClean) {
      p.note(
        "Git directory is not clean. Please commit or stash your changes before upgrading.",
      )
      const proceed = await p.confirm({
        message: "Do you want to continue anyway?",
        initialValue: false,
      })
      if (!proceed) {
        p.cancel("Upgrade cancelled.")
        process.exit(0)
      }
    }
  }

  const packageManager = getPackageManager()
  p.note(`Detected package manager: ${packageManager}`)

  const targetVersion = revision === "latest" ? "latest" : revision
  const packagesToUpdate = [
    `@chakra-ui/react@${targetVersion}`,
    "@emotion/react@latest",
  ]
  const packagesToRemove = [
    "@emotion/styled",
    "framer-motion",
    "@chakra-ui/icons",
  ]

  try {
    let installedPackages: string[] = []
    if (!dry && fs.existsSync("package.json")) {
      const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }
      installedPackages = packagesToRemove.filter((pkgName) => deps?.[pkgName])
    }

    installedPackages = (
      await Promise.all(
        installedPackages.map(async (pkg) => {
          const used = await isPackageUsed(pkg, process.cwd())
          return used ? null : pkg
        }),
      )
    ).filter(Boolean) as string[]

    if (installedPackages.length > 0) {
      const uninstallCmd =
        packageManager === "npm"
          ? `npm uninstall ${installedPackages.join(" ")}`
          : packageManager === "yarn"
            ? `yarn remove ${installedPackages.join(" ")}`
            : packageManager === "bun"
              ? `bun remove ${installedPackages.join(" ")}`
              : `pnpm remove ${installedPackages.join(" ")}`
      const spinner = p.spinner()
      spinner.start(`Removing unused packages: ${installedPackages.join(", ")}`)
      if (!dry) {
        try {
          execSync(uninstallCmd, { stdio: "ignore" })
          spinner.stop("Unused packages removed ✅")
        } catch (err) {
          spinner.stop("Failed to remove packages ❌")
          if (verbose && err instanceof Error) p.log.error(err.message)
          process.exit(1)
        }
      } else {
        spinner.stop(
          `[DRY RUN] Would uninstall: ${installedPackages.join(", ")}`,
        )
      }
    } else {
      p.note("No unused packages found to remove.")
    }

    const installCmd =
      packageManager === "npm"
        ? `npm install ${packagesToUpdate.join(" ")}`
        : packageManager === "yarn"
          ? `yarn add ${packagesToUpdate.join(" ")}`
          : packageManager === "bun"
            ? `bun add ${packagesToUpdate.join(" ")}`
            : `pnpm add ${packagesToUpdate.join(" ")}`
    const spinner = p.spinner()
    spinner.start(`Installing packages: ${packagesToUpdate.join(", ")}`)
    if (!dry) {
      try {
        execSync(installCmd, { stdio: "ignore" })
        spinner.stop("Packages installed ✅")
      } catch (err) {
        spinner.stop("Failed to install packages ❌")
        if (verbose && err instanceof Error) p.log.error(err.message)
        process.exit(1)
      }
    } else {
      spinner.stop(`[DRY RUN] Would install: ${packagesToUpdate.join(", ")}`)
    }
  } catch (err) {
    p.cancel("Failed to update packages ❌")
    if (verbose && err instanceof Error) p.log.error(err.message)
    process.exit(1)
  }

  const snippetResponse = await p.confirm({
    message: "Do you want to install component snippets?",
    initialValue: true,
  })

  if (snippetResponse) {
    const spinner = p.spinner()
    spinner.start("Installing snippets...")
    if (!dry) {
      try {
        execSync("npx @chakra-ui/cli snippet add", {
          stdio: ["inherit", "pipe", "pipe"],
          encoding: "utf8",
        })
        spinner.stop("Snippets installed ✅")
      } catch (err) {
        spinner.stop("Snippet installation failed ❌")
        if (verbose && err instanceof Error) p.log.error(err.message)
        p.note("You can run manually: npx @chakra-ui/cli snippet add")
      }
    } else {
      spinner.stop("[DRY RUN] Would run: npx @chakra-ui/cli snippet add")
    }
  } else {
    p.note("Skipped snippet installation.")
  }

  const response = await p.multiselect({
    message: "Select transforms to run:",
    options: upgradeTransforms.map((t) => ({ label: t, value: t })),
    initialValues: upgradeTransforms,
  })

  if (
    p.isCancel(response) ||
    (Array.isArray(response) && response.length === 0)
  ) {
    p.cancel("No transforms selected. Upgrade complete!")
    return
  }

  const targetPath = process.cwd()
  for (const transformName of response) {
    const spinner = p.spinner()
    spinner.start(`Running transform: ${transformName}`)
    try {
      await runTransform(transformName, targetPath, { dry, force: true })
      spinner.stop(`Transform "${transformName}" completed ✅`)
    } catch (err) {
      spinner.stop(`Transform "${transformName}" failed ❌`)
      if (verbose && err instanceof Error) p.log.error(err.message)
    }
  }

  p.note("Upgrade complete 🎉")
  console.log(
    picocolors.gray(`
Next steps:
  1. Review the changes made by the codemods
  2. Run your tests to ensure everything works
  3. Check the migration guide for manual changes: https://chakra-ui.com/docs/get-started/migration
`),
  )
}
