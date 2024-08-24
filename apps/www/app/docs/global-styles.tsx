"use client"

import { defaultSystem } from "@chakra-ui/react"
import { Global, css } from "@emotion/react"

const cssObject = defaultSystem.css({
  "--header-height": { base: "64px", md: "104px" },
  "--content-height": "calc(100dvh - var(--header-height))",
})

export const GlobalStyles = () => {
  return (
    <Global
      styles={css({
        ":root": {
          ...(cssObject as any),
        },
      })}
    />
  )
}
