"use client"

import { Box, type BoxProps, IconButton, defineStyle } from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { LuCheck, LuCopy } from "react-icons/lu"

const preStyle = defineStyle({
  position: "relative",
  backgroundColor: "bg.muted",
  shadow: "inset",
  borderRadius: "md",
  fontSize: "0.9em",
  paddingBlock: "2em",
  paddingInline: "2em",
  overflowX: "auto",
  fontWeight: "400",
  maxHeight: "400px",
  overflowY: "auto",
  colorScheme: "dark",
  marginY: "1.6em",
  "& code": {
    bg: "transparent",
    fontSize: "inherit",
    letterSpacing: "inherit",
    borderWidth: "inherit",
    padding: "0",
  },
})

export const Pre = (props: BoxProps) => {
  const [copied, setCopied] = useState(false)
  const isShiki = props.className?.includes("shiki")

  const ref = useRef<HTMLPreElement | null>(null)
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const onCopy = useCallback(() => {
    if (!ref.current) return
    navigator.clipboard.writeText(ref.current.textContent || "")
    setCopied(true)
    timeout.current = setTimeout(() => {
      if (timeout.current) clearTimeout(timeout.current)
      setCopied(false)
    }, 2000)
  }, [])

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  if (isShiki) {
    return (
      <Box position="relative" marginY="1.6em">
        <Box
          as="pre"
          {...props}
          ref={ref}
          css={{ ...preStyle, marginY: "0" }}
        />
        <Box pos="absolute" top="3" right="3.5" className="dark">
          <IconButton
            onClick={onCopy}
            colorPalette="gray"
            variant="ghost"
            size="sm"
          >
            {copied ? <LuCheck /> : <LuCopy />}
          </IconButton>
        </Box>
      </Box>
    )
  }

  return <Box as="pre" {...props} ref={ref} css={preStyle} />
}

export const Code = (props: BoxProps) => {
  return (
    <Box
      as="code"
      {...props}
      css={{
        fontSize: "0.8em",
        letterSpacing: "-0.01em",
        borderRadius: "md",
        borderWidth: "0.5px",
        bg: "bg.muted",
        color: "fg",
        whiteSpace: "pre",
        padding: "0.1em 0.4em",
      }}
    />
  )
}
