import fs from "fs"

const cwd = process.cwd()

async function main() {
  const content = fs.readFileSync(`${cwd}/.changelogrc`).toString()
  // If "live=false" is missing in jsx snippet, add it!
  const noLiveContent = content.replace(
    /^(```jsx)(\s?)+$/gim,
    "```jsx live=false",
  )
  const changelogPath = `${cwd}/CHANGELOG.md`
  const changelog = await fs.promises.readFile(changelogPath, "utf8")
  const newChangelog = changelog.replace(
    "<!-- CHANGELOG:INSERT -->",
    `<!-- CHANGELOG:INSERT -->\n\n${noLiveContent}`,
  )
  // write new changelog
  await fs.promises.writeFile(changelogPath, newChangelog)
}

main()
