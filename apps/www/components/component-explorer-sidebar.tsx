"use client"

import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { kebabCase } from "scule"

export const normalizeComponentName = (name: string) =>
  name.split("-")[0].toLowerCase()

export type HighlightStyle = Partial<
  Pick<
    CSSStyleDeclaration,
    "outline" | "outlineOffset" | "border" | "borderColor"
  >
>

const applyHighlight = (
  normalizedName: string,
  part: string | null,
  action: "add" | "remove",
  highlightStyle: HighlightStyle,
) => {
  if (!part) return

  const kebabPart = kebabCase(part)
  const selector = `[data-scope=${normalizedName}][data-part=${kebabPart}]`
  const preview = document.getElementById("component-preview")
  if (!preview) return

  const elements = preview.querySelectorAll<HTMLElement>(selector)

  for (const el of elements) {
    if (action === "add") {
      for (const key in highlightStyle) {
        const k = key as keyof HighlightStyle
        if (highlightStyle[k]) el.style[k] = highlightStyle[k]!
      }
    } else {
      for (const key in highlightStyle) {
        const k = key as keyof HighlightStyle
        el.style[k] = ""
      }
    }
  }
}

interface ComponentExplorerSidebarProps {
  componentName: string
  activePart: string | null
  setActivePart: (part: string | null) => void
  getHighlightStyle: () => HighlightStyle
}

export const ComponentExplorerSidebar = ({
  componentName,
  activePart,
  setActivePart,
  getHighlightStyle,
}: ComponentExplorerSidebarProps) => {
  const normalizedName = normalizeComponentName(componentName)
  const anatomy =
    anatomies[`${normalizedName}Anatomy` as keyof typeof anatomies]
  const anatomyKeys = anatomy.keys()
  const highlightStyle = getHighlightStyle()

  const selectPart = (part: string) => {
    if (activePart === part) {
      applyHighlight(normalizedName, part, "remove", highlightStyle)
      setActivePart(null)
    } else {
      if (activePart)
        applyHighlight(normalizedName, activePart, "remove", highlightStyle)
      setActivePart(part)
      applyHighlight(normalizedName, part, "add", highlightStyle)
    }
  }

  const hoverPart = (part: string, isEntering: boolean) => {
    const preview = document.getElementById("component-preview")
    if (!preview) return

    const selector = `[data-scope=${normalizedName}][data-part=${kebabCase(part)}]`
    const elements = preview.querySelectorAll<HTMLElement>(selector)

    for (const el of elements) {
      if (isEntering) {
        for (const key in highlightStyle) {
          const k = key as keyof HighlightStyle
          if (highlightStyle[k]) el.style[k] = highlightStyle[k]!
        }
      } else if (activePart !== part) {
        for (const key in highlightStyle) {
          const k = key as keyof HighlightStyle
          el.style[k] = ""
        }
      }
    }
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
        {anatomyKeys.map((key) => (
          <AnatomyPart
            key={key}
            partKey={key}
            isSelected={activePart === key}
            onMouseEnter={() => hoverPart(key, true)}
            onMouseLeave={() => hoverPart(key, false)}
            onClick={() => selectPart(key)}
          />
        ))}
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
