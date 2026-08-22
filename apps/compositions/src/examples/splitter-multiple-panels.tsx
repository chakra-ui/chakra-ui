import { Center, Splitter } from "@chakra-ui/react"

export const SplitterMultiplePanels = () => {
  return (
    <Splitter.Root
      panels={[{ id: "a" }, { id: "b" }, { id: "c" }]}
      borderWidth="1px"
      minH="60"
    >
      <Splitter.Panel id="a">
        <Center boxSize="full" textStyle="2xl">
          A
        </Center>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b">
        <Center boxSize="full" textStyle="2xl">
          B
        </Center>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize" />
      <Splitter.Panel id="c">
        <Center boxSize="full" textStyle="2xl">
          C
        </Center>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
