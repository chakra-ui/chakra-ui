"use client"

import {
  Button,
  Center,
  HStack,
  Splitter,
  Stack,
  useSplitter,
} from "@chakra-ui/react"
import { Fragment, useRef, useState } from "react"

const initialPanels: Splitter.PanelData[] = [
  { id: "left", order: 0 },
  { id: "center", order: 1 },
  { id: "right", order: 2 },
]

const getLayoutKey = (panels: Array<{ id: string }>): string => {
  return panels.map((p) => p.id).join(":")
}

const distributeSizes = (count: number): number[] =>
  Array(count).fill(100 / count)

export const SplitterConditionalRendering = () => {
  const [panels, setPanels] = useState(initialPanels)
  const [sizes, setSizes] = useState<number[]>([])

  const initialLayout = getLayoutKey(initialPanels)

  const layoutCache = useRef<Record<string, number[]>>({
    [initialLayout]: [],
  })

  const splitter = useSplitter({
    panels: panels.map((p) => ({ id: p.id, minSize: 20 })),
    size: sizes,
    orientation: "horizontal",
    onResize: ({ size, layout }) => {
      setSizes(size)
      layoutCache.current[layout] = size
    },
  })

  const items = splitter.getItems()

  const hidePanel = (id: string) => {
    const currentLayout = getLayoutKey(panels)
    layoutCache.current[currentLayout] = sizes

    const index = panels.findIndex((panel) => panel.id === id)
    const newPanels = panels.filter((panel) => panel.id !== id)
    const newSizes = sizes.filter((_, i) => i !== index)

    setPanels(newPanels)
    setSizes(newSizes)
  }

  const showPanel = (id: string) => {
    const panel = initialPanels.find((panel) => panel.id === id)
    if (!panel) return

    const nextPanels = [...panels, panel].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    )
    const nextLayout = getLayoutKey(nextPanels)
    const cachedSizes = layoutCache.current[nextLayout]

    setPanels(nextPanels)
    setSizes(cachedSizes || distributeSizes(nextPanels.length))
  }

  const isPanelVisible = (id: string) => {
    return panels.some((p) => p.id === id)
  }

  const togglePanel = (id: string) => {
    if (isPanelVisible(id)) {
      hidePanel(id)
    } else {
      showPanel(id)
    }
  }

  return (
    <Stack gap="4">
      <HStack gap="2" justify="space-between">
        <Button size="sm" variant="outline" onClick={() => togglePanel("left")}>
          {isPanelVisible("left") ? "Hide Left" : "Show Left"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => togglePanel("right")}
        >
          {isPanelVisible("right") ? "Hide Right" : "Show Right"}
        </Button>
      </HStack>

      <Splitter.RootProvider value={splitter} borderWidth="1px" minH="60">
        {items.map((item) => (
          <Fragment key={item.id}>
            {item.type === "panel" && (
              <Splitter.Panel id={item.id}>
                <Center boxSize="full" textStyle="lg">
                  {item.id}
                </Center>
              </Splitter.Panel>
            )}
            {item.type === "handle" && <Splitter.ResizeTrigger id={item.id} />}
          </Fragment>
        ))}
      </Splitter.RootProvider>
    </Stack>
  )
}
