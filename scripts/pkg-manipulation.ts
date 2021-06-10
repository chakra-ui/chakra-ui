import path from "path"
import { constants, promises as fs } from "fs"
import { findRoot } from "@manypkg/find-root"
import { getPackages } from "@manypkg/get-packages"
import { get, set, unset, compose } from "lodash/fp"

type JsonFile = Record<string, any>

interface Command {
  (file: JsonFile): Promise<JsonFile | undefined>
}

async function main(file: string, command: Command) {
  const root = await findRoot(process.cwd())
  const packages = await getPackages(root)
  const files = packages.packages.map((pkg) => path.join(pkg.dir, file))
  await Promise.all(
    files.map(async (file) => {
      try {
        await fs.access(file, constants.F_OK)
      } catch (_error) {
        return file
      }

      const jsonFile: JsonFile = (await import(file)).default

      const result = await command(jsonFile)
      if (!result) return file

      await fs.writeFile(file, JSON.stringify(result, null, 2), "utf-8")
    }),
  )
}

const commands: Record<string, Command> = {
  unifyLint,
  fixBuildTypes,
  readdIncludePath,
}

const fileArg = process.argv[2]
if (!fileArg) {
  console.error(`File ${fileArg} not provided`)
}

const commandArg = process.argv[3]
if (!commandArg) {
  console.error(`Command ${commandArg} not found`)
  process.exit(1)
}

const command = commands[commandArg]
if (!command) {
  console.error(`Command ${commandArg} not available`)
}

main(fileArg, command)

async function unifyLint(file: JsonFile): Promise<JsonFile | undefined> {
  const lintSrc = get("scripts.lint:src", file)
  if (!lintSrc) return

  return compose(
    unset("scripts.lint:types"),
    unset("scripts.lint:src"),
    set("scripts.lint", lintSrc),
  )(file)
}

const updatedBuildTypesCommand =
  "tsc --emitDeclarationOnly --declaration --declarationDir dist/types"
async function fixBuildTypes(pkg: JsonFile): Promise<JsonFile | undefined> {
  if (!get("scripts.build:types", pkg)) return
  return set("scripts.build:types", updatedBuildTypesCommand)(pkg)
}

async function readdIncludePath(file: JsonFile): Promise<JsonFile | undefined> {
  if (get("include", file)) return
  return set("include", ["src"], file)
}
