import { Splitter } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SplitterThreePanels = () => {
  return (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }, { id: "c" }]} minH="60">
      <Splitter.Panel id="a">
        <DecorativeBox fontSize="2xl">A</DecorativeBox>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b">
        <DecorativeBox fontSize="2xl">B</DecorativeBox>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize" />
      <Splitter.Panel id="c">
        <DecorativeBox fontSize="2xl">C</DecorativeBox>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
