import * as React from "react"

function setScript() {
  try {
    const mode = localStorage.getItem("chakra-ui-color-mode")
    if (mode) {
      const root = document.documentElement
      document.body.classList.add("chakra-ui-" + mode)
      root.style.setProperty("--chakra-ui-color-mode", mode)
    }
  } catch (e) {
    console.log(
      "Chakra UI: localStorage is not available. Color mode persistence might not work as expected",
    )
  }
}

/**
 * Script to add to the root of your application to help prevent
 * flash of color mode that can happen during page load.
 *
 * This is particular useful for SSG in Gatsby or Next.js
 */
export const ColorModeScript = () => (
  <script dangerouslySetInnerHTML={{ __html: `(${String(setScript)})()` }} />
)
