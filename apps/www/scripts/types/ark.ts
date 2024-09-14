import consola from "consola"
import { ensureDirSync } from "fs-extra"
import fetch from "node-fetch"
import { writeFile } from "node:fs/promises"
import { kebabCase } from "scule"

const list = async () => {
  const prom = await fetch("http://ark-ui.com/api/types/react")
  const res = await prom.json()
  return res as string[]
}

const generate = async (component: string) => {
  const prom = await fetch(`http://ark-ui.com/api/types/react/${component}`)
  const res = await prom.json()
  return res as Record<string, any>
}

async function main() {
  const listOfDirs = await list()
  consola.box("Fetching types for", listOfDirs.length, "components")

  const entries = await Promise.all(
    listOfDirs.map(async (dir) => [dir, await generate(dir)]),
  )

  const json = Object.fromEntries(entries)
  ensureDirSync("public/types/ark")

  const proms = listOfDirs.map(async (dir) => {
    const outPath = `public/types/ark/${kebabCase(dir)}.json`
    consola.info("Writing", outPath)
    return writeFile(outPath, JSON.stringify(json[dir], null, 2))
  })

  await Promise.all(proms)

  consola.success("Done ✅")
}

main().catch((err) => {
  consola.error(err.message)
  process.exit(1)
})
