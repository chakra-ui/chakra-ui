"use client"

import {
  Box,
  Card,
  Circle,
  HStack,
  SimpleGrid,
  Square,
  Stack,
  Text,
  VStack,
  useChakraContext,
} from "@chakra-ui/react"
import { Global } from "@emotion/react"
import { ColorModeButton } from "compositions/ui/color-mode"
import { RadioCardItem, RadioCardRoot } from "compositions/ui/radio-card"
import { useState } from "react"

const accentColors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
]

const fontFamilies = [
  { label: "Inter", value: "--font-inter" },
  { label: "Outfit", value: "--font-outfit" },
  { label: "Geist", value: "--font-geist-sans" },
  { label: "Figtree", value: "--font-figtree" },
]

const radiiMap: Record<string, Record<string, string>> = {
  none: {
    l1: "none",
    l2: "none",
    l3: "none",
  },
  xs: {
    l1: "radii.2xs",
    l2: "radii.xs",
    l3: "radii.sm",
  },
  sm: {
    l1: "radii.xs",
    l2: "radii.sm",
    l3: "radii.md",
  },
  md: {
    l1: "radii.sm",
    l2: "radii.md",
    l3: "radii.lg",
  },
  lg: {
    l1: "radii.md",
    l2: "radii.lg",
    l3: "radii.xl",
  },
  xl: {
    l1: "radii.lg",
    l2: "radii.xl",
    l3: "radii.2xl",
  },
  "2xl": {
    l1: "radii.xl",
    l2: "radii.2xl",
    l3: "radii.3xl",
  },
}

interface ThemePanelProps {
  accentColor?: string
  fontFamily?: string
  radius?: string
}

export function ThemePanel(props: ThemePanelProps) {
  const system = useChakraContext()
  const [accentColor, setAccentColor] = useState(props.accentColor)
  const [fontFamily, setFontFamily] = useState(
    props.fontFamily ?? "--font-inter",
  )
  const [radius, setRadius] = useState(props.radius ?? "sm")

  const radii = Object.fromEntries(
    Object.entries(radiiMap[radius]).map(([key, value]) => [
      key,
      system.token(value, value),
    ]),
  )

  return (
    <>
      <Global
        styles={{
          body: system.css({ colorPalette: accentColor }) as any,
          html: {
            "--chakra-fonts-heading": `var(${fontFamily})`,
            "--chakra-fonts-body": `var(${fontFamily})`,
            "--chakra-radii-l1": radii.l1,
            "--chakra-radii-l2": radii.l2,
            "--chakra-radii-l3": radii.l3,
          },
        }}
      />

      <Card.Root variant="elevated" bg="bg.panel" maxW="sm">
        <Card.Header>
          <HStack justify="space-between">
            <Text fontWeight="semibold">Theme Panel</Text>
            <ColorModeButton colorPalette="gray" />
          </HStack>
        </Card.Header>
        <Card.Body gap="8" alignItems="stretch">
          <Stack gap="3">
            <Text fontWeight="medium" textStyle="sm">
              Color Palette
            </Text>
            <RadioCardRoot
              flex="1"
              size="sm"
              defaultValue={accentColor}
              onValueChange={(details) => {
                document.cookie = `chakra-accent-color=${details.value}`
                setAccentColor(details.value)
              }}
            >
              <HStack wrap="wrap" maxW="342px" gap="2">
                {accentColors.map((color) => (
                  <RadioCardItem
                    rounded="md"
                    flex="0"
                    indicator={<Circle size="4" bg={`${color}.solid`} />}
                    key={color}
                    value={color}
                  />
                ))}
              </HStack>
            </RadioCardRoot>
          </Stack>

          <Stack gap="3">
            <Text fontWeight="medium" textStyle="sm">
              Font Family
            </Text>
            <SimpleGrid gap="2" columns={4}>
              {fontFamilies.map((item) => (
                <Square
                  cursor="default"
                  rounded="md"
                  borderColor={
                    item.value === fontFamily ? "colorPalette.solid" : undefined
                  }
                  outlineWidth="1px"
                  outlineColor={
                    item.value === fontFamily
                      ? "colorPalette.solid"
                      : "transparent"
                  }
                  outlineStyle="solid"
                  onClick={() => {
                    document.cookie = `chakra-font=${item.value}`
                    setFontFamily(item.value)
                  }}
                  px="4"
                  py="2"
                  borderWidth="1px"
                  key={item.value}
                  fontSize="xl"
                  fontFamily={`var(${item.value})`}
                >
                  <VStack gap="1">
                    <Text fontSize="xl">Ag</Text>
                    <Text textStyle="xs">{item.label}</Text>
                  </VStack>
                </Square>
              ))}
            </SimpleGrid>
          </Stack>

          <Stack gap="3">
            <Text fontWeight="medium" textStyle="sm">
              Radius
            </Text>
            <RadioCardRoot
              size="sm"
              orientation="vertical"
              align="center"
              defaultValue={radius}
              onValueChange={(details) => {
                document.cookie = `chakra-radius=${details.value}`
                setRadius(details.value)
              }}
            >
              <HStack wrap="wrap" gap="2">
                {Object.keys(radiiMap).map((radii) => (
                  <RadioCardItem
                    flex="0"
                    minW="60px"
                    rounded="md"
                    indicator={null}
                    label={radii}
                    icon={
                      <Box
                        boxSize="6"
                        bg="red/10"
                        roundedTopLeft={radii}
                        borderTopWidth="2px"
                        borderStartWidth="2px"
                        borderColor="red"
                      />
                    }
                    key={radii}
                    value={radii}
                  />
                ))}
              </HStack>
            </RadioCardRoot>
          </Stack>
        </Card.Body>
      </Card.Root>
    </>
  )
}
