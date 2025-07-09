import consola from "consola"
import { ensureDirSync } from "fs-extra"
import { writeFile } from "node:fs/promises"
import { kebabCase } from "scule"

const ARK_BASE_URL = "http://ark-ui.com/api/types/react"

export const listArkComponents = async () => {
  const prom = await fetch(ARK_BASE_URL)
  const res = await prom.json()
  return res as string[]
}

export const getArkComponentProps = async (component: string) => {
  const componentPropsResp = await fetch(`${ARK_BASE_URL}/${component}`)
  const res = await componentPropsResp.json()
  return res as Record<string, any>
}

async function main() {
  const listOfDirs = await listArkComponents()
  consola.box("Fetching types for", listOfDirs.length, "components")

  const entries = await Promise.all(
    listOfDirs.map(async (dir) => [dir, await getArkComponentProps(dir)]),
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
