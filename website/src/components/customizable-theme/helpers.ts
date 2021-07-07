import { createContext } from "react"

export const CustomizableThemeContext = createContext(undefined)

export function isValidGistId(gistId: string | string[]): boolean {
  return !!gistId && gistId.length === 32
}

export type File = {
  gistId: string
  filename: string
  content: string
  localModule: any
}

export async function getFromGistId(gistId): Promise<File> {
  const response = await fetch(`https://api.github.com/gists/${gistId}`)
  if (response.status !== 200) {
    throw new Error("Fetching Gist failed! Please try again")
  }
  const { files } = await response.json()
  if (!files || 0 === Object.keys(files).length) {
    throw new Error("No file in the Gist!")
  }
  const file = files[Object.keys(files)[0]]
  const { filename, content } = file
  const rawTrimeedContent = content?.trim()
  if (!rawTrimeedContent) {
    throw new Error("No content in the file!")
  }
  // eval
  try {
    const exports = {}
    const localModule = { exports }
    const execContent = new Function("module", "exports", rawTrimeedContent)
    execContent(localModule, exports)

    return {
      gistId,
      filename,
      content,
      localModule,
    }
  } catch (e) {
    console.error(e)
    throw new Error(`Error while evaulating the JavaScript module in your Gist.
    Please define your custom theme in a Common-JS module.`)
  }
}
