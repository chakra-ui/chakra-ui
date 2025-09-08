"use client"

import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { useCallback, useState } from "react"
import { kebabCase } from "scule"

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

  const [selectedParts, setSelectedParts] = useState<Set<string>>(new Set())

  const highlightPart = useCallback(
    (part: string, action: "add" | "remove") => {
      const kebabPart = kebabCase(part)
      const selector = `[data-scope=${normalizedName}][data-part=${kebabPart}]`
      const preview = document.getElementById("component-preview")
      if (!preview) return

      const elements = preview.querySelectorAll(
        selector,
      ) as NodeListOf<HTMLElement>

      for (const el of elements) {
        if (action === "add") {
          el.style.outline = "2px solid red"
          el.style.outlineOffset = "2px"
        } else {
          // Don't remove outline if part is selected
          if (!selectedParts.has(part)) {
            el.style.outline = ""
            el.style.outlineOffset = ""
          }
        }
      }
    },
    [normalizedName, selectedParts],
  )

  const togglePartSelection = useCallback(
    (part: string) => {
      const newSelectedParts = new Set(selectedParts)

      if (selectedParts.has(part)) {
        newSelectedParts.delete(part)
        highlightPart(part, "remove")
      } else {
        newSelectedParts.add(part)
        highlightPart(part, "add")
      }

      setSelectedParts(newSelectedParts)
    },
    [selectedParts, highlightPart],
  )

  if (!anatomy) {
    return (
      <Box p={5}>
        <Text>No anatomy found for {componentName}</Text>
      </Box>
    )
  }

  return (
    <Box p={5} borderLeft="1px solid" borderColor="border" bg="bg" minW="260px">
      <Heading size="sm" mb={2} color="fg">
        Component Anatomy
      </Heading>
      <Text fontSize="sm" mb={4} color="fg.muted">
        Hover to highlight, click to select parts
      </Text>

      <Flex wrap="wrap" gap={2}>
        {anatomy.keys().map((key) => {
          const isSelected = selectedParts.has(key)

          return (
            <Box
              key={key}
              px={3}
              py={2}
              borderRadius="md"
              cursor="pointer"
              bg={isSelected ? "green.50" : "bg.subtle"}
              border="1px solid"
              borderColor={isSelected ? "green.200" : "border.subtle"}
              _hover={{
                bg: isSelected ? "green.100" : "bg.emphasized",
                borderColor: isSelected ? "green.300" : "border.emphasized",
              }}
              position="relative"
              onMouseEnter={() => highlightPart(key, "add")}
              onMouseLeave={() => highlightPart(key, "remove")}
              onClick={() => togglePartSelection(key)}
            >
              <Flex align="center" gap={2}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {key}
                </Text>
                {isSelected && (
                  <Box
                    w={2}
                    h={2}
                    bg="green.fg"
                    borderRadius="full"
                    flexShrink={0}
                  />
                )}
              </Flex>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}
