/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import shell from "shelljs"

// get all packages in the packages/ directory
const packages = shell.ls("packages")

// get the package.json for each package
packages.forEach((packageName) => {
  let packageJson = require(`../packages/${packageName}/package.json`)

  // delete the `typings`, `exports` and `script` fields from the package.json
  delete packageJson.typings
  delete packageJson.exports
  delete packageJson.scripts

  // add `umd:main` field to the package.json
  const entries = Object.entries(packageJson)

  entries.splice(11, 0, ["preconstruct", {}])

  packageJson = Object.fromEntries(entries)

  // write the updated package.json to the package directory
  shell
    .ShellString(JSON.stringify(packageJson, null, 2))
    .to(`packages/${packageName}/package.json`)
})
