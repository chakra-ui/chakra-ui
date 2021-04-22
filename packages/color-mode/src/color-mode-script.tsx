import * as React from "react"
import { ColorMode } from "./color-mode-provider"

type Mode = ColorMode | "system" | undefined

function setScript(initialValue: Mode, classNamePrefix: string) {
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
    document.body.classList.add(`${classNamePrefix}-${colorMode}`)
  }
}

interface ColorModeScriptProps {
  initialColorMode?: Mode
  /**
   * Optional nonce that will be passed to the created `<script>` tag.
   */
  nonce?: string
  /**
   * Optional prefix to attach to the class name that identifies the color mode
   *
   * @default chakra
   */
  classNamePrefix?: string
}

/**
 * Script to add to the root of your application when using localStorage,
 * to help prevent flash of color mode that can happen during page load.
 */
export const ColorModeScript = (props: ColorModeScriptProps) => {
  const { initialColorMode = "light", classNamePrefix = "chakra" } = props
  const html = `(${String(
    setScript,
  )})('${initialColorMode}', '${classNamePrefix}')`
  return (
    <script nonce={props.nonce} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
