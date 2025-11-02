import { Splitter } from "@chakra-ui/react"

export const SplitterCollapsible = () => {
  return (
    <Splitter.Root
      defaultSize={[15, 20]}
      panels={[
        {
          id: "a",
          collapsible: true,
          collapsedSize: 10,
          minSize: 25,
          maxSize: 25,
        },
        { id: "b", minSize: 50 },
      ]}
      orientation="horizontal"
    >
      <Splitter.Panel id="a" bg="fg.muted" color="white" h="250px" p={4}>
        Panel A (Collapsible)
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" bg="fg.muted" color="white" h="250px" p={4}>
        Panel B
      </Splitter.Panel>
    </Splitter.Root>
  )
}

export default SplitterCollapsible
