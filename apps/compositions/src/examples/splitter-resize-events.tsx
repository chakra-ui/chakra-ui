"use client"

import { Center, HStack, Span, Splitter, Stack } from "@chakra-ui/react"
import { useCallback, useEffect, useRef } from "react"
import { useState } from "react"
import { LuMouse, LuMoveHorizontal } from "react-icons/lu"

type EventLog = [number, string, string]

export const SplitterResizeEvents = () => {
  const [eventLog, setEventLog] = useState<EventLog[]>([])

  const logEvent = useCallback(
    (eventName: string, details?: { size?: number[] }) => {
      const timestamp = Date.now()
      const sizeInfo = details?.size
        ? `[${details.size.map((s) => s.toFixed(1)).join(", ")}]`
        : ""
      setEventLog((prev) => [[timestamp, eventName, sizeInfo], ...prev])
    },
    [],
  )

  const throttledLogEvent = useThrottle(logEvent, 100)

  return (
    <Stack gap="4" align="start">
      <HStack textStyle="sm" gap={2}>
        <LuMouse />
        <LuMoveHorizontal />
        <Span>Drag the handle to resize panels</Span>
      </HStack>

      <Splitter.Root
        panels={[{ id: "a" }, { id: "b" }]}
        defaultSize={[50, 50]}
        borderWidth="1px"
        minH="60"
        onResizeStart={() => logEvent("onResizeStart")}
        onResize={(details) => throttledLogEvent("onResize", details)}
        onResizeEnd={(details) => logEvent("onResizeEnd", details)}
      >
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
      </Splitter.Root>

      <Stack
        p="2"
        gap="1"
        width="full"
        role="log"
        borderWidth="1px"
        minH="100px"
        maxH="200px"
        overflowY="auto"
      >
        {eventLog.length === 0 ? (
          <Span textStyle="sm" color="fg.muted">
            Resize events will appear here...
          </Span>
        ) : (
          eventLog.map(([time, eventName, sizeInfo], i) => {
            const date = new Date(time)
            return (
              <HStack as="pre" fontFamily="mono" textStyle="sm" key={i}>
                <Span color="fg.muted">{date.toLocaleTimeString()}</Span>
                <Span fontWeight="bold">{eventName}</Span>
                {sizeInfo && <Span color="fg.muted">{sizeInfo}</Span>}
              </HStack>
            )
          })
        )}
      </Stack>
    </Stack>
  )
}

function useThrottle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): T {
  const lastRunRef = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now()
      const timeSinceLastRun = now - lastRunRef.current

      if (timeSinceLastRun >= delay) {
        lastRunRef.current = now
        fn(...args)
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          lastRunRef.current = Date.now()
          fn(...args)
        }, delay - timeSinceLastRun)
      }
    }) as T,
    [fn, delay],
  )
}
