"use client"

import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { camelCase, kebabCase } from "scule"

export const normalizeComponentName = (name: string) =>
  name.split("-")[0].toLowerCase()

export type HighlightStyle = Partial<
  Pick<
    CSSStyleDeclaration,
    "outline" | "outlineOffset" | "border" | "borderColor"
  >
>

const getPartElements = (
  preview: HTMLElement,
  normalizedName: string,
  part: string,
): HTMLElement[] => {
  const kebabPart = kebabCase(part)
  const camelPart = camelCase(part)

  const scopeSelector = `[data-scope=${normalizedName}][data-part=${kebabPart}]`
  const scopeMatches = Array.from(
    preview.querySelectorAll<HTMLElement>(scopeSelector),
  )
  if (scopeMatches.length > 0) return scopeMatches

  const classSelector = `.chakra-${normalizedName}__${camelPart}`
  return Array.from(preview.querySelectorAll<HTMLElement>(classSelector))
}

const highlightElements = (
  elements: HTMLElement[],
  action: "add" | "remove",
  highlightStyle: HighlightStyle,
) => {
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

const applyHighlight = (
  normalizedName: string,
  part: string | null,
  action: "add" | "remove",
  highlightStyle: HighlightStyle,
) => {
  if (!part) return
  const preview = document.getElementById("component-preview")
  if (!preview) return

  const elements = getPartElements(preview, normalizedName, part)
  highlightElements(elements, action, highlightStyle)
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

    const elements = getPartElements(preview, normalizedName, part)
    if (isEntering) {
      highlightElements(elements, "add", highlightStyle)
    } else if (activePart !== part) {
      highlightElements(elements, "remove", highlightStyle)
    }
  }

  return (
    <Box
      p={5}
      px={{ base: 0, lg: 5 }}
      bg="bg"
      minW={{ base: "100%", lg: "260px" }}
      maxW="100%"
    >
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
        textStyle="sm"
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
