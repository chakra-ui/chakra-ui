import path from "path"
import { promises as fs, constants } from "fs"
import glob from "glob"
import prettier from "prettier"

const root = path.resolve(process.cwd())

function resolveFromRoot(...args: string[]) {
  return path.resolve(...args)
}

function readJson(filePath: string) {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  return require(resolveFromRoot(root, filePath))
}

async function writeJsonWithPrettier(o: any, path: string) {
  const json = prettier.format(JSON.stringify(o), { parser: "json" })
  await fs.writeFile(path, json)
}

async function verifyFileExists(path: string) {
  try {
    return fs.access(path, constants.F_OK)
  } catch (_error) {
    console.error("file does not exist", path)
  }
}

async function fixPackageTypesAndTypings(pkg: any, pkgPath: string) {
  const { main } = pkg

  const types = main.replace(".js", ".d.ts")
  const typesPath = resolveFromRoot(pkgPath, types)

  await verifyFileExists(typesPath)

  pkg.types = types
  pkg.typings = types
}

async function fixPackageExports(pkg: any) {
  if (!pkg.exports) return

  const { main, module, exports } = pkg

  const dot = exports["."]
  if (dot) {
    if (dot.require) {
      const requirePath = `./${main}`
      dot.require = requirePath
    }
    if (dot.default) {
      const defaultPath = `./${module}`
      dot.default = defaultPath
    }
  }
}

async function fixPackage(p: string) {
  const pkgPath = path.resolve(root, p)
  const pkgJson = path.join(pkgPath, "package.json")
  const pkg = readJson(pkgJson)

  await Promise.all([
    fixPackageTypesAndTypings(pkg, pkgPath),
    fixPackageExports(pkg),
  ])

  await writeJsonWithPrettier(pkg, pkgJson)
}

async function fix() {
  const packages: string[] = readJson("package.json").preconstruct.packages
  const paths = packages.flatMap((p) => glob.sync(p))
  await Promise.all(paths.map(fixPackage))
}

try {
  fix()
} catch (error) {
  console.error(error)
}
