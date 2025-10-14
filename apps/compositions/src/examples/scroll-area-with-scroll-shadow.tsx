import { ScrollArea } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const ScrollAreaWithScrollShadow = () => {
  return (
    <ScrollArea.Root height="20rem" maxW="lg">
      <ScrollArea.Viewport
        css={{
          "--scroll-shadow-size": "4rem",
          maskImage:
            "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
          "&[data-at-top]": {
            maskImage:
              "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
          },
          "&[data-at-bottom]": {
            maskImage:
              "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
          },
        }}
      >
        <ScrollArea.Content spaceY="4">
          {Array.from({ length: 10 }, (_, i) => (
            <DecorativeBox key={i} h="20">
              Item {i + 1}
            </DecorativeBox>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  )
}
