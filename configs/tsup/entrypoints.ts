import fs from "fs"

export function getEntryPointsFromSrc(cwd: string) {
  return fs.readdirSync(`${cwd}/src`).map((file) => `src/${file}`)
}

type Entrypoints = string[] | true | undefined

export function getEntrypoints(cwd: string) {
  const packageJson = JSON.parse(fs.readFileSync(`${cwd}/package.json`, "utf8"))
  const entrypoints: Entrypoints = packageJson.entrypoints
  if (Array.isArray(entrypoints)) return entrypoints
  if (entrypoints) return getEntryPointsFromSrc(cwd)
}
