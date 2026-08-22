import { Center, Splitter } from "@chakra-ui/react"

export const SplitterNested = () => {
  return (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }]} borderWidth="1px">
      <Splitter.Panel id="a">
        <Center boxSize="full" textStyle="2xl">
          A
        </Center>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />

      <Splitter.Panel id="b">
        <Splitter.Root
          panels={[{ id: "b1" }, { id: "b2" }]}
          orientation="vertical"
          minH="80"
        >
          <Splitter.Panel id="b1">
            <Center boxSize="full" textStyle="2xl">
              B1
            </Center>
          </Splitter.Panel>

          <Splitter.ResizeTrigger
            id="b1:b2"
            aria-label="Resize nested panels"
          />

          <Splitter.Panel id="b2">
            <Center boxSize="full" textStyle="2xl">
              B2
            </Center>
          </Splitter.Panel>
        </Splitter.Root>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
