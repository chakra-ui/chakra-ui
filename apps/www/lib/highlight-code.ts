import { getHighlighter } from "./highlighter"

export const highlightCode = async (
  code: string,
  opts?: { lang?: string; theme?: string },
) => {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, {
    lang: opts?.lang || "tsx",
    theme: opts?.theme || "dark-plus",
  })
}
