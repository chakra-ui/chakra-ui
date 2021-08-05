import path from "path"
import fs from "fs"
import { getPreconstructPackages } from "./utils/get-packages"
import { deletePackageJson, editPackageJson } from "./utils/package-json"

const KEYS_TO_DELETE = ["typings", "exports", "scripts"]
const FILES_TO_DELETE = ["jest.config.js", "tsconfig.json"]

async function fix() {
  const packages = getPreconstructPackages()

  packages.forEach((pkg) => {
    const name = pkg.name.replace("@", "").replace("/", "-")

    editPackageJson(pkg.path, {
      main: `dist/${name}.cjs.js`,
      module: `dist/${name}.esm.js`,
      types: `dist/${name}.cjs.d.ts`,
    })

    KEYS_TO_DELETE.forEach((key) => {
      try {
        deletePackageJson(pkg.path, key)
      } catch (error) {
        console.log(`${key} not found for ${pkg.path}/package.json`)
      }
    })

    FILES_TO_DELETE.forEach((file) => {
      try {
        fs.unlinkSync(path.resolve(pkg.path, file))
      } catch (error) {
        console.log(`${file} could not be deleted in ${pkg.path}`)
      }
    })
  })
}

fix()
