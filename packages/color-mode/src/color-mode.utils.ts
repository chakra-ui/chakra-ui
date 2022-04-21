export type ColorMode = "light" | "dark"

const classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark",
}

export const queries = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)",
}

type UtilOptions = {
  doc?: Document
  preventTransition?: boolean
}

export function getColorModeUtils(options: UtilOptions = {}) {
  const { doc = document, preventTransition = true } = options

  const body = doc.body
  const win = doc.defaultView ?? window
  const docEl = doc.documentElement

  const utils = {
    setDataset: (value: ColorMode) => {
      const cleanup = preventTransition ? utils.preventTransition() : undefined
      docEl.dataset.theme = value
      docEl.style.colorScheme = value
      cleanup?.()
    },
    setClassName(dark: boolean) {
      body.classList.add(dark ? classNames.dark : classNames.light)
      body.classList.remove(dark ? classNames.light : classNames.dark)
    },
    query(query: string) {
      return win.matchMedia(query)
    },
    getColorScheme(fallback?: ColorMode) {
      const dark = utils.query(queries.dark).matches ?? fallback === "dark"
      return dark ? "dark" : "light"
    },
    addListener(fn: (cm: ColorMode) => unknown) {
      const mql = utils.query(queries.dark)
      const listener = (e: MediaQueryListEvent) => {
        fn(e.matches ? "dark" : "light")
      }
      mql.addEventListener("change", listener)
      return () => mql.removeEventListener("change", listener)
    },
    preventTransition() {
      const css = doc.createElement("style")
      css.appendChild(
        doc.createTextNode(
          `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
        ),
      )
      doc.head.appendChild(css)

      return () => {
        ;(() => win.getComputedStyle(doc.body))()
        win.setTimeout(() => {
          doc.head.removeChild(css)
        }, 1)
      }
    },
  }

  return utils
}
