import findPackages from "find-packages"
import { promises as fs } from "fs"

function modifyDeps(deps: Record<string, string>) {
  const result: Record<string, string> = {}
  for (const key in deps) {
    result[key] = key.startsWith("@chakra-ui/") ? "workspace:*" : deps[key]
  }
  return result
}

async function main() {
  const pkgs = await findPackages(process.cwd())
  await Promise.all(
    pkgs.map(async (pkg) => {
      const dependencies = modifyDeps(pkg.manifest.dependencies!)
      const devDependencies = modifyDeps(pkg.manifest.devDependencies!)
      let newPkg = {
        ...pkg.manifest,
        dependencies,
        devDependencies,
      }

      if (Object.keys(newPkg.devDependencies).length === 0) {
        const { devDependencies, ...newPkgs } = newPkg
        //@ts-ignore
        newPkg = newPkgs
      }

      if (Object.keys(newPkg.dependencies).length === 0) {
        const { dependencies, ...newPkgs } = newPkg
        //@ts-ignore
        newPkg = newPkgs
      }

      return fs.writeFile(
        `${pkg.dir}/package.json`,
        JSON.stringify(newPkg, null, 2),
      )
    }),
  )
}

main()
