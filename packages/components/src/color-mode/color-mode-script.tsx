export interface ColorModeScriptProps {
  type?: "localStorage" | "cookie"
  initialColorMode?: "light" | "dark" | "system"
  storageKey?: string
  nonce?: string
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

  const cookieScript = `(function(){try{var a=function(o){var l="(prefers-color-scheme: dark)",v=window.matchMedia(l).matches?"dark":"light",e=o==="system"?v:o,d=document.documentElement,m=document.body,i="chakra-ui-light",n="chakra-ui-dark",s=e==="dark";return m.classList.add(s?n:i),m.classList.remove(s?i:n),d.style.colorScheme=e,d.dataset.theme=e,e},u=a,h="${init}",r="${key}",t=document.cookie.match(new RegExp("(^| )".concat(r,"=([^;]+)"))),c=t?t[2]:null;c?a(c):document.cookie="".concat(r,"=").concat(a(h),"; max-age=31536000; path=/")}catch(a){}})();
  `

  const localStorageScript = `(function(){try{var a=function(c){var v="(prefers-color-scheme: dark)",h=window.matchMedia(v).matches?"dark":"light",r=c==="system"?h:c,o=document.documentElement,s=document.body,l="chakra-ui-light",d="chakra-ui-dark",i=r==="dark";return s.classList.add(i?d:l),s.classList.remove(i?l:d),o.style.colorScheme=r,o.dataset.theme=r,r},n=a,m="${init}",e="${key}",t=localStorage.getItem(e);t?a(t):localStorage.setItem(e,a(m))}catch(a){}})();
  `

  const fn = isCookie ? cookieScript : localStorageScript
  return `!${fn}`.trim()
}

export function ColorModeScript(props: ColorModeScriptProps = {}) {
  const { nonce } = props

  return (
    <script
      id="chakra-script"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: getScriptSrc(props) }}
    />
  )
}
