import shell from "shelljs"

export default function getLernaPackages() {
  const pkgs = shell.exec("lerna ls --toposort --json --loglevel silent")
  return JSON.parse(pkgs).map((pkg) => ({
    name: pkg.name,
    folder: pkg.name.split("/")[1],
  }))
}
