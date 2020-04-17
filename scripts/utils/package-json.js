import editJson from "edit-json-file"
import fs from "fs-utils"

// read package.json
export function getPackageJson(dir) {
  const pkgPath = fs.resolve(dir, "package.json")
  return editJson(pkgPath)
}

export function deletePackageJson(dir, key) {
  const pkgJson = getPackageJson(dir)
  pkgJson.unset(key)
  // pkgJson.save()
  console.log(pkgJson)
}

/**
 * Edit the package.json in a directory
 * @param {String} dir the directory path
 * @param {Object} content the content object
 * @param {Function} getPath function to resolve key (for nested path)
 */
export function editPackageJson(dir, content, group) {
  // read package.json
  const pkgJson = getPackageJson(dir)

  // update entrypoint fields
  for (const key in content) {
    // check the existing value in package.json
    const path = group ? `${group}.${key}` : key
    const valueInJson = pkgJson.get(path)
    const value = content[key]

    if (valueInJson != value) {
      pkgJson.set(path, value)
    }
  }

  // pkgJson.save()
}
