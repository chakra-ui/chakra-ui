import { Splitter } from "@chakra-ui/react"

export const SplitterWithKeyboardResize = () => {
  return (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }]} keyboardResizeBy={100}>
      <Splitter.Panel id="a" h="250px" bg="fg.muted" color="white" p={4}>
        Panel A
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />

      <Splitter.Panel id="b" h="250px" bg="fg.muted" color="white" p={4}>
        Panel B
      </Splitter.Panel>
    </Splitter.Root>
  )
}

export default SplitterWithKeyboardResize
