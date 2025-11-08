import { Splitter } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SplitterExplorer = () => {
  return (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }]}>
      <Splitter.Panel id="a">
        <DecorativeBox fontSize="2xl" h="250px">
          A
        </DecorativeBox>
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />

      <Splitter.Panel id="b">
        <DecorativeBox fontSize="2xl" h="250px">
          B
        </DecorativeBox>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
