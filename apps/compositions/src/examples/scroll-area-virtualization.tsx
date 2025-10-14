"use client"

import { ScrollArea } from "@chakra-ui/react"
import { type VirtualItem, useVirtualizer } from "@tanstack/react-virtual"
import { DecorativeBox } from "compositions/lib/decorative-box"
import React, { useCallback, useMemo, useRef } from "react"

export const ScrollAreaVirtualization = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const items = useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i + 1}`,
      })),
    [],
  )

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 80,
    overscan: 5,
  })

  const contentProps = useMemo(
    (): React.ComponentProps<"div"> => ({
      style: {
        height: `${virtualizer.getTotalSize()}px`,
        width: "full",
        position: "relative",
      },
    }),
    [virtualizer],
  )

  const getItemProps = useCallback(
    (item: VirtualItem): React.ComponentProps<"div"> => ({
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        paddingBottom: 4,
        height: `${item.size}px`,
        transform: `translateY(${item.start}px)`,
      },
    }),
    [],
  )

  return (
    <ScrollArea.Root height="20rem" maxWidth="xl">
      <ScrollArea.Viewport ref={scrollRef}>
        <ScrollArea.Content {...contentProps}>
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const item = items[virtualItem.index]
            return (
              <div key={virtualItem.key} {...getItemProps(virtualItem)}>
                <DecorativeBox w="full">{item.name}</DecorativeBox>
              </div>
            )
          })}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar bg="transparent" />
    </ScrollArea.Root>
  )
}
