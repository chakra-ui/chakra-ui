"use client"

import {
  ColorPicker,
  ColorPickerEyeDropper,
  For,
  HStack,
  IconButton,
  Square,
  VStack,
  getColorChannels,
  parseColor,
} from "@chakra-ui/react"
import { LuCheck, LuPlus } from "react-icons/lu"

const swatches = [
  "#000000",
  "#4A5568",
  "#F56565",
  "#ED64A6",
  "#9F7AEA",
  "#6B46C1",
  "#4299E1",
  "#0BC5EA",
  "#00B5D8",
  "#38B2AC",
  "#48BB78",
  "#68D391",
  "#ECC94B",
  "#DD6B20",
]

const ChannelInputs = (props: { format: ColorPicker.ColorFormat }) => {
  const channels = getColorChannels(props.format)

  return (
    <ColorPicker.View format={props.format}>
      <HStack wrap="wrap" gap="2" w="full">
        <For each={channels}>
          {(channel) => (
            <VStack
              key={channel}
              gap="1"
              flex="0 0 auto"
              minW="60px"
              align="stretch"
            >
              <ColorPicker.ChannelInput
                channel={channel}
                px="0"
                height="7"
                textStyle="xs"
                textAlign="center"
              />
              <ColorPicker.ChannelText textAlign="center">
                {channel.charAt(0).toUpperCase() + channel.slice(1)}
              </ColorPicker.ChannelText>
            </VStack>
          )}
        </For>
      </HStack>
    </ColorPicker.View>
  )
}

export const ColorPickerExplorerDemo = () => {
  return (
    <ColorPicker.Root
      defaultValue={parseColor("#eb5e41")}
      open
      maxW="400px"
      alignItems="flex-start"
    >
      <ColorPicker.HiddenInput />

      <ColorPicker.Label>
        Pick a color: <ColorPicker.ValueText />
      </ColorPicker.Label>

      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger>
          <ColorPicker.ValueSwatch boxSize="6" />
        </ColorPicker.Trigger>
      </ColorPicker.Control>

      <ColorPicker.Positioner>
        <ColorPicker.Content
          animation="none"
          shadow="md"
          padding="4"
          borderRadius="md"
          w="full"
          maxW="400px"
          bg="bg.subtle"
        >
          <VStack gap="4" w="full" align="stretch">
            <VStack gap="2" align="stretch">
              <ColorPicker.Area maxH="150px">
                <ColorPicker.AreaBackground />
                <ColorPicker.AreaThumb />
              </ColorPicker.Area>
            </VStack>
            <ColorPicker.Sliders maxH="120px" />
            <HStack gap="3" wrap="wrap">
              <ColorPickerEyeDropper size="xs" />

              <ColorPicker.FormatTrigger asChild>
                <IconButton size="xs" aria-label="Format" variant="outline">
                  F
                </IconButton>
              </ColorPicker.FormatTrigger>

              <ColorPicker.FormatSelect />
            </HStack>

            <HStack gap="2" w="full" flexWrap="wrap">
              <ChannelInputs format="rgba" />
              <ChannelInputs format="hsla" />
              <ChannelInputs format="hsba" />
            </HStack>
            <ColorPicker.SwatchGroup>
              <HStack gap="2" wrap="wrap">
                {swatches.map((color) => (
                  <ColorPicker.SwatchTrigger key={color} value={color}>
                    <ColorPicker.Swatch value={color}>
                      <ColorPicker.SwatchIndicator>
                        <LuCheck />
                      </ColorPicker.SwatchIndicator>
                    </ColorPicker.Swatch>
                  </ColorPicker.SwatchTrigger>
                ))}

                <ColorPicker.Trigger>
                  <Square
                    size="7"
                    bgSize="cover"
                    overflow="hidden"
                    border="4px solid"
                    borderImage="conic-gradient(from 90deg, red, yellow, lime, aqua, blue, magenta, red) 1"
                  >
                    <LuPlus />
                  </Square>
                </ColorPicker.Trigger>
              </HStack>
            </ColorPicker.SwatchGroup>
          </VStack>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker.Root>
  )
}
