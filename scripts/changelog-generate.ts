import fs from "fs"
import prettier from "prettier"
import { getCurrentDate, getChangesetEntries } from "./utils/changeset-utils"

async function main() {
  const { summary: releases } = await getChangesetEntries({
    cwd: process.cwd(),
  })

  const releaseEntries = releases.map((release) =>
    [release.displayName, "\n\n", ...release.changesets].join(""),
  )

  let content = [getCurrentDate(), ...releaseEntries].join("\n\n")

  content = prettier.format(content, {
    parser: "markdown",
    printWidth: 80,
    singleQuote: true,
    trailingComma: "es5",
  })

  // write to rc file
  fs.writeFileSync(`.changelogrc`, content)
}

main()
