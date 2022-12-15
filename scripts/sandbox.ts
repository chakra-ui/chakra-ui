import findPackages from "find-packages"
import { promises as fs } from "fs"

async function main() {
  const pkgs = await findPackages("packages")
  await Promise.all(
    pkgs.map(async (pkg) => {
      try {
        await fs.rm(`${pkg.dir}/tsup.config.ts`)
        if (pkg.manifest.name !== "@chakra-ui/theme") {
          await fs.rm(`${pkg.dir}/clean-package.config.json`)
        }
      } catch (error) {
        // no-op
      }

      let data = {
        ...pkg.manifest,
        "clean-package": "../../../clean-package.config.json",
        scripts: {
          ...pkg.manifest.scripts,
          "vite-node": "vite -c ../../../vite.config.ts",
          build: "pnpm vite-node build -- --dts",
          "build:fast": "pnpm vite-node build",
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
