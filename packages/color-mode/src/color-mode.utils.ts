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
  preventTransition?: boolean
}

export function getColorModeUtils(options: UtilOptions = {}) {
  const { preventTransition = true } = options

  const utils = {
    setDataset: (value: ColorMode) => {
      const cleanup = preventTransition ? utils.preventTransition() : undefined
      document.documentElement.dataset.theme = value
      document.documentElement.style.colorScheme = value
      cleanup?.()
    },
    setClassName(dark: boolean) {
      document.body.classList.add(dark ? classNames.dark : classNames.light)
      document.body.classList.remove(dark ? classNames.light : classNames.dark)
    },
    query(query: string) {
      return window.matchMedia(query)
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
      const css = document.createElement("style")
      css.appendChild(
        document.createTextNode(
          `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
        ),
      )
      document.head.appendChild(css)

      return () => {
        ;(() => window.getComputedStyle(document.body))()
        window.setTimeout(() => {
          document.head.removeChild(css)
        }, 1)
      }
    },
  }

  return utils
}
