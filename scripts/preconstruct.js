import fs from "fs-utils"
import getPreconstructPackages from "./utils/get-workspace-pkgs"
import { deletePackageJson, editPackageJson } from "./utils/package-json"

const KEYS_TO_DELETE = ["typings", "exports", "scripts"]
const FILES_TO_DELETE = ["jest.config.js", "tsconfig.json"]

async function fix() {
  const packages = getPreconstructPackages()

  packages.forEach(({ name, path }) => {
    const name = name.replace("@", "").replace("/", "-")

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
      try {
        fs.del(fs.resolve(path, file))
      } catch (error) {
        console.log(`${file} could not be deleted in ${path}`)
      }
    })
  })
}

fix()
