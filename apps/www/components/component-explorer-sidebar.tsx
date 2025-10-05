"use client"

import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { camelCase, kebabCase } from "scule"

export const normalizeComponentName = (name: string) => {
  let parts = name.split("-")

  while (
    parts.length > 1 &&
    ["basic", "explorer"].includes(parts[parts.length - 1])
  ) {
    parts.pop()
  }

  const pascal = parts
    .map((p, i) =>
      i === 0
        ? p.toLowerCase()
        : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase(),
    )
    .join("")

  const kebab = parts.map((p) => p.toLowerCase()).join("-")

  return { pascal, kebab }
}

export type HighlightStyle = Partial<
  Pick<
    CSSStyleDeclaration,
    "outline" | "outlineOffset" | "border" | "borderColor"
  >
>

const getPartElements = (
  preview: HTMLElement,
  kebabName: string,
  part: string,
): HTMLElement[] => {
  const kebabPart = kebabCase(part)
  const camelPart = camelCase(part)

  const scopeSelector = `[data-scope=${kebabName}][data-part=${kebabPart}]`
  const scopeMatches = Array.from(
    preview.querySelectorAll<HTMLElement>(scopeSelector),
  )
  if (scopeMatches.length > 0) return scopeMatches

  const chakraSelector = `.chakra-${kebabName}__${camelPart}`
  const chakraMatches = Array.from(
    preview.querySelectorAll<HTMLElement>(chakraSelector),
  )
  if (chakraMatches.length > 0) return chakraMatches

  const bareSelector = `.${kebabName}__${camelPart}`
  return Array.from(preview.querySelectorAll<HTMLElement>(bareSelector))
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
  kebabName: string,
  part: string | null,
  action: "add" | "remove",
  highlightStyle: HighlightStyle,
) => {
  if (!part) return
  const preview = document.getElementById("component-preview")
  if (!preview) return

  const elements = getPartElements(preview, kebabName, part)
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
  const { pascal, kebab } = normalizeComponentName(componentName)
  const anatomy = anatomies[`${pascal}Anatomy` as keyof typeof anatomies]
  const anatomyKeys = anatomy.keys()
  const highlightStyle = getHighlightStyle()

  console.log("anatomyKeys", anatomyKeys.join(", "))

  const selectPart = (part: string) => {
    if (activePart === part) {
      applyHighlight(kebab, part, "remove", highlightStyle)
      setActivePart(null)
    } else {
      if (activePart) {
        applyHighlight(kebab, activePart, "remove", highlightStyle)
      }
      setActivePart(part)
      applyHighlight(kebab, part, "add", highlightStyle)
    }
  }

  const hoverPart = (part: string, isEntering: boolean) => {
    const preview = document.getElementById("component-preview")
    if (!preview) return

    const elements = getPartElements(preview, kebab, part)
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
