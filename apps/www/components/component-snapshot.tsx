"use client"

import { highlightCode } from "@/lib/highlight-code"
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {
  ComponentExplorerSidebar,
  HighlightStyle,
  normalizeComponentName,
} from "./component-explorer-sidebar"

interface ComponentCodeSnapshotProps {
  name: string
  activePart: string | null
  getActiveStyle: () => HighlightStyle
}

interface ComponentCodeSnapshotProps {
  name: string
  activePart: string | null
  getActiveStyle: () => HighlightStyle
}

export function ComponentCodeSnapshot({
  name,
  activePart,
  getActiveStyle,
}: ComponentCodeSnapshotProps) {
  const [html, setHtml] = useState("")
  const componentName = normalizeComponentName(name)

  useEffect(() => {
    const generate = async () => {
      const content = activePart
        ? `
import { defineRecipe } from "@chakra-ui/react"

export const ${componentName}SlotRecipe = defineSlotRecipe({
  slots: ${componentName}Anatomy.keys(),
  base: {
    ${activePart}: ${JSON.stringify(getActiveStyle(), null, 2)}
  }
})
`.trim()
        : `
import { defineRecipe } from "@chakra-ui/react"

export const ${componentName}SlotRecipe = defineSlotRecipe({
  slots: ${componentName}Anatomy.keys()
})
`.trim()

      const highlighted = await highlightCode(content)
      setHtml(highlighted)
    }

    generate()
  }, [componentName, activePart, getActiveStyle])

  return (
    <Box
      css={{
        "& pre": {
          px: "8",
          py: "6",
          maxHeight: "400px",
          overflow: "auto",
          my: "0",
        },
      }}
    >
      <div
        className="code-highlight"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Box>
  )
}

export function ComponentExplorerWrapper({ name }: { name: string }) {
  const [activePart, setActivePart] = useState<string | null>(null)

  const getHighlightStyle = () => ({
    outline: "2px solid red",
    outlineOffset: "2px",
  })

  return (
    <>
      <ComponentExplorerSidebar
        componentName={name}
        activePart={activePart}
        setActivePart={setActivePart}
        getHighlightStyle={getHighlightStyle}
      />

      <Box gridColumn={{ base: "1 / -1", lg: "1 / -1" }}>
        <ComponentCodeSnapshot
          name={name}
          activePart={activePart}
          getActiveStyle={getHighlightStyle}
        />
      </Box>
    </>
  )
}
