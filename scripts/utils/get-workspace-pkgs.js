function prepare(pkgs) {
  const paths = pkgs.flatMap((p) => glob.sync(p))
  return paths.map((path) => {
    const pkg = getPackageJson(path)
    const name = pkg.get("name")
    return { name, path, pkgJson }
  })
}

export default function getPreconstructPackages() {
  const packages = getPackageJson(".").get("preconstruct.packages")
  return prepare(packages)
}

export default function getWorkspacePackages() {
  const packages = getPackageJson(".").get("workspace.packages")
  return prepare(packages)
}
