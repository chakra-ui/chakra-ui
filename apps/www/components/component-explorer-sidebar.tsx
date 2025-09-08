"use client"

import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { useState } from "react"
import { kebabCase } from "scule"

const normalizeComponentName = (name: string) =>
  name.split("-")[0].toLowerCase()

export const ComponentExplorerSidebar = ({
  componentName,
}: {
  componentName: string
}) => {
  const normalizedName = normalizeComponentName(componentName)
  const anatomy =
    anatomies[`${normalizedName}Anatomy` as keyof typeof anatomies]

  const [activePart, setActivePart] = useState<string | null>(null)

  const applyHighlight = (part: string | null, action: "add" | "remove") => {
    if (!part) return
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
        el.style.outline = ""
        el.style.outlineOffset = ""
      }
    }
  }

  const handleSelect = (part: string) => {
    if (activePart === part) {
      applyHighlight(part, "remove")
      setActivePart(null)
    } else {
      if (activePart) applyHighlight(activePart, "remove")
      applyHighlight(part, "add")
      setActivePart(part)
    }
  }

  if (!anatomy) {
    return (
      <Box p={5}>
        <Text>No anatomy found for {componentName}</Text>
      </Box>
    )
  }

  return (
    <Box p={5} bg="bg" minW="260px">
      <Heading size="sm" mb={2} color="fg">
        Component Anatomy
      </Heading>
      <Text fontSize="sm" mb={4} color="fg.muted">
        Hover to highlight, click to select parts
      </Text>

      <Flex wrap="wrap" gap={2}>
        {anatomy.keys().map((key) => {
          const isSelected = activePart === key

          return (
            <Box
              key={key}
              px={3}
              py={2}
              borderRadius="md"
              cursor="pointer"
              bg={isSelected ? "bg.emphasized" : "bg.subtle"}
              border="1px solid"
              borderColor={isSelected ? "border.emphasized" : "border.subtle"}
              _hover={{
                bg: "bg.emphasized",
                borderColor: "border.emphasized",
              }}
              onMouseEnter={() => {
                if (activePart !== key) applyHighlight(key, "add")
              }}
              onMouseLeave={() => {
                if (activePart !== key) applyHighlight(key, "remove")
              }}
              onClick={() => handleSelect(key)}
            >
              <Flex align="center" gap={2}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  textTransform="capitalize"
                  color={isSelected ? "fg" : "fg.muted"}
                >
                  {key}
                </Text>
                <Box
                  w={2}
                  h={2}
                  bg={isSelected ? "green.solid" : "transparent"}
                  borderRadius="full"
                  flexShrink={0}
                />
              </Flex>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}
