import { codeToHtml } from "shiki"

export const highlightCode = (
  code: string,
  opts?: Partial<Parameters<typeof codeToHtml>[1]>,
) => {
  return codeToHtml(code, {
    lang: "tsx",
    themes: {
      light: "night-owl",
      dark: "dark-plus",
    },
    defaultColor: "light",
    ...opts,
  })
}
