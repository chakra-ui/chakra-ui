import findPackages from "find-packages"
import { promises as fs } from "fs"

async function main() {
  const pkgs = await findPackages("packages")
  await Promise.all(
    pkgs.map(async (pkg) => {
      // check if src contains tsx files
      const files = await fs.readdir(`${pkg.dir}/src`)
      const tsx = files.some((f) => f.endsWith(".tsx"))

      let data = {
        ...pkg.manifest,
        scripts: {
          ...pkg.manifest.scripts,
          prepack: "clean-package",
          postpack: "clean-package restore",
        },
      }

      return fs.writeFile(
        `${pkg.dir}/package.json`,
        JSON.stringify(data, null, 2),
      )
    }),
  )
}

main()
