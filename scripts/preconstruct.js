import {
  deletePackageJson,
  editPackageJson,
  getPackageJson,
} from "./utils/package-json"
import glob from "glob"
import fs from "fs-utils"

const KEYS_TO_DELETE = ["typings", "exports", "scripts"]
const FILES_TO_DELETE = ["jest.config.js", "tsconfig.json"]

async function fix() {
  const packages = getPackageJson(".").get("preconstruct.packages")
  const paths = packages.flatMap((p) => glob.sync(p))

  paths.forEach((path) => {
    const pkg = getPackageJson(path)
    const name = pkg.get("name").replace("@", "").replace("/", "-")

    editPackageJson(path, {
      main: `dist/${name}.cjs.js`,
      module: `dist/${name}.esm.js`,
      types: `dist/${name}.cjs.d.ts`,
    })

    KEYS_TO_DELETE.forEach((key) => {
      try {
        deletePackageJson(path, key)
      } catch (error) {
        console.log(`${key} not found for ${path}/package.json`)
      }
    })

    FILES_TO_DELETE.forEach((file) => {
      fs.del(fs.resolve(path, file))
    })
  })
}

fix()
