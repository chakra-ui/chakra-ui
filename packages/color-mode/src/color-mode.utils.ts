import { ColorMode } from "./color-mode-types"

const classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark",
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
    query() {
      return window.matchMedia("(prefers-color-scheme: dark)")
    },
    getSystemTheme(fallback?: ColorMode) {
      const dark = utils.query().matches ?? fallback === "dark"
      return dark ? "dark" : "light"
    },
    addListener(fn: (cm: ColorMode) => unknown) {
      const mql = utils.query()
      const listener = (e: MediaQueryListEvent) => {
        fn(e.matches ? "dark" : "light")
      }

      if (typeof mql.addListener === "function") mql.addListener(listener)
      else mql.addEventListener("change", listener)

      return () => {
        if (typeof mql.removeListener === "function")
          mql.removeListener(listener)
        else mql.removeEventListener("change", listener)
      }
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
        // force a reflow
        ;(() => window.getComputedStyle(document.body))()

        // wait for next tick
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.head.removeChild(css)
          })
        })
      }
    },
  }

  return utils
}
