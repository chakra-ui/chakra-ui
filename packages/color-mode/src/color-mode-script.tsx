import * as React from "react"
import { ConfigColorMode } from "./color-mode-provider"

export function setScript(initialValue: ConfigColorMode) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)")
  const systemPreference = mql.matches ? "dark" : "light"

  let persistedPreference: ConfigColorMode

  try {
    persistedPreference = localStorage.getItem(
      "chakra-ui-color-mode",
    ) as ConfigColorMode
  } catch (error) {
    console.log(
      "Chakra UI: localStorage is not available. Color mode persistence might not work as expected",
    )
  }

  const isInStorage = typeof persistedPreference === "string"

  let colorMode: ConfigColorMode

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
  initialColorMode?: ConfigColorMode
  /**
   * Optional nonce that will be passed to the created `<script>` tag.
   */
  nonce?: string
}

/**
 * Script to add to the root of your application when using localStorage,
 * to help prevent flash of color mode that can happen during page load.
 */
export const ColorModeScript = (props: ColorModeScriptProps) => {
  const { initialColorMode = "light" } = props
  const html = `(${String(setScript)})('${initialColorMode}')`
  return (
    <script nonce={props.nonce} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
