import fs from "fs"

const cwd = process.cwd()

async function main() {
  const content = fs.readFileSync(`${cwd}/.changelogrc`).toString()
  const changelogPath = `${cwd}/CHANGELOG.md`
  const changelog = await fs.promises.readFile(changelogPath, "utf8")
  const newChangelog = changelog.replace(
    "<!-- CHANGELOG:INSERT -->",
    `<!-- CHANGELOG:INSERT -->\n\n${content}`,
  )
  // write new changelog
  await fs.promises.writeFile(changelogPath, newChangelog)
}

main()
