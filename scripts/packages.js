import shell from "shelljs"

const pkgs = shell.exec("lerna ls --toposort --json --loglevel silent")
const pkgArray = JSON.parse(pkgs)
  .map(pkg => pkg.name.split("/")[1])
  .filter(pkg => {
    const firstChar = pkg.charAt(0)
    const filtered = ["a", "b", "c", "d", "e", "f", "g", "h"]
    return !filtered.includes(firstChar)
  })

for (const pkg of pkgArray) {
  shell.exec(`yarn patch ${pkg}`)
}
