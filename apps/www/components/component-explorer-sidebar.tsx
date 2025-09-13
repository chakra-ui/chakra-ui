"use client"

import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { useState } from "react"
import { kebabCase } from "scule"

const normalizeComponentName = (name: string) =>
  name.split("-")[0].toLowerCase()

const applyHighlight = (
  normalizedName: string,
  part: string | null,
  action: "add" | "remove",
) => {
  if (!part) return null
  const kebabPart = kebabCase(part)
  const selector = `[data-scope=${normalizedName}][data-part=${kebabPart}]`
  const preview = document.getElementById("component-preview")
  if (!preview) return null

  const elements = preview.querySelectorAll(selector) as NodeListOf<HTMLElement>

  const styles: Record<string, string> = {
    outline: "2px solid red",
    outlineOffset: "2px",
  }

  for (const el of elements) {
    if (action === "add") {
      Object.assign(el.style, styles)
    } else {
      el.style.outline = ""
      el.style.outlineOffset = ""
    }
  }

  return action === "add" ? styles : null
}

function useAnatomySelection<PartKey extends string>(normalizedName: string) {
  const [activePart, setActivePart] = useState<PartKey | null>(null)

  const selectPart = (part: PartKey) => {
    if (activePart === part) {
      applyHighlight(normalizedName, part, "remove")
      setActivePart(null)
    } else {
      if (activePart) applyHighlight(normalizedName, activePart, "remove")
      setActivePart(part)
      applyHighlight(normalizedName, part, "add")
    }
  }

  const hoverPart = (part: PartKey, isEntering: boolean) => {
    if (isEntering) {
      applyHighlight(normalizedName, part, "add")
    } else {
      if (activePart !== part) applyHighlight(normalizedName, part, "remove")
    }
  }

  return { activePart, selectPart, hoverPart }
}

export const ComponentExplorerSidebar = ({
  componentName,
}: {
  componentName: string
}) => {
  const normalizedName = normalizeComponentName(componentName)
  const anatomy =
    anatomies[`${normalizedName}Anatomy` as keyof typeof anatomies]
  const anatomyKeys = anatomy.keys()

  const { activePart, selectPart, hoverPart } =
    useAnatomySelection<(typeof anatomyKeys)[number]>(normalizedName)

  return (
    <Box p={5} bg="bg" minW="260px">
      <Heading size="sm" mb={2} color="fg">
        Component Anatomy
      </Heading>
      <Text fontSize="sm" mb={4} color="fg.muted">
        Hover to highlight, click to select parts
      </Text>

      <Flex wrap="wrap" gap={2}>
        {anatomyKeys.map((key) => {
          const isSelected = activePart === key
          return (
            <AnatomyPart
              key={key}
              partKey={key}
              isSelected={isSelected}
              onMouseEnter={() => hoverPart(key, true)}
              onMouseLeave={() => hoverPart(key, false)}
              onClick={() => selectPart(key)}
            />
          )
        })}
      </Flex>
    </Box>
  )
}

const AnatomyPart = <T extends string>({
  partKey,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  partKey: T
  isSelected: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}) => (
  <Box
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
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    <Flex align="center" gap={2}>
      <Text
        fontSize="sm"
        fontWeight="medium"
        textTransform="capitalize"
        color="fg"
      >
        {partKey}
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
