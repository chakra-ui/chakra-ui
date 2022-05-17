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

  const cookieScript = `(function(){try{var a=function(d){var n="(prefers-color-scheme: dark)",v=window.matchMedia(n).matches?"dark":"light",e=d==="system"?v:d,m=document.documentElement,s=document.body,h="chakra-ui-light",i="chakra-ui-dark",l=e==="dark";s.classList.add(l?i:h),s.classList.remove(l?h:i),m.style.colorScheme=e,m.dataset.theme=e},u=a,r="${init}",t="${key}",c=document.cookie.match(new RegExp("(^| )".concat(t,"=([^;]+)"))),o=c?c[2]:null;o?a(o):(a(r),document.cookie="".concat(t,"=").concat(r,"; max-age=31536000; path=/"))}catch(a){}})();`

  const localStorageScript = `(function(){try{var a=function(o){var v="(prefers-color-scheme: dark)",h=window.matchMedia(v).matches?"dark":"light",e=o==="system"?h:o,s=document.documentElement,l=document.body,d="chakra-ui-light",m="chakra-ui-dark",i=e==="dark";l.classList.add(i?m:d),l.classList.remove(i?d:m),s.style.colorScheme=e,s.dataset.theme=e},n=a,r="${init}",t="${key}",c=localStorage.getItem(t);c?a(c):(a(r),localStorage.setItem(t,r))}catch(a){}})();`

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
