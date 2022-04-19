import * as React from "react"
import { ColorMode, ConfigColorMode } from "./color-mode-provider"

export type ScriptOptions = {
  fallback: ConfigColorMode
  doc?: Document
  storageKey?: string
}

export function setScript(options: ScriptOptions) {
  const {
    doc = document,
    storageKey = "chakra-ui-color-mode",
    fallback,
  } = options
  const win = doc.defaultView ?? window
  const mql = win.matchMedia("(prefers-color-scheme: dark)")
  const systemValue = mql.matches ? "dark" : "light"
  let value: ColorMode | null = systemValue
  try {
    value = win.localStorage.getItem(storageKey) as ColorMode | null
  } catch (error) {
    console.log(
      "Chakra UI: localStorage is not available. Color mode persistence might not work as expected",
    )
  }

  let colorMode: ColorMode

  if (value) colorMode = value
  else if (fallback === "system") colorMode = systemValue
  else colorMode = fallback ?? systemValue

  if (colorMode) {
    doc.documentElement.setAttribute("data-theme", colorMode)
  }
}

const VALID_VALUES = ["dark", "light", "system"] as const

export function getScriptInnerHTML(init?: ConfigColorMode) {
  if (!init || !VALID_VALUES.includes(init)) init = "light"
  return `(${String(setScript)})('${init}')`
}

interface ColorModeScriptProps {
  initialColorMode?: ConfigColorMode
  nonce?: string
}

/**
 * Script to add to the root of your application when using localStorage,
 * to help prevent flash of color mode that can happen during page load.
 */
export function ColorModeScript(props: ColorModeScriptProps) {
  const { initialColorMode, nonce } = props
  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: getScriptInnerHTML(initialColorMode) }}
    />
  )
}
