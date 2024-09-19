"use client"

import {
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
  { label: "Roboto", value: "--font-roboto" },
  { label: "Figtree", value: "--font-figtree" },
]

interface ThemePanelProps {
  accentColor?: string
  fontFamily?: string
}

export function ThemePanel(props: ThemePanelProps) {
  const system = useChakraContext()
  const [accentColor, setAccentColor] = useState(props.accentColor)
  const [fontFamily, setFontFamily] = useState(
    props.fontFamily ?? "--font-inter",
  )
  return (
    <>
      <Global
        styles={{
          body: system.css({ colorPalette: accentColor }) as any,
          html: {
            "--chakra-fonts-heading": `var(${fontFamily})`,
            "--chakra-fonts-body": `var(${fontFamily})`,
          },
        }}
      />

      <Card.Root variant="elevated" bg="bg.panel">
        <Card.Header>
          <HStack justify="space-between">
            <Text fontWeight="semibold">Theme Panel</Text>
            <ColorModeButton colorPalette="accent" />
          </HStack>
        </Card.Header>
        <Card.Body gap="8" alignItems="stretch">
          <Stack gap="3">
            <Text fontWeight="medium" textStyle="sm">
              Palette
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
                    item.value === fontFamily ? "accent.solid" : undefined
                  }
                  outlineWidth="1px"
                  outlineColor={
                    item.value === fontFamily ? "accent.solid" : "transparent"
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
                    <Text textStyle="xs" fontFamily="body">
                      {item.label}
                    </Text>
                  </VStack>
                </Square>
              ))}
            </SimpleGrid>
          </Stack>
        </Card.Body>
      </Card.Root>
    </>
  )
}
