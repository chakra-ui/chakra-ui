import shell from "shelljs"
import rename from "./utils/rename-file"
// import editJson from "edit-json-file"
// import fs from "fs-utils"
import getLernaPackages from "./utils/get-lerna-pkgs"

const pkgs = getLernaPackages()

// pkgs.forEach((pkg) => {
//   const path = fs.resolve("packages", pkg.folder, "package.json")
//   const pkgJson = editJson(path)
//   pkgJson.set(
//     "scripts.start",
//     'nodemon --exec yarn build -e ts,tsx --ignore dist/ --ignore src/tests/ --ignore "*.stories.tsx"',
//   )
//   pkgJson.save()
// })

// const pkg = "theme"
// shell.find(`packages/${pkg}/src`).forEach(rename)
