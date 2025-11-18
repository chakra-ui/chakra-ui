"use client"

import { Button, Center, Splitter, Stack, useSplitter } from "@chakra-ui/react"

export const SplitterWithStore = () => {
  const splitter = useSplitter({
    defaultSize: [50, 50],
    panels: [
      { id: "a", collapsible: true, collapsedSize: 10, minSize: 20 },
      { id: "b", minSize: 20 },
    ],
  })

  const toggleCollapse = (id: string) => {
    if (splitter.isPanelCollapsed(id)) {
      splitter.expandPanel(id)
    } else {
      splitter.collapsePanel(id)
    }
  }

  return (
    <Stack gap="4" align="start">
      <Button size="sm" variant="outline" onClick={() => toggleCollapse("a")}>
        {splitter.isPanelCollapsed("a") ? "Expand Panel A" : "Collapse Panel A"}
      </Button>

      <Splitter.RootProvider value={splitter} borderWidth="1px" minH="60">
        <Splitter.Panel id="a">
          <Center boxSize="full" textStyle="2xl">
            A
          </Center>
        </Splitter.Panel>

        <Splitter.ResizeTrigger id="a:b" />

        <Splitter.Panel id="b">
          <Center boxSize="full" textStyle="2xl">
            B
          </Center>
        </Splitter.Panel>
      </Splitter.RootProvider>
    </Stack>
  )
}
