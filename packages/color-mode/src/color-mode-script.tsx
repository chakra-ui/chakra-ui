import * as React from "react"
import { ColorMode } from "./color-mode-provider"

type Mode = ColorMode | "system" | undefined

function setColorModeVar(initialValue: Mode) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)")
  const systemPreference = mql.matches ? "dark" : "light"

  let persistedPreference: Mode

  try {
    persistedPreference = localStorage.getItem("chakra-ui-color-mode") as Mode
  } catch (error) {
    console.log(
      "Chakra UI: localStorage is not available. Color mode persistence might not work as expected",
    )
  }

  const isInStorage = typeof persistedPreference === "string"

  let colorMode: Mode

  if (isInStorage) {
    colorMode = persistedPreference
  } else {
    colorMode = initialValue === "system" ? systemPreference : initialValue
  }

  if (colorMode) {
    const root = document.documentElement
    root.style.setProperty("--chakra-ui-color-mode", colorMode)
  }
}

interface ColorModeScriptProps {
  defaultColorMode?: ColorMode
}

/**
 * Script to add to the root of your application to help prevent
 * flash of color mode that can happen during page load.
 *
 * This is particular useful for SSR in Gatsby or Next.js
 */
export const ColorModeScript = (props: ColorModeScriptProps) => {
  const { defaultColorMode = "light" } = props
  const __html = `(${String(setColorModeVar)})(\"${defaultColorMode}\")`
  return <script dangerouslySetInnerHTML={{ __html }} />
}
