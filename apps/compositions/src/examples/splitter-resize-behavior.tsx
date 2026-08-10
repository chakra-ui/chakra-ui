import { Center, Code, Splitter, Stack } from "@chakra-ui/react"

export const SplitterResizeBehavior = () => {
  return (
    <Splitter.Root
      panels={[
        { id: "sidebar", minSize: 15, resizeBehavior: "preserve-pixel-size" },
        { id: "main" },
      ]}
      defaultSize={[25, 75]}
      borderWidth="1px"
      minH="60"
    >
      <Splitter.Panel id="sidebar">
        <Stack boxSize="full" align="center" justify="center" gap="2">
          <Center textStyle="2xl">Sidebar</Center>
          <Code size="sm" color="fg.muted">
            preserve-pixel-size
          </Code>
        </Stack>
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="sidebar:main" />

      <Splitter.Panel id="main">
        <Center boxSize="full" textStyle="2xl">
          Main
        </Center>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
