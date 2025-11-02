import { Splitter } from "@chakra-ui/react"

export const SplitterWithKeyboardResize = () => {
  return (
    <Splitter.Root
      panels={[{ id: "a" }, { id: "b" }]}
      defaultSize={[50, 50]}
      keyboardResizeBy={5}
    >
      <Splitter.Panel id="a" bg="fg.muted" h="250px" color="white" p={4}>
        Panel A
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />

      <Splitter.Panel id="b" bg="fg.muted" h="250px" color="white" p={4}>
        Panel B
      </Splitter.Panel>
    </Splitter.Root>
  )
}

export default SplitterWithKeyboardResize
