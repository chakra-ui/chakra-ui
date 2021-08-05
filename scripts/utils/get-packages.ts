import glob from "glob"
import { getPackageJson } from "./package-json"

function prepare(pkgs: string[]) {
  const paths = pkgs.flatMap((p) => glob.sync(p))
  return paths.map((path) => {
    const pkgJson = getPackageJson(path)
    const name = pkgJson.get("name")
    return { name, path, pkgJson }
  })
}

export function getPreconstructPackages() {
  const packages = getPackageJson(".").get("preconstruct.packages")
  return prepare(packages)
}

export function getWorkspacePackages() {
  const packages = getPackageJson(".").get("workspace.packages")
  return prepare(packages)
}
