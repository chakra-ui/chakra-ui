import concurrently from "concurrently"
import fs from "fs-extra"
import path from "path"
import { Command } from "commander"
import { editPackageJson } from "./utils/package-json"

const program = new Command()
const cwd = process.cwd()

program.name("Build Tools")

program
  .command("build")
  .option("-w, --watch", "watch for changes")
  .action((opts) => {
    const { watch } = opts
    const cmd: Array<{ dest: string; cmd: string; entry: string }> = []

    forEach(({ entry, entrypoint }) => {
      const dest = path.join(cwd, entry)
      fs.ensureDirSync(dest)
      fs.writeFileSync(
        path.join(dest, "package.json"),
        JSON.stringify({
          main: `dist/${entry}.js`,
          module: `dist/${entry}.mjs`,
        }),
      )

      cmd.push({
        entry,
        dest,
        cmd: `tsup src/${entrypoint} --out-dir ${entry}/dist${
          watch ? " --watch" : ""
        }`,
      })
    })

    concurrently(
      cmd.map((item) => ({
        name: item.entry,
        command: item.cmd,
      })),
    )
  })

program
  .command("clean")
  .description("Cleanup all entrypoints")
  .action(() => {
    forEach(({ entry }) => {
      const dest = path.join(cwd, entry)
      try {
        fs.rmSync(dest, { recursive: true })
      } catch {
        //
      }
    })
  })

program
  .command("files")
  .description("Modify `files` package.json for public packages")
  .action(() => {
    editPackageJson(cwd, {
      files: ["dist/**"].concat(map((opt) => opt.entry)),
    })
  })

program.parse(process.argv)

// ----------------------------------------------------------------

export function getEntryPointsFromSrc(cwd: string) {
  return fs.readdirSync(`${cwd}/src`)
}

type Entrypoints = string[] | true | undefined

function getEntrypoints(cwd: string) {
  const packageJson = JSON.parse(fs.readFileSync(`${cwd}/package.json`, "utf8"))
  const entrypoints: Entrypoints = packageJson.entrypoints
  if (Array.isArray(entrypoints)) return entrypoints
  if (entrypoints) return getEntryPointsFromSrc(cwd)
}

function getEntry(entrypoint: string) {
  return entrypoint.replace(path.extname(entrypoint), "")
}

function forEach(fn: (opt: { entry: string; entrypoint: string }) => void) {
  const entrypoints = getEntrypoints(cwd) ?? []
  for (const entrypoint of entrypoints) {
    if (entrypoint === "index") continue
    fn({ entry: getEntry(entrypoint), entrypoint })
  }
}

function map<T>(fn: (opt: { entry: string; entrypoint: string }) => T) {
  const entrypoints = getEntrypoints(cwd) ?? []
  return entrypoints
    .filter((entrypoint) => entrypoint !== "index")
    .map((entrypoint) => fn({ entry: getEntry(entrypoint), entrypoint }))
}
