import { Center, Splitter } from "@chakra-ui/react"

export const SplitterCssUnits = () => {
  return (
    <Splitter.Root
      panels={[
        { id: "nav", minSize: "240px", maxSize: "480px" },
        { id: "main", minSize: 30 },
      ]}
      defaultSize={["240px", "60vw"]}
      borderWidth="1px"
      minH="60"
    >
      <Splitter.Panel id="nav">
        <Center boxSize="full" textStyle="2xl">
          Nav
        </Center>
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="nav:main" />

      <Splitter.Panel id="main">
        <Center boxSize="full" textStyle="2xl">
          Main
        </Center>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
