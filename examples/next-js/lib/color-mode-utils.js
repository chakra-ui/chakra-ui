import { setCookies, getCookie } from "cookies-next"
import { STORAGE_KEY } from "@chakra-ui/react"

export const colorModeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
}

export const ensureColorMode = (ctx) => {
  let cookie = getCookie(STORAGE_KEY, ctx)
  if (!cookie) {
    cookie = colorModeConfig.initialColorMode
    setCookies(STORAGE_KEY, cookie, ctx)
  }
  return ctx.req.headers.cookie
}
