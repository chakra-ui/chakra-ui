export type SandpackLanguageSupport =
  | 'jsx'
  | 'tsx'
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'

export const formatFilePath = (path: string) => {
  if (path.startsWith('/')) {
    return path.substring(1)
  }
  return path
}
