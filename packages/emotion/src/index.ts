import createCache from "@emotion/cache"
import {
  CacheProvider,
  type EmotionCache,
  Global,
  css,
  keyframes,
} from "@emotion/react"
import styled from "@emotion/styled"
import { type ReactNode, createElement } from "react"

export { css, keyframes, Global, styled }

export const cx = (...args: Array<string | false | null | undefined>): string =>
  args.filter(Boolean).join(" ")

export interface ChakraEmotionProviderProps {
  children?: ReactNode
  cache?: EmotionCache
}

const defaultCache = /* @__PURE__ */ createCache({ key: "chakra" })

export function ChakraEmotionProvider(props: ChakraEmotionProviderProps) {
  const { children, cache = defaultCache } = props
  return createElement(CacheProvider, { value: cache }, children)
}

export function token(path: string): string {
  return `var(--${path.replace(/\./g, "-")})`
}
