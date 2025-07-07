import consola from "consola"
import fetch from "node-fetch"
import { join } from "node:path"
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

export const getArkComponentFiles = async (options: { baseDir: string }) => {
  const { baseDir } = options

  const listOfDirs = await listArkComponents()
  consola.box("Fetching types for", listOfDirs.length, "components")

  const entries = await Promise.all(
    listOfDirs.map(async (dir) => [dir, await getArkComponentProps(dir)]),
  )

  const json = Object.fromEntries(entries)

  const files = listOfDirs.map((dir) => {
    const path = join(baseDir, `${kebabCase(dir)}.json`)

    return {
      path,
      content: json[dir],
    }
  })

  return files
}
