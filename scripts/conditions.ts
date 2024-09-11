import { existsSync, renameSync, writeFileSync } from "fs"
import { resolve } from "path/posix"

const backupFilename = "package.backup.json"

async function main() {
  const cwd = process.cwd()

  const sourcePath = resolve(cwd, "package.json")
  const backupPath = resolve(cwd, backupFilename)

  if (process.argv.includes("--restore")) {
    return restore({
      sourcePath,
      backupPath,
    })
  }

  await clean({
    sourcePath,
    backupPath,
  })
}

async function clean(options: { sourcePath: string; backupPath: string }) {
  const packageJson = (await import(options.sourcePath)).default

  let changed = false

  for (const key in packageJson.exports) {
    if (packageJson.exports[key]["source"]) {
      delete packageJson.exports[key]["source"]
      changed = true
    }
  }

  if (changed) {
    await backup(options)
    writeFileSync(
      options.sourcePath,
      `${JSON.stringify(packageJson, null, 2)}\n`,
    )
  }
}

async function backup({
  sourcePath,
  backupPath,
}: {
  sourcePath: string
  backupPath: string
}) {
  renameSync(sourcePath, backupPath)
}

async function restore({
  sourcePath,
  backupPath,
}: {
  sourcePath: string
  backupPath: string
}) {
  const exists = existsSync(backupPath)
  console.log({ exists })
  if (exists) {
    renameSync(backupPath, sourcePath)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
