import * as React from "react"

export type ColorModeScriptProps = {
  type?: "localStorage" | "cookie"
  initialColorMode?: "light" | "dark" | "system"
  storageKey?: string
}

const VALID_VALUES = new Set(["dark", "light", "system"])

/**
 * runtime safe-guard against invalid color mode values
 */
function normalize(initialColorMode: "light" | "dark" | "system") {
  let value = initialColorMode
  if (!VALID_VALUES.has(value)) value = "light"
  return value
}

export function getScriptSrc(props: ColorModeScriptProps = {}) {
  const {
    initialColorMode = "light",
    type = "localStorage",
    storageKey = "chakra-ui-color-mode",
  } = props

  // runtime safe-guard against invalid color mode values
  const mode = normalize(initialColorMode)

  const isCookie = type === "cookie"

  const init = isCookie ? mode : `'${mode}'`
  const k = isCookie ? storageKey : `'${storageKey}'`

  const cookieScript = `!function(){try{var t="(prefers-color-scheme: dark)", e=window.matchMedia(t).matches?"dark":"light", d=document.documentElement;var ck=document.cookie.match(new RegExp(\`(^| )${k}=([^;]+)\`));var m=ck && ck[2]; if(!m) return document.cookie=\`${k}=${init}; max-age=31536000; path=/\`,d.dataset.theme="system"==='${init}'?e:'${init}';var yy="system"===m?e:m; d.dataset.theme=yy;d.style.colorScheme=yy}catch(t){}}()`

  const localStorageScript = `!function(){try{var t="(prefers-color-scheme: dark)",e=window.matchMedia(t).matches?"dark":"light",d=document.documentElement,m=localStorage.getItem(${k});if(!m)return localStorage.setItem(${k},${init}),d.dataset.theme="system"===${init}?e:${init};var yy="system"===m?e:m; d.dataset.theme=yy;d.style.colorScheme=yy}catch(t){}}()`

  return isCookie ? cookieScript : localStorageScript
}

export function ColorModeScript(props: ColorModeScriptProps = {}) {
  return (
    <script
      id="chakra-script"
      dangerouslySetInnerHTML={{ __html: getScriptSrc(props) }}
    />
  )
}
