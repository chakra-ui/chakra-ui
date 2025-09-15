"use client"

import { highlightCode } from "@/lib/highlight-code"
import { Box } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { useEffect, useState } from "react"
import ts from "typescript"
import {
  ComponentExplorerSidebar,
  type HighlightStyle,
  normalizeComponentName,
} from "./component-explorer-sidebar"

function formatWithTS(code: string): string {
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )

  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: false,
  })
  return printer.printFile(sourceFile)
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
      const anatomy =
        anatomies[`${componentName}Anatomy` as keyof typeof anatomies]
      const anatomyKeys = anatomy.keys() || []

      const content = activePart
        ? `
import { defineSlotRecipe } from "@chakra-ui/react";

export const ${componentName}SlotRecipe = defineSlotRecipe({
  slots: ${JSON.stringify(anatomyKeys)},
  base: {
    ${activePart}: ${JSON.stringify(getActiveStyle(), null, 2)}
  }
});
`
        : `
import { defineSlotRecipe } from "@chakra-ui/react";

export const ${componentName}SlotRecipe = defineSlotRecipe({
  slots: ${JSON.stringify(anatomyKeys)}
});
`

      const formattedCode = formatWithTS(content)

      const highlighted = await highlightCode(formattedCode)
      setHtml(highlighted)
    }

    generate()
  }, [componentName, activePart, getActiveStyle])

  return (
    <Box
      overflow="auto"
      colorScheme="dark"
      pos="relative"
      rounded="lg"
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
