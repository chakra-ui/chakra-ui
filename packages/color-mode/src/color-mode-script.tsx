import * as React from "react"

interface ColorModeScriptProps {
  type?: "localStorage" | "cookie"
  initialColorMode?: "light" | "dark" | "system"
  storageKey?: string
}

export function ColorModeScript(props: ColorModeScriptProps = {}) {
  const {
    initialColorMode = "system",
    type = "localStorage",
    storageKey = "chakra-ui-color-mode",
  } = props

  const init = initialColorMode
  const k = storageKey

  const cookieScript = `!function(){try {var d=document.documentElement;var ck=document.cookie.match(new RegExp(\`(^| )${k}=([^;]+)\`));var e=ck && ck[2];if(!e)return document.cookie=\`${k}=${init}; max-age=31536000; path=/\`,d.setAttribute('data-theme', ${init});if("system"===e){var t="(prefers-color-scheme: dark)",m=window.matchMedia(t);m.media!==t||m.matches?d.setAttribute('data-theme', 'dark'):d.setAttribute('data-theme', 'light')}else d.setAttribute('data-theme', e)}catch(e){}}()`
  const localStorageScript = `!function(){try {var d=document.documentElement;var e=localstorage.getItem(${k});if(!e)return localstorage.setItem(${k}, ${init}),d.setAttribute('data-theme', ${init});if("system"===e){var t="(prefers-color-scheme: dark)",m=window.matchMedia(t);m.media!==t||m.matches?d.setAttribute('data-theme', 'dark'):d.setAttribute('data-theme', 'light')}else d.setAttribute('data-theme', e)}catch(e){}}()`

  const __html = type === "cookie" ? cookieScript : localStorageScript
  return <script id="chakra-script" dangerouslySetInnerHTML={{ __html }} />
}
