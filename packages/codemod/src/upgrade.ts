import { execSync } from "child_process"
import fs from "fs"
import picocolors from "picocolors"
import prompts from "prompts"
import semver from "semver"
import { runTransform } from "./run-transform.js"
import { upgradeTransforms } from "./transforms.js"
import { isGitClean } from "./utils/git.js"
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

  // Check Node.js version
  const nodeVersion = process.version
  if (!semver.satisfies(nodeVersion, ">=20.0.0")) {
    console.error(
      picocolors.red(
        `\n❌ Node.js 20.x or higher is required. You are running ${nodeVersion}.\n`,
      ),
    )
    process.exit(1)
  }

  // Git safety check
  if (!dry) {
    const gitClean = await isGitClean()
    if (!gitClean) {
      console.error(
        picocolors.yellow(
          "⚠️  Git directory is not clean. Please commit or stash your changes before upgrading.\n",
        ),
      )
      const response = await prompts({
        type: "confirm",
        name: "continue",
        message: "Do you want to continue anyway?",
        initial: false,
      })

      if (!response.continue) {
        console.log(picocolors.gray("\nUpgrade cancelled.\n"))
        process.exit(0)
      }
    }
  }

  // Detect package manager
  const packageManager = getPackageManager()
  console.log(
    picocolors.gray(`   Detected package manager: ${packageManager}\n`),
  )

  // Update packages
  console.log(picocolors.blue("📦 Updating packages...\n"))

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
    console.log(
      picocolors.gray(
        `   Removing unused packages: ${packagesToRemove.join(", ")}\n`,
      ),
    )

    if (!dry) {
      let installedPackages: string[] = []

      if (fs.existsSync("package.json")) {
        const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
        const deps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
        }

        installedPackages = packagesToRemove.filter(
          (pkgName) => deps?.[pkgName],
        )
      }

      if (installedPackages.length > 0) {
        const uninstallCmd =
          packageManager === "npm"
            ? `npm uninstall ${installedPackages.join(" ")}`
            : packageManager === "yarn"
              ? `yarn remove ${installedPackages.join(" ")}`
              : `pnpm remove ${installedPackages.join(" ")}`

        execSync(uninstallCmd, { stdio: verbose ? "inherit" : "pipe" })
      } else {
        console.log(picocolors.gray("   No unused packages found to remove.\n"))
      }
    } else {
      console.log(picocolors.yellow("   [DRY RUN] Would uninstall packages\n"))
    }

    console.log(
      picocolors.gray(`   Installing: ${packagesToUpdate.join(", ")}\n`),
    )

    if (!dry) {
      const installCmd =
        packageManager === "npm"
          ? `npm install ${packagesToUpdate.join(" ")}`
          : packageManager === "yarn"
            ? `yarn add ${packagesToUpdate.join(" ")}`
            : `pnpm add ${packagesToUpdate.join(" ")}`

      execSync(installCmd, { stdio: verbose ? "inherit" : "pipe" })
    } else {
      console.log(picocolors.yellow("   [DRY RUN] Would install packages\n"))
    }

    console.log(picocolors.green("   ✅ Packages updated!\n"))
  } catch (error) {
    console.error(picocolors.red("\n❌ Failed to update packages.\n"))
    if (error instanceof Error && verbose) {
      console.error(picocolors.gray(error.message))
    }
    process.exit(1)
  }

  // Install snippets
  console.log(picocolors.blue("📦 Installing Chakra UI snippets...\n"))
  console.log(
    picocolors.gray(
      "   Snippets provide pre-built component compositions to speed up development.\n",
    ),
  )

  const snippetResponse = await prompts({
    type: "confirm",
    name: "installSnippets",
    message: "Do you want to install component snippets?",
    initial: true,
  })

  if (snippetResponse.installSnippets) {
    try {
      if (!dry) {
        console.log(
          picocolors.gray("\n   Running: npx @chakra-ui/cli snippet add\n"),
        )
        execSync("npx @chakra-ui/cli snippet add", {
          stdio: "inherit",
        })
        console.log(picocolors.green("\n   ✅ Snippets installed!\n"))
      } else {
        console.log(
          picocolors.yellow(
            "   [DRY RUN] Would run: npx @chakra-ui/cli snippet add\n",
          ),
        )
      }
    } catch {
      console.error(
        picocolors.yellow(
          "\n⚠️  Snippet installation failed. You can run it manually later:\n",
        ),
      )
      console.log(picocolors.gray("   npx @chakra-ui/cli snippet add\n"))
    }
  } else {
    console.log(
      picocolors.gray(
        "\n   Skipped. You can install snippets later with: npx @chakra-ui/cli snippet add\n",
      ),
    )
  }

  // Ask which transforms to run
  console.log(picocolors.blue("🔄 Running codemods...\n"))

  const response = await prompts({
    type: "multiselect",
    name: "transforms",
    message: "Select transforms to run:",
    choices: upgradeTransforms.map((t) => ({
      title: t,
      value: t,
      selected: true,
    })),
    hint: "Space to select, Enter to confirm",
  })

  if (!response.transforms || response.transforms.length === 0) {
    console.log(
      picocolors.gray("\nNo transforms selected. Upgrade complete!\n"),
    )
    return
  }

  const targetPaths = ["./src", "./app", "./components", "."]
    .filter((p) => fs.existsSync(p))
    .slice(0, 1)

  const targetPath = targetPaths[0] || "."

  console.log(picocolors.gray(`   Target directory: ${targetPath}\n`))

  // Run selected transforms
  for (const transformName of response.transforms) {
    await runTransform(transformName, targetPath, { dry, force: true })
  }

  console.log(picocolors.bold(picocolors.green("\n🎉 Upgrade complete!\n")))

  console.log(picocolors.gray("Next steps:\n"))
  console.log(
    picocolors.gray(
      "  1. Review the changes made by the codemods\n" +
        "  2. Run your tests to ensure everything works\n" +
        "  3. Check the migration guide for manual changes: https://chakra-ui.com/docs/get-started/migration\n",
    ),
  )
}
