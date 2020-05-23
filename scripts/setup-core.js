import shell from "shelljs"
import fs from "fs-utils"
import prettier from "prettier"
import editJson from "edit-json-file"

const omittedPkgs = [
  "core",
  "theme",
  "preset-stripe",
  "icons",
  "transition",
  "utils",
  "hooks",
  "parser",
  "color-mode",
  "layout",
]

const pkgs = shell.exec("lerna ls --toposort --json --loglevel silent")

const pkgArray = JSON.parse(pkgs)
  .map((pkg) => pkg.name)
  .filter((pkg) => {
    const name = pkg.split("/")[1]
    return !omittedPkgs.includes(name)
  })

let content = ""
pkgArray.forEach((pkg) => {
  content += `export * from "${pkg}"\n`
})

content = prettier.format(content, { semi: false, parser: "typescript" })

const coreDir = fs.resolve("packages/core/src", "index.tsx")

try {
  fs.writeFileSync(coreDir, content)
} catch (e) {
  console.log(e)
}

const pkgJson = editJson("packages/core/package.json")
pkgJson.unset("dependencies")

pkgArray.forEach((pkg) => {
  const { version } = JSON.parse(pkgs).find((i) => i.name == pkg)
  pkgJson.set(`dependencies.${pkg}`, version)
})

pkgJson.save()

shell.exec("yarn core build")
