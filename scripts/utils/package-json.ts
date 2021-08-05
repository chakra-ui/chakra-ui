import editJson from "edit-json-file"
import path from "path"

// read package.json
export function getPackageJson(dir: string) {
  const pkgPath = path.resolve(dir, "package.json")
  return editJson(pkgPath)
}

export function deletePackageJson(dir: string, key: string) {
  const pkgJson = getPackageJson(dir)
  pkgJson.unset(key)
  pkgJson.save()
}

/**
 * Edit the package.json in a directory
 * @param {String} dir the directory path
 * @param {Object} content the content object
 * @param {Function} getPath function to resolve key (for nested path)
 */
export function editPackageJson(dir: string, content: Record<string, any>) {
  // read package.json
  const pkgJson = getPackageJson(dir)

  // update entrypoint fields
  for (const key in content) {
    const valueInJson = pkgJson.get(key)
    const value = content[key]

    if (valueInJson != value) {
      pkgJson.set(key, value)
    }
  }

  pkgJson.save()
}
