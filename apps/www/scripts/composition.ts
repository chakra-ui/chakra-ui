import { consola } from "consola"
import { findUpSync } from "find-up"
import { ensureDirSync } from "fs-extra"
import { readFileSync, readdirSync } from "node:fs"
import { writeFile } from "node:fs/promises"
import { basename, extname, join } from "node:path"

function getBaseDirectory() {
  const dir = findUpSync("compositions", { type: "directory" })
  if (!dir) throw new ReferenceError("Could not find compositions directory")
  return dir
}

function getWwwOutput() {
  const dir = findUpSync("public", { type: "directory" })
  if (!dir) throw new ReferenceError("Could not find public directory")
  return dir
}

function getImports(content: string) {
  const imports = new Set<string>()
  const matches = Array.from(content.matchAll(/from ["'](.+)["']/g))
  for (const match of matches) {
    imports.add(match[1])
  }
  return imports
}

function isNpmDependency(dependencies: string[], _import: string) {
  return dependencies.some((dep) => _import.includes(dep))
}

function isFileDependency(_import: string) {
  return _import.startsWith(".") || _import.startsWith("compositions/ui")
}

function resolveDependency(specifier: string, dependencies: string[]) {
  let result = dependencies.find((dependency) => specifier === dependency)
  if (result) return result
  const matches = Array.from(specifier.matchAll(/(.+?)\//g))
  if (matches.length) result = matches[0][1]
  return result
}

function getDependencies(imports: Set<string>, dependencies: string[]) {
  const fileDependencies = new Set<string>()
  const npmDependencies = new Set<string>()

  for (const _import of Array.from(imports)) {
    if (isNpmDependency(dependencies, _import)) {
      const resolved = resolveDependency(_import, dependencies)
      npmDependencies.add(resolved!)
    } else if (isFileDependency(_import)) {
      fileDependencies.add(_import)
    }
  }

  return { npmDependencies, fileDependencies }
}

const setFileExtension = (file: string, ext: string) =>
  basename(file, extname(file)) + ext

const excludedDependencies = ["@chakra-ui/react", "react", "react-dom"]

const camelCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const getFileName = (file: string) => basename(file, extname(file))

const getComponentName = (file: string) =>
  getFileName(file).split("-").map(camelCase).join("")

async function main() {
  const dir = getBaseDirectory()
  const publicDir = getWwwOutput()

  const pkgJson = readFileSync(join(dir, "package.json"), "utf-8")

  const dependencies = Object.keys(JSON.parse(pkgJson).dependencies).filter(
    (dep) => !excludedDependencies.includes(dep),
  )

  const srcDir = join(dir, "src", "ui")
  //   const examplesDir = join(dir, "src", "examples")

  const files = readdirSync(srcDir, { encoding: "utf-8" })

  const result = files.map((file) => {
    const filePath = join(srcDir, file)
    const content = readFileSync(filePath, "utf-8")
    const { npmDependencies, fileDependencies } = getDependencies(
      getImports(content),
      dependencies,
    )
    return {
      path: join(publicDir, "compositions", setFileExtension(file, ".json")),
      data: {
        type: "composition",
        npmDependencies: Array.from(npmDependencies),
        fileDependencies: Array.from(fileDependencies),
        id: getFileName(file),
        file: { name: file, content: content.replace("compositions/ui", ".") },
        component: getComponentName(file),
      },
    }
  })

  result.push({
    path: join(publicDir, "compositions", "index.json"),
    //@ts-expect-error
    data: result.map(({ data }) => ({
      type: data.type,
      id: data.id,
      file: data.file.name,
      component: data.component,
      npmDependencies: data.npmDependencies,
      fileDependencies: data.fileDependencies,
    })),
  })

  ensureDirSync(join(publicDir, "compositions"))

  const promises = result.map(({ path, data }) => {
    const content = JSON.stringify(data, null, 2)
    return writeFile(path, content)
  })

  await Promise.all(promises)

  consola.success("Composition files generated 🎉. Happy coding!")
}

main().catch((err) => {
  consola.error(err)
  process.exit(1)
})
