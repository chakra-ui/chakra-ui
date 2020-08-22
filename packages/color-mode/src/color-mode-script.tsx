import * as React from "react"
import { ColorMode } from "./color-mode-provider"

function setColorModeVar(initialValue: ColorMode | "system") {
  const mql = window.matchMedia("(prefers-color-scheme: dark)")
  const systemPreference = mql.matches ? "dark" : "light"

  const persistedPreference = localStorage.getItem("chakra-ui-color-mode")
  const isInStorage = typeof persistedPreference === "string"

  let colorMode

  if (isInStorage) {
    colorMode = persistedPreference
  } else {
    colorMode = initialValue === "system" ? systemPreference : initialValue
  }

  const root = document.documentElement
  root.style.setProperty("--chakra-ui-color-mode", colorMode)
}

interface InitialColorModeProps {
  defaultMode?: ColorMode
}

/**
 * Script to add to the root of your application to help prevent
 * flash of color mode that can happen during page load.
 *
 * This is particular useful for SSR in Gatsby or Next.js
 */
export const ColorModeScript = (props: InitialColorModeProps) => {
  const { defaultMode = "light" } = props
  const __html = `(${String(setColorModeVar)})(\"${defaultMode}\")`
  return <script dangerouslySetInnerHTML={{ __html }} />
}
