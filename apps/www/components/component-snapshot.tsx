"use client"

import { highlightCode } from "@/lib/highlight-code"
import { Box, Flex, Text } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { useEffect, useState } from "react"
import { SiTypescript } from "react-icons/si"
import ts from "typescript"
import {
  ComponentExplorerSidebar,
  type HighlightStyle,
  normalizeComponentName,
} from "./component-explorer-sidebar"

/**
 * Format using TypeScript printer (keeps this repo free from client-side prettier bundling issues).
 */
function formatWithTS(code: string) {
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

/**
 * Small helper that turns an array into either a one-line JSON array
 * or a multi-line, nicely indented array (so we get readable `slots` formatting).
 */
function stringifySlots(slots: string[], maxInlineLength = 80) {
  const single = JSON.stringify(slots)
  if (single.length <= maxInlineLength && !single.includes("\n")) return single

  // multi-line representation with two-space indent (match the template indentation)
  const lines = slots.map((s) => `  ${JSON.stringify(s)}`)
  return `[\n${lines.join(",\n")}\n]`
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
  const activeStyles = getActiveStyle()

  useEffect(() => {
    const generate = async () => {
      const anatomy =
        anatomies[`${componentName}Anatomy` as keyof typeof anatomies]
      const anatomyKeys = anatomy.keys() || []

      const slotsCode = stringifySlots(anatomyKeys)

      const content = activePart
        ? `import { defineSlotRecipe } from "@chakra-ui/react";
// __SPACE__
export const ${componentName}SlotRecipe = defineSlotRecipe({
  slots: ${slotsCode},
  base: {
    ${activePart}: ${JSON.stringify(activeStyles, null, 2)}
  }
});`
        : `import { defineSlotRecipe } from "@chakra-ui/react";
// __SPACE__
export const ${componentName}SlotRecipe = defineSlotRecipe({
  slots: ${slotsCode}
});`

      const formattedCode = formatWithTS(content)
      const withSpacing = formattedCode.replace("// __SPACE__", "\n")
      const highlighted = await highlightCode(withSpacing)
      setHtml(highlighted)
    }

    generate()
  }, [componentName, activePart, activeStyles])

  return (
    <Box
      overflow="hidden"
      colorScheme="dark"
      pos="relative"
      rounded="lg"
      border="1px solid"
      borderColor="border.subtle"
      bg="bg"
    >
      <Flex
        align="center"
        px={4}
        py={2}
        borderBottom="1px solid"
        borderBottomColor="border.subtle"
        position="relative"
      >
        <Flex
          align="center"
          gap={2}
          px={3}
          py={1.5}
          bg="bg"
          border="1px solid"
          borderColor="border.subtle"
          borderBottom="none"
          borderTopRadius="md"
        >
          <SiTypescript size={12} color="#3178c6" style={{ flexShrink: 0 }} />
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="fg"
            fontFamily="mono"
            letterSpacing="tight"
          >
            {componentName}.recipe.ts
          </Text>

          {activePart && (
            <Box
              w={1.5}
              h={1.5}
              bg="orange.solid"
              borderRadius="full"
              flexShrink={0}
            />
          )}
        </Flex>
      </Flex>

      <Box
        overflow="auto"
        css={{
          "& pre": {
            px: "6",
            py: "4",
            maxHeight: "400px",
            overflow: "auto",
            my: "0",
            bg: "transparent",
          },
        }}
      >
        <div
          className="code-highlight"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Box>
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
