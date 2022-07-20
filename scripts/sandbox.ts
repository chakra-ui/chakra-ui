import findPackages from "find-packages"
import { promises as fs } from "fs"

async function main() {
  const pkgs = await findPackages("packages")
  await Promise.all(
    pkgs.map(async (pkg) => {
      let tsConfig = {
        ...pkg.manifest,
        scripts: {
          ...pkg.manifest.scripts,
          typecheck: "tsc --noEmit",
        },
      }
      return fs.writeFile(
        `${pkg.dir}/package.json`,
        JSON.stringify(tsConfig, null, 2),
      )
    }),
  )
}

main()
