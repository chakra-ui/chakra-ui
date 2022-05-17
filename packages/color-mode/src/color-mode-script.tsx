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
    storageKey: key = "chakra-ui-color-mode",
  } = props

  // runtime safe-guard against invalid color mode values
  const init = normalize(initialColorMode)

  const isCookie = type === "cookie"

  const cookieScript = `(function(){try{var a=function(o){var l="(prefers-color-scheme: dark)",v=window.matchMedia(l).matches?"dark":"light",e=o==="system"?v:o,d=document.documentElement,m=document.body,i="chakra-ui-light",s="chakra-ui-dark",n=e==="dark";m.classList.add(n?s:i),m.classList.remove(n?i:s),d.style.colorScheme=e,d.dataset.theme=e},u=a,h="${init}",r="${key}",t=document.cookie.match(new RegExp("(^| )".concat(r,"=([^;]+)"))),c=t?t[2]:null;c?a(c):document.cookie="".concat(r,"=").concat(a(h),"; max-age=31536000; path=/")}catch(a){}})();`

  const localStorageScript = `(function(){try{var a=function(c){var v="(prefers-color-scheme: dark)",h=window.matchMedia(v).matches?"dark":"light",e=c==="system"?h:c,o=document.documentElement,s=document.body,l="chakra-ui-light",d="chakra-ui-dark",i=e==="dark";s.classList.add(i?d:l),s.classList.remove(i?l:d),o.style.colorScheme=e,o.dataset.theme=e},n=a,m="${init}",r="${key}",t=localStorage.getItem(r);t?a(t):localStorage.setItem(r,a(m))}catch(a){}})();`

  const fn = isCookie ? cookieScript : localStorageScript
  return `!${fn}`.trim()
}

export function ColorModeScript(props: ColorModeScriptProps = {}) {
  return (
    <script
      id="chakra-script"
      dangerouslySetInnerHTML={{ __html: getScriptSrc(props) }}
    />
  )
}
