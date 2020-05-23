// import editJson from "edit-json-file"
// import fs from "fs-utils"
// import getLernaPackages from "./utils/get-lerna-pkgs"

// const pkgs = getLernaPackages()

// pkgs.forEach(pkg => {
//   const path = fs.resolve("packages", pkg.folder, "package.json")
//   const pkgJson = editJson(path)
//   pkgJson.set(
//     "scripts.start",
//     'nodemon --exec yarn build -e ts,tsx --ignore dist/ --ignore src/tests/ --ignore "*.stories.tsx"',
//   )
//   pkgJson.save()
// })

import shell from "shelljs"

const contributors = [
  "walela",
  "tony",
  "tmaximini",
  "skube",
  "singingwolfboy",
  "sinclairnick",
  "ralphilius",
  "rahrang",
  "pierrenel",
  "pgrimaud",
  "orzarchi",
  "nelsonreitz",
  "nainardev",
  "mustaphaturhan",
  "kimroen",
  "jmakGH",
  "jeremyadavis",
  "jatwork",
  "jaredpalmer",
  "ivan-dalmet",
  "illourr",
  "idfunctor",
  "denkigai",
  "codebender828",
  "aaronadamsCA",
  "Youngestdev",
  "SuperSandro2000",
  "Premkumar-Shanmugam",
  "MeixnerTobias",
  "JeremieLeblanc",
  "DominusKelvin",
  "DavidJFelix",
]

contributors.forEach(name => {
  shell.exec(`yarn all-contributors add ${name} code`)
})
