import { createContext } from "react"

export const ThemeConfigContext = createContext(undefined)

export function isValidGistId(gistId: string | string[]): boolean {
  return !!gistId && gistId.length === 32
}

export type File = {
  filename: string
  content: string
}

export async function getFromGistId(gistId) {
  const response = await fetch(`https://api.github.com/gists/${gistId}`)
  if (response.status !== 200) {
    return {
      error: true,
    }
  }
  const { files } = await response.json()
  const file: File = files[Object.keys(files)[0]]
  const { filename, content: rawContent } = file
  if (!rawContent) {
    return {
      error: true,
    }
  }
  const rawTrimeedContent = rawContent.trim()
  // eval
  try {
    const localModule = execCode(rawTrimeedContent)
    return {
      file,
      localModule,
    }
  } catch (e) {
    return {
      error: true,
    }
  }
}

export function execCode(code) {
  // eval
  const exports = {}
  const localModule = { exports }
  const execContent = new Function("module", "exports", code)
  execContent(localModule, exports)
  return localModule
}
