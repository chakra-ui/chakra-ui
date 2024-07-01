import { codeToHtml } from "shiki"

export const highlightCode = (code: string) => {
  return codeToHtml(code, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: "light",
  })
}
