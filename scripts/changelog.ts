import prettier from "prettier"
import fs from "fs"
import assembleReleasePlan from "@changesets/assemble-release-plan"
import { read } from "@changesets/config"
import { readPreState } from "@changesets/pre"
import readChangesets from "@changesets/read"
import { ComprehensiveRelease, NewChangeset } from "@changesets/types"
import { getPackages } from "@manypkg/get-packages"
import { startCase, padStart } from "lodash"

const reactPkg = "@chakra-ui/react"
const docsPkg = "@chakra-ui/docs"

const cwd = process.cwd()

function getPackageName(name: string) {
  return startCase(name.replace("@chakra-ui/", ""))
}

function getReleaseSummary(
  changesets: NewChangeset[],
  release: ComprehensiveRelease,
) {
  const formattedChangesets = release.changesets.map((changeset) => {
    const { summary } = changesets.find((cs) => cs.id === changeset) ?? {}
    return summary?.trim().startsWith("-") ? summary : `- ${summary} \n`
  })

  const subPackageName = `**${getPackageName(release.name)}** \`v${
    release.newVersion
  }\``

  const rootPackageName = `\`${reactPkg}@${release.newVersion}\``
  const displayName =
    release.name === reactPkg ? rootPackageName : subPackageName

  return {
    ...release,
    changesets: formattedChangesets,
    displayName: displayName.replace(/,\s*$/, ""),
  }
}

function getCurrentDate() {
  const date = new Date()
  const day = padStart(date.getDate().toString(), 2, "0")
  const month = padStart((date.getMonth() + 1).toString(), 2, "0")
  const year = date.getFullYear()

  return `## ${day}-${month}-${year}`
}

async function getChangesetEntries() {
  const packages = await getPackages(cwd)
  const preState = await readPreState(cwd)
  const config = await read(cwd, packages)
  const changesets = await readChangesets(cwd)

  const releasePlan = assembleReleasePlan(
    changesets,
    packages,
    config,
    preState,
  )

  const releases = releasePlan.releases
    .filter((release) => release.changesets.length > 0)
    .filter((release) => release.name !== docsPkg)
    .map((release) => getReleaseSummary(releasePlan.changesets, release))
    .sort((a, b) => {
      if (a.name === reactPkg) return -1
      if (b.name === reactPkg) return 1
      return 0
    })

  return releases
}

async function main() {
  const releases = await getChangesetEntries()

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

  // replace in changelog
  const changelogPath = `${cwd}/CHANGELOG.md`
  const changelog = await fs.promises.readFile(changelogPath, "utf8")
  const newChangelog = changelog.replace(
    "<!-- CHANGELOG:INSERT -->",
    `<!-- CHANGELOG:INSERT -->\n\n${content}`,
  )
  // write new changelog
  await fs.promises.writeFile(changelogPath, newChangelog)

  // write to rc file
  fs.writeFileSync(
    `${cwd}/.changelogrc`,
    ["**New Release Update :tada:**", content].join("\n\n"),
  )
}

main()
