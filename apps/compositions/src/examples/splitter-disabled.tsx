import { Center, Splitter } from "@chakra-ui/react"

export const SplitterDisabled = () => {
  return (
    <Splitter.Root
      panels={[{ id: "a" }, { id: "b" }]}
      borderWidth="1px"
      minH="60"
    >
      <Splitter.Panel id="a">
        <Center boxSize="full" textStyle="2xl">
          A
        </Center>
      </Splitter.Panel>
      <Splitter.ResizeTrigger disabled id="a:b" />
      <Splitter.Panel id="b">
        <Center boxSize="full" textStyle="2xl">
          B
        </Center>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
