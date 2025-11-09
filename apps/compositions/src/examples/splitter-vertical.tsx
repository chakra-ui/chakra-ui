import { Splitter } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SplitterVertical = () => {
  return (
    <Splitter.Root
      panels={[{ id: "a" }, { id: "b" }]}
      orientation="vertical"
      minH="650px"
    >
      <Splitter.Panel id="a">
        <DecorativeBox fontSize="2xl">A</DecorativeBox>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b">
        <DecorativeBox fontSize="2xl">B</DecorativeBox>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
