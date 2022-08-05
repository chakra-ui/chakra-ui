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
        main: "dist/index.cjs.js",
        module: "dist/index.esm.js",
        scripts: {
          ...pkg.manifest.scripts,
          build: !tsx
            ? "tsup src/index.ts --dts"
            : "JSX=1 tsup src/index.ts --dts",
          "build:fast": !tsx ? "tsup src/index.ts" : "JSX=1 tsup src/index.ts",
          dev: "pnpm build -- --watch",
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
