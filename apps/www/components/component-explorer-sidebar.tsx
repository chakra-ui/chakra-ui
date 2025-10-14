"use client"

import { Box, BoxProps, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import * as anatomies from "@chakra-ui/react/anatomy"
import { useEffect, useRef, useState } from "react"
import { HiChevronRight } from "react-icons/hi"
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
  const anatomyKeys = anatomy ? Array.from(new Set(anatomy.keys())) : []
  const highlightStyle = getHighlightStyle()

  const flexRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = flexRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth)
  }

  useEffect(() => {
    updateScrollState()
    window.addEventListener("resize", updateScrollState)
    return () => window.removeEventListener("resize", updateScrollState)
  }, [anatomyKeys])

  const scrollBy = (distance: number) => {
    if (!flexRef.current) return
    flexRef.current.scrollBy({ left: distance, behavior: "smooth" })
  }

  const selectPart = (part: string) => {
    if (activePart === part) {
      applyHighlight(kebab, part, "remove", highlightStyle)
      setActivePart(null)
    } else {
      if (activePart)
        applyHighlight(kebab, activePart, "remove", highlightStyle)
      setActivePart(part)
      applyHighlight(kebab, part, "add", highlightStyle)
    }
  }

  const hoverPart = (part: string, isEntering: boolean) => {
    const preview = document.getElementById("component-preview")
    if (!preview) return
    const elements = getPartElements(preview, kebab, part)
    if (isEntering) highlightElements(elements, "add", highlightStyle)
    else if (activePart !== part)
      highlightElements(elements, "remove", highlightStyle)
  }

  return (
    <Box
      p={5}
      px={{ base: 0, lg: 5 }}
      bg={{ base: "transparent", lg: "bg" }}
      borderRadius={{ base: "none", lg: "md" }}
      border={{ base: "none", lg: "1px solid" }}
      borderColor={{ base: "transparent", lg: "border.subtle" }}
      w="100%"
      order={{ base: -1, lg: 0 }}
    >
      <Heading
        size="sm"
        mb={2}
        color="fg"
        display={{ base: "none", lg: "block" }}
      >
        Component Anatomy
      </Heading>
      <Text
        fontSize="sm"
        mb={4}
        color="fg.muted"
        display={{ base: "none", lg: "block" }}
      >
        Hover to highlight, click to select parts
      </Text>

      <Box position="relative">
        <Flex
          ref={flexRef}
          wrap={{ base: "nowrap", lg: "wrap" }}
          gap={2}
          overflowX={{ base: "auto", lg: "visible" }}
          px={2}
          onScroll={updateScrollState}
        >
          {anatomyKeys.map((key, i) => (
            <AnatomyPart
              key={key}
              partKey={key}
              isSelected={activePart === key}
              onMouseEnter={() => hoverPart(key, true)}
              onMouseLeave={() => hoverPart(key, false)}
              onClick={() => selectPart(key)}
              mr={i === anatomyKeys.length - 1 ? "40px" : undefined}
            />
          ))}
        </Flex>

        {canScrollLeft && (
          <Box
            display={{ base: "flex", lg: "none" }}
            position="absolute"
            top={0}
            left={0}
            w="32px"
            h="100%"
            alignItems="center"
            justifyContent="center"
            borderRadius="0 16px 16px 0"
            bgGradient="linear(to-r, rgba(255,255,255,0.4), transparent)"
            backdropFilter="blur(6px)"
            boxShadow="0 0 6px rgba(0,0,0,0.1)"
            cursor="pointer"
            onClick={() => scrollBy(-100)}
          >
            <HiChevronRight size={16} style={{ transform: "rotate(180deg)" }} />
          </Box>
        )}

        {canScrollRight && (
          <Box
            display={{ base: "flex", lg: "none" }}
            position="absolute"
            top={0}
            right={0}
            w="32px"
            h="100%"
            alignItems="center"
            justifyContent="center"
            borderRadius="16px 0 0 16px"
            bgGradient="linear(to-l, rgba(255,255,255,0.4), transparent)"
            backdropFilter="blur(6px)"
            boxShadow="0 0 6px rgba(0,0,0,0.1)"
            cursor="pointer"
            onClick={() => scrollBy(100)}
          >
            <HiChevronRight size={16} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

const AnatomyPart = <T extends string>({
  partKey,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...boxProps
}: {
  partKey: T
  isSelected: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
} & BoxProps) => (
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
    {...boxProps}
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
