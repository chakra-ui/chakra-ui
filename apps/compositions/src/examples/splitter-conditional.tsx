"use client"

import { Box, Button, Flex, Splitter, useSplitter } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import React, { useState } from "react"

export const SplitterConditional = () => {
  const [visible, setVisible] = useState({ left: true, right: true })

  const splitter = useSplitter({
    defaultSize: [33, 34, 33],
    panels: [
      { id: "left", minSize: 20 },
      { id: "center", minSize: 20 },
      { id: "right", minSize: 20 },
    ],
    orientation: "horizontal",
  })

  const visiblePanels = [
    ...(visible.left ? [{ id: "left" }] : []),
    { id: "center" },
    ...(visible.right ? [{ id: "right" }] : []),
  ]

  return (
    <Box>
      <Flex gap={2} mb={4}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setVisible((prev) => ({ ...prev, left: !prev.left }))}
        >
          {visible.left ? "Hide Left" : "Show Left"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            setVisible((prev) => ({ ...prev, right: !prev.right }))
          }
        >
          {visible.right ? "Hide Right" : "Show Right"}
        </Button>
      </Flex>

      <Splitter.RootProvider value={splitter}>
        {visiblePanels.map((panel, index) => (
          <React.Fragment key={panel.id}>
            <Splitter.Panel id={panel.id}>
              <DecorativeBox fontSize="2xl" h="200px">
                {panel.id.toUpperCase()}
              </DecorativeBox>
            </Splitter.Panel>

            {index < visiblePanels.length - 1 && (
              <Splitter.ResizeTrigger
                id={`${panel.id}:${visiblePanels[index + 1].id}`}
                aria-label="Resize panels"
              />
            )}
          </React.Fragment>
        ))}
      </Splitter.RootProvider>
    </Box>
  )
}
