"use client"

import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { useCallback } from "react"

const normalizeComponentName = (name: string) => {
  return name.split("-")[0].toLowerCase()
}

export const ComponentExplorerSidebar = ({
  componentName,
}: {
  componentName: string
}) => {
  const normalizedName = normalizeComponentName(componentName)
  const anatomy =
    anatomies[`${normalizedName}Anatomy` as keyof typeof anatomies]

  const highlightPart = useCallback(
    (part: string, action: "add" | "remove") => {
      const selector = `[data-scope=${normalizedName}][data-part=${part}]`
      const preview = document.getElementById("component-preview")
      if (!preview) return

      const el = preview.querySelector(selector) as HTMLElement | null
      if (el) {
        if (action === "add") {
          el.style.outline = "2px solid red"
          el.style.outlineOffset = "2px"
        } else {
          el.style.outline = ""
          el.style.outlineOffset = ""
        }
      }
    },
    [normalizedName],
  )

  if (!anatomy) {
    return (
      <Box p={5}>
        <Text>No anatomy found for {componentName}</Text>
      </Box>
    )
  }

  return (
    <Box
      p={5}
      borderLeft="0.5px solid"
      borderColor="gray.200"
      _dark={{ borderColor: "gray.700", bg: "bg.muted" }}
      bg="bg.subtle"
    >
      <Heading size="sm" mb={2} color="fg">
        Component Anatomy
      </Heading>
      <Text fontSize="sm" mb={4} color="fg.muted">
        Hover or click to highlight parts
      </Text>

      <VStack align="stretch" spaceY={2}>
        {anatomy.keys().map((key) => (
          <HStack
            key={key}
            px={3}
            py={2}
            borderRadius="md"
            cursor="pointer"
            _hover={{
              bg: "bg.emphasized",
              transform: "translateX(2px)",
            }}
            onMouseEnter={() => highlightPart(key, "add")}
            onMouseLeave={() => highlightPart(key, "remove")}
            onClick={() => highlightPart(key, "add")}
          >
            <Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
              {key}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}
