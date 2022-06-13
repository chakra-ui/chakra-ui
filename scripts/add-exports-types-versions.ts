import { getEntrypoints } from "../configs/tsup/entrypoints"
import { getWorkspacePackages } from "./utils/get-packages"
import { editPackageJson } from "./utils/package-json"

export function addExportsAndTypesVersionsToPackageJson(cwd: string) {
  const entries = getEntrypoints(cwd) ?? []

  const entrypoints = Object.fromEntries(
    entries.map((entry) => {
      const filename = entry.split(".")[0].replace("src/", "")
      let key = `./${filename}`

      if (key.endsWith("/index")) {
        key = key.replace("/index", "")
      } else if (key == "index") {
        key = "."
      }

      return [
        key,
        {
          import: `./dist/${filename}.mjs`,
          require: `./dist/${filename}.js`,
          types: `./dist/${filename}.d.ts`,
        },
      ]
    }),
  )

  editPackageJson(cwd, {
    exports: {
      // "./*": {
      //   import: "./dist/*.mjs",
      //   require: "./dist/*.js",
      // },
      // ".": {
      //   import: "./dist/index.mjs",
      //   require: "./dist/index.js",
      // },
      ...entrypoints,
      "./package.json": "./package.json",
    },
    typesVersions: {
      "*": {
        "*": ["dist/*.d.ts"],
      },
    },
  })
}

export function main() {
  getWorkspacePackages().forEach(({ path }) => {
    const entrypoints = getEntrypoints(path)
    if (entrypoints) {
      addExportsAndTypesVersionsToPackageJson(path)
    }
  })
}

main()
