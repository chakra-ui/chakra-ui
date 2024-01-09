import { findPackages } from "find-packages"
import { promises as fs } from "fs"

async function main() {
  const pkgs = await findPackages("packages")
  await Promise.all(
    pkgs.map(async (pkg) => {
      if (pkg.dir.includes("theme")) return
      let data = {
        ...pkg.manifest,
        main: "dist/index.js",
        module: "dist/index.mjs",
        types: "dist/index.d.ts",
        exports: {
          ".": {
            types: "./dist/index.d.ts",
            import: "./dist/index.mjs",
            source: "./src/index.ts",
            require: "./dist/index.js",
          },
          "./package.json": "./package.json",
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
