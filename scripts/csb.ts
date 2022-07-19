/**
 * Write the packages to `.codesandbox/ci.json`
 */

import editJson from "edit-json-file"
import fs from "fs"

const ciJson = editJson(".codesandbox/ci.json")

// get all files in package/* excluding test-utils/
const packages = fs
  .readdirSync("package")
  .filter((file) => !file.includes("test-utils"))

ciJson.set("packages", packages)
ciJson.save()
