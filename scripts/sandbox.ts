import findPackages from "find-packages"
import { promises as fs } from "fs"

async function main() {
  const pkgs = await findPackages("packages")
  await Promise.all(
    pkgs.map(async (pkg) => {
      let data = {
        ...pkg.manifest,
        main: "dist/index.js",
        module: "dist/index.mjs",
        types: "dist/index.d.ts",
        scripts: {
          ...pkg.manifest.scripts,
          "build:fast": "tsup src/index.ts --format=esm,cjs",
          build: "tsup src/index.ts --format=esm,cjs --dts",
          dev: "pnpm build --watch",
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
