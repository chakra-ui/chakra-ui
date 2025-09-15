"use client"

import { highlightCode } from "@/lib/highlight-code"
import { Box, Flex, Text } from "@chakra-ui/react"
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
        bg="bg.muted"
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
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            bottom: "-1px",
            left: 0,
            right: 0,
            height: "1px",
            bg: "bg",
          }}
        >
          <Box
            w={3}
            h={3}
            bg="green.solid"
            borderRadius="sm"
            flexShrink={0}
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: "6px",
              height: "6px",
              bg: "bg.muted",
              clipPath: "polygon(0 0, 100% 100%, 0 100%)",
            }}
          />
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
