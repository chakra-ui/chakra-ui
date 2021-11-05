/**
 * Write the packages to `.codesandbox/ci.json`
 */

import editJson from "edit-json-file"
import shell from "shelljs"

const ciJson = editJson(".codesandbox/ci.json")

const packages = shell
  .ls("-d", "packages/*")
  .filter((p) => !p.endsWith("test-utils"))

ciJson.set("packages", packages)
ciJson.save()
