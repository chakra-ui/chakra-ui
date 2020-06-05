import shell from "shelljs"
import path from "path"
// import editJson from "edit-json-file"
// import fs from "fs-utils"
// import getLernaPackages from "./utils/get-lerna-pkgs"

// const pkgs = getLernaPackages()

// pkgs.forEach((pkg) => {
//   const path = fs.resolve("packages", pkg.folder, "package.json")
//   const pkgJson = editJson(path)
//   pkgJson.set(
//     "scripts.start",
//     'nodemon --exec yarn build -e ts,tsx --ignore dist/ --ignore src/tests/ --ignore "*.stories.tsx"',
//   )
//   pkgJson.save()
// })

function kebab(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase()
}

function rename(file) {
  const ext = path.extname(file)
  if (ext && ext !== ".md" && !file.includes("index")) {
    const renamed = file.split(".").map(kebab).join(".")
    if (file === renamed) return
    shell.exec(`git mv --force ${file} ${renamed}`)
  }
}

const pkg = "hooks"
shell.find(`packages/${pkg}/src`).forEach(rename)
