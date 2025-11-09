import { Splitter } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SplitterNested = () => {
  return (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }]}>
      <Splitter.Panel id="a">
        <DecorativeBox fontSize="2xl">A</DecorativeBox>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />

      <Splitter.Panel id="b">
        <Splitter.Root
          panels={[{ id: "b1" }, { id: "b2" }]}
          orientation="vertical"
          minH="650px"
        >
          <Splitter.Panel id="b1">
            <DecorativeBox fontSize="2xl">B1</DecorativeBox>
          </Splitter.Panel>

          <Splitter.ResizeTrigger
            id="b1:b2"
            aria-label="Resize nested panels"
          />

          <Splitter.Panel id="b2">
            <DecorativeBox fontSize="2xl">B2</DecorativeBox>
          </Splitter.Panel>
        </Splitter.Root>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
