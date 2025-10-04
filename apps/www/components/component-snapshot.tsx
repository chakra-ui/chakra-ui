"use client"

import { highlightCode } from "@/lib/highlight-code"
import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { SiTypescript } from "react-icons/si"
import ts from "typescript"
import {
  ComponentExplorerSidebar,
  type HighlightStyle,
  normalizeComponentName,
} from "./component-explorer-sidebar"

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
      const content = activePart
        ? `import { ${componentName}Anatomy } from "@chakra-ui/react/anatomy"
import { defineSlotRecipe } from "@chakra-ui/react"
// __SPACE__
export const ${componentName}SlotRecipe = defineSlotRecipe({
  slots: ${componentName}Anatomy.keys(),
  base: {
    ${activePart}: ${JSON.stringify(activeStyles, null, 2)}
  }
});`
        : `import { ${componentName}Anatomy } from "@chakra-ui/react/anatomy"
import { defineSlotRecipe } from "@chakra-ui/react"
// __SPACE__
export const ${componentName}SlotRecipe = defineSlotRecipe({
  slots: ${componentName}Anatomy.keys()
});`

      const formattedCode = formatWithTS(content)
      const withSpacing = formattedCode.replace("// __SPACE__", "")
      const highlighted = await highlightCode(withSpacing)
      setHtml(highlighted)
    }

    generate()
  }, [componentName, activePart, activeStyles])

  return (
    <Box
      colorScheme="dark"
      pos="relative"
      rounded="lg"
      border="1px solid"
      borderColor="border"
      bg="bg"
    >
      <Flex
        align="center"
        px={4}
        pt={2}
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
        maxW="100%"
        css={{
          "& pre": {
            px: "4",
            py: "4",
            maxHeight: "400px",
            overflow: "auto",
            my: "0",
            bg: "transparent",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
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
